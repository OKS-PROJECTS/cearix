import { Link } from 'react-router-dom'
import { Logo } from '../../Components/Commom/Logo'

/**
 * Auth screen frame. `split` clones the reference's dark cover panel + form;
 * otherwise a centred card on a tinted page.
 */
export function AuthShell({ split = false, title, subtitle, children, footer }) {
  if (split) {
    return (
      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2" style={{ background: 'var(--app-bg)' }}>
        <div
          className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
          style={{ background: 'linear-gradient(150deg, #4776e6 0%, #8e54e9 100%)', color: '#fff' }}
        >
          <Link to="/dashboards/sales">
            <Logo onDark markHeight={26} />
          </Link>
          <div>
            <h2 className="text-2xl font-semibold leading-snug">
              The admin template built entirely with oks-ui.
            </h2>
            <p className="mt-3 max-w-sm text-[0.9rem] text-white/80">
              Tables, charts, forms, the shell — every pixel composed from one
              CSS-variable component library.
            </p>
          </div>
          <p className="text-[0.78rem] text-white/60">© {new Date().getFullYear()} Cearix</p>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-white/5" />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <div className="mb-6 lg:hidden">
              <Logo markHeight={24} />
            </div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
                {subtitle}
              </p>
            )}
            <div className="mt-6">{children}</div>
            {footer && (
              <p className="mt-6 text-center text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>
                {footer}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-6" style={{ background: 'var(--app-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Link to="/dashboards/sales">
            <Logo markHeight={26} />
          </Link>
        </div>
        <div
          className="rounded-xl p-6 sm:p-7"
          style={{
            background: 'var(--app-surface)',
            border: 'var(--app-card-border)',
            boxShadow: 'var(--app-card-shadow)',
          }}
        >
          <h1 className="text-lg font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
              {subtitle}
            </p>
          )}
          <div className="mt-5">{children}</div>
        </div>
        {footer && (
          <p className="mt-5 text-center text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>
            {footer}
          </p>
        )}
      </div>
    </div>
  )
}
