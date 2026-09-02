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
import { fmtDate } from '../../lib/date'
import {
  PageHeader,
  KpiCard,
  ChartCard,
  DonutCard,
  PanelCard,
  DataTable,
  ActivityFeed,
  StatusChip,
} from '../../Components/ui'
import {
  salesKpis,
  revenueSeries,
  salesByCountry,
  channelSplit,
  recentActivity,
  topProducts,
  recentOrders,
} from '../../data/sales'

const ICONS = { sales: DollarSign, revenue: Wallet, products: Package, expenses: TrendingDown, subs: Users }

export default function SalesDashboard() {
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
          <KpiCard key={k.key} label={k.label} value={k.value} delta={k.delta} icon={ICONS[k.key]} tone={k.tone} to={k.to} />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        {salesKpis.slice(3).map((k) => (
          <KpiCard key={k.key} label={k.label} value={k.value} delta={k.delta} icon={ICONS[k.key]} tone={k.tone} to={k.to} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Revenue & orders"
          subtitle="Rolling 12 months"
          type="area"
          height={300}
          data={revenueSeries}
          x="month"
          series={[
            { key: 'revenue', name: 'Revenue', color: 'var(--oks-color-primary-500)' },
            { key: 'orders', name: 'Orders', color: 'var(--oks-color-info-500)' },
          ]}
          dataFormat={{ format: 'compact' }}
          legend
          tooltip
        />
        <DonutCard
          title="Traffic by channel"
          subtitle="Share of sessions"
          data={channelSplit}
          centerValue="100%"
          centerLabel="Sessions"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <PanelCard title="Recent activity" className="lg:col-span-1">
          <ActivityFeed items={recentActivity} />
        </PanelCard>

        <PanelCard
          title="Sales by country"
          className="lg:col-span-2"
          bodyClassName="p-0"
        >
          <div className="px-5 pb-4 pt-1">
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
                      <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                        {r.country}
                      </span>
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

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        <PanelCard
          title="Top selling products"
          actions={
            <Button as={Link} to="/apps/ecommerce/products" size="sm" variant="bordered">
              All products
            </Button>
          }
        >
          <DataTable
            ariaLabel="Top selling products"
            pageSize={6}
            searchKeys={['name', 'category']}
            columns={[
              { key: 'name', header: 'Product', render: (r) => (
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.name} radius="md" size={30} color="primary" />
                  <div>
                    <div className="text-[0.82rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</div>
                    <div className="text-[0.74rem]" style={{ color: 'var(--app-fg-muted)' }}>{r.category}</div>
                  </div>
                </div>
              ) },
              { key: 'price', header: 'Price', align: 'end', sortable: true, render: (r) => `$${r.price}` },
              { key: 'sold', header: 'Sold', align: 'end', sortable: true },
              { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
            ]}
            rows={topProducts}
          />
        </PanelCard>

        <PanelCard
          title="Recent orders"
          actions={
            <Button as={Link} to="/apps/ecommerce/orders" size="sm" variant="bordered">
              All orders
            </Button>
          }
        >
          <DataTable
            ariaLabel="Recent orders"
            pageSize={6}
            columns={[
              { key: 'id', header: 'Order', render: (r) => (
                <Link to="/apps/ecommerce/order-details" className="font-medium" style={{ color: 'var(--app-primary)' }}>
                  {r.id}
                </Link>
              ) },
              { key: 'customer', header: 'Customer' },
              { key: 'date', header: 'Date', align: 'end', render: (r) => fmtDate(r.date) },
              { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => `$${r.total.toFixed(2)}` },
              { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
            ]}
            rows={recentOrders}
          />
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
