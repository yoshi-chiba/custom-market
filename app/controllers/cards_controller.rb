class CardsController < ApplicationController

  def new
    @card = Card.new
  end

  # データベースにカードのcustomerのtokenを保存する
  def create
    Payjp.api_key = 'sk_test_3ec0dfded55fd39d299b636d'

    customer = Payjp::Customer.create(
      card: params[:card_token]
    )

    @card = Card.new(
      card_id: customer.default_card,
      customer_id: customer.id,
      user_id: current_user.id
    )
    if @card.save
      redirect_to done_signup_index_path
    else
      redirect_to step1_signup_index_path
    end
  end
end
