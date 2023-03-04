# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "csv"
User.destroy_all

User.create!(email: "marciaquintella@gmail.com", password: "123456", admin: true)
User.create!(email: "gabriel.st.martins@gmail.com ", password: "123456", admin: true)
User.create!(email: "nilcemayumi@gmail.com", password: "123456", admin: true)






















Function.destroy_all
Language.destroy_all

ruby = Language.create!(name: "Ruby", version: "3.1", source_reference: "	https://rubyapi.org/3.1")

filepath = "db/function_seed.csv"

CSV.foreach(filepath, headers: :first_row) do |row|
  function = Function.new(function_name: row['function_name'],
                          content: row['content'],
                          code: row['code'],
                          klass: row['klass'],
                          key_words: row['key_words'])
  function.language = ruby
  function.save
end
