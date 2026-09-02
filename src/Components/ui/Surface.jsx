import { Card, CardBody } from 'oks-ui'
import { cx } from '../../lib/cx'

/**
 * The everyday card. Composed from oks-ui <Card> — reads only --app-* tokens
 * so it flips with theme + rebrand. oks-ui ships <Card> but not this opinionated
 * "surface with optional header / divider / padded body" pattern.
 */
export function Surface({ className, bodyClassName, children, padded = true, ...rest }) {
  return (
    <Card
      className={cx('cearix-surface', className)}
      style={{
        background: 'var(--app-surface)',
        border: 'var(--app-card-border)',
        borderRadius: 'var(--app-card-radius)',
        boxShadow: 'var(--app-card-shadow)',
        color: 'var(--app-fg)',
      }}
      shadow="none"
      {...rest}
    >
      {padded ? <CardBody className={cx('p-5', bodyClassName)}>{children}</CardBody> : children}
    </Card>
  )
}

export function CardHeader({ title, subtitle, actions, divider = true, className, icon }) {
  return (
    <div
      className={cx(
        'flex items-center justify-between gap-3 px-5 py-3.5',
        divider && 'border-b',
        className,
      )}
      style={divider ? { borderColor: 'var(--app-border)' } : undefined}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="truncate text-[1.02rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="mt-0.5 text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function SectionTitle({ children, className }) {
  return (
    <h2
      className={cx('text-[0.95rem] font-semibold', className)}
      style={{ color: 'var(--app-fg-strong)' }}
    >
      {children}
    </h2>
  )
}

/** Card with a header band + body, the reference's most common widget shape. */
export function PanelCard({ title, subtitle, actions, icon, children, className, bodyClassName, divider }) {
  return (
    <Surface padded={false} className={className}>
      <CardHeader title={title} subtitle={subtitle} actions={actions} icon={icon} divider={divider} />
      <div className={cx('p-5', bodyClassName)}>{children}</div>
    </Surface>
  )
}
