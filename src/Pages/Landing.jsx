import { Link } from 'react-router-dom'
import { ArrowRight, Check, LayoutDashboard, Table2, PieChart, ShieldCheck } from 'lucide-react'
import { Button, Chip, Card, CardBody } from 'oks-ui'
import { Logo } from '../Components/Commom/Logo'

const FEATURES = [
  { icon: LayoutDashboard, title: '12 dashboards', body: 'Sales, CRM, analytics, crypto, HRM and more — each a real, wired screen.' },
  { icon: Table2, title: 'Config-driven screens', body: 'Lists, forms, details and settings are objects, not bespoke components.' },
  { icon: PieChart, title: 'One charting tool', body: 'Every chart is the oks-ui <Chart> primitive. No second library.' },
  { icon: ShieldCheck, title: 'Themeable to the core', body: 'Light, dark and rebrand flip from a single CSS-variable layer.' },
]

const PLANS = [
  { name: 'Starter', price: '$0', points: ['1 project', 'Community support', 'MIT license'] },
  { name: 'Team', price: '$29', points: ['Unlimited projects', 'Priority support', 'Figma library'], featured: true },
  { name: 'Studio', price: '$99', points: ['Everything in Team', 'Design review calls', 'Custom archetypes'] },
]

export default function Landing() {
  return (
    <div style={{ background: 'var(--app-bg)', color: 'var(--app-fg)' }}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo markHeight={26} />
        <nav className="hidden items-center gap-6 text-[0.85rem] sm:flex" style={{ color: 'var(--app-fg-muted)' }}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <Link to="/pages/faqs">FAQ</Link>
        </nav>
        <Button as={Link} to="/dashboards/sales" size="sm" color="primary" endContent={<ArrowRight size={14} />}>
          Open demo
        </Button>
      </header>

      <section className="mx-auto max-w-4xl px-5 pb-16 pt-14 text-center">
        <Chip variant="soft" color="primary" size="sm">Built entirely with oks-ui</Chip>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ color: 'var(--app-fg-strong)' }}>
          The admin template that proves a component library can build anything.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[1rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Cearix is a full admin dashboard — shell, tables, charts, forms, deep app
          screens — with every pixel composed from one CSS-variable React library.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Button as={Link} to="/dashboards/sales" color="primary" endContent={<ArrowRight size={15} />}>
            Explore the dashboard
          </Button>
          <Button as={Link} to="/components" variant="bordered">
            Component gallery
          </Button>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} style={{ background: 'var(--app-surface)', border: 'var(--app-card-border)' }} shadow="none">
              <CardBody className="p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}>
                  <f.icon size={19} />
                </span>
                <h3 className="mt-3 text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{f.title}</h3>
                <p className="mt-1 text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>{f.body}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-5 pb-20">
        <h2 className="text-center text-2xl font-semibold" style={{ color: 'var(--app-fg-strong)' }}>Simple pricing</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <Card
              key={p.name}
              style={{
                background: 'var(--app-surface)',
                border: p.featured ? '1px solid var(--app-primary)' : 'var(--app-card-border)',
              }}
              shadow="none"
            >
              <CardBody className="p-6">
                {p.featured && <Chip size="sm" color="primary" variant="soft">Most popular</Chip>}
                <h3 className="mt-2 text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</h3>
                <p className="mt-1 text-3xl font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                  {p.price}<span className="text-sm font-normal" style={{ color: 'var(--app-fg-muted)' }}>/mo</span>
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-[0.85rem]">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
                      <Check size={14} style={{ color: 'var(--app-success)' }} /> {pt}
                    </li>
                  ))}
                </ul>
                <Button as={Link} to="/auth/sign-up" color={p.featured ? 'primary' : 'default'} variant={p.featured ? 'solid' : 'bordered'} fullWidth className="mt-5">
                  Get started
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t px-5 py-8 text-center text-[0.8rem]" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }}>
        © {new Date().getFullYear()} Cearix · Built entirely with oks-ui
      </footer>
    </div>
  )
}
