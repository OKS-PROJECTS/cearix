import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, Star, Bell, CreditCard, ShieldCheck, FileText, Plus, Package,
} from 'lucide-react'
import {
  Accordion, AccordionItem, Button, Chip, Checkbox, Avatar, AvatarGroup,
  Divider, Alert, TextField, SegmentedControl,
} from 'oks-ui'
import {
  PageHeader, PanelCard, Surface, KpiGrid, KpiCard, StatusChip,
  ActivityFeed, KeyValue,
} from '../../Components/ui'
import { avatarUrl } from '../../lib/avatar'
import { team } from '../../data/catalog'

/* -------------------------------------------------- Empty */
export function EmptyPage() {
  return (
    <>
      <PageHeader title="Empty Page" trail={[{ label: 'Pages' }, { label: 'Empty' }]} />
      <Surface bodyClassName="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'var(--app-surface-3)', color: 'var(--app-fg-muted)' }}>
          <FileText size={22} />
        </span>
        <h2 className="text-base font-semibold" style={{ color: 'var(--app-fg-strong)' }}>A blank canvas</h2>
        <p className="max-w-sm text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Start your next screen from this empty shell page.
        </p>
      </Surface>
    </>
  )
}

/* -------------------------------------------------- Terms */
export function TermsPage() {
  const sections = [
    ['1. Acceptance', 'By using the Cearix demo you agree to these terms. This is a UI showcase, not a product.'],
    ['2. License', 'The template is released under the MIT license. You may use, modify and redistribute it.'],
    ['3. Data', 'All names, numbers and records in this demo are fictional and generated deterministically.'],
    ['4. Warranty', 'The software is provided "as is", without warranty of any kind.'],
    ['5. Changes', 'These terms may be updated as the template evolves alongside oks-ui.'],
  ]
  return (
    <>
      <PageHeader title="Terms & Conditions" trail={[{ label: 'Pages' }, { label: 'Terms' }]} />
      <PanelCard title="Terms of use" subtitle="Last updated 2 September 2026">
        <div className="cearix-prose flex max-w-3xl flex-col gap-4 text-[0.88rem] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
          {sections.map(([h, b]) => (
            <div key={h}>
              <h3 className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{h}</h3>
              <p className="mt-1" style={{ color: 'var(--app-fg-muted)' }}>{b}</p>
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- FAQ */
const FAQ_GROUPS = {
  General: [
    ['What is Cearix?', 'A promotional admin template that showcases what you can build with the oks-ui component library.'],
    ['Is it free?', 'Yes — MIT licensed.'],
  ],
  Technical: [
    ['What stack does it use?', 'Vite + React 19, react-router v7, Tailwind v4 for layout, and oks-ui for every component.'],
    ['How do I theme it?', 'Repoint the brand ramp and --app-* layer in src/styles/theme.css.'],
  ],
  Billing: [
    ['Do I need an account?', 'No. The demo runs entirely on deterministic mock data.'],
  ],
}
export function FaqPage() {
  const [tab, setTab] = useState('General')
  return (
    <>
      <PageHeader title="FAQ's" trail={[{ label: 'Pages' }, { label: 'FAQ' }]} />
      <div className="mb-4">
        <SegmentedControl
          aria-label="FAQ category"
          options={Object.keys(FAQ_GROUPS).map((k) => ({ label: k, value: k }))}
          value={tab}
          onChange={setTab}
        />
      </div>
      <PanelCard title={`${tab} questions`}>
        <Accordion variant="splitted" selectionMode="multiple" defaultExpandedKeys={['0']}>
          {FAQ_GROUPS[tab].map(([q, a], i) => (
            <AccordionItem key={String(i)} itemKey={String(i)} title={q}>
              <p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>{a}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Pricing */
const PLANS = [
  { name: 'Starter', price: 0, blurb: 'For trying things out', points: ['1 workspace', '2 dashboards', 'Community support'] },
  { name: 'Team', price: 29, blurb: 'For growing teams', featured: true, points: ['Unlimited dashboards', 'All archetypes', 'Priority support', 'Figma library'] },
  { name: 'Studio', price: 99, blurb: 'For agencies', points: ['Everything in Team', 'Custom archetypes', 'Design review calls', 'SLA'] },
]
export function PricingPage() {
  const [annual, setAnnual] = useState(true)
  return (
    <>
      <PageHeader title="Pricing" trail={[{ label: 'Pages' }, { label: 'Pricing' }]} />
      <div className="mb-5 flex items-center justify-center gap-3 text-[0.85rem]">
        <span style={{ color: annual ? 'var(--app-fg-muted)' : 'var(--app-fg-strong)' }}>Monthly</span>
        <Checkbox isSelected={annual} onChange={setAnnual} aria-label="Annual billing" />
        <span style={{ color: annual ? 'var(--app-fg-strong)' : 'var(--app-fg-muted)' }}>
          Annual <Chip size="sm" variant="soft" color="success">−20%</Chip>
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <Surface key={p.name} className={p.featured ? 'ring-1 ring-[var(--app-primary)]' : ''}>
            {p.featured && <Chip size="sm" color="primary" variant="soft">Most popular</Chip>}
            <h3 className="mt-1 text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</h3>
            <p className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{p.blurb}</p>
            <p className="mt-3 text-3xl font-bold" style={{ color: 'var(--app-fg-strong)' }}>
              ${annual ? Math.round(p.price * 0.8) : p.price}
              <span className="text-sm font-normal" style={{ color: 'var(--app-fg-muted)' }}>/mo</span>
            </p>
            <Divider className="my-4" />
            <ul className="flex flex-col gap-2 text-[0.84rem]">
              {p.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
                  <Check size={14} style={{ color: 'var(--app-success)' }} /> {pt}
                </li>
              ))}
            </ul>
            <Button as={Link} to="/auth/sign-up" fullWidth color={p.featured ? 'primary' : 'default'} variant={p.featured ? 'solid' : 'bordered'} className="mt-5">
              Choose {p.name}
            </Button>
          </Surface>
        ))}
      </div>
    </>
  )
}

/* -------------------------------------------------- Notifications */
const NOTIFS = [
  { icon: Package, title: 'Order CRX-4821 was delivered', time: '9 minutes ago', tone: 'success', unread: true },
  { icon: CreditCard, title: 'Payout of $14,206.55 settled', time: '2 hours ago', tone: 'info', unread: true },
  { icon: ShieldCheck, title: 'New sign-in from Lyon, FR', time: '5 hours ago', tone: 'warning', unread: false },
  { icon: Star, title: 'Aster Table Lamp hit 400 reviews', time: 'Yesterday', tone: 'primary', unread: false },
  { icon: Bell, title: 'Weekly summary is ready', time: '2 days ago', tone: 'default', unread: false },
]
export function NotificationsPage() {
  const [items, setItems] = useState(NOTIFS)
  return (
    <>
      <PageHeader
        title="Notifications"
        trail={[{ label: 'Pages' }, { label: 'Notifications' }]}
        actions={<Button size="sm" variant="bordered" onPress={() => setItems((p) => p.map((n) => ({ ...n, unread: false })))}>Mark all read</Button>}
      />
      <PanelCard title="All notifications" bodyClassName="p-0">
        <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
          {items.map((n, i) => (
            <li key={i} className="flex items-center gap-3 px-5 py-3.5" style={{ background: n.unread ? 'var(--app-primary-soft)' : 'transparent' }}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `var(--app-${n.tone === 'default' ? 'surface-3' : n.tone + '-soft'})`, color: n.tone === 'default' ? 'var(--app-fg-muted)' : `var(--app-${n.tone})` }}>
                <n.icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.85rem]" style={{ color: 'var(--app-fg-strong)' }}>{n.title}</p>
                <p className="text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{n.time}</p>
              </div>
              {n.unread && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: 'var(--app-primary)' }} />}
            </li>
          ))}
        </ul>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- To Do */
const SEED_TODOS = [
  { id: 1, text: 'Finalise Q4 roadmap deck', done: false, tag: 'Work' },
  { id: 2, text: 'Review data table PR', done: false, tag: 'Work' },
  { id: 3, text: 'Book dentist', done: false, tag: 'Personal' },
  { id: 4, text: 'Renew domain', done: true, tag: 'Admin' },
  { id: 5, text: 'Reply to Meridian enquiry', done: true, tag: 'Work' },
]
export function TodoPage() {
  const [todos, setTodos] = useState(SEED_TODOS)
  const [text, setText] = useState('')
  const toggle = (id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const add = () => {
    if (!text.trim()) return
    setTodos((p) => [...p, { id: Date.now(), text: text.trim(), done: false, tag: 'Work' }])
    setText('')
  }
  const open = todos.filter((t) => !t.done)
  const done = todos.filter((t) => t.done)
  return (
    <>
      <PageHeader title="To Do List" trail={[{ label: 'Pages' }, { label: 'To Do' }]} />
      <KpiGrid cols={3} className="mb-4">
        <KpiCard label="Open" value={String(open.length)} tone="primary" />
        <KpiCard label="Completed" value={String(done.length)} tone="success" />
        <KpiCard label="Total" value={String(todos.length)} tone="info" />
      </KpiGrid>
      <PanelCard title="Tasks">
        <div className="mb-4 flex gap-2">
          <TextField aria-label="New task" placeholder="Add a task…" value={text} onChange={setText} className="flex-1" />
          <Button color="primary" startContent={<Plus size={14} />} onPress={add}>Add</Button>
        </div>
        <ul className="flex flex-col gap-1">
          {[...open, ...done].map((t) => (
            <li key={t.id} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-[var(--app-surface-2)]">
              <Checkbox isSelected={t.done} onChange={() => toggle(t.id)} aria-label={t.text} />
              <span className={t.done ? 'line-through' : ''} style={{ color: t.done ? 'var(--app-fg-subtle)' : 'var(--app-fg)' }}>
                {t.text}
              </span>
              <Chip size="sm" variant="soft" className="ml-auto">{t.tag}</Chip>
            </li>
          ))}
        </ul>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Profile */
export function ProfilePage() {
  const me = { name: 'Cassian Holt', role: 'Head of Design', location: 'Bristol, UK', email: 'cassian@cearix.io' }
  return (
    <>
      <PageHeader
        title="Profile"
        trail={[{ label: 'Pages' }, { label: 'Profile' }]}
        actions={<Button as={Link} to="/pages/profile/settings" size="sm" color="primary" variant="soft">Edit profile</Button>}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Surface className="lg:col-span-1" bodyClassName="flex flex-col items-center gap-2 text-center">
          <Avatar src={avatarUrl(me.name)} name={me.name} size={84} isBordered />
          <h2 className="mt-2 text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{me.name}</h2>
          <p className="text-[0.82rem]" style={{ color: 'var(--app-fg-muted)' }}>{me.role} · {me.location}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" color="primary">Message</Button>
            <Button size="sm" variant="bordered">Follow</Button>
          </div>
          <Divider className="my-3" />
          <div className="grid w-full grid-cols-3 text-center">
            {[['Projects', '12'], ['Reviews', '48'], ['Followers', '1.2k']].map(([k, v]) => (
              <div key={k}>
                <p className="text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{v}</p>
                <p className="text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>{k}</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <PanelCard title="About">
            <KeyValue rows={[
              { label: 'Email', value: me.email },
              { label: 'Role', value: me.role },
              { label: 'Location', value: me.location },
              { label: 'Joined', value: 'March 2024' },
            ]} />
          </PanelCard>
          <PanelCard title="Recent activity">
            <ActivityFeed items={[
              { title: 'Shipped the data table refactor', time: '2d ago', color: 'success' },
              { title: 'Commented on Brand Refresh', time: '4d ago', color: 'primary' },
              { title: 'Joined the Analytics squad', time: '1w ago', color: 'info' },
            ]} />
          </PanelCard>
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------- Contacts (card grid — the reference uses a grid, not a table) */
export function ContactsGridPage() {
  return (
    <>
      <PageHeader
        title="Contacts"
        trail={[{ label: 'Pages' }, { label: 'Contacts' }]}
        actions={<Button size="sm" color="primary" startContent={<Plus size={14} />}>New contact</Button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.slice(0, 12).map((m) => (
          <Surface key={m.id} bodyClassName="flex flex-col items-center gap-1 text-center p-5">
            <Avatar src={avatarUrl(m.name)} name={m.name} size={60} />
            <p className="mt-2 text-[0.88rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{m.name}</p>
            <p className="text-[0.76rem]" style={{ color: 'var(--app-fg-muted)' }}>{m.role}</p>
            <StatusChip status={m.status} />
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="bordered">Email</Button>
              <Button size="sm" color="primary" variant="soft">Call</Button>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}

/* -------------------------------------------------- Timeline */
const TL = [
  { title: 'Cearix v0.1.0 scaffolded', time: 'Sep 2', description: 'Shell, theme layer, archetypes.', color: 'primary' },
  { title: 'Design tokens locked', time: 'Sep 2', description: 'Brand ramp + dark mode verified.', color: 'success' },
  { title: 'Reference study complete', time: 'Sep 1', description: 'IA map + visual system captured.', color: 'info' },
  { title: 'Project kicked off', time: 'Sep 1', description: 'Playbook + oks-ui reference read.', color: 'warning' },
]
export function TimelineFeedPage() {
  return (
    <>
      <PageHeader title="Activity Feed" trail={[{ label: 'Timeline' }, { label: 'Feed' }]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="This week" className="lg:col-span-2">
          <ActivityFeed items={TL} />
        </PanelCard>
        <PanelCard title="Contributors">
          <AvatarGroup max={6}>
            {team.slice(0, 8).map((m) => <Avatar key={m.id} src={avatarUrl(m.name)} name={m.name} />)}
          </AvatarGroup>
        </PanelCard>
      </div>
    </>
  )
}
export function TimelineCompactPage() {
  return (
    <>
      <PageHeader title="Compact Timeline" trail={[{ label: 'Timeline' }, { label: 'Compact' }]} />
      <PanelCard title="Release history">
        <ol className="relative ml-3 border-l pl-6" style={{ borderColor: 'var(--app-border-strong)' }}>
          {TL.map((t, i) => (
            <li key={i} className="mb-5 last:mb-0">
              <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full" style={{ background: `var(--app-${t.color})` }} />
              <div className="flex items-center gap-2">
                <p className="text-[0.86rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{t.title}</p>
                <span className="text-[0.72rem]" style={{ color: 'var(--app-fg-subtle)' }}>{t.time}</span>
              </div>
              <p className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{t.description}</p>
            </li>
          ))}
        </ol>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Blog */
const POSTS = [
  { id: 'scaling-design-systems', title: 'Scaling a design system without slowing down', excerpt: 'How we kept velocity while the token layer grew.', category: 'Engineering', date: 'Aug 28', read: '6 min' },
  { id: 'one-charting-tool', title: 'Why we standardised on one charting primitive', excerpt: 'A single <Chart> component, seven demo pages, zero extra bytes.', category: 'Product', date: 'Aug 21', read: '4 min' },
  { id: 'dark-mode-that-holds-up', title: 'Dark mode that actually holds up', excerpt: 'Contrast, shadows-to-borders, and the tokens that make it flip.', category: 'Design', date: 'Aug 14', read: '5 min' },
  { id: 'archetype-screens', title: 'Config-driven screens beat bespoke ones', excerpt: 'Lists, forms and details as objects, not components.', category: 'Engineering', date: 'Aug 7', read: '7 min' },
]
export function BlogListPage() {
  return (
    <>
      <PageHeader title="Blog" trail={[{ label: 'Blog' }, { label: 'All posts' }]}
        actions={<Button as={Link} to="/pages/blog/create" size="sm" color="primary" startContent={<Plus size={14} />}>Write</Button>} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {POSTS.map((p) => (
          <Surface key={p.id}>
            <div className="mb-3 h-40 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--app-primary-soft), var(--app-surface-3))' }} />
            <Chip size="sm" variant="soft" color="primary">{p.category}</Chip>
            <h3 className="mt-2 text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              <Link to="/pages/blog/details">{p.title}</Link>
            </h3>
            <p className="mt-1 text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>{p.excerpt}</p>
            <p className="mt-3 text-[0.74rem]" style={{ color: 'var(--app-fg-subtle)' }}>{p.date} · {p.read} read</p>
          </Surface>
        ))}
      </div>
    </>
  )
}
export function BlogDetailsPage() {
  const p = POSTS[0]
  return (
    <>
      <PageHeader title="Blog Details" trail={[{ label: 'Blog', to: '/pages/blog' }, { label: 'Article' }]} />
      <div className="mx-auto max-w-3xl">
        <Chip size="sm" variant="soft" color="primary">{p.category}</Chip>
        <h1 className="mt-2 text-2xl font-bold" style={{ color: 'var(--app-fg-strong)' }}>{p.title}</h1>
        <div className="mt-3 flex items-center gap-2">
          <Avatar src={avatarUrl('Wren Ashby')} name="Wren Ashby" size={28} />
          <span className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>Wren Ashby · {p.date} · {p.read} read</span>
        </div>
        <div className="my-5 h-56 rounded-xl" style={{ background: 'linear-gradient(135deg, var(--app-primary-soft), var(--app-surface-3))' }} />
        <div className="cearix-prose flex flex-col gap-4 text-[0.92rem] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
          <p>The token layer started small: a brand ramp and a handful of semantic roles. Within a month it had grown to cover every surface, border and text tier — and it stayed legible because each layer only ever referenced the one below it.</p>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--app-fg-strong)' }}>One layer per concern</h3>
          <p>Palette ramps feed semantic roles; semantic roles feed an app layer; components read only the app layer. Dark mode redefines a single block and everything follows.</p>
          <blockquote style={{ borderLeft: '3px solid var(--app-primary)', paddingLeft: 12, color: 'var(--app-fg-muted)' }}>
            "Composed components never touch a hex — only a token."
          </blockquote>
          <p>That discipline is what lets a rebrand happen in one file.</p>
        </div>
        <Divider className="my-6" />
        <Alert color="primary" variant="soft" title="Enjoyed this?" description="Read the rest of the engineering series." actions={<Button as={Link} to="/pages/blog" size="sm" color="primary">All posts</Button>} />
      </div>
    </>
  )
}

