# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all

User.create!(email: "marciaquintella@gmail.com", password: "123456", admin: true)
User.create!(email: "gabriel.st.martins@gmail.com ", password: "123456", admin: true)
User.create!(email: "nilcemayumi@gmail.com", password: "123456", admin: true)

# db/seeds.rb
puts 'Cleaning database...'
Order.destroy_all
Donation.destroy_all

puts 'Creating donations...'
Donation.create!(price: 10, sku: 'Dez Reais', name: 'R$10')
Donation.create!(price: 20, sku: 'Vinte Reais', name: 'R$20')
Donation.create!(price: 30, sku: 'Trinta Reais', name: 'R$30')
Donation.create!(price: 40, sku: 'Quarenta Reais', name: 'R$40')
Donation.create!(price: 50, sku: 'Cinquenta Reais', name: 'R$50')
Donation.create!(price: 60, sku: 'Sessenta Reais', name: 'R$60')
Donation.create!(price: 70, sku: 'Setenta Reais', name: 'R$70')
Donation.create!(price: 80, sku: 'Oitenta Reais', name: 'R$80')
Donation.create!(price: 90, sku: 'Noventa Reais', name: 'R$90')
Donation.create!(price: 100, sku: 'Cem Reais', name: 'R$100')
Donation.create!(price: 200, sku: 'Duzentos Reais', name: 'R$200')
Donation.create!(price: 500, sku: 'Quinhentos Reais', name: 'R$500')
Donation.create!(price: 1000, sku: 'Mil Reais', name: 'R$1000')
puts 'Finished!'
