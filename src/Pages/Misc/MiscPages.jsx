import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import {
  Calendar, Button, Modal, Chip, TextField, Avatar,
} from 'oks-ui'
import {
  PageHeader, PanelCard, Surface, KpiGrid, KpiCard, StatusChip,
} from '../../Components/ui'
import { avatarUrl } from '../../lib/avatar'
import { products } from '../../data/catalog'

/* -------------------------------------------------- Calendar */
const isoDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const EVENTS = {
  '2026-09-04': [{ label: 'Design review', tone: 'primary' }],
  '2026-09-09': [{ label: 'Board meeting', tone: 'danger' }],
  '2026-09-12': [{ label: 'Release 0.2', tone: 'success' }, { label: 'Retro', tone: 'info' }],
  '2026-09-18': [{ label: '1:1s', tone: 'warning' }],
  '2026-09-25': [{ label: 'Town hall', tone: 'primary' }],
}
export function CalendarPage() {
  const [selected, setSelected] = useState('2026-09-12')
  return (
    <>
      <PageHeader title="Calendar" trail={[{ label: 'Apps' }, { label: 'Calendar' }]}
        actions={<Button size="sm" color="primary" startContent={<Icons.Plus size={14} />}>New event</Button>} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="September 2026" className="lg:col-span-2">
          <Calendar
            month="2026-09"
            value={selected}
            onChange={setSelected}
            renderDay={(ctx) => {
              const key = isoDate(ctx.date)
              const evs = EVENTS[key]
              return (
                <div className="flex flex-col items-center">
                  <span>{ctx.date.getDate()}</span>
                  {evs && ctx.inMonth && (
                    <span className="mt-0.5 flex gap-0.5">
                      {evs.slice(0, 3).map((e, i) => (
                        <span key={i} className="h-1 w-1 rounded-full" style={{ background: `var(--app-${e.tone})` }} />
                      ))}
                    </span>
                  )}
                </div>
              )
            }}
          />
        </PanelCard>
        <PanelCard title={selected ? `Events · ${selected}` : 'Events'}>
          {(EVENTS[selected] || []).length === 0 ? (
            <p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>No events on this day.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {EVENTS[selected].map((e, i) => (
                <li key={i} className="flex items-center gap-2 rounded-md px-3 py-2" style={{ background: `var(--app-${e.tone}-soft)` }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${e.tone})` }} />
                  <span className="text-[0.83rem]" style={{ color: 'var(--app-fg-strong)' }}>{e.label}</span>
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </div>
    </>
  )
}

/* -------------------------------------------------- Gallery */
export function GalleryAppPage() {
  const [open, setOpen] = useState(null)
  const imgs = Array.from({ length: 12 }, (_, i) => `photo-${i}`)
  return (
    <>
      <PageHeader title="Gallery" trail={[{ label: 'Apps' }, { label: 'Gallery' }]} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {imgs.map((s, i) => (
          <button
            key={s}
            aria-label={`Open photo ${i + 1}`}
            onClick={() => setOpen(i)}
            className="group relative overflow-hidden rounded-lg"
            style={{ aspectRatio: '4 / 3', border: '1px solid var(--app-border)' }}
          >
            <img src={avatarUrl(s)} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          </button>
        ))}
      </div>
      <Modal isOpen={open !== null} onClose={() => setOpen(null)} title={`Photo ${open !== null ? open + 1 : ''}`} size="lg">
        {open !== null && (
          <img src={avatarUrl(imgs[open])} alt="" className="w-full rounded-lg" />
        )}
      </Modal>
    </>
  )
}

/* -------------------------------------------------- Confirmations (sweet-alert style) */
export function ConfirmationsPage() {
  const [dialog, setDialog] = useState(null)
  const configs = {
    success: { color: 'success', icon: Icons.CheckCircle2, title: 'All done', body: 'Your changes have been saved.' },
    warning: { color: 'warning', icon: Icons.AlertTriangle, title: 'Are you sure?', body: 'This will archive the selected items.' },
    danger: { color: 'danger', icon: Icons.Trash2, title: 'Delete permanently?', body: "This can't be undone." },
    info: { color: 'info', icon: Icons.Info, title: 'Heads up', body: 'A new version is available.' },
  }
  const c = dialog ? configs[dialog] : null
  return (
    <>
      <PageHeader title="Confirmations" trail={[{ label: 'Apps' }, { label: 'Confirmations' }]} />
      <PanelCard title="Confirmation dialogs" subtitle="Composed from oks-ui Modal (role=alertdialog)">
        <div className="flex flex-wrap gap-3">
          {Object.keys(configs).map((k) => (
            <Button key={k} color={configs[k].color} variant="soft" onPress={() => setDialog(k)}>
              {k[0].toUpperCase() + k.slice(1)}
            </Button>
          ))}
        </div>
      </PanelCard>
      <Modal
        isOpen={!!dialog}
        onClose={() => setDialog(null)}
        role="alertdialog"
        title={c?.title}
        actions={
          <>
            <Button variant="bordered" onPress={() => setDialog(null)}>Cancel</Button>
            <Button color={c?.color === 'info' ? 'primary' : c?.color} onPress={() => setDialog(null)}>Confirm</Button>
          </>
        }
      >
        {c && (
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `var(--app-${c.color}-soft)`, color: `var(--app-${c.color})` }}>
              <c.icon size={20} />
            </span>
            <p className="text-[0.88rem]" style={{ color: 'var(--app-fg-muted)' }}>{c.body}</p>
          </div>
        )}
      </Modal>
    </>
  )
}

/* -------------------------------------------------- File Manager */
const FOLDERS = [
  { name: 'Brand', files: 24, size: '1.2 GB' },
  { name: 'Product shots', files: 180, size: '4.6 GB' },
  { name: 'Contracts', files: 12, size: '88 MB' },
  { name: 'Exports', files: 42, size: '910 MB' },
]
const FILES = [
  { name: 'Q3 Brand Refresh.fig', type: 'Figma', size: '48.2 MB', modified: 'Aug 28', by: 'Wren Ashby' },
  { name: 'Homepage hero.png', type: 'Image', size: '3.1 MB', modified: 'Aug 27', by: 'Mira Kapoor' },
  { name: 'Supplier agreement.pdf', type: 'PDF', size: '640 KB', modified: 'Aug 24', by: 'Rosa Delgado' },
  { name: 'Catalog export.csv', type: 'Spreadsheet', size: '2.4 MB', modified: 'Aug 22', by: 'Theo Rees' },
  { name: 'Launch plan.docx', type: 'Document', size: '210 KB', modified: 'Aug 20', by: 'Kian Rees' },
]
export function FileManagerPage() {
  return (
    <>
      <PageHeader title="File Manager" trail={[{ label: 'Pages' }, { label: 'File Manager' }]}
        actions={<Button size="sm" color="primary" startContent={<Icons.Upload size={14} />}>Upload</Button>} />
      <KpiGrid cols={4} className="mb-4">
        <KpiCard label="Storage used" value="7.4 GB" tone="primary" icon={Icons.HardDrive} />
        <KpiCard label="Files" value="258" tone="info" icon={Icons.File} />
        <KpiCard label="Folders" value="4" tone="success" icon={Icons.Folder} />
        <KpiCard label="Shared" value="36" tone="warning" icon={Icons.Share2} />
      </KpiGrid>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {FOLDERS.map((f) => (
          <Surface key={f.name} bodyClassName="p-4">
            <Icons.Folder size={26} style={{ color: 'var(--app-primary)' }} />
            <p className="mt-2 text-[0.88rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{f.name}</p>
            <p className="text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{f.files} files · {f.size}</p>
          </Surface>
        ))}
      </div>
      <PanelCard title="Recent files" className="mt-4" bodyClassName="p-0">
        <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
          {FILES.map((f) => (
            <li key={f.name} className="flex items-center gap-3 px-5 py-3">
              <Icons.FileText size={18} style={{ color: 'var(--app-fg-muted)' }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.84rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{f.name}</p>
                <p className="text-[0.73rem]" style={{ color: 'var(--app-fg-muted)' }}>{f.type} · {f.size} · {f.modified} · {f.by}</p>
              </div>
              <Button size="sm" variant="ghost" isIconOnly aria-label="More"><Icons.MoreVertical size={15} /></Button>
            </li>
          ))}
        </ul>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Icons */
export function IconsPage() {
  const [q, setQ] = useState('')
  const names = useMemo(
    () =>
      Object.keys(Icons)
        .filter((n) => /^[A-Z]/.test(n) && !n.endsWith('Icon') && n !== 'createLucideIcon' && n !== 'default')
        .filter((n) => n.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 240),
    [q],
  )
  return (
    <>
      <PageHeader title="Icons" trail={[{ label: 'Icons' }]} />
      <PanelCard title={`lucide-react · showing ${names.length}`}>
        <TextField aria-label="Search icons" placeholder="Search icons…" value={q} onChange={setQ} startIcon={<Icons.Search size={14} />} className="mb-4 max-w-xs" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-10">
          {names.map((n) => {
            const Ico = Icons[n]
            return (
              <div key={n} className="flex flex-col items-center gap-1 rounded-md p-2 text-center hover:bg-[var(--app-surface-2)]">
                <Ico size={20} style={{ color: 'var(--app-fg)' }} />
                <span className="w-full truncate text-[0.62rem]" style={{ color: 'var(--app-fg-subtle)' }}>{n}</span>
              </div>
            )
          })}
        </div>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Widgets */
export function WidgetsPage() {
  return (
    <>
      <PageHeader title="Widgets" trail={[{ label: 'Widgets' }]} />
      <KpiGrid cols={4} className="mb-4">
        <KpiCard label="Revenue" value="$128.9k" delta={12.4} tone="primary" icon={Icons.DollarSign} />
        <KpiCard label="Signups" value="1,204" delta={8.1} tone="success" icon={Icons.UserPlus} />
        <KpiCard label="Churn" value="1.9%" delta={-0.4} tone="warning" icon={Icons.UserMinus} />
        <KpiCard label="NPS" value="62" delta={4} tone="info" icon={Icons.Smile} />
      </KpiGrid>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Team online">
          <div className="flex flex-col gap-3">
            {['Wren Ashby', 'Mira Kapoor', 'Theo Rees', 'Rosa Delgado'].map((n, i) => (
              <div key={n} className="flex items-center gap-2.5">
                <Avatar src={avatarUrl(n)} name={n} size={30} status={i < 3 ? 'online' : 'offline'} />
                <span className="text-[0.83rem]" style={{ color: 'var(--app-fg-strong)' }}>{n}</span>
                <Chip size="sm" variant="soft" color={i < 3 ? 'success' : 'default'} className="ml-auto">{i < 3 ? 'online' : 'away'}</Chip>
              </div>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Storage">
          <div className="flex flex-col gap-3">
            {[['Documents', 42, 'primary'], ['Media', 78, 'info'], ['Backups', 23, 'warning']].map(([l, v, c]) => (
              <div key={l}>
                <div className="mb-1 flex justify-between text-[0.8rem]"><span style={{ color: 'var(--app-fg)' }}>{l}</span><span style={{ color: 'var(--app-fg-muted)' }}>{v}%</span></div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-3)' }}>
                  <div className="h-full rounded-full" style={{ width: `${v}%`, background: `var(--app-${c})` }} />
                </div>
              </div>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Latest orders">
          <ul className="flex flex-col gap-2.5">
            {['CRX-4821', 'CRX-4820', 'CRX-4819', 'CRX-4818'].map((id, i) => (
              <li key={id} className="flex items-center justify-between text-[0.82rem]">
                <span style={{ color: 'var(--app-primary)' }}>{id}</span>
                <StatusChip status={['Delivered', 'Shipped', 'Processing', 'Pending'][i]} />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </>
  )
}

/* -------------------------------------------------- Cart & Checkout */

const CART = products.slice(0, 4).map((p, i) => ({ ...p, qty: i + 1 }))
export function CartPage() {
  const subtotal = CART.reduce((s, p) => s + p.price * p.qty, 0)
  return (
    <>
      <PageHeader title="Cart" trail={[{ label: 'E-Commerce' }, { label: 'Cart' }]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title={`${CART.length} items`} className="lg:col-span-2" bodyClassName="p-0">
          <ul className="divide-y" style={{ borderColor: 'var(--app-border)' }}>
            {CART.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="h-12 w-12 shrink-0 rounded-md" style={{ background: 'var(--app-surface-3)' }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.85rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</p>
                  <p className="text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{p.category} · qty {p.qty}</p>
                </div>
                <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>${(p.price * p.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </PanelCard>
        <PanelCard title="Summary">
          <dl className="flex flex-col gap-2 text-[0.85rem]">
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Subtotal</dt><dd style={{ color: 'var(--app-fg-strong)' }}>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Shipping</dt><dd style={{ color: 'var(--app-fg-strong)' }}>$12.00</dd></div>
            <div className="flex justify-between border-t pt-2 font-semibold" style={{ borderColor: 'var(--app-border)' }}><dt>Total</dt><dd>${(subtotal + 12).toFixed(2)}</dd></div>
          </dl>
          <Button as={Link} to="/apps/ecommerce/checkout" color="primary" fullWidth className="mt-4">Checkout</Button>
        </PanelCard>
      </div>
    </>
  )
}

export function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" trail={[{ label: 'E-Commerce' }, { label: 'Checkout' }]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PanelCard title="Shipping details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField name="name" label="Full name" />
              <TextField name="email" label="Email" type="email" />
              <TextField name="address" label="Address" className="sm:col-span-2" />
              <TextField name="city" label="City" />
              <TextField name="zip" label="Postal code" />
            </div>
            <p className="mt-4 text-[0.8rem]" style={{ color: 'var(--app-fg-subtle)' }}>
              Payment is disabled in this demo — no card details are collected.
            </p>
          </PanelCard>
        </div>
        <PanelCard title="Order">
          <dl className="flex flex-col gap-2 text-[0.85rem]">
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Items (4)</dt><dd style={{ color: 'var(--app-fg-strong)' }}>$742.00</dd></div>
            <div className="flex justify-between"><dt style={{ color: 'var(--app-fg-muted)' }}>Shipping</dt><dd style={{ color: 'var(--app-fg-strong)' }}>$12.00</dd></div>
            <div className="flex justify-between border-t pt-2 font-semibold" style={{ borderColor: 'var(--app-border)' }}><dt>Total</dt><dd>$754.00</dd></div>
          </dl>
          <Button color="primary" fullWidth className="mt-4" onPress={() => window.alert('Demo only')}>Place order</Button>
        </PanelCard>
      </div>
    </>
  )
}

/* -------------------------------------------------- Nested menu demo pages */
function NestedShell({ crumbs, title }) {
  return (
    <>
      <PageHeader title={title} trail={crumbs} />
      <Surface bodyClassName="py-14 text-center">
        <p className="text-[0.9rem]" style={{ color: 'var(--app-fg-muted)' }}>
          This page demonstrates a {crumbs.length}-level nested navigation entry.
        </p>
      </Surface>
    </>
  )
}
export function NestedL1() {
  return <NestedShell title="Level 1" crumbs={[{ label: 'Nested Menu' }, { label: 'Level 1' }]} />
}
export function NestedL21() {
  return <NestedShell title="Level 2.1" crumbs={[{ label: 'Nested Menu' }, { label: 'Level 2' }, { label: 'Level 2.1' }]} />
}
export function NestedL22() {
  return <NestedShell title="Level 2.2" crumbs={[{ label: 'Nested Menu' }, { label: 'Level 2' }, { label: 'Level 2.2' }]} />
}

/* -------------------------------------------------- Maps */
const REGIONS = [
  { name: 'North America', value: 42, tone: 700 },
  { name: 'Europe', value: 31, tone: 600 },
  { name: 'Asia Pacific', value: 18, tone: 400 },
  { name: 'Latin America', value: 6, tone: 300 },
  { name: 'Africa', value: 3, tone: 200 },
]
export function RegionMapPage() {
  return (
    <>
      <PageHeader title="Region Map" trail={[{ label: 'Maps' }, { label: 'Region' }]} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard title="Sessions by region" className="lg:col-span-2">
          <svg viewBox="0 0 500 250" className="w-full" role="img" aria-label="Stylised world regions">
            {REGIONS.map((r, i) => (
              <rect key={r.name} x={20 + i * 95} y={60} width={80} height={120} rx={8}
                fill={`var(--oks-color-primary-${r.tone})`} opacity={0.85}>
                <title>{r.name}: {r.value}%</title>
              </rect>
            ))}
            {REGIONS.map((r, i) => (
              <text key={r.name} x={60 + i * 95} y={200} textAnchor="middle" fontSize="9" fill="var(--app-fg-muted)">
                {r.name.split(' ')[0]}
              </text>
            ))}
          </svg>
          <p className="mt-2 text-[0.75rem]" style={{ color: 'var(--app-fg-subtle)' }}>
            Composed SVG choropleth — oks-ui ships no geo chart type.
          </p>
        </PanelCard>
        <PanelCard title="Breakdown">
          <ul className="flex flex-col gap-2.5">
            {REGIONS.map((r) => (
              <li key={r.name} className="flex items-center justify-between text-[0.83rem]">
                <span style={{ color: 'var(--app-fg-muted)' }}>{r.name}</span>
                <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.value}%</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </>
  )
}
export function MarkersMapPage() {
  const markers = [
    { city: 'Portland', x: 90, y: 90, orders: 320 },
    { city: 'Bristol', x: 250, y: 70, orders: 512 },
    { city: 'Lyon', x: 270, y: 95, orders: 288 },
    { city: 'Kyoto', x: 430, y: 105, orders: 176 },
    { city: 'Austin', x: 120, y: 130, orders: 244 },
  ]
  return (
    <>
      <PageHeader title="Markers Map" trail={[{ label: 'Maps' }, { label: 'Markers' }]} />
      <PanelCard title="Fulfilment centres">
        <svg viewBox="0 0 500 220" className="w-full rounded-lg" style={{ background: 'var(--app-surface-2)' }} role="img" aria-label="Marker map">
          <rect x={0} y={0} width={500} height={220} fill="var(--app-surface-2)" />
          {markers.map((m) => (
            <g key={m.city}>
              <circle cx={m.x} cy={m.y} r={Math.sqrt(m.orders) / 1.6} fill="var(--oks-color-primary-500)" opacity={0.35} />
              <circle cx={m.x} cy={m.y} r={4} fill="var(--oks-color-primary-600)" />
              <text x={m.x + 8} y={m.y + 3} fontSize="9" fill="var(--app-fg)">{m.city}</text>
            </g>
          ))}
        </svg>
      </PanelCard>
    </>
  )
}
