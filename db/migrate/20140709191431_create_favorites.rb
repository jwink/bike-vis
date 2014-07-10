class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :station_id
      t.integer :ranking

      t.timestamps
    end
  end
end
