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

  var url = 'https://api.buzlotto.com/api/accounts/check_id_duplicate';
  var method = 'GET';

  var xhr = createCORSRequest(method, url);

  xhr.send(JSON.stringify(user_data));
  return true;
  //xhr.onload = function() {
    //console.log("success");
    //return 1;
  //}

  //xhr.onerror = function() {
    //console.log("fail");
    //return 0;
  //}
}


function validate_phone() {
  var num = $("input.cnum").val();
  var sms_data = {'auth_number': num};

  var url = 'https://api.buzlotto.com/api/sms/auth';
  var method = 'POST';
  var xhr = createCORSRequest(method, url);

  xhr.send(JSON.stringify(sms_data));
  xhr.onload = function() {
    console.log("success");
    return 1;
  }

  xhr.onerror = function() {
    console.log("fail");
    return 0;
  }
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

    var url = 'https://api.buzlotto.com/api/accounts/signup';
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

function login() {
  var id = $("input.username").val();
  var pw = $("input.password").val();

  var user_data = {'username' : id, 'password': pw, 'next': '/'}

  var url = 'https://api.buzlotto.com/api/login';
  var method = 'POST';

  var xhr = createCORSRequest(method, url);

  xhr.send(JSON.stringify(user_data));
}


function send_sms() {
  var num = $("input.phonenumber").val();
  var sms_data = {'phone_number': num};

  var url = 'https://api.buzlotto.com/api/sms/send';
  var method = 'POST';
  var xhr = createCORSRequest(method, url);
  xhr.send(JSON.stringify(sms_data));


  xhr.onload = function() {
    console.log("success");
  };

  xhr.onerror = function() {
    console.log("error");
  };

  xhr.send(JSON.stringify(sms_data));

}

function lastweek_winning_num() {
  if($(".winning_number_list").children().length == 0) {
    var j = "https://api.buzlotto.com/api/lottos/past_week";
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
  var url = 'https://api.buzlotto.com/api/lottos/purchase';
  var method = 'POST';
  var xhr = createCORSRequest(method, url);
  xhr.withCredentials = true;

  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(':'));

  xhr.send(JSON.stringify(lotto_data));

  xhr.onload = function() {
    alert("성공적으로 등록되었습니다.");
  }

  xhr.onerror = function() {
    alert("로또 등록에 실패하였습니다. 다시 시도하세요.");
  }
}

function campaign_list() {
  //if($(".available_campaign_list").length == 0) {
    //var url ="https://api.buzlotto.com/api/ads";
    var url ="http://api.localhost:8000/api/ads";
    console.log("campaign list");

    $.getJSON(url, function(data){
      console.log(data);
      $(".campaign_heading span.highlight.green").html(data.length);
      console.log(data);
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
  //}
}
