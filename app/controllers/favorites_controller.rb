
class FavoritesController < ApplicationController

  def index
    if current_user != nil
      favorites = current_user.stations
    else
      favorites = nil
    end
    render json: favorites.to_json
  end

  def create
    which_station = favorite_params[:station_id]
    station = Station.where(citibike_id: which_station).take
    current_user.stations << station
    render :json => {message: "hello"}
  end

  def destroy
    favorite = Favorite.where(station_id: params[:id]).take
    favorite.destroy
    render :json => {message: "hello"}
  end

  private

  def favorite_params
    params.require(:favorite).permit(:user_id, :station_id)
  end

end


