class BuzzController < ApplicationController
  def index
    #type - 1: 설치형, 2: 실행형, 3: 참여형
    #썸네일, 제목, type, 쿠폰?개수
    @available_campaigns = [{:thumbnail => "csr2.png", :title => "레고 시티 마이시티 2", :type => 1, :coupon => 2}, {:thumbnail => "csr2.png", :title => "CSR2 RACING", :type => 2, :coupon => 1}, {:thumbnail => "csr2.png", :title => "The Little Fox", :type => 3, :coupon => 1}, {:thumbnail => "csr2.png", :title => "레고 시티 마이시티 2", :type => 4, :coupon => 2}, {:thumbnail => "csr2.png", :title => "CSR2 RACING", :type => 5, :coupon => 1}, {:thumbnail => "csr2.png", :title => "The Little Fox", :type => 6, :coupon => 1} ]

    @app_available_campaigns = []
    (0..2).each do |c|
      @app_available_campaigns << @available_campaigns[c]
    end

    @winning_number = [8, 12, 27, 32, 41, 44]
  end

  def share
    @available_campaigns = [{:thumbnail => "csr2.png", :title => "레고 시티 마이시티 2", :type => 1, :coupon => 2}, {:thumbnail => "csr2.png", :title => "CSR2 RACING", :type => 2, :coupon => 1}, {:thumbnail => "csr2.png", :title => "The Little Fox", :type => 3, :coupon => 1} ]
    @app_available_campaigns = []
    (0..2).each do |c|
      @app_available_campaigns << @available_campaigns[c]
    end

    @winning_number = [8, 12, 27, 32, 41, 44]

  end
end
