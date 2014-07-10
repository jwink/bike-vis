
class AveragesController < ApplicationController

  def index
    results = Average.where(station_id: 72)
    results_as_json = results.as_json
    @display = results_as_json[0]['avail_docks_avg']
  end

end
