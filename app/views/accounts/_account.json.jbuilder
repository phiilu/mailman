json.extract! account, :id, :username, :domain_id, :password, :quota, :enabled, :sendonly, :created_at, :updated_at
json.url account_url(account, format: :json)