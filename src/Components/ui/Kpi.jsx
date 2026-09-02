import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cx } from '../../lib/cx'
import { Surface } from './Surface'

/**
 * KPI / stat card — matches the reference's anatomy: label + big value on the
 * left, a soft-tinted rounded icon tile on the right, then a trend pill and an
 * underlined "view more" link. oks-ui ships <Stat> but not this exact treatment.
 * 2-up on phones, 2/3/4-up from lg (via KpiGrid).
 */
export function KpiCard({ label, value, delta, deltaSuffix = '%', icon: Icon, tone = 'primary', to }) {
  const n = typeof delta === 'number' ? delta : parseFloat(delta)
  const up = !Number.isNaN(n) && n >= 0
  const TrendIcon = up ? ArrowUpRight : ArrowDownRight

  return (
    <Surface bodyClassName="p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 truncate text-[0.8rem] font-medium" style={{ color: 'var(--app-fg-muted)' }}>
            {label}
          </p>
          <p className="text-[1.35rem] font-semibold leading-none" style={{ color: 'var(--app-fg-strong)' }}>
            {value}
          </p>
        </div>
        {Icon && (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
            style={{ background: `var(--app-${tone}-soft)`, color: `var(--app-${tone})` }}
          >
            <Icon size={17} />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {delta != null && !Number.isNaN(n) && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.72rem] font-medium"
            style={{
              background: up ? 'var(--app-success-soft)' : 'var(--app-danger-soft)',
              color: up ? 'var(--app-success)' : 'var(--app-danger)',
            }}
          >
            {up ? '+' : ''}
            {delta}
            {deltaSuffix}
            <TrendIcon size={11} />
          </span>
        )}
        {to && (
          <Link
            to={to}
            className="ml-auto text-[0.72rem] underline decoration-1 underline-offset-2 hover:no-underline"
            style={{ color: 'var(--app-fg-subtle)' }}
          >
            view more
          </Link>
        )}
      </div>
    </Surface>
  )
}

export function KpiGrid({ cols = 4, className, children }) {
  const map = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }
  return <div className={cx('grid gap-4 sm:gap-6', map[cols] || map[4], className)}>{children}</div>
}
