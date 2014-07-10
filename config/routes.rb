Rails.application.routes.draw do

  get '/' => 'users#index'

  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/sessions' => 'sessions#destroy', as: 'logout'

  post '/users' => 'users#create', as: 'users'

  root 'users#index'

  get '/auth/:provider/callback', to: 'users#oauth'

  get '/currents/nowinfo', to: 'currents#nowinfo'

  get '/averages/averageinfo', to: 'averages#averageinfo'
end
