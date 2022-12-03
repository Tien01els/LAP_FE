export function substringBetween(s, a, b) {
  var p = s.indexOf(a) + a.length
  return s.substring(p, s.indexOf(b, p))
}
