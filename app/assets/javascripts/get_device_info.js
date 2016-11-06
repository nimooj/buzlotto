// buzlotto str match check
//  custom user agent navigator
function is_app() {
  var isApp = {
    IOSApp: function() {
      return navigator.userAgent.match(/buzlotto_ios/i);
    },
    AndroidApp: function() {
      return navigator.userAgent.match(/buzlotto_android/i);
    }
  }

  if ( isApp.IOSApp() ) {
    return "iosapp";
  }
  else if ( isApp.AndroidApp() ) {
    return "androidapp";
  }
  else {
    return "mobileweb";
  }
}

function get_device() {
  var isMobile = { 
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Mac: function() {
      return navigator.userAgent.match(/Macintosh/i)
    }
  };

  if (isMobile.Android()) {
    return "A";
  }
  else if (isMobile.iOS()) {
    return "I";
  }
  else {
    return "W";
  }
}
