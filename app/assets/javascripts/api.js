var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
  } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function id_check() {
  var id = $("input.id_insert").val();
  var user_data = {'username': id};
  var result = 0;

  //var url = 'http://localhost:8000/api/accounts/check_id_duplicate';
  var url = 'http://localhost:8000/api/accounts/check_id_duplicate';
  var method = 'GET';

  $.ajax({
    method: method,
    url: url, 
    data: user_data,
    async: false,
    statusCode: {
      200: function() {
        alert("사용가능한 아이디입니다.");
        result = 1;
      },
      400: function() {
        alert("중복된 아이디입니다. 다시 시도하세요.");
        result = 0;
      }
    }
  });

  return result;
}

function validate_vnum() {
  var num = $("input.cnum").val();
  var sms_data = {'auth_number': num};
  var result = 0;

  var url = 'http://localhost:8000/api/sms/auth';
  var method = 'POST';
  $.ajax({
    method: method,
    url: url,
    data: sms_data,
    async: false
  })
  .done(function(data){
    var status = data["is_successful"];
    if(!status) {
      var message = data["message"];
      if (message == "FAILED_TO_MATCH") {
        alert("잘못된 인증번호입니다.");
      }
      else if (message = "RECORD_NOT_FOUND") {
        alert("인증번호 전송 기록이 존재하지 않습니다. 다시 시도하세요.")
      }
      else if (message == "AUTH_TIMED_OUT") {
        alert("인증 가능 시간을 초과하였습니다. 다시 시도하세요.");
      }
    }
  });

  return result;
}

function signup_account() {
  $.getJSON("http://jsonip.com?callback=?", function (data) {
    var uuid = guid();
    var username = $("input.id_insert").val();
    var pw = $("input.pw_insert").val();
    var age = parseInt($("select.age_select").val());
    var phonenumber = $("input.phonenumber").val();
    var os = get_device();
    var user_agent = navigator.userAgent;
    var gender = $("select.gender_select").val();

    var signup_data = { 
      'ip': data.ip, 
      'user_unique_id': uuid, 
      'gender': gender, 
      'os': os, 
      'user_agent': user_agent, 
      'app_version': 1000, 
      'age': age, 
      'django_user': { 
        'username': username, 
        'password': pw  
      }
    };

    var url = 'http://localhost:8000/api/accounts/signup';
    var method = 'POST';
    var xhr = createCORSRequest(method, url);

    xhr.send(JSON.stringify(signup_data));

    xhr.onload = function() {
      window.location.replace("/");
    }

    xhr.onerror = function() {
      window.location.replace("sign/step");
    }

  });
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function login() {
  var id = $("input.username").val();
  var pw = $("input.password").val();

  var user_data = {'username' : id, 'password': pw, 'next': '/'}

  var url = 'http://localhost:8000/api/login';
  var method = 'POST';
  var csrftoken = getCookie('csrftoken');

  $.ajax({
    headers: {
      "X-CSRFToken": csrftoken
    },
    method: method,
    url: url,
    data: user_data,
    xhrFields: {
      withCredentials: false
    }
  })
    .done(function(data){
      console.log(data);
    });
}


function send_sms() {
  var num = $("input.phonenumber").val();
  var sms_data = {'phone_number': num};

  var url = 'http://localhost:8000/api/sms/send';
  var method = 'POST';

  $.ajax({
    method: method,
    url: url,
    data: sms_data
  })
    .done(function(data) {
      var status = data["is_successful"];
      if(!status) {
        var message = data["message"];
        if (message == "WRONG_FORMAT") {
          alert("잘못된 인증번호입니다.");
        }
        else if (message == "DAILY_LIMIT_EXCEEDED") {
          alert("하루 전송 가능 횟수를 초과했습니다.");
        }
        else if (message == "RATE_LIMITED") {
          alert("잠시 후 다시 시도하세요.");
        }
        else {
          alert("인증번호 전송에 실패했습니다. 다시 시도하세요.");
        }
      }
    });
}

function lastweek_winning_num() {
  if($(".winning_number_list").children().length == 0) {
    //var j = "http://localhost:8000/api/lottos/past_week";
    var j = "http://localhost:8000/api/lottos/past_week";
    var w;
    var n = [];
    var b;

    $.getJSON(j, function(data){
      w = data["week_id"];
      n = data["winning_combination"].split('_');
      b = data["bonus_number"];

      $(".winning_heading").html("전주 (" + w + "회차) 로또 당첨번호");

      var t = "";
      for(i = 0; i < n.length; i++) {
        var c;
        if (n[i] < 10) {
          c = 'yellow';;
        }
        else if(n[i] < 20) {
          c = 'blue';
        }
        else if (n[i] < 30) {
          c = 'red';
        }
        else if (n[i] < 40) {
          c = 'green';
        }
        else {
          c = 'purple';
        }
        t = t + "<div class='winning " + c + "'>" + n[i] + "</div>";
      }
      t = t + "<img src='/assets/ic_plus.png' class='ic_plus'>";

      var c;
      if (b < 10) {
        c = 'yellow';;
      }
      else if(b < 20) {
        c = 'blue';
      }
      else if (b < 30) {
        c = 'red';
      }
      else if (b < 40) {
        c = 'green';
      }
      else {
        c = 'purple';
      }

      t = t + "<div class='winning " + c + "'>" + b + "</div>";
      $(".winning_number_list").html(t);
    });
  }
}

function purchase_lotto() {
  var arr = "";
  for (i = 1; i < 7; i++) {
    var num = $(".lotto_selected.ball_" + i + " .num")[0].innerText;
    if (i != 6) {
      num = num + "_";
    }
    arr = arr + num;
  }
  var lotto_data = {'combination': arr};
  //var url = 'http://localhost:8000/api/lottos/purchase';
  var url = 'http://localhost:8000/api/lottos/purchase';
  var method = 'POST';

  $.ajax({
    method: method,
    url: url,
    data: lotto_data
  })
    .done(function(data){
      var status = data["is_successful"];
      if (!status) {
        var code = data["code"];
        if (code == 2009) {
          alert("로또번호가 선택되지 않았습니다. 다시 시도하세요.");
        }
        else if (code == 2010) {
          alert("로또권이 부족하여 구매에 실패했습니다! 로또권을 적립하세요.");
        }
        else if(code == 2011) {
          alert("문제가 발생했습니다. 다시 시도하세요.");
        }
        else if(code == 2013) {
          alert("잘못된 로또번호입니다. 다시 시도하세요.");
        }
        else if(code == 2008) {
          alert("핸드폰 인증이 필요합니다. 인증 후 다시 시도하세요.");
        }
      }
    });
  //var xhr = createCORSRequest(method, url);
  //xhr.withCredentials = true;

  //xhr.setRequestHeader('Authorization', 'Basic ' + btoa(':'));

  //xhr.send(JSON.stringify(lotto_data));

  //xhr.onload = function() {
    //alert("성공적으로 등록되었습니다.");
  //}

  //xhr.onerror = function() {
    //alert("로또 등록에 실패하였습니다. 다시 시도하세요.");
  //}
}

function campaign_list() {
  if($("row.campaign .available_campaign_list").length == 0) {
    //var url ="http://localhost:8000/api/ads";
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
      for(i = 0; i < data.length; i++) {
        var name = data[i].name;
        var thumbnail = data[i].icon_url;
        var type = data[i].revenue_type;
        var idx = i.toString();

        if (i == data.length - 1) { //첫번째 캠페인 border 설정
          if (type == 4) {
            idx = idx + " install_type";
          }
          var wrapper = "<div class='available_campaign_list campaign_" + idx + "' onclick='campaign_popup($(this).html(), "+type+");' style='border-top: 1px solid #e0e2e3;'> <div class='available_campaign thumbnail'><img src='" + thumbnail + "'> </div> <div class='available_campaign title_type'> <div class='available_campaign title'>" + name + "</div> <div class='available_campaign type'><img src='/assets/types/type" + type + ".png'>" + "</div> </div> <div class='available_campaign coupon'> <img src='/assets/ic_b.png'><div class='coupon_count'>3장</div> </div> </div>";
        }
        else {
          if (type == 4) {
            idx = idx + " install_type";
          }
          var wrapper = "<div class='available_campaign_list campaign_" + idx + "' onclick='campaign_popup($(this).html(),"+type+");'> <div class='available_campaign thumbnail'><img src='" + thumbnail + "'> </div> <div class='available_campaign title_type'> <div class='available_campaign title'>" + name + "</div> <div class='available_campaign type'><img src='/assets/types/type" + type + ".png'>" + "</div> </div> <div class='available_campaign coupon'> <img src='/assets/ic_b.png'><div class='coupon_count'>3장</div> </div> </div>";
        }
      $(".campaign_heading").after(wrapper);
      }
      });
  }
}

function lotto_purchase_history() {
  //var url = 'http://localhost:8000/api/lottos';
  var url = 'http://localhost:8000/api/lottos';
  var method = 'GET';

  $.ajax({
    method: method,
    url: url,
    contentType: "application/json;charset=utf-8",
    dataType: "json"
  })
    .done(function(data){
      console.log(data);
    });
}

function check_if_win() {

}

function update_user_bank_account() {
  var bank = $(".account_input .select-box .select").html();
  var num = $(".account_input .account_number").val();


  var url = 'http://localhost:8000/api/accounts/update';
  var method = 'POST';
  var bank_data = {'bank_account_number': num};

  console.log(bank);

  $.ajax({
    method: method,
    url: url,
    xhrFields: {
      withCredentials: true
    },
    data: bank_data,
    statusCode: {
      200: function() {
        alert("계좌번호가 성공적으로 등록되었습니다.");
      },
      400: function() {
        alert("계좌번호 등록에 실패했습니다. 다시 시도하세요.");
      }
    }
  });
}

function user_pw_update() {
  var pw = $(".pw_new_insert").val();
  var url = 'http://localhost:8000/api/accounts/update';
  var method = 'POST';

  var user_data = {'django_user': {'password': pw}};

  $.ajax({
    method: method,
    url: url,
    data: user_data
  })
    .done(function(data){
      var code = data["code"];
      if(code == 2000) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
      }
      else {
        alert("비밀번호 변경에 실패했습니다. 다시 시도하세요.");
      }
    });
}

function get_share_rand_image() {
  var url = 'http://localhost:8000/api/get_lotto_charm_image_url';
  var method = 'GET';
  $.ajax({
    method: method,
    url: url
  })
    .done(function(data){
      console.log(data);
      $(".share_img").html("<img src='" + data["image_url"] +"'>");
    });
}

function register_bank_account() {

}

function delete_user() {
  var url = 'http://localhost:8000/api/accounts/delete_account';
  var method = 'POST';
  $.ajax({
    method: method,
    url: url
  });
}

function check_if_won() {
  var url = 'http://localhost:8000/api/lottos/check_if_won';
  var method = 'GET';

  $.ajax({
    method: method,
    url: url
  })
    .done(function(data){
    //if win => render _win.html
    // else if loost => render _loose.html;
    // else render _none.html
    });
}
