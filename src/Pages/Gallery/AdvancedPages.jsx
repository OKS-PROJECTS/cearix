import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Menu as MenuIcon } from 'lucide-react'
import {
  Accordion, AccordionItem, Modal, Drawer, Skeleton, RangeField,
  Button, Chip, Avatar,
} from 'oks-ui'
import { GalleryPage, Demo } from './parts'
import { avatarUrl } from '../../lib/avatar'

const GT = '/advanced-ui/accordions'
const wrap = (title, children) => (
  <GalleryPage title={title} group="Advanced UI" groupTo={GT}>{children}</GalleryPage>
)

const FAQ = [
  ['Is every component really oks-ui?', 'Yes — the shell, tables, charts and forms are all oks-ui primitives or composed from them.'],
  ['Can I rebrand it?', 'Repoint the brand ramp in theme.css; light, dark and every component follow.'],
  ['Does it ship with a backend?', 'No. All data is deterministic mock data under src/data/.'],
]

export function AccordionsPage() {
  return wrap('Accordions & Collapse', (
    <>
      {['light', 'bordered', 'splitted'].map((v) => (
        <Demo key={v} title={`${v} variant`} className="w-full">
          <Accordion variant={v} selectionMode="multiple" defaultExpandedKeys={['0']}>
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={String(i)} itemKey={String(i)} title={q}>
                <p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>{a}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      ))}
    </>
  ))
}

export function CarouselPage() {
  const [i, setI] = useState(0)
  const slides = ['Dashboards', 'Tables', 'Charts', 'Forms']
  return wrap('Carousel', (
    <Demo title="Composed slider (oks-ui ships no carousel)" className="w-full">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-xl" style={{ background: 'var(--app-surface-2)', border: '1px solid var(--app-border)' }}>
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${i * 100}%)` }}>
            {slides.map((s) => (
              <div key={s} className="flex h-52 w-full shrink-0 items-center justify-center text-xl font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {s}
              </div>
            ))}
          </div>
          <Button isIconOnly size="sm" variant="soft" className="absolute left-2 top-1/2 -translate-y-1/2" aria-label="Previous" onPress={() => setI((v) => (v - 1 + slides.length) % slides.length)}>
            <ChevronLeft size={16} />
          </Button>
          <Button isIconOnly size="sm" variant="soft" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Next" onPress={() => setI((v) => (v + 1) % slides.length)}>
            <ChevronRight size={16} />
          </Button>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {slides.map((s, idx) => (
            <button key={s} aria-label={`Go to ${s}`} onClick={() => setI(idx)} className="h-1.5 w-6 rounded-full" style={{ background: idx === i ? 'var(--app-primary)' : 'var(--app-border-strong)' }} />
          ))}
        </div>
      </div>
    </Demo>
  ))
}

/* Assorted draggable content cards laid out in two columns — matches the
   reference's sortable-widget grid (not a kanban board). oks-ui ships no
   masonry / sortable-grid, so we drive it with <Board> (2 columns, headers
   hidden) which gives real pointer + keyboard drag-and-drop. */
const DRAG_CARDS = [
  {
    id: 'c1', column: 'a', kind: 'text',
    title: 'Card with a read-more button',
    body: 'There are many variations of passages available, but the majority have suffered alteration in some form, by injected humour or randomised words.',
    action: 'Read more',
  },
  {
    id: 'c2', column: 'b', kind: 'image', seed: 'drag-forest',
    title: 'Image overlays are awesome',
    body: 'The majority have suffered alteration in some form, by injected humour.',
    meta: 'Last updated 3 mins ago',
  },
  {
    id: 'c3', column: 'a', kind: 'quote',
    body: 'The best and most beautiful things in the world cannot be seen — they must be felt with the heart.',
    cite: 'Helen Keller',
  },
  {
    id: 'c4', column: 'b', kind: 'profile', seed: 'samantha-sid',
    name: 'Samantha Reyes', sub: 'On leave for 1 month',
  },
  {
    id: 'c5', column: 'a', kind: 'image', seed: 'drag-hills',
    title: 'Beautiful gradient overlays',
    body: 'Randomised words which don\'t look even slightly believable.',
    meta: 'Last updated 8 mins ago',
  },
  {
    id: 'c6', column: 'b', kind: 'collapse',
    title: 'Card with a collapse toggle',
    body: 'There are many variations of passages available, but the majority have suffered alteration in some form.',
  },
]

function DragCard({ it, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      className="cearix-dragcard select-none"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {it.kind === 'image' && (
        <div className="relative overflow-hidden rounded-lg" style={{ minHeight: 160 }}>
          <img src={avatarUrl(it.seed)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,29,.1), rgba(20,16,29,.82))' }} />
          <div className="relative flex h-full flex-col justify-end gap-1 p-4 text-white" style={{ minHeight: 160 }}>
            <h3 className="text-[0.95rem] font-semibold">{it.title}</h3>
            <p className="text-[0.78rem] text-white/85">{it.body}</p>
            <p className="mt-1 text-[0.7rem] text-white/60">{it.meta}</p>
          </div>
        </div>
      )}
      {it.kind === 'quote' && (
        <div className="rounded-lg p-5 text-white" style={{ background: 'linear-gradient(135deg, var(--oks-color-primary-500), var(--oks-color-primary-700))' }}>
          <p className="text-[0.9rem] font-medium leading-snug">{it.body}</p>
          <p className="mt-2 text-[0.8rem] text-white/75">— {it.cite}</p>
        </div>
      )}
      {it.kind === 'profile' && (
        <div className="flex items-center gap-3 rounded-lg p-4 text-white" style={{ background: 'linear-gradient(135deg, var(--oks-color-success-500), var(--oks-color-success-700))' }}>
          <Avatar src={avatarUrl(it.seed)} name={it.name} size={44} isBordered />
          <div>
            <p className="text-[0.9rem] font-semibold">{it.name}</p>
            <p className="text-[0.78rem] text-white/80">{it.sub}</p>
          </div>
        </div>
      )}
      {(it.kind === 'text' || it.kind === 'collapse') && (
        <div className="rounded-lg p-5" style={{ background: 'var(--app-surface)', border: '1px solid var(--app-border)' }}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{it.title}</h3>
            {it.kind === 'collapse' && <ChevronRight size={15} style={{ color: 'var(--app-fg-muted)' }} />}
          </div>
          <p className="mt-2 text-[0.82rem]" style={{ color: 'var(--app-fg-muted)' }}>{it.body}</p>
          {it.action && <Button size="sm" color="primary" className="mt-3">{it.action}</Button>}
        </div>
      )}
    </div>
  )
}

export function DraggableCardsPage() {
  const [items, setItems] = useState(DRAG_CARDS)
  const [dragId, setDragId] = useState(null)

  const reorder = (targetId) => {
    setItems((prev) => {
      if (!dragId || dragId === targetId) return prev
      const from = prev.findIndex((x) => x.id === dragId)
      const to = prev.findIndex((x) => x.id === targetId)
      if (from < 0 || to < 0) return prev
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  return wrap('Draggable Cards', (
    <Demo title="Drag any card to re-order" className="w-full">
      <div className="columns-1 gap-4 sm:gap-6 lg:columns-2 [&>*]:mb-4 sm:[&>*]:mb-6">
        {items.map((it) => (
          <div key={it.id} className="break-inside-avoid">
            <DragCard
              it={it}
              onDragStart={(e) => {
                setDragId(it.id)
                e.dataTransfer.effectAllowed = 'move'
                document.body.classList.add('cearix-dragging')
              }}
              onDragOver={(e) => {
                e.preventDefault()
                reorder(it.id)
              }}
              onDrop={(e) => {
                e.preventDefault()
                setDragId(null)
                document.body.classList.remove('cearix-dragging')
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.74rem]" style={{ color: 'var(--app-fg-subtle)' }}>
        Composed with the native drag-and-drop API — oks-ui ships no sortable grid.
      </p>
    </Demo>
  ))
}

export function ModalsPage() {
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  return wrap('Modals & Closes', (
    <Demo title="Dialogs">
      <Button color="primary" onPress={() => setOpen(true)}>Open modal</Button>
      <Button color="danger" variant="soft" onPress={() => setConfirm(true)}>Confirm dialog</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Invite teammates" actions={<Button color="primary" onPress={() => setOpen(false)}>Send invites</Button>}>
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Enter email addresses separated by commas. They'll get an invite to the Cearix workspace.
        </p>
      </Modal>
      <Modal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        role="alertdialog"
        title="Delete project?"
        actions={<><Button variant="bordered" onPress={() => setConfirm(false)}>Cancel</Button><Button color="danger" onPress={() => setConfirm(false)}>Delete</Button></>}
      >
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>This can't be undone.</p>
      </Modal>
    </Demo>
  ))
}

export function NavbarPage() {
  return wrap('Navbar', (
    <Demo title="Composed top navbar" className="w-full">
      <div className="flex w-full items-center gap-4 rounded-lg px-4 py-3" style={{ background: 'var(--app-surface-2)', border: '1px solid var(--app-border)' }}>
        <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>Cearix</span>
        <nav className="hidden gap-4 text-[0.83rem] sm:flex" style={{ color: 'var(--app-fg-muted)' }}>
          <a href="#a">Product</a><a href="#b">Docs</a><a href="#c">Pricing</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost" isIconOnly aria-label="Menu" className="sm:hidden"><MenuIcon size={16} /></Button>
          <Button size="sm" color="primary">Sign in</Button>
        </div>
      </div>
    </Demo>
  ))
}

export function OffcanvasPage() {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState('right')
  return wrap('Offcanvas', (
    <Demo title="Slide-in panels (oks-ui Drawer)">
      {['left', 'right', 'top', 'bottom'].map((p) => (
        <Button key={p} variant="bordered" onPress={() => { setPos(p); setOpen(true) }}>{p}</Button>
      ))}
      <Drawer isOpen={open} onClose={() => setOpen(false)} position={pos} title="Filters">
        <p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Drawer content — position: {pos}.
        </p>
      </Drawer>
    </Demo>
  ))
}

export function PlaceholdersPage() {
  return wrap('Placeholders', (
    <>
      <Demo title="Card skeleton" className="w-full">
        <div className="w-full max-w-sm rounded-lg p-4" style={{ border: '1px solid var(--app-border)' }}>
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={40} height={40} />
            <div className="flex-1"><Skeleton variant="text" lines={2} /></div>
          </div>
          <Skeleton variant="rect" height={120} radius="md" className="mt-3" />
        </div>
      </Demo>
      <Demo title="List skeleton" className="w-full">
        <div className="flex w-full flex-col gap-2">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} variant="rect" height={44} radius="md" />)}
        </div>
      </Demo>
    </>
  ))
}

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} aria-label={`${n} stars`} onClick={() => onChange(n)}>
          <Star size={22} style={{ color: n <= value ? 'var(--app-warning)' : 'var(--app-border-strong)', fill: n <= value ? 'var(--app-warning)' : 'transparent' }} />
        </button>
      ))}
    </div>
  )
}

export function RatingsPage() {
  const [v, setV] = useState(4)
  return wrap('Ratings', (
    <>
      <Demo title="Interactive (composed — oks-ui ships no rating)">
        <Stars value={v} onChange={setV} />
        <Chip size="sm" variant="soft" color="warning">{v}.0</Chip>
      </Demo>
      <Demo title="Read-only summary" className="w-full">
        {[5, 4, 3, 2, 1].map((r) => (
          <div key={r} className="flex w-full items-center gap-3 text-[0.8rem]">
            <span style={{ color: 'var(--app-fg-muted)' }}>{r}★</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-3)' }}>
              <div className="h-full rounded-full" style={{ width: `${[68, 22, 6, 3, 1][5 - r]}%`, background: 'var(--app-warning)' }} />
            </div>
          </div>
        ))}
      </Demo>
    </>
  ))
}

export function SlidersPage() {
  return wrap('Sliders', (
    <>
      <Demo title="Single value" className="w-full">
        <RangeField name="volume" label="Volume" min={0} max={100} defaultValue={60} showValue />
      </Demo>
      <Demo title="Range" className="w-full">
        <RangeField name="price" label="Price range" selection="range" min={0} max={500} defaultValue={{ min: 80, max: 320 }} showValue formatValue={(n) => `$${n}`} />
      </Demo>
      <Demo title="With marks" className="w-full">
        <RangeField name="rating" label="Minimum rating" min={0} max={5} step={1} defaultValue={3} marks={[{ value: 0, label: '0' }, { value: 5, label: '5' }]} showValue />
      </Demo>
    </>
  ))
}
