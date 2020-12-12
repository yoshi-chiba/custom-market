Rails.application.routes.draw do
  # これがないとdeviseのメソッドが使えない(user_signed_in?やcurrent_user)
  devise_for :users

  resources :signup do
    collection do
      get 'step1'
      get 'step2'
      post 'step2d'
      get 'step3'
      post 'step3'
      get 'step4'
      post 'step4'
      get 'done' # 登録完了後のページ
    end
  end
  
  root 'items#index'
  resources :cards, only: [:new, :create]

  # memberにしないとidが送られないので注意
  resources :items do
    member do 
      get "purchase_confirmation"
      post "purchase"
    end
  end

  # 非同期でのエラーメッセージの表示
  # namespace :api do
  #   resources :items, only: [:create, :update], defaults: { format: 'json' }
  # end
end
