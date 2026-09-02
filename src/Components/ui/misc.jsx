import { SegmentedControl as OksSegmented, Progress, Skeleton } from 'oks-ui'
import { cx } from '../../lib/cx'
import { Surface } from './Surface'

/** Re-skinned segmented control (Tabs variant="solid" track is too light on dark). */
export function SegmentedControl(props) {
  return <OksSegmented {...props} className={cx('cearix-segmented', props.className)} />
}

/** Labelled meter list — reference progress widgets. */
export function MeterList({ items, className }) {
  return (
    <ul className={cx('flex flex-col gap-4', className)}>
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1.5 flex items-center justify-between text-[0.8rem]">
            <span style={{ color: 'var(--app-fg)' }}>{it.label}</span>
            <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>
              {it.display ?? `${it.value}%`}
            </span>
          </div>
          <Progress
            value={it.value}
            color={it.color || 'primary'}
            size="sm"
            aria-label={it.label}
          />
        </li>
      ))}
    </ul>
  )
}

export function StatTile({ label, value, sub, tone = 'primary', icon: Icon }) {
  return (
    <Surface bodyClassName="p-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ background: `var(--app-${tone}-soft)`, color: `var(--app-${tone})` }}
          >
            <Icon size={17} />
          </span>
        )}
        <div>
          <p className="text-[1.15rem] font-semibold leading-none" style={{ color: 'var(--app-fg-strong)' }}>
            {value}
          </p>
          <p className="mt-1 text-[0.76rem]" style={{ color: 'var(--app-fg-muted)' }}>
            {label}
          </p>
        </div>
      </div>
      {sub && (
        <p className="mt-2 text-[0.75rem]" style={{ color: 'var(--app-fg-subtle)' }}>
          {sub}
        </p>
      )}
    </Surface>
  )
}

export function SkeletonRows({ rows = 5, className }) {
  return (
    <div className={cx('flex flex-col gap-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rect" height={44} radius="md" />
      ))}
    </div>
  )
}

export function KeyValue({ rows, className }) {
  return (
    <dl className={cx('divide-y', className)} style={{ borderColor: 'var(--app-border)' }}>
      {rows.map((r) => (
        <div key={r.label} className="flex items-start justify-between gap-4 py-2.5 text-[0.83rem] [&:first-child]:pt-0">
          <dt style={{ color: 'var(--app-fg-muted)' }}>{r.label}</dt>
          <dd className="text-right font-medium" style={{ color: 'var(--app-fg-strong)' }}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
