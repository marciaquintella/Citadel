Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  root "pages#home"
  resources :donations, only: %i[index show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :orders, only: %i[show create] do
    resources :payments, only: :new
  end
  # Defines the root path route ("/")
  # root "articles#index"
  get "javascript", to: "pages#javascript"

  resources :feedbacks, only: %i[create index edit]
  post 'ai_request', to: 'pages#ai_request'
  get "orders/:id/precreate", to: "orders#precreate"
end
