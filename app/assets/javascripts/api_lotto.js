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
 
function purchase_history(url) { //참여 기록 확인하기
  var method = 'GET';
  var next = "";

  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    method: method,
    url: url,
    asyn: false
  })
    .done(function(data) {
      next = data.next;
      var combi = [];

      for(i = 0; i < data.results.length; i++) {
        var w = data.results[i]["week_id"];
        var c = data.results[i]["combination"].split("_");

        if ( $(".history_box."+w).length == 0 ) { //리스트 박스 생성
          combi = weekly_winning_num(w);
          if ( combi.length == 0 ) { //이번주 당첨 번호가 없을 때
          $("row.mypage_lotto_history_list").append("<div class='history_box "+w+"'><div class='weekly_winning_number'><div class='heading'><span class='highlight green'>"+w+"회</span>차 버즈로또 당첨번호</div><div class='content'><div class='lotto_ball ball_1'><img src='/assets/q_lotto.png'></div><div class='lotto_ball ball_2'><img src='/assets/q_lotto.png'></div><div class='lotto_ball ball_3'><img src='/assets/q_lotto.png'></div><div class='lotto_ball ball_4'><img src='/assets/q_lotto.png'></div> <div class='lotto_ball ball_5'><img src='/assets/q_lotto.png'></div> <div class='lotto_ball ball_6'><img src='/assets/q_lotto.png'></div><img src='/assets/ic_plus.png' class='ic_plus'><img src='/assets/q_lotto.png' class='bonus_lotto_ball'><div class='bonus_title'>보너스</div></div></div><div class='my_lotto_number'></div></div>");
          }
          else { //당첨번호가 있을 때
            $("row.mypage_lotto_history_list").append("<div class='history_box "+w+"'><div class='weekly_winning_number'><div class='heading'><span class='highlight green'>"+w+"회</span>차 버즈로또 당첨번호</div><div class='content'><div class='lotto_ball lotto_active_"+combi[0]+"'><p class='num'>"+combi[0]+"</p></div><div class='lotto_ball lotto_active_"+combi[1]+"'><p class='num'>"+combi[1]+"</p></div><div class='lotto_ball lotto_active_"+combi[2]+"'><p class='num'>"+combi[2]+"</p></div><div class='lotto_ball lotto_active_"+combi[3]+"'><p class='num'>"+combi[3]+"</p></div><div class='lotto_ball lotto_active_"+combi[4]+"'><p class='num'>"+combi[4]+"</p></div> <div class='lotto_ball lotto_active_"+combi[5]+"'><p class='num'>"+combi[5]+"</p></div><img src='/assets/ic_plus.png' class='ic_plus'><div class='bonus_lotto_ball lotto_ball lotto_active_"+combi[6]+"'><p class='num'>"+combi[6]+"</p></div><div class='bonus_title'>보너스</div></div></div><div class='my_lotto_number'></div></div>");
          }

          var str = "";

          // 당첨번호와 일치할 때
          for ( j = 0; j < 6; j++ ) {
            if ( combi.indexOf(c[j]) != -1) {
              str = str + "<div class='lotto_number number_"+c[j]+"'>"+c[j]+"</div>";
            }
            else {
              str = str + "<div class='lotto_number number'>"+c[j]+"</div>";
            }
          }
          $(".history_box." + w + " .my_lotto_number").append("<div class='heading'><span class='highlight green'>"+w+"회</span>차 나의 등록 번호</div><div class='content'>"+str+"</div>");
        } 
        else { // 이미 생성된 history_box 
          var str = "";

          // 당첨번호와 일치할 때
          for ( j = 0; j < 6; j++ ) {
            if ( combi.indexOf(c[j]) != -1) {
              str = str + "<div class='lotto_number number_"+c[j]+"'>"+c[j]+"</div>";
            }
            else {
              str = str + "<div class='lotto_number number'>"+c[j]+"</div>";
            }
          }

          $(".history_box."+w + " .my_lotto_number").append("<div class='content'>"+str+"</div>");
        }
      }
    });
  return next;
}

function point_history(url) { //로또권 내역
  var method = 'GET';
  var next;

  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a',
    },
    url: url,
    method: method,
    async: false
  })
    .done(function(data){
      next = data.next;
      for( i = 0; i < data.results.length; i++ ) {
        var ctime = data.results[i]["updated_at"];
        if ( ctime != null ) {
          ctime = ctime.split("T")[0];
        }
        var description = data.results[i]["description"];
        var count = data.results[i]["user_get_lotto_count"];
        var type = "";
        if ( data.results[i]["extra"] != "{}") {
          type = data.results[i]["extra"].split(':')[1].split('}')[0].split("\"")[1];
          $("row.history_list").append("<div class='mypage_history_item'><div class='ctime'>"+ctime+"</div><div class='type'><img src='/assets/types/type"+type+".png'></div><div class='name name_type'>"+description+"</div><div class='comment'>적립</div><div class='coupon'><img src='/assets/ic_b.png'><div class='coupon_count'>"+count+"장</div></div></div>")
        }
        else { 
          type = "";
          $("row.history_list").append("<div class='mypage_history_item'><div class='ctime'>"+ctime+"</div><div class='name'>"+description+"</div><div class='comment'>적립</div><div class='coupon'><img src='/assets/ic_b.png'><div class='coupon_count'>"+count+"장</div></div></div>")
        }
      }
    });
  return next;
}

function weekly_winning_num(week_id) {
  var url = "http://localhost:8000/api/lottos/past_week?week_id="+week_id;
  var method = 'GET';
  var combi = [];
  $.ajax({
    url: url,
    method: method,
    async: false
  })
    .done(function(data){
      combi = data.winning_combination.split("_");
      combi.push(data.bonus_number);
    })
    .error(function(){
      return null;
    });
  return combi;
}

function lastweek_winning_num() {
  if($(".winning_number_list").children().length == 0) {
    var j = "http://localhost:8000/api/lottos/past_week";
    var w;
    var n = [];
    var b;

    $.getJSON(j, function(data){
      w = data["week_id"];
      n = data["winning_combination"].split("_");
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
        t = t + "<div class='winning " + c + "'><p class='num'>" + n[i] + "</p></div>";
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

      t = t + "<div class='winning " + c + "'><p class='num'>" + b + "</p></div>";
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
