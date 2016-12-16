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

  def self.hash_password password
    salt = SecureRandom.hex(32)
    hash = Base64.strict_encode64(Digest::SHA512.digest(password+salt) + salt)
    "{SSHA512}#{hash}"
  end

  def hash_password
    salt = SecureRandom.hex(32)
    hash = Base64.strict_encode64(Digest::SHA512.digest(self.password+salt) + salt)
    self.password = "{SSHA512}#{hash}"
  end

  def hash_password_with_given password, salt
    hash = Base64.strict_encode64(Digest::SHA512.digest(password+salt) + salt)
    password = "{SSHA512}#{hash}"
  end

  def check_password? password
    decoded = Base64.strict_decode64(self.password.gsub(/^{SSHA512}/, ''))

    hash = decoded[0...64] # isolate the hash
    salt = decoded[64..decoded.length] # isolate the salt

    hash_password_with_given(password, salt) == self.password
  end

  def clear_password
    self.password = nil
  end

  def is_admin?
    Rails.configuration.admin_email == self.email
  end
end
