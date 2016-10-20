var balls = [];

function lotto_select(l){
  console.log("lotto select");
  console.log(balls);

  state = l.split(' ')[1].split('_')[1];
  lotto_ball_num = l.split(' ')[1].split('_')[2];

  if (state == "inactive" && balls.length < 6)
  {
    balls.push(parseInt(lotto_ball_num));
    balls.sort(function(x, y){return parseInt(x) - parseInt(y)});

    $(".lotto_inactive_" + lotto_ball_num)
    .removeClass("lotto_inactive_" + lotto_ball_num)
    .addClass("lotto_active_" + lotto_ball_num);
  }
  else if (state == "active")
  {
    var idx = -1;
    for(i = 0; i < balls.length; i++) {
      if (balls[i] == lotto_ball_num) {
        idx = i;
        break;
      }
    }

    balls.splice(idx, 1);
    balls.sort(function(x, y){return parseInt(x) - parseInt(y)});

    $(".lotto_active_" + lotto_ball_num)
    .removeClass("lotto_active_" + lotto_ball_num)
    .addClass("lotto_inactive_" + lotto_ball_num);

    $(".lotto_select .lotto_active_" + lotto_ball_num) 
    .empty()
    .removeClass("lotto_active_" + lotto_ball_num);
  }

  selected_balls(balls);
}

function set_field(balls) {
  var idx = 0;
  for(i = 1; i < 46; i++) {
    if (i == balls[idx])
    {
      $(".lotto_field .lotto_inactive_" + i) 
      .removeClass("lotto_inactive_" + i)
      .addClass("lotto_active_" + i);
      idx = idx + 1;
    }
    else {
      $(".lotto_field .lotto_active_" + i) 
      .removeClass("lotto_active_" + i)
      .addClass("lotto_inactive_" + i);
    }
  }

  selected_balls(balls);
}

function lotto_auto_select() {
  balls = [];
  while(balls.length < 6) {
    var n = Math.floor(Math.random() * 45) + 1;
    if(balls.indexOf(n) == -1) {
      balls.push(n);
    }
  }
  balls.sort(function(x, y){return parseInt(x) - parseInt(y)});

  set_field(balls);
}

function selected_balls(balls) {
  for(i = 0; i < 6; i++) {
    $(".lotto_select .ball_" + (i + 1))
    .attr("class", "lotto_selected ball_" + (i + 1))
    .html("<p class='num'>?</p>");
    //.html("<img src='/assets/q_lotto.png'>");
  }

  for(i = 0; i < balls.length; i++) {
    var cpy = $(".lotto_field .lotto_ball.lotto_active_" + balls[i]).html();

    $(".lotto_select .ball_" + (i + 1))
    .html(cpy)
    .addClass("lotto_active_" + balls[i]);
  }

  if(balls.length == 6) {
      $(".lotto_footer_btn .lotto_enroll_btn")
      .css({
        "color" : "#ffffff",
        "border" : "2px solid #40b987",
        "background-color" : "#40b987"
      })
      .prop('disabled', false)
    }
}
