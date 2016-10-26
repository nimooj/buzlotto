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
