class MypageController < ApplicationController
  def index
  end

  def history
 @list = [{:ctime => "2016.07.11 21:24:01", :type => 0, :name =>"친구 두 명 회원가입", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "레고시티 마이시티2", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 0, :name => "three", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "four", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 2, :name => "five", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 3, :name => "six", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 0, :name => "seven", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "eight", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 2, :name => "nine", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 3, :name => "ten", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 0, :name => "eleven", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "twelve", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 2, :name => "thirteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 3, :name => "forteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 0, :name => "fifthteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "sixteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 2, :name => "seventeen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 3, :name => "eighteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 0, :name => "ninthteen", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 1, :name => "twenty", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 2, :name => "twentyone", :count => "3"}, {:ctime => "2016.07.11 21:24:01", :type => 3, :name => "twentytwo", :count => "3"}]
  end

  def account
  end

  def lotto
    @arr = Array.new(6)
    if !params[:format].nil?
      @arr = params[:format].split("/")
    end
  end

  def auto
    arr = 6.times.map{Random.rand(1...45)}.sort_by{|e| e}
    redirect_to mypage_lotto_path(arr)
  end

  def pw
  end

  def edit
    # 유저 현재 비밀번호와 일치하는지 확인
    if params[:pw_current]=="111"
      flash[:notice] = "비밀번호가 변경되었습니다."
    else
      flash[:notice] = "현재 비밀번호가 일치하지 않습니다."
    end

    redirect_to mypage_pw_path
  end

  def signout
  end

  def lotto_history
    
  end
end
