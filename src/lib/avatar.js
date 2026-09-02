/**
 * The template's ONLY external runtime dependency: a deterministic person-photo
 * URL from a seed. oks-ui <Avatar> falls back to initials if the image fails.
 * Companies use square initials instead — see EntityCell.
 */
export function avatarUrl(seed) {
  const n = Math.abs(hash(String(seed))) % 70
  return `https://i.pravatar.cc/160?img=${n === 0 ? 1 : n}`
}

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return h
}
