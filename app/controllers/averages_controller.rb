
class AveragesController < ApplicationController

  def averageinfo
    which_station = params[:station]
    results = Average.where(station_id: which_station, day_of_week: 4)
    render json: results.to_json
  end

end
