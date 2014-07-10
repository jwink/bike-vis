

class Current

  def self.pull_data
    current_data = Citibikenyc.stations
    results = current_data["results"].to_json
    return results
  end

end
