


class CurrentsController < ApplicationController

  def nowinfo
    results = Current.pull_data
    render json: results.to_json
  end

end
