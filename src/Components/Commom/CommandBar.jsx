import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommandPalette } from 'oks-ui'
import { NAV } from '../../data/nav'

function flatten(items, trail = []) {
  return items.flatMap((n) => {
    if (n.children) return flatten(n.children, [...trail, n.label])
    if (!n.to) return []
    return [{ id: n.to, label: n.label, description: trail.join(' › ') || undefined, group: trail[0] || 'Pages' }]
  })
}

export function CommandBar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const items = useMemo(() => flatten(NAV.flatMap((s) => s.items)), [])

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={onClose}
      items={items}
      placeholder="Jump to a page…"
      emptyMessage="No matching pages"
      onSelect={(item) => {
        navigate(item.id)
        onClose()
      }}
    />
  )
}
