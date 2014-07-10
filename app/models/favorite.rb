class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :station
  validates_uniqueness_of :user_id, scope: :station_id
end
