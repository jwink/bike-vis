# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140711002103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "averages", force: true do |t|
    t.integer "station_id"
    t.integer "hour"
    t.integer "day_of_week"
    t.decimal "avail_bikes_avg"
    t.decimal "avail_docks_avg"
  end

  create_table "favorites", force: true do |t|
    t.integer  "user_id"
    t.integer  "station_id"
    t.integer  "ranking"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "stations", force: true do |t|
    t.integer  "citibike_id"
    t.string   "label"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.integer  "near1"
    t.integer  "near2"
    t.integer  "near3"
    t.integer  "near4"
    t.integer  "near5"
    t.float    "dist1"
    t.float    "dist2"
    t.float    "dist3"
    t.float    "dist4"
    t.float    "dist5"
    t.string   "quadrant"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "capacity"
  end

  create_table "tempavg", force: true do |t|
    t.integer "station_id"
    t.integer "hour"
    t.integer "day_of_week"
    t.float   "avail_bikes_avg"
    t.float   "avail_docks_avg"
  end

  add_index "tempavg", ["station_id", "hour", "day_of_week"], name: "averages_station_id_hour_day_of_week_key", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "uid"
    t.string   "provider"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
