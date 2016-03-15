export function $param(obj) {
  let s = [];
  for(let key in obj) {
    if(obj[key] != null) {
      s.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return s.join('&');
}
