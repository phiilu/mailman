class SessionsController < ApplicationController
  def new
  end

  def create
    email = authentication_params[:email].split("@")
    account = Account.find_by_username_and_domain(email.first, email.second)

    puts account

    if account && account.check_password?(authentication_params[:password])
      log_in account
      redirect_to account, notice: 'You are now logged in'
    else
      flash[:error] = "Login failed!"
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

  private

  def authentication_params
    params.require(:session).permit(:email, :password)
  end
end
