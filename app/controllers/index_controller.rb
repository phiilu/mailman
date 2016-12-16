class IndexController < ApplicationController
  before_filter :authenticate
  before_filter :authenticate_admin

  def index
    @domains = Domain.all
    @accounts = Account.all
    @aliases = Alias.all
  end
end
