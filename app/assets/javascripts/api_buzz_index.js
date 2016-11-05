function camp_install_check() {
}

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

    $.ajax({
      method: method,
      url: url,
      contentType: "application/json",
      data: camp_data,
      dataType: "json"
    })
      .done(function(data){
      $(".campaign_heading span.highlight.green").html(data.length);
      for(i = 0; i < 11; i++) {
        var name = data[i].name;
        var thumbnail = data[i].icon_url;
        var type = data[i].revenue_type;
        var idx = i.toString();

        if (i == data.length - 1) { //첫번째 캠페인 border 설정
          if (type == 'cpi') {
            idx = idx + " install_type";
          }
          var wrapper = "<div class='available_campaign_list campaign_" + idx + "' onclick='campaign_popup($(this).html());' style='border-top: 1px solid #e0e2e3;'> <div class='available_campaign thumbnail'><img src='" + thumbnail + "'> </div> <div class='available_campaign title_type'> <div class='available_campaign title'>" + name + "</div> <div class='available_campaign type'><img src='/assets/types/type" + type + ".png'>" + "</div> </div> <div class='available_campaign coupon'> <img src='/assets/ic_b.png'><div class='coupon_count'>3장</div> </div> </div>";
        }
        else {
          if (type == 'cpi') {
            idx = idx + " install_type";
          }
          var wrapper = "<div class='available_campaign_list campaign_" + idx + "' onclick='campaign_popup($(this).html());' style='border-top: 1px solid #e0e2e3;'> <div class='available_campaign thumbnail'><img src='" + thumbnail + "'> </div> <div class='available_campaign title_type'> <div class='available_campaign title'>" + name + "</div> <div class='available_campaign type'><img src='/assets/types/type" + type + ".png'>" + "</div> </div> <div class='available_campaign coupon'> <img src='/assets/ic_b.png'><div class='coupon_count'>3장</div> </div> </div>";
        }
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
