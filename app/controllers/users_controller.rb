
class UsersController < ApplicationController
  def index
    @user = User.new
    @time = Time.now.localtime.wday
  end

  def create
    @user = User.create(user_params)
    if @user.id != nil
      session[:user_id] = @user.id
    end
    redirect_to '/'
  end

  def oauth
    data = request.env['omniauth.auth']
    if data['provider'] == 'facebook'
      @user = User.find_by username: data['info']['email']
    else
      @user = User.find_by username: data['info']['nickname']
    end

    if @user == nil
      user_info = {}
      user_info[:provider] = data['provider']
      if user_info[:provider] == "facebook"
        user_info[:username] = data['info']['email']
      else
        user_info[:username] = data['info']['nickname']
      end
      user_info[:uid] = data['uid']
      user_info[:password] = (0...8).map { (97 + rand(26)).chr }.join
      @user = User.create(user_info)
    end
    if @user.id != nil
      session[:user_id] = @user.id
    end
    redirect_to '/'
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
