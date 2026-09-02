import { Timeline, TimelineItem } from 'oks-ui'

/** Thin wrapper over oks-ui <Timeline> with our entity styling. */
export function ActivityFeed({ items }) {
  return (
    <Timeline>
      {items.map((it, i) => (
        <TimelineItem key={i} title={it.title} time={it.time} color={it.color || 'primary'} icon={it.icon}>
          {it.description && (
            <p className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>
              {it.description}
            </p>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  )
}
