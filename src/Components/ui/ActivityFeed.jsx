import { cx } from '../../lib/cx'

/**
 * Flat activity list — a coloured dot, a bold title, a muted sub-line, and a
 * right-aligned timestamp (the reference's "Recent Activity" widget). oks-ui
 * ships <Timeline> but that draws a connector rail; this is the denser flat
 * treatment the reference uses.
 */
export function ActivityFeed({ items, className }) {
  return (
    <ul className={cx('flex flex-col', className)}>
      {items.map((it, i) => (
        <li
          key={i}
          className={cx(
            'flex items-start gap-3 py-3 first:pt-0 last:pb-0',
            i < items.length - 1 && 'border-b',
          )}
          style={{ borderColor: 'var(--app-border)' }}
        >
          <span
            aria-hidden
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
            style={{ background: `var(--app-${it.color || 'primary'})` }}
          />
          <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.83rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {it.title}
              </p>
              {it.description && (
                <p className="mt-0.5 text-[0.78rem]" style={{ color: 'var(--app-fg-muted)' }}>
                  {it.description}
                </p>
              )}
            </div>
            {it.time && (
              <span className="shrink-0 whitespace-nowrap text-[0.72rem]" style={{ color: 'var(--app-fg-subtle)' }}>
                {it.time}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
