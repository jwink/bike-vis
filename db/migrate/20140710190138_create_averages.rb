class CreateAverages < ActiveRecord::Migration
  def change
    create_table :averages do |t|
      t.integer :station_id
      t.integer :hour
      t.integer :day_of_week
      t.decimal :avail_bikes_avg
      t.decimal :avail_docks_avg

    end
  end
end
