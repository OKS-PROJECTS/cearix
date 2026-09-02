import { Chart } from 'oks-ui'
import { PageHeader, PanelCard } from '../../Components/ui'

const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const series = (base, amp, step, phase = 0) =>
  M.map((m, i) => ({ month: m, value: Math.round(base + Math.sin(i / 1.8 + phase) * amp + i * step) }))
const s2 = (a, b) => M.map((m, i) => ({ month: m, a: Math.round(a + Math.sin(i / 1.7) * a * 0.4 + i * 30), b: Math.round(b + Math.cos(i / 2) * b * 0.35 + i * 18) }))

const GT = '/charts/line-area'
const Wrap = ({ title, children }) => (
  <>
    <PageHeader title={title} trail={[{ label: 'Charts', to: GT }, { label: title }]} />
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{children}</div>
  </>
)

export function LineAreaPage() {
  return (
    <Wrap title="Line & Area">
      <PanelCard title="Smooth line">
        <Chart type="line" height={280} unstyled data={series(1200, 260, 40)} x="month" series={[{ key: 'value', name: 'Revenue', color: 'var(--oks-color-primary-500)' }]} line={{ curve: 'smooth', markers: { size: 0 } }} axisY={{ hide: true }} grid={{ horizontal: false }} />
      </PanelCard>
      <PanelCard title="Filled area">
        <Chart type="area" height={280} unstyled data={series(800, 200, 30, 1)} x="month" series={[{ key: 'value', name: 'Sessions', color: 'var(--oks-color-info-500)' }]} line={{ curve: 'smooth', markers: { size: 0 }, area: { show: true, fill: { opacity: 0.18 } } }} axisY={{ hide: true }} grid={{ horizontal: false }} />
      </PanelCard>
      <PanelCard title="Multi-series area" className="xl:col-span-2">
        <Chart type="area" height={300} unstyled data={s2(900, 600)} x="month" legend series={[{ key: 'a', name: 'Direct', color: 'var(--oks-color-primary-500)' }, { key: 'b', name: 'Organic', color: 'var(--oks-color-success-500)' }]} line={{ curve: 'smooth', markers: { size: 0 } }} axisY={{ hide: true }} grid={{ horizontal: false }} />
      </PanelCard>
    </Wrap>
  )
}

export function ColumnsBarsPage() {
  return (
    <Wrap title="Columns & Bars">
      <PanelCard title="Column">
        <Chart type="column" height={280} unstyled data={series(60, 24, 3)} x="month" series={[{ key: 'value', name: 'Orders', color: 'var(--oks-color-primary-500)' }]} column={{ radius: 4 }} grid={{ horizontal: true }} />
      </PanelCard>
      <PanelCard title="Stacked column">
        <Chart type="column" height={280} unstyled data={s2(40, 30)} x="month" legend series={[{ key: 'a', name: 'New', color: 'var(--oks-color-primary-500)' }, { key: 'b', name: 'Returning', color: 'var(--oks-color-info-500)' }]} column={{ stacked: true, radius: 3 }} />
      </PanelCard>
      <PanelCard title="Bar" className="xl:col-span-2">
        <Chart type="bar" height={300} unstyled data={[
          { label: 'Furniture', value: 34 }, { label: 'Lighting', value: 22 }, { label: 'Textiles', value: 18 },
          { label: 'Audio', value: 15 }, { label: 'Decor', value: 11 },
        ]} x="label" series={[{ key: 'value', name: 'Share', color: 'var(--oks-color-primary-500)' }]} />
      </PanelCard>
    </Wrap>
  )
}

export function DistributionsPage() {
  const data = [
    { label: 'Direct', value: 38 }, { label: 'Organic', value: 27 }, { label: 'Referral', value: 18 },
    { label: 'Social', value: 11 }, { label: 'Email', value: 6 },
  ]
  return (
    <Wrap title="Distributions">
      <PanelCard title="Pie">
        <Chart type="pie" height={280} unstyled data={data} x="label" series={{ key: 'value', name: 'Traffic' }} legend palette={{ roles: ['primary', 'info', 'success', 'warning', 'danger'] }} />
      </PanelCard>
      <PanelCard title="Donut">
        <Chart type="donut" height={280} unstyled data={data} x="label" series={{ key: 'value', name: 'Traffic' }} legend palette={{ roles: ['primary', 'info', 'success', 'warning', 'danger'] }} pie={{ center: true }} />
      </PanelCard>
      <PanelCard title="Semi donut (gauge)" className="xl:col-span-2">
        <Chart type="donut" height={240} unstyled data={[{ label: 'Used', value: 72 }, { label: 'Free', value: 28 }]} x="label" series={{ key: 'value', name: 'Storage' }} pie={{ arc: 'semi', center: false }} palette={{ colors: ['var(--oks-color-primary-500)', 'var(--app-surface-3)'] }} />
      </PanelCard>
    </Wrap>
  )
}

export function ComparisonsPage() {
  return (
    <Wrap title="Comparisons">
      <PanelCard title="Grouped columns" className="xl:col-span-2">
        <Chart type="column" height={300} unstyled legend data={M.slice(0, 6).map((m, i) => ({ month: m, thisYear: 40 + i * 6, lastYear: 30 + i * 4 }))} x="month" series={[
          { key: 'thisYear', name: 'This year', color: 'var(--oks-color-primary-500)' },
          { key: 'lastYear', name: 'Last year', color: 'var(--oks-color-default-400)' },
        ]} column={{ radius: 3 }} />
      </PanelCard>
      <PanelCard title="Line vs. area" className="xl:col-span-2">
        <Chart type="area" height={280} unstyled legend data={s2(500, 500)} x="month" series={[
          { key: 'a', name: 'Plan', color: 'var(--oks-color-info-500)' },
          { key: 'b', name: 'Actual', color: 'var(--oks-color-primary-500)' },
        ]} line={{ curve: 'smooth', markers: { size: 0 } }} axisY={{ hide: true }} grid={{ horizontal: false }} />
      </PanelCard>
    </Wrap>
  )
}

export function CorrelationsPage() {
  return (
    <Wrap title="Correlations">
      <PanelCard title="Spend vs. revenue" className="xl:col-span-2">
        <Chart type="line" height={300} unstyled legend data={M.map((m, i) => ({ month: m, spend: 20 + i * 3 + (i % 3) * 4, revenue: 40 + i * 7 + (i % 4) * 6 }))} x="month" series={[
          { key: 'spend', name: 'Ad spend', color: 'var(--oks-color-warning-500)' },
          { key: 'revenue', name: 'Revenue', color: 'var(--oks-color-success-500)' },
        ]} line={{ curve: 'smooth', markers: { size: 0 } }} />
      </PanelCard>
      <PanelCard title="Conversion funnel" className="xl:col-span-2">
        <Chart type="bar" height={260} unstyled data={[
          { label: 'Visits', value: 100 }, { label: 'Signups', value: 42 }, { label: 'Activated', value: 28 },
          { label: 'Paid', value: 12 },
        ]} x="label" series={[{ key: 'value', name: '%', color: 'var(--oks-color-primary-500)' }]} />
      </PanelCard>
    </Wrap>
  )
}

export function RangesFinancialPage() {
  return (
    <Wrap title="Ranges & Financial">
      <PanelCard title="Portfolio value" className="xl:col-span-2">
        <Chart type="area" height={300} unstyled data={M.map((m, i) => ({ month: m, value: 240000 + Math.round(Math.sin(i / 2) * 30000) + i * 6000 }))} x="month" series={[{ key: 'value', name: 'Value', color: 'var(--oks-color-primary-500)' }]} dataFormat={{ prefix: '$', format: 'compact' }} line={{ curve: 'smooth', markers: { size: 0 } }} axisY={{ hide: true }} grid={{ horizontal: false }} />
      </PanelCard>
      <PanelCard title="Daily range">
        <Chart type="column" height={260} unstyled data={M.slice(0, 8).map((m, i) => ({ month: m, value: 20 + (i % 4) * 8 }))} x="month" series={[{ key: 'value', name: 'Range', color: 'var(--oks-color-info-500)' }]} column={{ radius: 3 }} />
      </PanelCard>
      <PanelCard title="Dividends">
        <Chart type="column" height={260} unstyled data={['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => ({ q, value: 900 + i * 260 }))} x="q" series={[{ key: 'value', name: 'USD', color: 'var(--oks-color-success-500)' }]} column={{ radius: 4 }} />
      </PanelCard>
    </Wrap>
  )
}

export function HeatmapTreemapPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const rows = ['00', '04', '08', '12', '16', '20']
  return (
    <Wrap title="Heatmap & Treemap">
      <PanelCard title="Activity heatmap" className="xl:col-span-2">
        <Chart
          type="heatmap"
          height={300}
          unstyled
          data={days.map((d) => ({ day: d, ...Object.fromEntries(rows.map((r, i) => [r, Math.round((Math.sin(days.indexOf(d) + i) + 1) * 40)])) }))}
          x="day"
          series={rows.map((r) => ({ key: r, name: r }))}
          heatmap={{ color: 'var(--oks-color-primary-500)', showValues: false }}
        />
      </PanelCard>
      <PanelCard title="Category weight (bar stand-in for treemap)" className="xl:col-span-2">
        <Chart type="bar" height={260} unstyled data={[
          { label: 'Furniture', value: 42 }, { label: 'Lighting', value: 26 }, { label: 'Audio', value: 16 },
          { label: 'Textiles', value: 10 }, { label: 'Decor', value: 6 },
        ]} x="label" series={[{ key: 'value', name: 'Weight', color: 'var(--oks-color-primary-500)' }]} />
        <p className="mt-2 text-[0.74rem]" style={{ color: 'var(--app-fg-subtle)' }}>oks-ui Chart has no treemap type — shown as a ranked bar.</p>
      </PanelCard>
    </Wrap>
  )
}
