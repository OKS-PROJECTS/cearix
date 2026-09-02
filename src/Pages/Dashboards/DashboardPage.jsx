import { Link } from 'react-router-dom'
import { Button } from 'oks-ui'
import {
  PageHeader,
  KpiGrid,
  KpiCard,
  ChartCard,
  DonutCard,
  PanelCard,
  DataTable,
  ActivityFeed,
  actionColumn,
  HeroStat,
  ListPanel,
  ProgressCards,
  RingRow,
  MeterPanel,
} from '../../Components/ui'

const SPAN = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
}

const ViewAll = ({ to }) => (
  <Button as={Link} to={to || '/dashboards/sales'} size="sm" variant="ghost">
    View all
  </Button>
)

function Widget({ w, action }) {
  const va = <ViewAll to={w.to || action?.to} />
  switch (w.type) {
    case 'kpis':
      return (
        <KpiGrid cols={w.items.length >= 4 ? 4 : w.items.length}>
          {w.items.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </KpiGrid>
      )
    case 'chart':
      return (
        <ChartCard
          title={w.title}
          subtitle={w.subtitle}
          actions={w.actions}
          type={w.chartType}
          height={w.height || 260}
          data={w.data}
          x={w.x}
          series={w.series}
          dataFormat={w.dataFormat}
          column={w.column}
        />
      )
    case 'donut':
      return (
        <DonutCard
          title={w.title}
          subtitle={w.subtitle}
          actions={va}
          data={w.data}
          centerValue={w.centerValue}
          centerLabel={w.centerLabel}
        />
      )
    case 'hero':
      return <HeroStat {...w} />
    case 'meters':
      return <MeterPanel title={w.title} actions={va} items={w.items} note={w.note} />
    case 'activity':
      return (
        <PanelCard title={w.title} actions={va}>
          <ActivityFeed items={w.items} />
        </PanelCard>
      )
    case 'list':
      return <ListPanel title={w.title} rows={w.items} to={w.to || action?.to} actions={w.actions} />
    case 'progress':
      return <ProgressCards title={w.title} actions={va} items={w.items} cols={w.cols} />
    case 'rings':
      return <RingRow title={w.title} actions={va} items={w.items} />
    case 'table':
      return (
        <PanelCard title={w.title} actions={va} bodyClassName="p-0">
          <div className="p-5">
            <DataTable
              ariaLabel={w.title}
              columns={w.actionsColumn === false ? w.columns : [...w.columns, actionColumn()]}
              rows={w.rows}
              pageSize={w.pageSize || 6}
              searchKeys={w.searchKeys}
            />
          </div>
        </PanelCard>
      )
    default:
      return null
  }
}

/**
 * Config-driven dashboard. Each dashboard supplies its own `rows` — an array of
 * widget rows — so the 11 dashboards get genuinely different layouts rather than
 * one fixed template.
 */
export default function DashboardPage({ config }) {
  const { title, trail, action, rows } = config

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Dashboards', to: '/dashboards/sales' }, { label: title }]}
        actions={
          action && (
            <Button as={Link} to={action.to} size="sm" color="primary" variant="soft">
              {action.label}
            </Button>
          )
        }
      />

      <div className="flex flex-col gap-6">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-6">
            {row.map((w, wi) => (
              <div key={wi} className={SPAN[w.w || 6] || SPAN[6]}>
                <Widget w={w} action={action} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
