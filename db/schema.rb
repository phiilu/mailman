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

ActiveRecord::Schema.define(version: 0) do

  create_table "accounts", unsigned: true, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string  "username", limit: 64,                 null: false
    t.string  "domain",                              null: false
    t.string  "password",                            null: false
    t.integer "quota",               default: 0,                  unsigned: true
    t.boolean "enabled",             default: false
    t.boolean "sendonly",            default: false
    t.index ["domain"], name: "domain", using: :btree
    t.index ["username", "domain"], name: "username", unique: true, using: :btree
  end

  create_table "aliases", unsigned: true, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string  "source_username",      limit: 64,                 null: false
    t.string  "source_domain",                                   null: false
    t.string  "destination_username", limit: 64,                 null: false
    t.string  "destination_domain",                              null: false
    t.boolean "enabled",                         default: false
    t.index ["source_domain"], name: "source_domain", using: :btree
    t.index ["source_username", "source_domain", "destination_username", "destination_domain"], name: "source_username", unique: true, using: :btree
  end

  create_table "domains", unsigned: true, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "domain", null: false
    t.index ["domain"], name: "domain", unique: true, using: :btree
  end

  create_table "tlspolicies", unsigned: true, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1" do |t|
    t.string "domain",            null: false
    t.string "policy", limit: 11, null: false
    t.string "params"
    t.index ["domain"], name: "domain", unique: true, using: :btree
  end

  add_foreign_key "accounts", "domains", column: "domain", primary_key: "domain", name: "accounts_ibfk_1"
  add_foreign_key "aliases", "domains", column: "source_domain", primary_key: "domain", name: "aliases_ibfk_1"
end
