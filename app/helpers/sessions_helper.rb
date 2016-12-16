module SessionsHelper

  def log_in account
    session[:account_id] = account.id
  end

  def current_user
    @current_user ||= Account.find_by_id(session[:account_id]) if session[:account_id]
  end

  def logged_in?
    !current_user.nil?
  end

  def log_out
    session.delete(:account_id)
    @current_user = nil
  end

  def authenticate
    unless current_user
      redirect_to login_path
    end
  end

  def authenticate_admin
    unless is_admin?
      redirect_back(fallback_location: current_user)
    end
  end

  def is_admin?
    Rails.configuration.admin_email == current_user.email if current_user
  end

end
