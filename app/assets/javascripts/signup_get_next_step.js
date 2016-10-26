function validate_next1(valid_name, checked, pw_insert, pc_insert) {
  if(valid_name && checked && pw_insert ==1 && pc_insert == 1) {
    $(".step1 .next_btn")
    .attr('disabled', false)
    .css({
      'background-color' : '#40b987',
      'color': 'white'
    });
  }
  else {
    $(".step1 .next_btn")
    .attr('disabled', true)
    .css({
      'background-color' : '#e6e6e6',
      'color' : '#c3c3c3'
    });
  }
}

function validate_next2(gender_select, age_select) {
  if(gender_select == 1 && age_select == 1) {
    $(".step2 .next_btn")
    .attr('disabled', false)
    .css({
      'background-color' : '#40b987',
      'color': 'white'
    });
  }
  else {
    $(".step2 .next_btn")
    .attr('disabled', true)
    .css({
      'background-color' : '#e6e6e6',
      'color' : '#c3c3c3'
    });
  }
}

function validate_next3(phonenum_insert, send_sms, verify_insert) {
  if(phonenum_insert == 1) {
    $(".step3 .step_phonenumber_btn button")
    .attr('disabled', false)
    .css({
      'background-color': '#40b986',
      'color': 'white'
    });
    if(send_sms == 1 && verify_insert == 1) {
      $(".step3 .step_confirm_btn button")
      .attr('disabled', false)
      .css({
        'background-color': '#40b986',
        'color': 'white',
        'opacity': '1'
      });
    }
  }
  else {
    $(".step3 .step_phonenumber_btn button")
    .attr('disabled', true)
    .css({
      'background-color': '#e6e6e6',
      'color': '#c3c3c3'
    });
    $(".step3 .step_confirm_btn button")
    .attr('disabled', true)
    .css({
      'background-color': '#e6e6e6',
      'color': '#c3c3c3'
    });
  }
}

function step1_nxt() {
  $(".step1").css("display", "none");
  $(".step2").css("display", "block");
}

function step2_nxt() {
  $(".step2").css("display", "none");
  $(".step3").css("display", "block");
}

function validate_find_pw(phonenum_insert, send_sms, verify_insert) {
  if(phonenum_insert == 1) {
    $(".find_pw_phonenumber_btn button")
    .attr('disabled', false)
    .css({
      'background-color': '#40b986',
      'color': 'white'
    });
    if(send_sms == 1 && verify_insert == 1) {
      $(".find_pw_confirm_btn button")
      .attr('disabled', false)
      .css({
        'background-color': '#40b986',
        'color': 'white',
        'opacity': '1'
      });
    }
  }
  else {
    $(".find_pw_phonenumber_btn button")
    .attr('disabled', true)
    .css({
      'background-color': '#e6e6e6',
      'color': '#c3c3c3'
    });
    $(".find_pw_confirm_btn button")
    .attr('disabled', true)
    .css({
      'background-color': '#e6e6e6',
      'color': '#c3c3c3'
    });
  }
}
