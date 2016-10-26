function login() {
  var id = $("input.username").val();
  var pw = $("input.password").val();

  var user_data = {'username' : id, 'password': pw, 'next': '/'}

  var url = 'http://localhost:8000/api/login';
  var method = 'POST';
  var csrftoken = getCookie('csrftoken');

  $.ajax({
    headers: {
      "X-CSRFToken": csrftoken
    },
    method: method,
    url: url,
    data: user_data,
    xhrFields: {
      withCredentials: false
    }
  })
    .done(function(data){
    });
}

function logout() {
  var method = 'GET';
  var url = 'http://localhost:8000/api/logout';
  $.ajax({
    method: method,
    url: url
  })
    .done(function(data){
      Cookies.remove('username');
      Cookies.remove('ticket');
    });
}
