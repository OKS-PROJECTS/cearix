import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, Info, Star, Download, Plus, ChevronRight, Heart, Trash2 } from 'lucide-react'
import {
  Alert, Loader, Progress, CircularProgress, Skeleton, EmptyState,
  Button, ButtonGroup, Badge, Chip, Divider, Avatar, AvatarGroup,
  Tabs, Tab, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Breadcrumbs, BreadcrumbItem, Pagination, PaginationSummary, toast, Card, CardBody,
} from 'oks-ui'
import { GalleryPage, Demo, Stack } from './parts'
import { COLORS, VARIANTS, SIZES } from './constants'
import { avatarUrl } from '../../lib/avatar'

const G = '/ui/alerts'

export function AlertsPage() {
  return (
    <GalleryPage title="Alerts" groupTo={G}>
      <Demo title="Colors" className="flex flex-col gap-3">
        {COLORS.filter((c) => c !== 'default').map((c) => (
          <Alert key={c} color={c} title={`${c[0].toUpperCase()}${c.slice(1)} alert`} description="A short, useful message about what just happened." />
        ))}
      </Demo>
      <Demo title="Variants" className="flex flex-col gap-3">
        {['solid', 'soft', 'bordered'].map((v) => (
          <Alert key={v} variant={v} color="primary" title={`${v} variant`} description="Same alert, three emphasis levels." />
        ))}
      </Demo>
      <Demo title="With actions" className="flex flex-col gap-3">
        <Alert
          color="warning"
          title="Storage almost full"
          description="You've used 92% of your plan's storage."
          isClosable
          actions={<Button size="sm" variant="soft" color="warning">Upgrade</Button>}
        />
      </Demo>
    </GalleryPage>
  )
}

export function BadgePage() {
  return (
    <GalleryPage title="Badge" groupTo={G}>
      <Demo title="Count badges">
        {['primary', 'success', 'danger', 'warning'].map((c) => (
          <span key={c} className="relative inline-flex">
            <Button isIconOnly variant="soft" aria-label="Notifications"><Bell size={16} /></Button>
            <Badge content={c === 'danger' ? '9+' : '3'} color={c} size="sm" className="absolute -right-1 -top-1" />
          </span>
        ))}
      </Demo>
      <Demo title="Dot badges">
        {['success', 'warning', 'danger'].map((c) => (
          <span key={c} className="relative inline-flex">
            <Avatar name="Cassian Holt" src={avatarUrl(c)} />
            <Badge isDot color={c} className="absolute -right-0.5 -top-0.5" />
          </span>
        ))}
      </Demo>
      <Demo title="Chips as tags">
        {COLORS.map((c) => (
          <Chip key={c} color={c} variant="soft">{c}</Chip>
        ))}
      </Demo>
    </GalleryPage>
  )
}

export function BreadcrumbsPage() {
  return (
    <GalleryPage title="Breadcrumb" groupTo={G}>
      <Demo title="Default">
        <Breadcrumbs aria-label="Example">
          <BreadcrumbItem as={Link} to="/dashboards/sales">Home</BreadcrumbItem>
          <BreadcrumbItem as={Link} to="/apps/ecommerce/products">Products</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Aster Table Lamp</BreadcrumbItem>
        </Breadcrumbs>
      </Demo>
      <Demo title="Collapsed">
        <Breadcrumbs aria-label="Deep" maxItems={3}>
          <BreadcrumbItem as={Link} to="/">Home</BreadcrumbItem>
          <BreadcrumbItem as={Link} to="/">Catalog</BreadcrumbItem>
          <BreadcrumbItem as={Link} to="/">Lighting</BreadcrumbItem>
          <BreadcrumbItem as={Link} to="/">Table lamps</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Aster</BreadcrumbItem>
        </Breadcrumbs>
      </Demo>
    </GalleryPage>
  )
}

export function ButtonsPage() {
  return (
    <GalleryPage title="Buttons" groupTo={G}>
      <Demo title="Variants">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} color="primary">{v}</Button>
        ))}
      </Demo>
      <Demo title="Colors">
        {COLORS.map((c) => (
          <Button key={c} color={c}>{c}</Button>
        ))}
      </Demo>
      <Demo title="Sizes">
        {SIZES.map((s) => (
          <Button key={s} size={s} color="primary">{s}</Button>
        ))}
      </Demo>
      <Demo title="With icons & states">
        <Button color="primary" startContent={<Plus size={15} />}>New</Button>
        <Button variant="bordered" endContent={<Download size={15} />}>Export</Button>
        <Button isIconOnly variant="soft" aria-label="Like"><Heart size={16} /></Button>
        <Button color="primary" isLoading>Saving</Button>
        <Button color="danger" variant="soft" isDisabled startContent={<Trash2 size={15} />}>Delete</Button>
      </Demo>
    </GalleryPage>
  )
}

export function ButtonGroupPage() {
  return (
    <GalleryPage title="Button Group" groupTo={G}>
      <Demo title="Segmented actions">
        <ButtonGroup color="primary" variant="bordered">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </Demo>
      <Demo title="Sizes">
        {SIZES.map((s) => (
          <ButtonGroup key={s} size={s} color="primary">
            <Button>Prev</Button>
            <Button>Next</Button>
          </ButtonGroup>
        ))}
      </Demo>
    </GalleryPage>
  )
}

export function CardsPage() {
  return (
    <GalleryPage title="Cards" groupTo={G}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Simple', 'Hoverable', 'Pressable'].map((kind) => (
          <Card
            key={kind}
            isHoverable={kind === 'Hoverable'}
            isPressable={kind === 'Pressable'}
            onPress={kind === 'Pressable' ? () => toast.info('Card pressed') : undefined}
            style={{ background: 'var(--app-surface)', border: 'var(--app-card-border)' }}
            shadow="none"
          >
            <CardBody className="p-5">
              <h3 className="text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{kind} card</h3>
              <p className="mt-1 text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>
                Built on the oks-ui Card primitive with our --app-* surface tokens.
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </GalleryPage>
  )
}

export function DropdownsPage() {
  return (
    <GalleryPage title="Dropdowns" groupTo={G}>
      <Demo title="Menu">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" endContent={<ChevronRight size={14} />}>Actions</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Actions">
            <DropdownItem key="edit" title="Edit" />
            <DropdownItem key="dup" title="Duplicate" />
            <DropdownItem key="archive" title="Archive" />
            <DropdownItem key="delete" title="Delete" color="danger" />
          </DropdownMenu>
        </Dropdown>
      </Demo>
      <Demo title="With descriptions">
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary">Create</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Create">
            <DropdownItem key="p" title="Product" description="Add a new catalog item" />
            <DropdownItem key="o" title="Order" description="Record a manual order" />
            <DropdownItem key="i" title="Invoice" description="Bill a client" />
          </DropdownMenu>
        </Dropdown>
      </Demo>
    </GalleryPage>
  )
}

export function ImagesPage() {
  const imgs = [1, 2, 3]
  return (
    <GalleryPage title="Images & Figures" groupTo={G}>
      <Demo title="Rounded & bordered">
        {imgs.map((i) => (
          <img
            key={i}
            src={avatarUrl('img' + i)}
            alt=""
            width={96}
            height={96}
            className="rounded-xl object-cover"
            style={{ border: '1px solid var(--app-border)' }}
          />
        ))}
      </Demo>
      <Demo title="Avatar groups">
        <AvatarGroup max={4}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Avatar key={i} src={avatarUrl('grp' + i)} name={'User ' + i} />
          ))}
        </AvatarGroup>
      </Demo>
    </GalleryPage>
  )
}

export function ListGroupPage() {
  const items = [
    { label: 'Dashboard overview', meta: 'Updated 2h ago', icon: Star },
    { label: 'Payment settings', meta: '3 methods', icon: Check },
    { label: 'API keys', meta: '2 active', icon: Info },
  ]
  return (
    <GalleryPage title="List Group" groupTo={G}>
      <Demo title="Composed from tokens" className="w-full">
        <ul className="w-full divide-y rounded-lg" style={{ borderColor: 'var(--app-border)', border: 'var(--app-card-border)' }}>
          {items.map((it) => (
            <li key={it.label} className="flex items-center gap-3 px-4 py-3 text-[0.85rem]">
              <it.icon size={16} style={{ color: 'var(--app-primary)' }} />
              <span style={{ color: 'var(--app-fg-strong)' }}>{it.label}</span>
              <span className="ml-auto" style={{ color: 'var(--app-fg-muted)' }}>{it.meta}</span>
            </li>
          ))}
        </ul>
      </Demo>
    </GalleryPage>
  )
}

export function TabsPage() {
  return (
    <GalleryPage title="Navs & Tabs" groupTo={G}>
      {['solid', 'bordered', 'light', 'underlined'].map((v) => (
        <Demo key={v} title={`${v} variant`} className="w-full">
          <Tabs aria-label={v} variant={v} color="primary" className="w-full">
            <Tab key="overview" title="Overview"><p className="pt-3 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Overview panel content.</p></Tab>
            <Tab key="activity" title="Activity"><p className="pt-3 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Activity panel content.</p></Tab>
            <Tab key="settings" title="Settings"><p className="pt-3 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Settings panel content.</p></Tab>
          </Tabs>
        </Demo>
      ))}
    </GalleryPage>
  )
}

export function ObjectFitPage() {
  const fits = ['cover', 'contain', 'fill', 'none']
  return (
    <GalleryPage title="Object Fit" groupTo={G}>
      <Demo title="object-fit utilities">
        {fits.map((f) => (
          <figure key={f} className="text-center">
            <img
              src={avatarUrl('fit' + f)}
              alt=""
              className={`h-28 w-40 rounded-lg object-${f}`}
              style={{ border: '1px solid var(--app-border)', background: 'var(--app-surface-2)' }}
            />
            <figcaption className="mt-1 text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{f}</figcaption>
          </figure>
        ))}
      </Demo>
    </GalleryPage>
  )
}

export function PaginationPage() {
  const [page, setPage] = useState(3)
  return (
    <GalleryPage title="Pagination" groupTo={G}>
      <Demo title="Interactive" className="flex flex-col gap-3">
        <Pagination page={page} pageCount={12} onChange={setPage} showEdges />
        <PaginationSummary page={page} pageSize={10} total={118} className="text-[0.8rem]" />
      </Demo>
      <Demo title="Sizes" className="flex flex-col gap-3">
        {SIZES.map((s) => (
          <Pagination key={s} size={s} defaultPage={2} pageCount={6} />
        ))}
      </Demo>
    </GalleryPage>
  )
}

export function PopoversPage() {
  return (
    <GalleryPage title="Popovers" groupTo={G}>
      <Demo title="Rich tooltip">
        <Tooltip
          content={
            <div className="max-w-[200px] p-1 text-left">
              <p className="font-semibold">Keyboard shortcut</p>
              <p className="text-[0.78rem] opacity-80">Press ⌘K to open the command palette from anywhere.</p>
            </div>
          }
        >
          <Button variant="bordered">Hover for details</Button>
        </Tooltip>
      </Demo>
      <Demo title="Menu popover">
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary">Open popover</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Popover">
            <DropdownItem key="a" title="Share link" />
            <DropdownItem key="b" title="Embed" />
            <DropdownItem key="c" title="Export PDF" />
          </DropdownMenu>
        </Dropdown>
      </Demo>
    </GalleryPage>
  )
}

export function ProgressPage() {
  return (
    <GalleryPage title="Progress" groupTo={G}>
      <Demo title="Linear" className="flex w-full flex-col gap-4">
        {[
          ['primary', 72],
          ['success', 46],
          ['warning', 88],
          ['danger', 24],
        ].map(([c, v]) => (
          <Progress key={c} value={v} color={c} label={`${c} · ${v}%`} showValueLabel />
        ))}
      </Demo>
      <Demo title="Circular">
        {[25, 50, 75, 100].map((v) => (
          <CircularProgress key={v} value={v} color="primary" showValueLabel aria-label={`${v}%`} />
        ))}
      </Demo>
      <Demo title="Indeterminate">
        <Progress aria-label="Loading" />
      </Demo>
    </GalleryPage>
  )
}

export function SpinnersPage() {
  const variants = ['ring-inset', 'ring-clip', 'ring-outset', 'ring-dual', 'pulse', 'dots-roll', 'dots-sweep']
  return (
    <GalleryPage title="Spinners" groupTo={G}>
      <Demo title="Variants">
        {variants.map((v) => (
          <div key={v} className="flex flex-col items-center gap-2">
            <Loader variant={v} size={28} color="primary" />
            <span className="text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>{v}</span>
          </div>
        ))}
      </Demo>
      <Demo title="Skeleton placeholders" className="w-full">
        <div className="flex w-full flex-col gap-3">
          <Skeleton variant="text" lines={3} />
          <Skeleton variant="rect" height={80} radius="md" />
        </div>
      </Demo>
      <Demo title="Empty state" className="w-full">
        <EmptyState title="No results" description="Try adjusting your filters or search terms." />
      </Demo>
    </GalleryPage>
  )
}

export function ToastsPage() {
  return (
    <GalleryPage title="Toasts" groupTo={G}>
      <Demo title="Trigger a toast">
        <Button color="success" variant="soft" onPress={() => toast.success('Saved successfully')}>Success</Button>
        <Button color="info" variant="soft" onPress={() => toast.info('New update available')}>Info</Button>
        <Button color="warning" variant="soft" onPress={() => toast.warning('Approaching your limit')}>Warning</Button>
        <Button color="danger" variant="soft" onPress={() => toast.error('Could not connect')}>Error</Button>
        <Button
          variant="bordered"
          onPress={() =>
            toast.promise(new Promise((res) => setTimeout(res, 1400)), {
              loading: 'Uploading…',
              success: 'Upload complete',
              error: 'Upload failed',
            })
          }
        >
          Promise
        </Button>
      </Demo>
    </GalleryPage>
  )
}

export function TooltipsPage() {
  const places = ['top', 'bottom', 'left', 'right']
  return (
    <GalleryPage title="Tooltips" groupTo={G}>
      <Demo title="Placements">
        {places.map((p) => (
          <Tooltip key={p} content={`${p} tooltip`} placement={p}>
            <Button variant="bordered">{p}</Button>
          </Tooltip>
        ))}
      </Demo>
      <Demo title="Colors">
        {['primary', 'success', 'danger'].map((c) => (
          <Tooltip key={c} content={`${c}`} color={c}>
            <Button variant="soft" color={c}>{c}</Button>
          </Tooltip>
        ))}
      </Demo>
    </GalleryPage>
  )
}

export function TypographyPage() {
  return (
    <GalleryPage title="Typography" groupTo={G}>
      <Demo title="Headings" className="w-full">
        <Stack>
          {[1, 2, 3, 4, 5].map((n) => {
            const Tag = `h${n}`
            const size = ['1.6rem', '1.35rem', '1.15rem', '1rem', '0.9rem'][n - 1]
            return (
              <Tag key={n} style={{ fontSize: size, fontWeight: 600, color: 'var(--app-fg-strong)' }}>
                Heading {n} — the quick brown fox
              </Tag>
            )
          })}
        </Stack>
      </Demo>
      <Demo title="Body & inline" className="w-full">
        <div className="cearix-prose max-w-2xl text-[0.9rem] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
          <p>
            Cearix uses <strong>Inter</strong> at a 13px base with a tight modular scale.
            Links like <a href="#top" className="underline underline-offset-2">this one</a> use the primary token, and{' '}
            <code style={{ background: 'var(--app-surface-3)', padding: '0 4px', borderRadius: 4 }}>inline code</code> gets a subtle fill.
          </p>
          <Divider className="my-3" />
          <blockquote style={{ borderLeft: '3px solid var(--app-primary)', paddingLeft: 12, color: 'var(--app-fg-muted)' }}>
            "Every pixel of it is built with oks-ui."
          </blockquote>
        </div>
      </Demo>
    </GalleryPage>
  )
}
