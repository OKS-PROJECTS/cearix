import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from 'oks-ui'
import { PageHeader, PanelCard, DataTable, KpiGrid, StatTile } from '../../Components/ui'

/**
 * Config-driven list / CRUD screen.
 * config: { title, subtitle, trail, columns, rows, searchKeys?, filters?, stats?,
 *           createTo?, createLabel? }
 */
export default function ListPage({ config }) {
  const {
    title,
    subtitle,
    trail,
    columns,
    rows,
    searchKeys = [],
    filters = [],
    stats = [],
    createTo,
    createLabel = 'New',
    pageSize = 10,
  } = config

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Home', to: '/dashboards/sales' }, { label: title }]}
        actions={
          createTo && (
            <Button as={Link} to={createTo} size="sm" color="primary" startContent={<Plus size={14} />}>
              {createLabel}
            </Button>
          )
        }
      />

      {stats.length > 0 && (
        <KpiGrid cols={Math.min(stats.length, 4)} className="mb-4">
          {stats.map((s) => (
            <StatTile key={s.label} label={s.label} value={s.value} tone={s.tone} icon={s.icon} />
          ))}
        </KpiGrid>
      )}

      <PanelCard title={title} subtitle={subtitle} bodyClassName="p-0">
        <div className="p-5">
          <DataTable
            ariaLabel={title}
            columns={columns}
            rows={rows}
            searchKeys={searchKeys}
            filters={filters}
            pageSize={pageSize}
          />
        </div>
      </PanelCard>
    </>
  )
}
