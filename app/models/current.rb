

class Current

  def self.pull_data
    #current_data = Citibikenyc.stations
    current_data = HTTParty.get('http://appservices.citibikenyc.com/v1/station/list')
    results = current_data["results"].to_json
    return results
  end

end
