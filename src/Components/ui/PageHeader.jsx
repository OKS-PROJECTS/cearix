import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { HeroSlotContext } from '../../lib/hero-context'

/**
 * The page title band. Portals into the gradient hero strip that InnerTemplate
 * renders under the header — white title (medium) + white breadcrumb trail, with
 * the page content overlapping upward into it (the reference's signature look).
 * oks-ui ships <Breadcrumbs> + <PageTitle> but not this assembled band.
 */
export function PageHeader({ title, trail = [], actions }) {
  const slot = useContext(HeroSlotContext)

  const band = (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[22px] font-medium leading-tight text-white sm:text-[24px]">{title}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        {trail.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-white/75">
              {trail.map((c, i) => {
                const last = i === trail.length - 1
                return (
                  <li key={c.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight size={13} className="text-white/45" />}
                    {c.to && !last ? (
                      <Link to={c.to} className="text-white/90 hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={last ? 'font-medium text-white' : 'text-white/75'}>{c.label}</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
      </div>
    </div>
  )

  if (slot) return createPortal(band, slot)

  // Fallback (shell-less contexts) — render inline with dark text.
  return (
    <div className="mb-5 [&_*]:!text-current" style={{ color: 'var(--app-fg-strong)' }}>
      {band}
    </div>
  )
}
