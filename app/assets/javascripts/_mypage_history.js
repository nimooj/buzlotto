function load_history() {
  var btn_click_count = 0;
  var num_of_child = $(".history_list").children().length;

  $(".history_list").children().slice(7, num_of_child).css("display", "none");

  $("button.load_more").click(function(){
    btn_click_count = btn_click_count + 1;
    start = 7*btn_click_count;
    end = 2*start;
    $(".history_list").children().slice(start, end).css("display", "block");
  });
}

function lotto_history() {
  var btn_click_count = 0;
  var num_of_child = $(".mypage_lotto_history_list").children().length;

  $(".mypage_lotto_history_list").children().slice(7, num_of_child).css("display", "none");

  $("button.load_more").click(function(){
    btn_click_count = btn_click_count + 1;
    start = 7*btn_click_count;
    end = 2*start;
    $(".mypage_lotto_history_list").children().slice(start, end).css("display", "block");
  });
}
