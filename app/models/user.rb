class User < ActiveRecord::Base
  has_many :favorites
  has_many :stations, through: :favorites

  has_secure_password
  validates_uniqueness_of :username
  validates :username, presence: true
end
