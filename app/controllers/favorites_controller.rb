
class FavoritesController < ApplicationController

  def index
    if current_user != nil
      favorites = current_user.stations
    else
      favorites = nil
    end
    render json: favorites.to_json
  end

end


