function close_popup() {
  $(".close_btn").click(function(){
    $(".filter").css('display', 'none');
    $(".popup").css('display', 'none');
  });
}

function campaign_popup_highlight(count) {
  var l = $(".popup_txt").text();

  l = l.indexOf("로또권 " + count + "장");
}

function campaign_popup(e, type){
  var $this = e;
  close_popup();

  $(".filter").css('display', 'block');
  if (Cookies.get('c_user')) { //show popup campaign
    if (type == 4) {
      $(".popup.campaign_enroll").addClass("cpi_campaign");
    }
    else {
      $(".popup.campaign_enroll").removeClass("cpi_campaign");
    }
    $(".popup.campaign_enroll").css('display', 'block');
    cp_campaign_list = $this;
    $(".popup_campaign").html(cp_campaign_list);
    $(".popup_campaign").html($this);
    campaign_popup_highlight($(".popup_campaign .coupon_count").text());
  }
  else { //show popup joinus
    $(".popup.joinus").css('display', 'block');
    cp_campaign_list = $this;
    $(".popup_campaign").html(cp_campaign_list);
    $(".popup_campaign").html($this);
  }
}

function account_popup() {
  close_popup();
  $(".popup_txt span.highlight.green").click(function(){
    var b_name = $(this).html();
    b_name = b_name.replace(/\s+/g, "");
    $("input[type='text'].select").val(b_name);
    $(".filter").css('display', 'none');
    $(".popup").css('display', 'none');
  });
  $(".filter").css("display", "block");
  $(".popup.account_popup").css("display", "block");
}

function lotto_popup() {
  close_popup();
  $(".lotto_footer_btn .lotto_enroll_btn").click(function(){
    $(".filter").css('display', 'block');
    $(".popup").css('display', 'block');
  });
}

function unavailable() {
  close_popup();
  $(".available_campaign_list.campaign_6").click(function(){
    $(".filter").css('display', 'block');
    $(".popup").css('display', 'block');
  });
}
