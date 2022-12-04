export function substringBetween(s, a, b) {
  var p = s.indexOf(a) + a.length
  return s.substring(p, s.indexOf(b, p))
}

export function insertTextAtCurrentCursor(position, string, text) {
  return (
    string.substring(0, position) +
    text +
    string.substring(position, string?.length)
  )
}
