import { Link } from 'react-router-dom'
import { CircularProgress, Avatar } from 'oks-ui'
import { cx } from '../../lib/cx'
import { Surface, PanelCard } from './Surface'
import { BareChart } from './ChartCard'
import { TrendChip, StatusChip } from './chips'
import { MeterList } from './misc'
import { avatarUrl } from '../../lib/avatar'

/** Big hero number + delta + a wide mini area chart underneath. */
export function HeroStat({ label, value, delta, sub, chartData, chartKey = 'value', tone = 'primary', footer }) {
  return (
    <Surface bodyClassName="p-0">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div>
          <p className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{label}</p>
          <p className="mt-1 text-[2rem] font-semibold leading-none" style={{ color: 'var(--app-fg-strong)' }}>
            {value}
          </p>
          {sub && <p className="mt-1.5 text-[0.8rem]" style={{ color: 'var(--app-fg-subtle)' }}>{sub}</p>}
        </div>
        {delta != null && <TrendChip value={delta} />}
      </div>
      {chartData && (
        <BareChart
          type="area"
          height={150}
          data={chartData}
          x="month"
          series={[{ key: chartKey, name: label, color: `var(--oks-color-${tone}-500)` }]}
          axisX={{ hide: true }}
          axisY={{ hide: true }}
        />
      )}
      {footer && <div className="border-t px-5 py-3 text-[0.8rem]" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }}>{footer}</div>}
    </Surface>
  )
}

/** A compact labelled list — watchlist rows, market movers, top pages, etc. */
export function ListPanel({ title, actions, rows, to }) {
  return (
    <PanelCard title={title} actions={actions} bodyClassName="p-0">
      <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-3 px-5 py-3">
            {r.avatar && <Avatar src={avatarUrl(r.avatar)} name={r.title} size={30} radius={r.square ? 'md' : 'full'} />}
            {r.badge && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[0.7rem] font-semibold"
                style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}>
                {r.badge}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.83rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.title}</p>
              {r.sub && <p className="truncate text-[0.74rem]" style={{ color: 'var(--app-fg-muted)' }}>{r.sub}</p>}
            </div>
            <div className="shrink-0 text-right">
              {r.value != null && <p className="text-[0.83rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.value}</p>}
              {r.delta != null && (
                <p className="text-[0.72rem] font-medium" style={{ color: Number(r.delta) >= 0 ? 'var(--app-success)' : 'var(--app-danger)' }}>
                  {Number(r.delta) >= 0 ? '+' : ''}{r.delta}%
                </p>
              )}
              {r.chip && <StatusChip status={r.chip} />}
            </div>
          </li>
        ))}
      </ul>
      {to && (
        <div className="border-t px-5 py-2.5 text-center" style={{ borderColor: 'var(--app-border)' }}>
          <Link to={to} className="text-[0.78rem] font-medium" style={{ color: 'var(--app-primary)' }}>View all</Link>
        </div>
      )}
    </PanelCard>
  )
}

/** Cards with a title, meta and a progress bar — courses, projects. */
export function ProgressCards({ title, actions, items, cols = 2 }) {
  const grid = { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' }
  return (
    <PanelCard title={title} actions={actions}>
      <div className={cx('grid gap-4', grid[cols] || grid[2])}>
        {items.map((it) => (
          <div key={it.title} className="rounded-lg p-4" style={{ background: 'var(--app-surface-2)', border: '1px solid var(--app-border)' }}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[0.85rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{it.title}</p>
              <span className="text-[0.75rem] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{it.value}%</span>
            </div>
            {it.sub && <p className="mt-0.5 text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{it.sub}</p>}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-3)' }}>
              <div className="h-full rounded-full" style={{ width: `${it.value}%`, background: `var(--app-${it.color || 'primary'})` }} />
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}

/** A row of circular progress rings. */
export function RingRow({ title, actions, items }) {
  return (
    <PanelCard title={title} actions={actions}>
      <div className="flex flex-wrap items-center justify-around gap-6">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-2 text-center">
            <CircularProgress value={it.value} color={it.color || 'primary'} size="lg" showValueLabel aria-label={it.label} />
            <span className="text-[0.78rem]" style={{ color: 'var(--app-fg-muted)' }}>{it.label}</span>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}

/** Reuse MeterList inside a titled panel. */
export function MeterPanel({ title, actions, items, note }) {
  return (
    <PanelCard title={title} actions={actions}>
      {note && <p className="mb-4 text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{note}</p>}
      <MeterList items={items} />
    </PanelCard>
  )
}
