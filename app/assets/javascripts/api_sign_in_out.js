function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function get_ip() {
  return $.ajax({
    url: "http://jsonip.com?callback?",
    method: 'GET',
    async: false
  }).responseText.toString().split("\"");
}

function id_check() {
  var id = $("input.id_insert").val();
  var user_data = {'username': id};
  var result = 0;

  //var url = 'http://localhost:8000/api/accounts/check_id_duplicate';
  var url = 'http://localhost:8000/api/accounts/check_id_duplicate';
  var method = 'GET';

  $.ajax({
    method: method,
    url: url, 
    data: user_data,
    async: false,
    statusCode: {
      200: function() {
        alert("사용가능한 아이디입니다.");
        result = 1;
      },
      400: function() {
        alert("중복된 아이디입니다. 다시 시도하세요.");
        result = 0;
      }
    }
  });

  return result;
}

function signup_account() {
  var ip = get_ip()[3].toString();
  var uuid = guid();
  var username = $("input.id_insert").val();
  var pw = $("input.pw_insert").val();
  var age = parseInt($("select.age_select").val());
  var phonenumber = $("input.phonenumber").val();
  var os = get_device();
  var user_agent = navigator.userAgent;
  var gender = $("select.gender_select").val();

  var signup_data = JSON.stringify({ 'ip': ip, 'user_unique_id': uuid, 'gender': gender, 'os': os, 'user_agent': user_agent, 'app_version': 1000, 'age': age, 'django_user': { 'username': username, 'password': pw  }});
  console.log(signup_data);

  var url = 'http://localhost:8000/api/accounts/signup';
  var method = 'POST';

  $.ajax({
    method: method,
    url: url,
    headers: {
      'content-type': 'application/json'
    },
    data: signup_data
  })
    .success(function(){
      window.location.replace("/");
    });


}

function delete_user() {
  var url = 'http://localhost:8000/api/accounts/delete_account';
  var method = 'POST';
  $.ajax({
    method: method,
    url: url
  });
}
