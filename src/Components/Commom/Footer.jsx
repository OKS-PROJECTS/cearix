import { Link } from 'react-router-dom'
import { Chip } from 'oks-ui'

export function Footer() {
  return (
    <footer
      className="mt-6 flex flex-col items-center justify-between gap-2 border-t px-1 py-4 text-[0.78rem] sm:flex-row"
      style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }}
    >
      <p>
        © {new Date().getFullYear()} Cearix. Built entirely with{' '}
        <a
          href="https://www.oks-ui.com/docs/"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'var(--app-primary)' }}
        >
          oks-ui
        </a>
        .
      </p>
      <div className="flex items-center gap-4">
        <Link to="/pages/terms">Terms</Link>
        <Link to="/pages/faqs">Support</Link>
        <Chip size="sm" variant="soft" color="primary">
          v0.1.0
        </Chip>
      </div>
    </footer>
  )
}
