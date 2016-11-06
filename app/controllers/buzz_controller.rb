class BuzzController < ApplicationController
  def index
    #type - 1: 설치형, 2: 실행형, 3: 참여형
    #썸네일, 제목, type, 쿠폰?개수

    @app_available_campaigns = [{:thumbnail => "one.png", :title => "가짜의 타이틀", :type => "cpi", :coupon => 2}, {:thumbnail => "two.png", :title => "신한은행", :type => "cpinsta", :coupon => 1}, {:thumbnail => "three.png", :title => "아무개동수야", :type => "cpl", :coupon => 1} ]

    @winning_number = [8, 12, 27, 32, 41, 44]
  end

  def share
    @app_available_campaigns = [{:thumbnail => "one.png", :title => "가짜의 타이틀", :type => "cpi", :coupon => 2}, {:thumbnail => "two.png", :title => "신한은행", :type => "cpinsta", :coupon => 1}, {:thumbnail => "three.png", :title => "아무개동수야", :type => "cpl", :coupon => 1} ]

  end
end
