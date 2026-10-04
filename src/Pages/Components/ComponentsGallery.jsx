import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MousePointerClick, MessageSquareWarning, Layers, Compass, Table2, TextCursorInput,
  PieChart, Blocks, ArrowRight,
} from 'lucide-react'
import {
  Button, ButtonGroup, Alert, Loader, Progress, CircularProgress, Skeleton, EmptyState,
  Modal, Drawer, Backdrop, Portal, useCommandPalette, CommandPalette,
  Tabs, Tab, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Breadcrumbs, BreadcrumbItem, Pagination, SegmentedControl, Accordion, AccordionItem,
  Avatar, AvatarGroup, AvatarIcon, Badge, Chip, Divider, PageTitle,
  Card, CardBody, Table, Stat, StatGroup, Timeline, TimelineItem, Calendar, Board,
  Form, FormFieldSet, LoopFields, loopGroupToArray, toast,
  TextField, PasswordField, OtpField, SelectField, SwitchField, Checkbox, Radio,
  RangeField, PhoneField, DatePickerField, FileField, TextAreaField,
} from 'oks-ui'
import { PageHeader, PanelCard, Surface, ChartCard } from '../../Components/ui'
import { GalleryPage, Demo } from '../Gallery/parts'
import { avatarUrl } from '../../lib/avatar'

const GROUPS = [
  { slug: 'actions', label: 'Actions', icon: MousePointerClick, blurb: 'Button, ButtonGroup' },
  { slug: 'feedback', label: 'Feedback', icon: MessageSquareWarning, blurb: 'Alert, Loader, Progress, Skeleton, EmptyState, toast' },
  { slug: 'overlays', label: 'Overlays', icon: Layers, blurb: 'Modal, Drawer, Backdrop, Portal, CommandPalette' },
  { slug: 'navigation', label: 'Navigation', icon: Compass, blurb: 'Tabs, Dropdown, Tooltip, Breadcrumbs, Pagination, SegmentedControl, Accordion' },
  { slug: 'data-display', label: 'Data Display', icon: Table2, blurb: 'Avatar, Badge, Chip, Divider, Card, Table, Stat, Timeline, Calendar' },
  { slug: 'forms', label: 'Forms', icon: TextCursorInput, blurb: 'Form, all field types, LoopFields, validation' },
  { slug: 'charts', label: 'Charts', icon: PieChart, blurb: 'The one <Chart> primitive' },
  { slug: 'composed', label: 'Composed (ui/)', icon: Blocks, blurb: 'What we built from oks-ui parts' },
]

export function ComponentsOverview() {
  return (
    <>
      <PageHeader title="Components" trail={[{ label: 'Components' }]} />
      <Surface className="mb-4" bodyClassName="flex flex-col gap-1">
        <h2 className="text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>Every screen in Cearix is oks-ui</h2>
        <p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
          The shell, tables, charts and forms are oks-ui primitives or composed from them. Browse the library below.
        </p>
      </Surface>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <Card key={g.slug} as={Link} to={`/components/${g.slug}`} isHoverable shadow="none" style={{ background: 'var(--app-surface)', border: 'var(--app-card-border)' }}>
            <CardBody className="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}>
                <g.icon size={19} />
              </span>
              <h3 className="mt-3 flex items-center gap-1 text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {g.label} <ArrowRight size={14} />
              </h3>
              <p className="mt-1 text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{g.blurb}</p>
            </CardBody>
          </Card>
        ))}
        <Card as={Link} to="/components/kitchen-sink" isHoverable shadow="none" style={{ background: 'var(--app-surface)', border: 'var(--app-card-border)' }}>
          <CardBody className="p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: 'var(--app-warning-soft)', color: 'var(--app-warning)' }}>
              <Blocks size={19} />
            </span>
            <h3 className="mt-3 text-[0.95rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>Kitchen sink</h3>
            <p className="mt-1 text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>Interactive primitives on one page.</p>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

const gp = (title, children) => <GalleryPage title={title} group="Components" groupTo="/components">{children}</GalleryPage>

export function ActionsGroup() {
  return gp('Actions', (
    <>
      <Demo title="Button — variants">{['solid', 'soft', 'bordered', 'ghost', 'link'].map((v) => <Button key={v} variant={v} color="primary">{v}</Button>)}</Demo>
      <Demo title="ButtonGroup"><ButtonGroup color="primary" variant="bordered"><Button>Left</Button><Button>Mid</Button><Button>Right</Button></ButtonGroup></Demo>
    </>
  ))
}

export function FeedbackGroup() {
  return gp('Feedback', (
    <>
      <Demo title="Alert" className="flex flex-col gap-2">
        <Alert color="success" title="Saved" description="Your changes are live." />
        <Alert color="danger" variant="soft" title="Failed" description="Could not reach the server." />
      </Demo>
      <Demo title="Loader">{['ring-clip', 'ring-dual', 'pulse', 'dots-roll'].map((v) => <Loader key={v} variant={v} size={26} color="primary" />)}</Demo>
      <Demo title="Progress" className="flex w-full flex-col gap-3">
        <Progress value={64} color="primary" showValueLabel label="Upload" />
        <div className="flex gap-3"><CircularProgress value={40} color="primary" showValueLabel aria-label="40%" /><CircularProgress value={80} color="success" showValueLabel aria-label="80%" /></div>
      </Demo>
      <Demo title="Skeleton" className="w-full"><Skeleton variant="text" lines={3} /></Demo>
      <Demo title="EmptyState" className="w-full"><EmptyState title="Inbox zero" description="No new messages." /></Demo>
      <Demo title="Toast"><Button color="primary" onPress={() => toast.success('Hello from a toast')}>Show toast</Button></Demo>
    </>
  ))
}

export function OverlaysGroup() {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [bd, setBd] = useState(false)
  const palette = useCommandPalette({ hotkey: false })
  return gp('Overlays', (
    <>
      <Demo title="Modal / Drawer / Backdrop / CommandPalette">
        <Button color="primary" onPress={() => setModal(true)}>Modal</Button>
        <Button variant="bordered" onPress={() => setDrawer(true)}>Drawer</Button>
        <Button variant="bordered" onPress={() => setBd(true)}>Backdrop</Button>
        <Button variant="bordered" onPress={palette.open}>Command palette</Button>
      </Demo>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="A modal" actions={<Button color="primary" onPress={() => setModal(false)}>Got it</Button>}>
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>Centred dialog with focus trap and escape-to-close.</p>
      </Modal>
      <Drawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="A drawer">
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>Slide-in panel.</p>
      </Drawer>
      {bd && (
        <Portal>
          <Backdrop isOpen={bd} onClose={() => setBd(false)} blur="sm">
            <div className="rounded-lg bg-[var(--app-surface)] p-6 text-center">
              <p className="text-[0.9rem]" style={{ color: 'var(--app-fg-strong)' }}>Click anywhere to dismiss</p>
            </div>
          </Backdrop>
        </Portal>
      )}
      <CommandPalette
        {...palette.getPaletteProps()}
        items={[
          { id: 'a', label: 'Go to Sales dashboard' },
          { id: 'b', label: 'Create invoice' },
          { id: 'c', label: 'Open settings' },
        ]}
        onSelect={(it) => { toast.info(it.label); palette.close() }}
      />
    </>
  ))
}

export function NavigationGroup() {
  const [seg, setSeg] = useState('week')
  const [page, setPage] = useState(2)
  return gp('Navigation', (
    <>
      <Demo title="Tabs" className="w-full">
        <Tabs aria-label="demo" color="primary" variant="underlined">
          <Tab key="1" title="Overview"><p className="pt-3 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Overview</p></Tab>
          <Tab key="2" title="Members"><p className="pt-3 text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Members</p></Tab>
        </Tabs>
      </Demo>
      <Demo title="Dropdown">
        <Dropdown><DropdownTrigger><Button variant="bordered">Menu</Button></DropdownTrigger>
          <DropdownMenu aria-label="m"><DropdownItem key="a" title="Edit" /><DropdownItem key="b" title="Delete" color="danger" /></DropdownMenu>
        </Dropdown>
      </Demo>
      <Demo title="Tooltip"><Tooltip content="Helpful hint"><Button variant="soft">Hover me</Button></Tooltip></Demo>
      <Demo title="Breadcrumbs">
        <Breadcrumbs aria-label="b"><BreadcrumbItem as={Link} to="/">Home</BreadcrumbItem><BreadcrumbItem isCurrent>Detail</BreadcrumbItem></Breadcrumbs>
      </Demo>
      <Demo title="Pagination"><Pagination page={page} pageCount={8} onChange={setPage} /></Demo>
      <Demo title="SegmentedControl">
        <SegmentedControl aria-label="range" options={[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]} value={seg} onChange={setSeg} />
      </Demo>
      <Demo title="Accordion" className="w-full">
        <Accordion variant="bordered"><AccordionItem itemKey="1" title="Section one"><p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Content</p></AccordionItem>
          <AccordionItem itemKey="2" title="Section two"><p className="text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>Content</p></AccordionItem>
        </Accordion>
      </Demo>
    </>
  ))
}

export function DataDisplayGroup() {
  return gp('Data Display', (
    <>
      <Demo title="PageTitle"><PageTitle title="Section heading" subtitle="With a subtitle" as="h3" /></Demo>
      <Demo title="Avatar / AvatarGroup / AvatarIcon">
        <Avatar src={avatarUrl('a')} name="Aria Vale" status="online" />
        <AvatarGroup max={3}>{[1, 2, 3, 4].map((i) => <Avatar key={i} src={avatarUrl('g' + i)} name={'U' + i} />)}</AvatarGroup>
        <AvatarIcon size={36} />
      </Demo>
      <Demo title="Badge / Chip / Divider">
        <span className="relative inline-flex"><Button isIconOnly variant="soft" aria-label="Alerts">A</Button><Badge content="3" color="primary" size="sm" className="absolute -right-1 -top-1" /></span>
        <Chip color="success" variant="soft">active</Chip>
        <Divider orientation="vertical" className="h-6" />
        <Chip color="danger" variant="bordered" onClose={() => {}}>dismissible</Chip>
      </Demo>
      <Demo title="Card" className="w-full">
        <Card style={{ background: 'var(--app-surface)', border: 'var(--app-card-border)' }} shadow="none"><CardBody className="p-4"><p className="text-[0.85rem]" style={{ color: 'var(--app-fg)' }}>Card body</p></CardBody></Card>
      </Demo>
      <Demo title="Table" className="w-full">
        <Table
          aria-label="mini"
          columns={[{ key: 'name', header: 'Name' }, { key: 'role', header: 'Role' }, { key: 'status', header: 'Status' }]}
          rows={[{ id: 1, name: 'Wren Ashby', role: 'Design', status: 'Active' }, { id: 2, name: 'Theo Rees', role: 'Eng', status: 'Active' }]}
          getRowKey={(r) => r.id}
          removeWrapper
        />
      </Demo>
      <Demo title="Stat / StatGroup" className="w-full">
        <StatGroup columns={3}>
          <Stat label="Revenue" value="$128k" delta="+12%" trend="up" />
          <Stat label="Orders" value="3,412" delta="+7%" trend="up" />
          <Stat label="Refunds" value="1.9%" delta="-0.4%" trend="down" />
        </StatGroup>
      </Demo>
      <Demo title="Timeline" className="w-full">
        <Timeline>
          <TimelineItem title="Created" time="09:00" color="primary" />
          <TimelineItem title="Shipped" time="14:20" color="success" />
        </Timeline>
      </Demo>
      <Demo title="Calendar" className="w-full"><Calendar month="2026-09" defaultValue="2026-09-12" /></Demo>
      <Demo title="Board (kanban)" className="w-full">
        <div className="h-[320px] w-full">
          <Board
            columns={[{ id: 'todo', title: 'To do' }, { id: 'doing', title: 'Doing' }, { id: 'done', title: 'Done' }]}
            items={[
              { id: 'k1', column: 'todo', title: 'Draft roadmap' },
              { id: 'k2', column: 'doing', title: 'Ship table v2' },
              { id: 'k3', column: 'done', title: 'Token refactor' },
            ]}
            getItemId={(i) => i.id}
            getItemColumn={(i) => i.column}
            renderCard={(i) => <span className="text-[0.82rem]" style={{ color: 'var(--app-fg-strong)' }}>{i.title}</span>}
          />
        </div>
      </Demo>
    </>
  ))
}

export function FormsGroup() {
  return gp('Forms', (
    <>
      <Demo title="Fields" className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField name="t" label="Text" placeholder="Type…" />
        <PasswordField name="p" label="Password" />
        <SelectField name="s" label="Select" options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} />
        <OtpField name="o" label="OTP" length={4} />
        <PhoneField name="ph" label="Phone" />
        <DatePickerField name="d" label="Date" />
        <TextAreaField name="ta" label="Textarea" />
        <RangeField name="r" label="Range" min={0} max={100} defaultValue={40} showValue />
      </Demo>
      <Demo title="Toggles"><SwitchField name="sw" label="Switch" defaultChecked /><Checkbox label="Checkbox" defaultChecked /><Radio name="rd" value="x" label="Radio" defaultChecked /></Demo>
      <Demo title="FileField" className="w-full"><FileField name="f" label="Upload files" ui="dropzone" /></Demo>
      <Demo title="LoopFields" className="w-full">
        <Form onSubmit={(d) => toast.info(`${loopGroupToArray(d, 'items').length} rows`)} className="flex flex-col gap-3">
          <LoopFields
            group="items"
            minItems={1}
            maxItems={4}
            addTitle="Add line item"
            render={(index) => (
              <div className="grid grid-cols-2 gap-3">
                <FormFieldSet type="text" name={`items.${index}.name`} label="Item" />
                <FormFieldSet type="number" name={`items.${index}.qty`} label="Qty" />
              </div>
            )}
          />
          <div><Button type="submit" size="sm" color="primary">Submit</Button></div>
        </Form>
      </Demo>
    </>
  ))
}

export function ChartsGroup() {
  const data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({ m, v: 40 + i * 12 + (i % 2) * 8 }))
  return gp('Charts', (
    <>
      <ChartCard title="Line" type="line" data={data} x="m" series={[{ key: 'v', name: 'Value', color: 'var(--oks-color-primary-500)' }]} height={240} />
      <ChartCard title="Column" type="column" data={data} x="m" series={[{ key: 'v', name: 'Value', color: 'var(--oks-color-primary-500)' }]} height={240} />
    </>
  ))
}

export function ComposedGroup() {
  return gp('Composed (ui/)', (
    <PanelCard title="What Cearix composed from oks-ui parts">
      <ul className="flex flex-col gap-2 text-[0.85rem]" style={{ color: 'var(--app-fg)' }}>
        {[
          ['Surface / PanelCard / CardHeader', 'Card + CardBody + our --app-* tokens'],
          ['PageHeader', 'Breadcrumbs + heading + actions'],
          ['KpiCard / KpiGrid', 'Card + TrendChip + a responsive grid'],
          ['DataTable', 'Table + Pagination + TextField + filter Chips'],
          ['ChartCard / BareChart', 'Chart with clean line/area defaults'],
          ['DonutCard', 'Chart donut + custom centre + side legend'],
          ['StatusChip / TrendChip / EntityCell', 'Chip + Avatar mapped to domain meaning'],
          ['SegmentedControl', 're-skinned oks-ui SegmentedControl for dark'],
          ['ActivityFeed / MeterList / KeyValue', 'Timeline / Progress / dl compositions'],
          ['Sidebar / Header / InnerTemplate', 'the app shell — NavLink + Button + Drawer'],
        ].map(([name, from]) => (
          <li key={name} className="flex flex-wrap gap-x-2">
            <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{name}</span>
            <span style={{ color: 'var(--app-fg-muted)' }}>— {from}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  ))
}

export function KitchenSink() {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  return (
    <>
      <PageHeader title="Kitchen Sink" trail={[{ label: 'Components', to: '/components' }, { label: 'Kitchen Sink' }]} />
      <div className="flex flex-col gap-4">
        <PanelCard title="Overlays">
          <div className="flex flex-wrap gap-2">
            <Button color="primary" onPress={() => setModal(true)}>Open modal</Button>
            <Button variant="bordered" onPress={() => setDrawer(true)}>Open drawer</Button>
            <Button variant="bordered" onPress={() => toast.promise(new Promise((r) => setTimeout(r, 1200)), { loading: 'Working…', success: 'Done', error: 'Failed' })}>Toast promise</Button>
          </div>
        </PanelCard>
        <PanelCard title="Validation utilities">
          <Form onSubmit={() => toast.success('Passed')} validationMode="change" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
            <FormFieldSet type="password" name="pw" label="Password" validation={{ rules: { required: true, strongPassword: true } }} />
            <div className="sm:col-span-2"><Button type="submit" color="primary" size="sm">Check</Button></div>
          </Form>
        </PanelCard>
        <PanelCard title="Repeatable groups (LoopFields)">
          <Form onSubmit={(d) => toast.info(`${loopGroupToArray(d, 'guests').length} guests`)} className="flex flex-col gap-3">
            <LoopFields
              group="guests"
              minItems={1}
              maxItems={5}
              addTitle="Add guest"
              render={(index) => (
                <div className="grid grid-cols-2 gap-3">
                  <FormFieldSet type="text" name={`guests.${index}.name`} label="Name" />
                  <FormFieldSet type="email" name={`guests.${index}.email`} label="Email" />
                </div>
              )}
            />
            <div><Button type="submit" size="sm" color="primary">Save list</Button></div>
          </Form>
        </PanelCard>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="Kitchen sink modal" actions={<Button color="primary" onPress={() => setModal(false)}>Close</Button>}>
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>Everything interactive on one page.</p>
      </Modal>
      <Drawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="Kitchen sink drawer">
        <p className="text-[0.86rem]" style={{ color: 'var(--app-fg-muted)' }}>A slide-in panel.</p>
      </Drawer>
    </>
  )
}
