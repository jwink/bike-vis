
class StationsController < ApplicationController

  def static
    which_station = params[:station]
    station = Station.where(citibike_id: which_station).take
    static_hash = {}
    static_hash['quadrant'] = station.quadrant
    static_hash['capacity'] = station.capacity
    render json: static_hash.to_json
  end

end


