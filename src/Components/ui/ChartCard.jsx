import { Chart } from 'oks-ui'
import { PanelCard } from './Surface'
import { cx } from '../../lib/cx'

const CLEAN_TYPES = new Set(['line', 'area'])

/**
 * Wrapper around oks-ui <Chart>.
 * - line/area: no gridlines, no Y-axis, no point markers, subtle area fill,
 *   plot spans the full card width; the X-axis category labels stay
 * - bar/column: category axis + faint horizontal gridlines
 * - oks-ui's built-in legend stays at the bottom (clickable to toggle series)
 * - a real `ariaLabel` replaces oks-ui's default "<type> chart" SVG title
 */
export function ChartCard({
  title,
  subtitle,
  actions,
  icon,
  type,
  height = 260,
  series,
  ariaLabel,
  children,
  className,
  ...chartProps
}) {
  const multi = normaliseSeries(series).length > 1
  return (
    <PanelCard title={title} subtitle={subtitle} actions={actions} icon={icon} className={className}>
      {children}
      <Chart
        type={type}
        height={height}
        unstyled
        series={series}
        ariaLabel={ariaLabel || (typeof title === 'string' ? title : 'Chart')}
        {...cleanDefaults(type, { legend: multi, ...chartProps })}
      />
    </PanelCard>
  )
}

export function BareChart({ type, height = 190, className, ariaLabel, ...chartProps }) {
  return (
    <div className={cx('cearix-chart', className)}>
      <Chart
        type={type}
        height={height}
        unstyled
        ariaLabel={ariaLabel || 'Chart'}
        {...cleanDefaults(type, chartProps)}
      />
    </div>
  )
}

export function ChartLegend({ items, className }) {
  return (
    <div className={cx('flex flex-wrap items-center gap-x-5 gap-y-1.5', className)}>
      {items.map((s) => (
        <span key={s.name} className="flex items-center gap-1.5 text-[0.76rem]" style={{ color: 'var(--app-fg-muted)' }}>
          <span className="h-2 w-2 rounded-full" style={{ background: s.color || 'var(--app-primary)' }} />
          {s.name}
        </span>
      ))}
    </div>
  )
}

function normaliseSeries(series) {
  if (!series) return []
  const arr = Array.isArray(series) ? series : [series]
  return arr.filter((s) => s && s.name).map((s) => ({ name: s.name, color: s.color }))
}

function cleanDefaults(type, props) {
  const clean = CLEAN_TYPES.has(type)
  const valueAxis = type === 'bar' ? 'x' : 'y'
  const merged = {
    ...props,
    padding: { right: 4, left: 4, ...(props.padding || {}) },
    axis: {
      edgePadding: 4,
      // bar/column value axes must begin at zero — otherwise the smallest
      // bar looks like nothing
      ...(clean ? {} : { [valueAxis]: { clampMinZero: true, ...(props.axis?.[valueAxis] || {}) } }),
      ...(props.axis || {}),
    },
    grid: clean
      ? { horizontal: false, vertical: false }
      : { horizontal: true, vertical: false, lineOpacity: 0.5, ...(props.grid || {}) },
  }
  if (clean) {
    merged.axisY = { hide: true, ...(props.axisY || {}) }
    merged.axisX = props.axisX ?? { show: true }
    merged.line = {
      curve: 'smooth',
      strokeWidth: 2.5,
      markers: { size: 0 },
      ...(type === 'area' ? { area: { show: true, fill: { type: 'solid', opacity: 0.1 } } } : {}),
      ...(props.line || {}),
    }
  } else if (type === 'bar') {
    // horizontal bars: value axis is X (keep it, at zero), category axis is Y
    merged.axisX = props.axisX ?? { show: true }
    merged.axisY = props.axisY ?? { show: true }
    merged.bar = { radius: 4, height: 16, gap: 14, groupGap: 6, ...(props.bar || {}) }
  } else if (type === 'column') {
    // vertical columns: hide the Y value axis (tooltip carries the number),
    // keep the X category axis — removes the wide left gutter
    merged.axisY = { hide: true, ...(props.axisY || {}) }
    merged.axisX = props.axisX ?? { show: true }
    merged.column = { radius: 4, gap: 14, groupGap: 6, ...(props.column || {}) }
  }
  return merged
}
