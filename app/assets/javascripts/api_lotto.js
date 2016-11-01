function lotto_ticket() {
  var url = 'http://localhost:8000/api/lottos/get_user_lotto_profile';
  var method = 'GET';
  var result;

  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    },
    method: method,
    url: url,
    async: false
  })
    .done(function(data){
      result = data["user_lotto_profile"]["balance"];
    });
  return result;
}

function purchase_lotto(b_data) {
  var arr = "";
  for (i = 0; i < 6; i++) {
    arr = arr + b_data[i];
    if (i != 5) {
      arr = arr + "_";
    }
  }
  var lotto_data = {'combination': arr };
  //var url = 'http://localhost:8000/api/lottos/purchase';
  var url = 'http://localhost:8000/api/lottos/purchase';
  var method = 'POST';

  $.ajax({
    method: method,
    url: url,
    data: lotto_data,
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    }
  })
    .fail(function(data){
      var json_data = jQuery.parseJSON(data.responseText);
      var status = json_data["is_successful"];
      if (!status) {
        var code = json_data["code"];
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
        else if(code == 2018) {
          alert("핸드폰 인증이 필요합니다. 인증 후 다시 시도하세요.");
        }
      }
    })
    .done(function(data){
      var ticket = Cookies.get('ticket');
      Cookies.set('ticket', ticket - 1);
    });
}
 
function purchase_history() { //참여 기록 확인하기
  var url = "http://localhost:8000/api/lottos/?page=1"+"&page_size=20";
  var method = 'GET';
  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    method: method,
    url: url
  })
    .done(function(data) {
      var j = {};
      var t = {};
      var combi = [];
      console.log(data.results);
      for(i = data.results.length - 1; i >= 0; i--) {
        var w = data.results[i]["week_id"];
        var c = data.results[i]["combination"];

        if ( w == j[w] )
        j[w] = [];

      }
      console.log(j) ;
    });
}

function lotto_load_history(page) {
  var url = "http://localhost:8000/api/lottos/?page=" + page.toString() + "&page_size=20";
  var method = 'GET';
  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    method: method,
    url: url
  })
    .done(function(data) {
      var arr = [];
      console.log(data.results);
    });
}

function point_history() {
  var url = 'http://localhost:8000/api/lottos/lotto_reserve_history/?page_size=3';
  var method = 'GET';
  var ctime = "";
  var type = "";
  var description = "";
  var count = "";
  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    url: url,
    method: method
  })
    .done(function(data){
      for( i = 0; i < data.results.length; i++ ) {
        ctime = data.results[i]["updated_at"].split(/T/)[0];
        //type = data.results[i]["reserve_type"];
        description = data.results[i]["description"];
        count = data.results[i]["user_get_lotto_count"];
        $("row.history_list").append("<div class='mypage_history_item'><div class='ctime'>"+ctime+"</div><div class='type'>"+type+"</div><div class='name'>"+description+"</div><div class='comment'>적립</div><div class='coupon'><img src='/assets/ic_b.png'><div class='coupon_count'>"+count+"장</div></div></div>")
      }
    });
}

function point_load_history(page) {
  var url = "http://localhost:8000/api/lottos/lotto_reserve_history?page="+page+"&page_size=3";
  var method = 'GET';
  var ctime = "";
  var type = "";
  var description = "";
  var count = "";
  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    url: url,
    method: method
  })
    .done(function(data){

      for( i = 0; i < data.results.length; i++ ) {
        ctime = data.results[i]["updated_at"].split(/T/)[0];
        //type = data.results[i]["reserve_type"];
        description = data.results[i]["description"];
        count = data.results[i]["user_get_lotto_count"];
        $("row.history_list").append("<div class='mypage_history_item'><div class='ctime'>"+ctime+"</div><div class='type'>"+type+"</div><div class='name'>"+description+"</div><div class='comment'>적립</div><div class='coupon'><img src='/assets/ic_b.png'><div class='coupon_count'>"+count+"장</div></div></div>")
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

function did_i_buy_lotto(week_id) {
  var url = "http://localhost:8000/api/lottos/?week_id=" + week_id;
  var method='GET';
  var result = false;

  $.ajax({
    url: url,
    method: method,
    async: false,
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    }
  })
    .done(function(data){
      if(data.length > 0) {
        result = true; 
      }
    });
  return result;
}

function check_if_won() {
  var url = 'http://localhost:8000/api/lottos/check_if_won';
  var method = 'GET';

  $.ajax({
    method: method,
    url: url,
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    }
  })
    .done(function(data){
      var status = data["won"];
      var is_fail = did_i_buy_lotto(data["week_id"].toString()); //해당 주에 등록한 로또가 있는지

      if(status) {
        var l = data["winning_purchases"].length;
        var count = [0, 0, 0, 0, 0];
        var prize = ["1억원 ", "1천만원 ", "1십만원 ", "5천원 ", "로또권 3장 "];
        var value = [100000000, 10000000, 100000, 5000, 0];

      //if win => render _win.html
        for(i = 0; i < l; i++) {
          var p = data["winning_purchases"][i]["place"];
          if ( p == 1 ) {
            count[0] = count[0] + 1;
          }
          else if ( p == 2 ) {
            count[1] = count[1] + 1;
          }
          else if ( p == 3 ) {
            count[2] = count[2] + 1;
          }
          else if ( p == 4 ) {
            count[3] = count[3] + 1;
          }
          else if ( p == 5 ) {
            count[4] = count[4] + 1;
          }
        }

        var w = "";
        var total = 0;
        var tickets = 0;

        for(i = 0; i < 5; i++) {
          if ( count[i] != 0 ) {
            w = w + "<span class='highlight green'>[" + (i + 1).toString() + "등] " + prize[i] + count[i] + "번</span><br>";

            if (i == 4) {
              tickets = 3 * count[i];
            }
            else {
              total = total + value[i]*count[i];
            }
          }
        }

        var p = "<span class='highlight yellow'>총 " + total.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',') + "원</span><br>";

        if ( tickets != 0 ) {
          p = p + "<span class='highlight yellow'>로또권 " + tickets + "장</span>";
        }

        $("row.win_result").html("<img src='/assets/ic_win.png' class='win_result_img'><br>축하합니다!<br>" + w + p);

      }
      else if(!is_fail){
      // else render _none.html
        $("row.win_result").html("<img src='/assets/ic_nonregistered.png' class='win_result_img'><br>등록한 로또 번호가 없습니다.");
      }
      else {
      // else if fail => render _fail.html;
        $("row.win_result").html("<img src='/assets/ic_fail.png' class='win_result_img'><br>아쉽네요!<br>다음번엔 꼭 당첨될거에요!");
      }
    });
}
