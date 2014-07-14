class CreateSaturations < ActiveRecord::Migration
  def change
    create_table :saturations do |t|
      t.integer :citibike_id
      t.float :capacity
      t.string :quadrant
      t.float :avg_bikes
      t.float :avg_docks
      t.integer :hour
      t.float :saturation
      t.decimal :latitude
      t.decimal :longitude
      t.float :quadsatur

      t.timestamps
    end
  end
end
