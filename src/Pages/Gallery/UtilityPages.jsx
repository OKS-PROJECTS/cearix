import { Chip, Avatar, AvatarGroup } from 'oks-ui'
import { GalleryPage, Demo } from './parts'
import { avatarUrl } from '../../lib/avatar'

const GT = '/utilities/colors'
const wrap = (title, children) => (
  <GalleryPage title={title} group="Utilities" groupTo={GT}>{children}</GalleryPage>
)

const swatch = (name, varName) => (
  <div key={name} className="flex flex-col gap-1">
    <div className="h-14 w-full rounded-lg" style={{ background: varName, border: '1px solid var(--app-border)' }} />
    <span className="text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>{name}</span>
  </div>
)

export function ColorsPage() {
  const roles = ['primary', 'secondary', 'success', 'warning', 'danger', 'info']
  const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  return wrap('Colors', (
    <>
      <Demo title="Semantic roles" className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {roles.map((r) => swatch(r, `var(--oks-color-${r}-500)`))}
      </Demo>
      {roles.map((r) => (
        <Demo key={r} title={`${r} ramp`} className="grid w-full grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
          {stops.map((s) => swatch(String(s), `var(--oks-color-${r}-${s})`))}
        </Demo>
      ))}
      <Demo title="App surface tokens" className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {['--app-bg', '--app-surface', '--app-surface-2', '--app-surface-3', '--app-border', '--app-border-strong'].map((t) =>
          swatch(t, `var(${t})`),
        )}
      </Demo>
    </>
  ))
}

export function BordersPage() {
  return wrap('Borders', (
    <Demo title="Radius & border tokens" className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
      {['sm', 'md', 'lg', 'xl', '2xl', 'full'].map((r) => (
        <div key={r} className="flex flex-col items-center gap-2">
          <div className="h-16 w-16" style={{ background: 'var(--app-primary-soft)', border: '1px solid var(--app-primary)', borderRadius: `var(--oks-radius-${r})` }} />
          <span className="text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>radius-{r}</span>
        </div>
      ))}
    </Demo>
  ))
}

export function BreakpointsPage() {
  const bp = [
    ['sm', '640px', 'Phones landscape'],
    ['md', '768px', 'Tablets'],
    ['lg', '1024px', 'Laptops · sidebar rail available'],
    ['xl', '1280px', 'Desktops'],
    ['2xl', '1536px', 'Large desktops'],
  ]
  return wrap('Breakpoints', (
    <Demo title="Tailwind breakpoints used in Cearix" className="w-full">
      <ul className="w-full divide-y" style={{ borderColor: 'var(--app-border)' }}>
        {bp.map(([k, v, note]) => (
          <li key={k} className="flex items-center gap-4 py-2.5 text-[0.85rem]">
            <Chip size="sm" variant="soft" color="primary">{k}</Chip>
            <span style={{ color: 'var(--app-fg-strong)' }}>{v}</span>
            <span className="ml-auto" style={{ color: 'var(--app-fg-muted)' }}>{note}</span>
          </li>
        ))}
      </ul>
    </Demo>
  ))
}

export function ColumnsPage() {
  const grids = [
    ['2 columns', 'grid w-full gap-3 grid-cols-2', 2],
    ['3 columns', 'grid w-full gap-3 grid-cols-2 lg:grid-cols-3', 3],
    ['4 columns', 'grid w-full gap-3 grid-cols-2 lg:grid-cols-4', 4],
    ['6 columns', 'grid w-full gap-3 grid-cols-3 lg:grid-cols-6', 6],
  ]
  return wrap('Columns', (
    <>
      {grids.map(([title, cls, n]) => (
        <Demo key={title} title={title} className={cls}>
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} className="rounded-md py-6 text-center text-[0.8rem]" style={{ background: 'var(--app-surface-3)', color: 'var(--app-fg-muted)' }}>
              col {i + 1}
            </div>
          ))}
        </Demo>
      ))}
    </>
  ))
}

export function FlexPage() {
  const box = (t) => (
    <div className="rounded-md px-4 py-3 text-[0.8rem]" style={{ background: 'var(--app-surface-3)', color: 'var(--app-fg)' }}>{t}</div>
  )
  return wrap('Flex', (
    <>
      <Demo title="justify-between"><div className="flex w-full justify-between">{box('start')}{box('end')}</div></Demo>
      <Demo title="items-center gap-3"><div className="flex w-full items-center gap-3">{box('a')}{box('bigger')}{box('c')}</div></Demo>
      <Demo title="flex-col"><div className="flex w-full flex-col gap-2">{box('one')}{box('two')}{box('three')}</div></Demo>
    </>
  ))
}

export function GuttersPage() {
  const gaps = [
    ['gap-2', 'grid w-full grid-cols-3 gap-2'],
    ['gap-3', 'grid w-full grid-cols-3 gap-3'],
    ['gap-5', 'grid w-full grid-cols-3 gap-5'],
    ['gap-8', 'grid w-full grid-cols-3 gap-8'],
  ]
  return wrap('Gutters', (
    <>
      {gaps.map(([title, cls]) => (
        <Demo key={title} title={title} className={cls}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md py-6 text-center text-[0.8rem]" style={{ background: 'var(--app-surface-3)', color: 'var(--app-fg-muted)' }}>cell</div>
          ))}
        </Demo>
      ))}
    </>
  ))
}

export function HelpersPage() {
  return wrap('Helpers', (
    <>
      <Demo title="Truncation" className="w-full">
        <p className="block max-w-xs truncate" style={{ color: 'var(--app-fg)' }}>
          This is a very long single line of text that will be clipped with an ellipsis inside its container.
        </p>
      </Demo>
      <Demo title="Elevation">
        {['none', 'xs', 'sm', 'md', 'lg'].map((s) => (
          <div key={s} className="rounded-lg bg-[var(--app-surface)] px-5 py-4 text-[0.8rem]" style={{ boxShadow: `var(--oks-shadow-${s}, none)`, border: '1px solid var(--app-border)' }}>
            shadow-{s}
          </div>
        ))}
      </Demo>
      <Demo title="Text tones">
        {['--app-fg-strong', '--app-fg', '--app-fg-muted', '--app-fg-subtle'].map((t) => (
          <span key={t} style={{ color: `var(${t})` }}>{t.replace('--app-fg', 'fg') || 'fg'}</span>
        ))}
      </Demo>
    </>
  ))
}

export function PositionPage() {
  return wrap('Position', (
    <Demo title="Sticky / absolute demo" className="w-full">
      <div className="relative h-48 w-full overflow-hidden rounded-lg" style={{ background: 'var(--app-surface-2)', border: '1px solid var(--app-border)' }}>
        <span className="absolute left-3 top-3 rounded bg-[var(--app-primary)] px-2 py-1 text-[0.72rem] text-[var(--oks-palette-neutral-0)]">top-left</span>
        <span className="absolute bottom-3 right-3 rounded bg-[var(--app-success)] px-2 py-1 text-[0.72rem] text-[var(--oks-palette-neutral-0)]">bottom-right</span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-[var(--app-warning)] px-2 py-1 text-[0.72rem] text-[var(--oks-palette-neutral-0)]">centered</span>
      </div>
    </Demo>
  ))
}

export function ExtrasPage() {
  return wrap('Extras', (
    <>
      <Demo title="Ratios">
        {['1/1', '4/3', '16/9'].map((r) => (
          <div key={r} className="w-40 rounded-lg" style={{ aspectRatio: r.replace('/', ' / '), background: 'var(--app-surface-3)' }} />
        ))}
      </Demo>
      <Demo title="Focus ring">
        <button className="rounded-md px-4 py-2 text-[0.83rem] outline-none focus-visible:ring-2" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg)', ['--tw-ring-color']: 'var(--app-primary)' }}>
          Tab to focus me
        </button>
      </Demo>
    </>
  ))
}

export function AvatarsUtilPage() {
  return wrap('Avatars', <AvatarsInner />)
}

function AvatarsInner() {
  return (
    <>
      <Demo title="Sizes">
        {[24, 32, 40, 56, 72].map((s) => (
          <Avatar key={s} size={s} src={avatarUrl('sz' + s)} name="Cassian Holt" />
        ))}
      </Demo>
      <Demo title="Status & fallback">
        <Avatar src={avatarUrl('a')} name="Aria Vale" status="online" />
        <Avatar name="No Image" />
        <Avatar name="Bruno Costa" status="dnd" radius="md" />
      </Demo>
      <Demo title="Group with overflow">
        <AvatarGroup max={3}>
          {[1, 2, 3, 4, 5].map((i) => <Avatar key={i} src={avatarUrl('gg' + i)} name={'U' + i} />)}
        </AvatarGroup>
      </Demo>
    </>
  )
}
