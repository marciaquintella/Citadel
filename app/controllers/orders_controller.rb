class OrdersController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    donation = Donation.find(params[:order][:donation])
    order = Order.create!(donation: donation, donation_sku: donation.sku, amount: donation.price, state: 'pending')

    session = Stripe::Checkout::Session.create(
      payment_method_types: ['card'],
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'brl',
          unit_amount: donation.price_cents,
          product_data: {
            name: donation.sku,
          },
        },
      }],
      mode: "payment",
      success_url: order_url(order),
      cancel_url: order_url(order)
    )
    order.update(checkout_session_id: session.id)
    redirect_to new_order_payment_path(order)
  end

  def show
    @order = Order.find(params[:id])
  end

end
