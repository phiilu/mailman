class Account < ApplicationRecord
  before_save :hash_password, if: :password_changed?
  after_save :clear_password

  validates :username, presence: true, uniqueness: {scope: :domain}
  validates :domain, presence: true
  validates :password, length: { minimum: 2 }, presence: true, confirmation: true, on: :create
  validates :password, length: { minimum: 2 }, allow_blank: true, on: :update
  validates :password, confirmation: true, on: :update, if: :password_changed?
  validates :password_confirmation, presence: true, if: :password_changed?, on: :update

  attr_accessor :email

  def email
    "#{self.username}@#{self.domain}"
  end

  def salt
    SecureRandom.hex(32)
  end

  def hash_password
    hash = self.password.crypt('$6$' + salt)
    self.password = "{SHA512-CRYPT}#{hash}"
  end

  def check_password? password
    hash = self.password.to_s.gsub(/^{SHA512-CRYPT}/, '')
    salt = hash.split('$')[2]

    password.crypt('$6$' + salt) == hash
  end

  def clear_password
    self.password = nil
  end

  def is_admin?
    Rails.configuration.admin_email == self.email
  end
end
