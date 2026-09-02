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
  MeterList,
  ActivityFeed,
} from '../../Components/ui'

/**
 * Config-driven dashboard. Sales stays bespoke; the other 11 read a config:
 * { title, trail, action?, kpis, chart, side, table?, meters?, activity? }
 */
export default function DashboardPage({ config }) {
  const { title, trail, action, kpis, chart, side, table, meters, activity } = config

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

      <KpiGrid cols={kpis.length >= 4 ? 4 : kpis.length} className="mb-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </KpiGrid>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title={chart.title}
          subtitle={chart.subtitle}
          type={chart.type}
          height={300}
          data={chart.data}
          x={chart.x}
          series={chart.series}
          dataFormat={chart.dataFormat}
          legend={chart.legend}
          column={chart.column}
          tooltip
        />
        {side.kind === 'donut' ? (
          <DonutCard title={side.title} subtitle={side.subtitle} data={side.data} centerValue={side.centerValue} centerLabel={side.centerLabel} />
        ) : side.kind === 'meters' ? (
          <PanelCard title={side.title} subtitle={side.subtitle}>
            <MeterList items={side.data} />
          </PanelCard>
        ) : (
          <PanelCard title={side.title} subtitle={side.subtitle}>
            <ActivityFeed items={side.data} />
          </PanelCard>
        )}
      </div>

      {(table || meters || activity) && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {table && (
            <PanelCard title={table.title} className={activity || meters ? 'lg:col-span-2' : 'lg:col-span-3'} bodyClassName="p-0">
              <div className="p-5">
                <DataTable ariaLabel={table.title} columns={table.columns} rows={table.rows} pageSize={table.pageSize || 6} searchKeys={table.searchKeys} />
              </div>
            </PanelCard>
          )}
          {meters && (
            <PanelCard title={meters.title}>
              <MeterList items={meters.data} />
            </PanelCard>
          )}
          {activity && (
            <PanelCard title={activity.title}>
              <ActivityFeed items={activity.data} />
            </PanelCard>
          )}
        </div>
      )}
    </>
  )
}
