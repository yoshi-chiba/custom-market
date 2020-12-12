class SignupController < ApplicationController
  def step1
  end

  def step2
    @user = User.new
  end

  def step3
    @user = User.new(user_params)

    # バリデーションチェック
    # 今回の場合はビューで「required: true」が入っているので必要ない
    # unless @user.valid?
    #   flash.now[:alert] = @user.errors.full_messages
    #   render :step2 and return
    # end

    session["devise.regist_data"] = {user: @user.attributes}
    session["devise.regist_data"][:user]["password"] = params[:user][:password]

    # 住所登録のインスタンスを作成[A]
    @address = @user.build_address
  end

  def step4
    @user = User.new(session["devise.regist_data"]["user"])
    @address = Address.new(address_params)

    @user.build_address(@address.attributes)
    @user.save!

    # sessionの削除
    session["devise.regist_data"]["user"].clear

    # サインイン
    sign_in(:user, @user)
  end

  private

  def user_params
    params.require(:user).permit(
      :nickname, 
      :email, 
      :password, 
      :password_confirmation,
      :avatar,
      :first_name,
      :first_name_reading,
      :last_name,
      :last_name_reading, 
      :birthday,
      :earnings,
      :points
  )
  end

  def address_params
    params.require(:address).permit(
      :postal_code,
      :prefecture,
      :city,
      :house_number,
      :building_name,
      :phone_number
    )
  end
end
