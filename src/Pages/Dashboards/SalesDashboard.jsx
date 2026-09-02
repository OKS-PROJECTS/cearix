import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  DollarSign,
  Wallet,
  Package,
  TrendingDown,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Button, Avatar } from 'oks-ui'
import {
  PageHeader,
  KpiCard,
  ChartCard,
  PanelCard,
  DataTable,
  ActivityFeed,
  StatusChip,
  MeterList,
  SegmentedControl,
  BareChart,
  TrendChip,
  EntityCell,
  actionColumn,
} from '../../Components/ui'
import { fmtDate } from '../../lib/date'
import {
  salesKpis,
  salesStats,
  salesByCountry,
  recentActivity,
  topProducts,
  recentOrders,
  salesValue,
  monthlyProfits,
  transactions,
} from '../../data/sales'

const ICONS = { sales: DollarSign, revenue: Wallet, products: Package, expenses: TrendingDown, subs: Users }
const money = (n) => `$${Math.abs(n).toLocaleString()}`

export default function SalesDashboard() {
  const [range, setRange] = useState('month')

  return (
    <>
      <PageHeader
        title="Sales"
        trail={[{ label: 'Dashboards', to: '/dashboards/sales' }, { label: 'Sales' }]}
        actions={
          <Button as={Link} to="/apps/ecommerce/orders" size="sm" color="primary" variant="soft">
            View orders
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {salesKpis.slice(0, 3).map((k) => (
          <KpiCard key={k.key} {...k} icon={ICONS[k.key]} />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {salesKpis.slice(3).map((k) => (
          <KpiCard key={k.key} {...k} icon={ICONS[k.key]} />
        ))}
      </div>

      {/* Recent activity + Sales by country */}
      <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-2">
        <PanelCard title="Recent activity" actions={<Button as={Link} to="/pages/timeline/feed" size="sm" variant="ghost">View all</Button>}>
          <ActivityFeed items={recentActivity} />
        </PanelCard>

        <PanelCard
          title="Sales by country"
          actions={<Button as={Link} to="/dashboards/analytics" size="sm" variant="ghost">View all</Button>}
          bodyClassName="p-0"
        >
          <div className="px-5 py-2">
            <DataTable
              ariaLabel="Sales by country"
              pageSize={6}
              columns={[
                {
                  key: 'country',
                  header: 'Country',
                  render: (r) => (
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{flag(r.code)}</span>
                      <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.country}</span>
                    </span>
                  ),
                },
                { key: 'sales', header: 'Sales', align: 'end', sortable: true, render: (r) => r.sales.toLocaleString() },
                {
                  key: 'bounce',
                  header: 'Bounce',
                  align: 'end',
                  render: (r) => (
                    <span
                      className="inline-flex items-center gap-1 text-[0.8rem] font-medium"
                      style={{ color: r.trend === 'up' ? 'var(--app-danger)' : 'var(--app-success)' }}
                    >
                      {r.trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {r.bounce}%
                    </span>
                  ),
                },
              ]}
              rows={salesByCountry}
              getRowKey={(r) => r.code}
            />
          </div>
        </PanelCard>
      </div>

      {/* Sales statistics — full width */}
      <div className="mt-6">
        <ChartCard
          title="Sales statistics"
          subtitle="Income vs. expense"
          actions={
            <SegmentedControl
              aria-label="Range"
              size="sm"
              options={[
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Year', value: 'year' },
              ]}
              value={range}
              onChange={setRange}
            />
          }
          type="area"
          height={280}
          data={salesStats}
          x="month"
          series={[
            { key: 'income', name: 'Income', color: 'var(--oks-color-primary-500)' },
            { key: 'expense', name: 'Expense', color: 'var(--oks-color-secondary-500)' },
          ]}
          dataFormat={{ prefix: '$', format: 'compact' }}
          legend
          tooltip
        />
      </div>

      {/* Top selling products — full width */}
      <div className="mt-6">
        <PanelCard
          title="Top selling products"
          actions={<Button as={Link} to="/apps/ecommerce/products" size="sm" variant="bordered">All products</Button>}
          bodyClassName="p-0"
        >
          <div className="p-5">
            <DataTable
              ariaLabel="Top selling products"
              pageSize={6}
              searchKeys={['name', 'category']}
              columns={[
                {
                  key: 'name',
                  header: 'Product',
                  render: (r) => (
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.name} radius="md" size={30} color="primary" />
                      <div>
                        <div className="text-[0.82rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</div>
                        <div className="text-[0.74rem]" style={{ color: 'var(--app-fg-muted)' }}>{r.category}</div>
                      </div>
                    </div>
                  ),
                },
                { key: 'status', header: 'Stock', render: (r) => <StatusChip status={r.stock === 0 ? 'Out of stock' : r.stock < 15 ? 'Few left' : 'In stock'} /> },
                { key: 'price', header: 'Price', align: 'end', sortable: true, render: (r) => `$${r.price}` },
                { key: 'sold', header: 'Sold', align: 'end', sortable: true, render: (r) => r.sold.toLocaleString() },
                actionColumn(),
              ]}
              rows={topProducts}
            />
          </div>
        </PanelCard>
      </div>

      {/* Sales value + Monthly profits */}
      <div className="mt-6 grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-2">
        <PanelCard
          title="Sales value"
          actions={<Button as={Link} to="/dashboards/analytics" size="sm" variant="ghost">View all</Button>}
          bodyClassName="p-0"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-5">
            <div>
              <p className="text-[0.78rem]" style={{ color: 'var(--app-fg-muted)' }}>Sale items</p>
              <p className="text-[1.3rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{salesValue.items}</p>
            </div>
            <div>
              <p className="text-[0.78rem]" style={{ color: 'var(--app-fg-muted)' }}>Sale revenue</p>
              <p className="text-[1.3rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{salesValue.revenue}</p>
            </div>
            <TrendChip value={salesValue.delta} />
          </div>
          <BareChart
            className="mt-2"
            type="area"
            height={190}
            data={salesStats}
            x="month"
            series={[{ key: 'income', name: 'Value', color: 'var(--oks-color-primary-500)' }]}
            axisX={{ hide: true }}
            axisY={{ hide: true }}
          />
        </PanelCard>

        <PanelCard title="Monthly profits" actions={<Button as={Link} to="/dashboards/analytics" size="sm" variant="ghost">View all</Button>}>
          <div className="mb-4 border-b pb-4" style={{ borderColor: 'var(--app-border)' }}>
            <p className="text-[1.35rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{monthlyProfits.total}</p>
            <p className="mt-0.5 flex items-center gap-2 text-[0.78rem]" style={{ color: 'var(--app-fg-muted)' }}>
              {monthlyProfits.note}
              <TrendChip value={9.2} />
            </p>
          </div>
          <MeterList
            items={monthlyProfits.bars.map((b) => ({ label: b.label, value: b.value, color: b.color, display: `${b.value}%` }))}
          />
        </PanelCard>
      </div>

      {/* Transactions + Recent orders */}
      <div className="mt-6 grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-5">
        <PanelCard className="lg:col-span-2" title="Transactions history" actions={<Button as={Link} to="/pages/invoice/list" size="sm" variant="ghost">View all</Button>}>
          <ul className="flex flex-col">
            {transactions.map((t, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                style={{ borderBottom: i < transactions.length - 1 ? '1px solid var(--app-border)' : 'none' }}
              >
                <div className="min-w-0">
                  <p className="truncate text-[0.83rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{t.label}</p>
                  <p className="text-[0.73rem]" style={{ color: 'var(--app-fg-subtle)' }}>{t.time}</p>
                </div>
                <span
                  className="shrink-0 text-[0.83rem] font-semibold"
                  style={{ color: t.amount >= 0 ? 'var(--app-success)' : 'var(--app-danger)' }}
                >
                  {t.amount >= 0 ? '+' : '−'}{money(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard
          className="lg:col-span-3"
          title="Recent orders"
          actions={<Button as={Link} to="/apps/ecommerce/orders" size="sm" variant="bordered">All orders</Button>}
          bodyClassName="p-0"
        >
          <div className="p-5">
            <DataTable
              ariaLabel="Recent orders"
              pageSize={6}
              columns={[
                { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.customer} /> },
                {
                  key: 'id',
                  header: 'Order',
                  render: (r) => (
                    <Link to="/apps/ecommerce/order-details" className="font-medium" style={{ color: 'var(--app-primary)' }}>{r.id}</Link>
                  ),
                },
                { key: 'date', header: 'Date', align: 'end', render: (r) => fmtDate(r.date) },
                { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => `$${r.total.toFixed(2)}` },
                { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
                actionColumn(),
              ]}
              rows={recentOrders}
            />
          </div>
        </PanelCard>
      </div>
    </>
  )
}

function flag(code) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}
