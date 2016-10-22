function validate_bank_btn(bank_select, account_num){
  if(bank_select == 1 && account_num == 1) {
    $(".account_btn button")
      .css({
      'background-color': '#40b987',
      'color': 'white'
    })
    .attr('disabled', false);
  }
  else {
    $(".account_btn button")
      .css({
      'background-color': '#e6e6e6',
      'color': '#c3c3c3'
    })
    .attr('disabled', true);
  }
}
