
class AveragesController < ApplicationController

  def index
    results = Average.where(station_id: 72, day_of_week: 4)
    results_as_json = results.as_json
    @display = results_as_json
  end

end
