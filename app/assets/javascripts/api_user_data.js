function get_user_state() {
  var user;
  $.ajax({
    url: 'http://localhost:8000/api/accounts/',
    method: 'GET',
    async: false,
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    }
  })
    .done(function(data){
      user = data;
    });
  return user;
}

function get_user_token() {
  var url = 'http://localhost:8000/api/get_user_auth_token';
  var method = 'GET';
  var token = "";

  $.ajax({
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
    },
    url: url,
    method: method,
    async: false
  })
    .done(function(data){
      if ( data.is_successful ) {
        token = data.user_auth_token;
      }
      else {
        token = false;
      }
    });
  return token;
}

function update_user_bank_account() {
  var bank = $(".account_input .select-box .select").val();
  var num = $(".account_input .account_number").val();

  var url = 'http://localhost:8000/api/accounts/bank_account_register';
  var method = 'POST';
  var bank_data = {'bank_name': bank, 'bank_account_number': num};

  $.ajax({
    method: method,
    url: url,
    data: bank_data,
    statusCode: {
      200: function() {
        alert("계좌번호가 성공적으로 등록되었습니다.");
      },
      400: function() {
        alert("계좌번호 등록에 실패했습니다. 다시 시도하세요.");
      }
    },
    headers: {
      'Authorization': 'Token 5600ed312824c017a167605c3258f9158e77293a'
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
