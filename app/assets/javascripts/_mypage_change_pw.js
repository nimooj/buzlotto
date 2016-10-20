function changed_pw_validate(){
  var pw = $(".pw_new .pw_new_insert").val();
  var pw_confirm = $(".pw_new .pw_confirm").val();

  if(pw==pw_confirm && pw.length == pw_confirm.length)
    {
      $(".pw_new button")
      .css({
        "background-color": "#40b987",
        "color": "white"
      })
      .prop('disabled', false);
    }
}
