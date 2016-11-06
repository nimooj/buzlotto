function notify_user_g2g_app() {
  $(".popup_btn a").click(function(){
    alert("모바일에서 참여하세요!");
  });
}

function generate_deep_link(ad_id) {
  ad_id = ad_id.split("\"")[1];
  var token = Cookies.get('user_token');
  var b  = "buzlotto://AppChecker?ad_id=" + ad_id + "&user_token=" + token;
  return b;
}

function generate_cpi_deep_link(ad_id) {
  var b = generate_deep_link(ad_id);
  b = b + "&pacakage_name=com.buzzvil.adhours";

  // need to get package name from api

  return b;
}

function generate_install_deep_link(ad_id) {
  ad_id = ad_id.split("\"")[1];
  var token = Cookies.get('user_token');
  var b = "buzlotto://AppChecker?ad_id=" + ad_id + "&user_token=" + token + "&check_package_installed=com.buzzvil.adhours";

  // need to get package name from api

  return b;
}

function make_general_link(dw, ad_id) {
  if ( dw == "W" ) {
    notify_user_g2g_app();
  }
  else {
    $(".popup_btn .general_camp_enroll").attr('href', generate_deep_link(ad_id));
  }
}

function make_buzzville_link(dw, ad_id) {
  if ( dw == "W" ) {
    notify_user_g2g_app();
  }
  else {
    // REQUEST: api/ads/<ad_id> { user_unique_id: {user phone num} }
    // RESPONSE: landing_url
    // return landing_url
  }
}

function make_cpi_link(dw, ad_id) {
  if ( dw == "W" ) {
    notify_user_g2g_app();
  }
  else {
    $(".popup_btn .cpi_camp_enroll").attr('href', generate_cpi_deep_link(ad_id) );
    $(".popup_btn .cpi_install_check").attr('href', generate_install_deep_link(ad_id));
  }
}
 
function validate_install_check() {
  $(".install_check").attr('src', '/assets/btn/camp_installcheck.png');
}
 
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

function campaign_popup(e){
  var $this = e;
  var type = "";
  var ticket_count = e.split("coupon_count")[1].split(">")[1].split("<")[0];
  close_popup();

  $(".filter").css('display', 'block');
  if (Cookies.get('c_user')) { //show popup campaign
    var ad_id = e.split("data-id=")[1].split(">")[0];
    var is_desktop = get_device();
    
    if (e.indexOf("install_type") != -1) { 
      $(".popup.campaign_enroll").addClass("cpi_campaign");
      make_cpi_link(is_desktop, ad_id);
    }
    else {
      $(".popup.campaign_enroll").removeClass("cpi_campaign");
      make_general_link(is_desktop, ad_id);
    }
    //else if (e.indexOf("buzzville_type") != -1) {
      //make_buzzvilee_link(is_desktop, ad_id);
    //}

    $(".popup.campaign_enroll").css('display', 'block');
    $(".popup_txt span.highlight").html(ticket_count);

    cp_campaign_list = $this;

    $(".popup_campaign").html(cp_campaign_list);
    $(".popup_campaign").html($this);
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
  $(".filter").css('display', 'block');
  $(".popup").css('display', 'block');
}

function unavailable() {
  close_popup();
  $(".available_campaign_list.campaign_6").click(function(){
    $(".filter").css('display', 'block');
    $(".popup").css('display', 'block');
  });
}
