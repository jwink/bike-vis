class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.integer :citibike_id
      t.string :label
      t.decimal :latitude
      t.decimal :longitude
      t.integer :near1
      t.integer :near2
      t.integer :near3
      t.integer :near4
      t.integer :near5
      t.float :dist1
      t.float :dist2
      t.float :dist3
      t.float :dist4
      t.float :dist5
      t.string :quadrant

      t.timestamps
    end
  end
end
