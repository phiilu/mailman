class Domain < ApplicationRecord
  has_many :accounts, foreign_key: 'domain', primary_key: 'domain', dependent: :delete_all
  has_many :aliases, foreign_key: 'source_domain', primary_key: 'domain', dependent: :delete_all

  validates :domain, presence: true, uniqueness: true
end
