export function readCookieImpl(name) {
  return function() {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : "";
  };
}

export function setStageCookie(stage) {
  return function() {
    var date = new Date();
    date.setTime(date.getTime() + (7*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = 'stage=' + stage + expires + '; path=/';
  }
}
