import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Download } from 'lucide-react'
import { Button } from 'oks-ui'
import {
  PageHeader,
  PanelCard,
  DataTable,
  KpiGrid,
  StatTile,
  actionColumn,
} from '../../Components/ui'

/**
 * Config-driven list / CRUD screen.
 * config: { title, subtitle, trail, columns, rows, searchKeys?, filters?, stats?,
 *           createTo?, createLabel?, rowActions? (default true) }
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
    rowActions = true,
  } = config

  const cols = useMemo(
    () => (rowActions ? [...columns, actionColumn()] : columns),
    [columns, rowActions],
  )

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Home', to: '/dashboards/sales' }, { label: title }]}
        actions={
          <>
            <Button size="sm" variant="bordered" startContent={<Download size={13} />}>
              Export
            </Button>
            {createTo && (
              <Button as={Link} to={createTo} size="sm" color="primary" startContent={<Plus size={14} />}>
                {createLabel}
              </Button>
            )}
          </>
        }
      />

      {stats.length > 0 && (
        <KpiGrid cols={Math.min(stats.length, 4)} className="mb-6">
          {stats.map((s) => (
            <StatTile key={s.label} label={s.label} value={s.value} tone={s.tone} icon={s.icon} />
          ))}
        </KpiGrid>
      )}

      <PanelCard title={title} subtitle={subtitle} bodyClassName="p-0">
        <div className="p-5">
          <DataTable
            ariaLabel={title}
            columns={cols}
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
