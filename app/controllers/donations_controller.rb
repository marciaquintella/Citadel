class DonationsController < ApplicationController
# app/controllers/teddies_controller.rb
  skip_before_action :authenticate_user!

def index
  @donations = Donation.all
end

def show
  @donation = Donation.find(params[:id])
end

end
