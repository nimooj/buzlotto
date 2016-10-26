function validate_username() {
  //중복체크 버튼 활성화
  $("input.id_insert").keyup(function(){
    if($(this).val().length > 5) 
    {
      $("button.id_confirm").attr('disabled', false);
      $("button.id_confirm img")
      .attr('src', '/assets/btn/name_check_valid.png');
    }
    else 
    {
      $("button.id_confirm").attr('disabled', true);
      $("button.id_confirm img")
      .attr('src', '/assets/btn/name_check_invalid.png');
    }
  });
}

function validate_password() {
  var pw_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  var pw = $("input.pw_insert").val();
  var pw_confirm = $("input.pw_confirm_insert").val();

  if(pw.match(pw_regex) && pw == pw_confirm && pw.length == pw_confirm.length) {
    return 1;
  }
  else if (pw.match(pw_regex) == null)
    {
      return 2;
    }
  else {
    return false;
  }
}

function validate_phonenum() {
  var phone_regex = /^(0)?1[0-9]{9,10}$/;
  var p = $("input.phonenumber").val();

  if(p.match(phone_regex)) {
    return 1;
  }
  else {
    return 0;
  }
}

function validate_vnum() {
  var vnum_regex = /^[0-9]{6}$/;
  var v = $("input.cnum").val();

  if(v.match(vnum_regex)) {
    return 1;
  }
  else {
    return 0;
  }
}

function determine_age_range() {
  var age_range = "<option disabled selected value>출생연도</option>";
  var this_year = (new Date).getFullYear();
  var year = this_year;

  for(i = 0; i < 90; i++) {
    year = this_year - i;
    age_range = age_range + "<option value='" + year.toString()  + "'>" + year.toString() + "</option>";
  }
  $(".age_select").html(age_range);
}
