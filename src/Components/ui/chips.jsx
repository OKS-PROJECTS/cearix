import { ArrowDownRight, ArrowUpRight, Minus, Eye, Pencil, Trash2 } from 'lucide-react'
import { Chip, Avatar, Button, toast } from 'oks-ui'
import { cx } from '../../lib/cx'
import { avatarUrl } from '../../lib/avatar'

const STATUS_COLOR = {
  active: 'success',
  completed: 'success',
  delivered: 'success',
  paid: 'success',
  approved: 'success',
  confirmed: 'success',
  online: 'success',
  success: 'success',
  pending: 'warning',
  processing: 'warning',
  'in progress': 'warning',
  review: 'warning',
  draft: 'default',
  inactive: 'default',
  archived: 'default',
  offline: 'default',
  cancelled: 'danger',
  canceled: 'danger',
  failed: 'danger',
  overdue: 'danger',
  rejected: 'danger',
  refunded: 'danger',
  shipped: 'info',
  new: 'info',
  open: 'info',
}

export function StatusChip({ status, size = 'sm' }) {
  const key = String(status || '').toLowerCase()
  const color = STATUS_COLOR[key] || 'default'
  return (
    <Chip size={size} variant="soft" color={color} className="capitalize">
      {status}
    </Chip>
  )
}

export function TrendChip({ value, suffix = '%', size = 'sm' }) {
  const n = typeof value === 'number' ? value : parseFloat(value)
  const dir = n > 0 ? 'up' : n < 0 ? 'down' : 'flat'
  const color = dir === 'up' ? 'success' : dir === 'down' ? 'danger' : 'default'
  const Icon = dir === 'up' ? ArrowUpRight : dir === 'down' ? ArrowDownRight : Minus
  return (
    <Chip size={size} variant="soft" color={color} startContent={<Icon size={12} />}>
      {n > 0 ? '+' : ''}
      {value}
      {suffix}
    </Chip>
  )
}

/** Person / company cell — avatar (or square initials) + name + sub-line. */
export function EntityCell({ name, sub, seed, company = false, src, size = 32 }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar
        src={company ? undefined : src || avatarUrl(seed || name)}
        name={name}
        size={size}
        radius={company ? 'md' : 'full'}
        color={company ? 'primary' : 'default'}
      />
      <div className="min-w-0">
        <div className="truncate text-[0.82rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
          {name}
        </div>
        {sub && (
          <div className="truncate text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

/** Row action cluster — soft view / edit / delete icon buttons (reference pattern). */
export function RowActions({ onView, onEdit, onDelete }) {
  const noop = (label) => () => toast.info(`${label} (demo)`)
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Button isIconOnly size="sm" variant="soft" color="default" aria-label="View" onPress={onView || noop('View')}>
        <Eye size={14} />
      </Button>
      <Button isIconOnly size="sm" variant="soft" color="primary" aria-label="Edit" onPress={onEdit || noop('Edit')}>
        <Pencil size={14} />
      </Button>
      <Button isIconOnly size="sm" variant="soft" color="danger" aria-label="Delete" onPress={onDelete || noop('Delete')}>
        <Trash2 size={14} />
      </Button>
    </div>
  )
}

export function Dot({ color = 'var(--app-fg-subtle)', className }) {
  return (
    <span
      aria-hidden
      className={cx('inline-block h-2 w-2 rounded-full', className)}
      style={{ background: color }}
    />
  )
}
