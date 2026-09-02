import { Chart } from 'oks-ui'
import { PanelCard } from './Surface'
import { Dot } from './chips'

/**
 * Donut + custom centre value + side legend. oks-ui <Chart type="donut">
 * paints its own centre total with limited control, so we hide it
 * (.donut-no-center) and render our own.
 */
export function DonutCard({ title, subtitle, actions, data, centerValue, centerLabel, height = 210, roles, row = false }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <PanelCard title={title} subtitle={subtitle} actions={actions}>
      <div className={row ? 'flex flex-col items-center gap-5 sm:flex-row' : 'flex flex-col items-center gap-5'}>
        <div className="relative shrink-0 donut-no-center" style={{ width: height, maxWidth: '100%' }}>
          <Chart
            type="donut"
            height={height}
            unstyled
            legend={false}
            data={data}
            x="label"
            series={{ key: 'value', name: title }}
            palette={roles ? { roles } : { roles: ['primary', 'info', 'success', 'warning', 'danger', 'secondary'] }}
            pie={{ center: false }}
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[1.3rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              {centerValue ?? total.toLocaleString()}
            </span>
            <span className="text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>
              {centerLabel ?? 'Total'}
            </span>
          </div>
        </div>
        <ul className="flex w-full flex-col gap-2.5">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center justify-between gap-3 text-[0.82rem]">
              <span className="flex items-center gap-2" style={{ color: 'var(--app-fg-muted)' }}>
                <Dot color={`var(--oks-color-${['primary', 'info', 'success', 'warning', 'danger', 'secondary'][i % 6]}-500)`} />
                {d.label}
              </span>
              <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                {d.display ?? d.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PanelCard>
  )
}
