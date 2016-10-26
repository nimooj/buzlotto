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
