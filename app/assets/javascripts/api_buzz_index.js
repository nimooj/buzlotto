function campaign_list() {
  if($("row.campaign .available_campaign_list").length == 0) {
    var url = "http://localhost:8000/api/ads/";
    var method = 'GET';
    var isMobile = get_device();
    var camp_data;
    
    if(isMobile == "W") {
      camp_data = {'is_mobile_web': 'N'};
    }
    else {
      camp_data = {'is_mobile_web': 'Y'}
    }

    camp_data.os = isMobile;

    $.ajax({
      method: method,
      url: url,
      contentType: "application/json",
      data: camp_data,
      dataType: "json"
    })
      .done(function(data){
      $(".campaign_heading span.highlight.green").html(data.length);

        // is_app() 으로 app 접속 중인지 web 접속 중인지 확인
        // 1. android_app -> 모든 캠페인
        // 2. ios_app -> 모든 캠페인
        // 3. mobile_web -> 서버에서 내려오는 모든 캠페인

        //data.offerlist[i] 로 변환 -> 현재 내려오는 캠페인 수
        //data.total_count -> 원래 전체 캠페인 수 ( 앱 로그인 시 가능 캠페인 수 : data.total_count - data.offerlist.length )
        
        //cpi 제외한 버즈빌 물량의 경우, onclick campaign_popup()에 식별자 보내서 link 분기해야함
      for(i = 0; i < data.length; i++) {
        var ad_id = data[i].id;
        var name = data[i].name;
        var thumbnail = data[i].icon_url;
        var type = data[i].revenue_type;
        var idx = i.toString();

        if (type == 'cpi') {
          idx = idx + " install_type";
        }
        //버즈빌 물량인 경우(cpi 제외): ???
        if (type == '???') {
          idx = idx + " buzzville_type";
        }

        var wrapper = "<div class='available_campaign_list campaign_" + idx + "' onclick='campaign_popup($(this).html());' style='border-top: 1px solid #e0e2e3;'><div class='available_campaign thumbnail'><img src='" + thumbnail + "'> </div> <div class='available_campaign title_type'> <div class='available_campaign title'>" + name + "</div><div class='available_campaign type "+idx+"' data-id="+ad_id+"><img src='/assets/types/type" + type + ".png'>" + "</div> </div> <div class='available_campaign coupon'> <img src='/assets/ic_b.png'><div class='coupon_count'>3장</div> </div> </div>";

      $(".campaign_heading").after(wrapper);

      }
    });
  }
}

function get_share_rand_image() {
  var url = 'http://localhost:8000/api/get_lotto_charm_image_url';
  var method = 'GET';
  $.ajax({
    method: method,
    url: url
  })
    .done(function(data){
      $(".share_img").html("<img src='" + data["image_url"] +"'>");
    });
}
