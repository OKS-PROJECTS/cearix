import { Chart } from 'oks-ui'
import { PanelCard } from './Surface'
import { cx } from '../../lib/cx'

const CLEAN_TYPES = new Set(['line', 'area'])

/**
 * Wrapper around oks-ui <Chart>. Line/area render clean (no gridlines, no
 * Y-axis, no point markers); bar/column keep the category axis. Every chart
 * sits bare (`unstyled`) inside our Surface — <Chart>'s own <figure> frame is
 * suppressed globally too (.oksChart patch).
 */
export function ChartCard({ title, subtitle, actions, icon, type, height = 300, children, className, ...chartProps }) {
  return (
    <PanelCard title={title} subtitle={subtitle} actions={actions} icon={icon} className={className}>
      {children}
      <Chart type={type} height={height} unstyled {...cleanDefaults(type, chartProps)} />
    </PanelCard>
  )
}

export function BareChart({ type, height = 260, className, ...chartProps }) {
  return (
    <div className={cx('cearix-chart', className)}>
      <Chart type={type} height={height} unstyled {...cleanDefaults(type, chartProps)} />
    </div>
  )
}

function cleanDefaults(type, props) {
  const clean = CLEAN_TYPES.has(type)
  const merged = {
    legend: false,
    grid: clean ? { horizontal: false, vertical: false } : { horizontal: true, vertical: false },
    ...props,
  }
  if (clean) {
    merged.axisY = { hide: true, ...(props.axisY || {}) }
    merged.line = { curve: 'smooth', markers: { size: 0 }, ...(props.line || {}) }
  }
  return merged
}
