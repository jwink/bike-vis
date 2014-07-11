class AddCapacityColumnToStations < ActiveRecord::Migration
  def change
    add_column :stations, :capacity, :integer
  end
end
