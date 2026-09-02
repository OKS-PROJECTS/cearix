const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function toDate(input) {
  return input instanceof Date ? input : new Date(input)
}

/** "02 Sept, 2026" */
export function fmtDate(input) {
  const d = toDate(input)
  if (Number.isNaN(d.getTime())) return String(input ?? '')
  return `${String(d.getDate()).padStart(2, '0')} ${MON[d.getMonth()]}, ${d.getFullYear()}`
}

/**
 * "11:20 AM - 02 Sept, 2026"  (default)
 * "14:24 - 02 Sept, 2026"     (time24: true)
 */
export function fmtDateTime(input, { time24 = false } = {}) {
  const d = toDate(input)
  if (Number.isNaN(d.getTime())) return String(input ?? '')
  const h = d.getHours()
  const m = String(d.getMinutes()).padStart(2, '0')
  const time = time24
    ? `${String(h).padStart(2, '0')}:${m}`
    : `${((h % 12) || 12)}:${m} ${h < 12 ? 'AM' : 'PM'}`
  return `${time} - ${fmtDate(d)}`
}
