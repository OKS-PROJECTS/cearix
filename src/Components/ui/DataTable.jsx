import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Table, Pagination, PaginationSummary, TextField, Button, EmptyState, Chip } from 'oks-ui'
import { cx } from '../../lib/cx'

/**
 * Composed data table — oks-ui <Table> + a toolbar (search + quick filters) +
 * <Pagination>. oks-ui ships <Table> and <Pagination> but not the wired-together
 * list-screen widget (search, filter chips, page state, summary line).
 *
 * columns: [{ key, header, align?, sortable?, sortValue?(row), render?(row), width? }]
 */
export function DataTable({
  columns,
  rows,
  getRowKey = (r) => r.id,
  pageSize = 10,
  searchKeys = [],
  filters = [],
  toolbar,
  selectable = false,
  loading = false,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'When there is data to show, it will appear in this table.',
  ariaLabel = 'Data table',
  className,
  compact = false,
  onSelectionChange,
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let out = rows
    const q = query.trim().toLowerCase()
    if (q && searchKeys.length) {
      out = out.filter((r) =>
        searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q)),
      )
    }
    if (activeFilter != null) {
      const f = filters[activeFilter]
      if (f) out = out.filter(f.test)
    }
    return out
  }, [rows, query, searchKeys, activeFilter, filters])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className={cx('flex flex-col gap-3.5', className)}>
      {(searchKeys.length > 0 || filters.length > 0 || toolbar) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {searchKeys.length > 0 && (
              <TextField
                aria-label="Search table"
                placeholder="Search…"
                value={query}
                onChange={(v) => {
                  setQuery(v)
                  setPage(1)
                }}
                startIcon={<Search size={14} />}
                size="sm"
                className="w-full sm:w-60"
              />
            )}
            {filters.map((f, i) => (
              <Chip
                key={f.label}
                size="sm"
                variant={activeFilter === i ? 'solid' : 'bordered'}
                color={activeFilter === i ? 'primary' : 'default'}
                onClick={() => {
                  setActiveFilter(activeFilter === i ? null : i)
                  setPage(1)
                }}
                className="cursor-pointer"
              >
                {f.label}
              </Chip>
            ))}
          </div>
          {toolbar && <div className="flex flex-wrap items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="cearix-tablewrap overflow-x-auto">
        <Table
          aria-label={ariaLabel}
          columns={columns}
          rows={pageRows}
          getRowKey={getRowKey}
          isLoading={loading}
          isCompact={compact}
          selectionMode={selectable ? 'multiple' : 'none'}
          onSelectionChange={onSelectionChange}
          removeWrapper
          emptyContent={<EmptyState title={emptyTitle} description={emptyDescription} />}
        />
      </div>

      {pageCount > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <PaginationSummary
            page={safePage}
            pageSize={pageSize}
            total={filtered.length}
            className="text-[0.78rem]"
          />
          <Pagination page={safePage} pageCount={pageCount} onChange={setPage} size="sm" siblingCount={1} />
        </div>
      )}
    </div>
  )
}

export function TableToolbarButton(props) {
  return <Button size="sm" variant="bordered" {...props} />
}
