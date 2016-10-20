Rails.application.routes.draw do
  root 'buzz#index'
  get '/buzz/share'
  get '/buzz/service'
  get '/buzz/privacy'

  resources 'win', only: [:index]
  get '/win/prize'

  get '/log/index'
  post '/log/in'

  get '/sign/index'
  get '/sign/step'
  get '/sign/find_pw'

  get '/mypage/index'
  get '/mypage/history'
  get '/mypage/account'
  get '/mypage/lotto'
  get '/mypage/lotto_history'
  post '/mypage/auto'
  get '/mypage/pw'
  post '/mypage/edit'
  get '/mypage/signout'
end
