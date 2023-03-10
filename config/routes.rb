Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  root to: "pages#home"
  resources :donations, only: [:index, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :orders, only: [:show, :create] do
    resources :payments, only: :new
  end
  # Defines the root path route ("/")
  # root "articles#index"
  get "javascript", to: "pages#javascript"
end
