Rails.application.routes.draw do
  devise_for :users
  get 'home/index'
  root to: "home#index"
  resources :movies
  get 'rent_a_movie' => 'movies#make_a_rent'  
  post 'rent' => 'movies#rent'  
  #match '*path', to: 'home#index', via: :all
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
