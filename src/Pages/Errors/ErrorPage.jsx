import { Link } from 'react-router-dom'
import { Button } from 'oks-ui'
import { Logo } from '../../Components/Commom/Logo'

const COPY = {
  401: {
    title: 'Unauthorized',
    body: "You don't have permission to view this page. Sign in with an account that does.",
    cta: { label: 'Go to sign in', to: '/auth/sign-in' },
  },
  404: {
    title: 'Page not found',
    body: "The page you're looking for doesn't exist or has moved.",
    cta: { label: 'Back to dashboard', to: '/dashboards/sales' },
  },
  500: {
    title: 'Something went wrong',
    body: 'An unexpected error occurred on our end. The team has been notified.',
    cta: { label: 'Back to dashboard', to: '/dashboards/sales' },
  },
}

export default function ErrorPage({ code = 404 }) {
  const c = COPY[code] || COPY[404]
  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center gap-3 p-8 text-center"
      style={{ background: 'var(--app-bg)' }}
    >
      <Logo markHeight={28} />
      <p
        className="mt-6 text-[5rem] font-bold leading-none"
        style={{ color: 'var(--app-primary)' }}
      >
        {code}
      </p>
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
        {c.title}
      </h1>
      <p className="max-w-md text-[0.9rem]" style={{ color: 'var(--app-fg-muted)' }}>
        {c.body}
      </p>
      <div className="mt-2 flex gap-2">
        <Button as={Link} to={c.cta.to} color="primary">
          {c.cta.label}
        </Button>
        <Button as={Link} to="/pages/faqs" variant="bordered">
          Get help
        </Button>
      </div>
    </main>
  )
}
