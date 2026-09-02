import { Link } from 'react-router-dom'
import { Package, ShoppingCart, ReceiptText, Layers } from 'lucide-react'
import { StatusChip, EntityCell, TrendChip } from '../Components/ui'
import { products, orders, invoices, team, reviews, wishlist } from './catalog'

const money = (n) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const productColumns = [
  {
    key: 'name',
    header: 'Product',
    render: (r) => <EntityCell name={r.name} sub={r.sku} company />,
  },
  { key: 'category', header: 'Category' },
  { key: 'price', header: 'Price', align: 'end', sortable: true, render: (r) => `$${r.price}` },
  { key: 'stock', header: 'Stock', align: 'end', sortable: true },
  { key: 'sold', header: 'Sold', align: 'end', sortable: true },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

export const LIST_CONFIGS = {
  '/apps/ecommerce/products': {
    title: 'Products',
    subtitle: 'Every product across all channels.',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Products' }],
    columns: productColumns,
    rows: products,
    searchKeys: ['name', 'sku', 'category'],
    filters: [
      { label: 'In stock', test: (r) => r.stock > 0 },
      { label: 'Out of stock', test: (r) => r.stock === 0 },
      { label: 'Draft', test: (r) => r.status === 'Draft' },
    ],
    stats: [
      { label: 'Total products', value: String(products.length), tone: 'primary', icon: Package },
      { label: 'Active', value: String(products.filter((p) => p.status === 'Active').length), tone: 'success', icon: Layers },
      { label: 'Out of stock', value: String(products.filter((p) => p.stock === 0).length), tone: 'danger', icon: Package },
      { label: 'Categories', value: String(new Set(products.map((p) => p.category)).size), tone: 'info', icon: Layers },
    ],
    createTo: '/apps/ecommerce/add-product',
    createLabel: 'Add product',
  },

  '/apps/ecommerce/products-list': {
    title: 'Products List',
    subtitle: 'Compact list view with inline pricing.',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Products List' }],
    columns: [
      { key: 'name', header: 'Product', render: (r) => (
        <Link to="/apps/ecommerce/product-details" className="font-medium" style={{ color: 'var(--app-primary)' }}>{r.name}</Link>
      ) },
      { key: 'category', header: 'Category' },
      { key: 'rating', header: 'Rating', align: 'end' },
      { key: 'price', header: 'Price', align: 'end', sortable: true, render: (r) => `$${r.price}` },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: products,
    searchKeys: ['name', 'category'],
    createTo: '/apps/ecommerce/add-product',
    createLabel: 'Add product',
  },

  '/apps/ecommerce/orders': {
    title: 'Orders',
    subtitle: 'Every order across all channels.',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Orders' }],
    columns: [
      { key: 'id', header: 'Order', render: (r) => (
        <Link to="/apps/ecommerce/order-details" className="font-medium" style={{ color: 'var(--app-primary)' }}>{r.id}</Link>
      ) },
      { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.customer} /> },
      { key: 'date', header: 'Date', align: 'end', sortable: true },
      { key: 'items', header: 'Items', align: 'end' },
      { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => money(r.total) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: orders,
    searchKeys: ['id', 'customer', 'email'],
    filters: [
      { label: 'Open', test: (r) => !['Delivered', 'Cancelled', 'Refunded'].includes(r.status) },
      { label: 'Delivered', test: (r) => r.status === 'Delivered' },
      { label: 'Cancelled', test: (r) => r.status === 'Cancelled' },
    ],
    stats: [
      { label: 'Orders', value: String(orders.length), tone: 'primary', icon: ShoppingCart },
      { label: 'Open', value: String(orders.filter((o) => !['Delivered', 'Cancelled', 'Refunded'].includes(o.status)).length), tone: 'warning', icon: ShoppingCart },
      { label: 'Delivered', value: String(orders.filter((o) => o.status === 'Delivered').length), tone: 'success', icon: ShoppingCart },
      { label: 'Revenue', value: money(orders.reduce((s, o) => s + o.total, 0)), tone: 'info', icon: ReceiptText },
    ],
  },

  '/apps/ecommerce/wishlist': {
    title: 'Wishlist',
    subtitle: 'Products saved by customers.',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Wishlist' }],
    columns: [
      { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={r.category} company /> },
      { key: 'price', header: 'Price', align: 'end', sortable: true, render: (r) => `$${r.price}` },
      { key: 'addedOn', header: 'Added', align: 'end', sortable: true },
      { key: 'status', header: 'Availability', render: (r) => <StatusChip status={r.stock > 0 ? 'Active' : 'Cancelled'} /> },
    ],
    rows: wishlist,
    searchKeys: ['name', 'category'],
  },

  '/pages/invoice/list': {
    title: 'Invoice List',
    subtitle: 'All issued invoices.',
    trail: [{ label: 'Invoices', to: '/pages/invoice/list' }, { label: 'List' }],
    columns: [
      { key: 'id', header: 'Invoice', render: (r) => (
        <Link to="/pages/invoice/details" className="font-medium" style={{ color: 'var(--app-primary)' }}>{r.id}</Link>
      ) },
      { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} sub={r.contact} company /> },
      { key: 'issued', header: 'Issued', align: 'end', sortable: true },
      { key: 'due', header: 'Due', align: 'end', sortable: true },
      { key: 'amount', header: 'Amount', align: 'end', sortable: true, render: (r) => money(r.amount) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: invoices,
    searchKeys: ['id', 'client', 'contact'],
    filters: [
      { label: 'Paid', test: (r) => r.status === 'Paid' },
      { label: 'Pending', test: (r) => r.status === 'Pending' },
      { label: 'Overdue', test: (r) => r.status === 'Overdue' },
    ],
    stats: [
      { label: 'Invoiced', value: money(invoices.reduce((s, i) => s + i.amount, 0)), tone: 'primary', icon: ReceiptText },
      { label: 'Paid', value: String(invoices.filter((i) => i.status === 'Paid').length), tone: 'success', icon: ReceiptText },
      { label: 'Pending', value: String(invoices.filter((i) => i.status === 'Pending').length), tone: 'warning', icon: ReceiptText },
      { label: 'Overdue', value: String(invoices.filter((i) => i.status === 'Overdue').length), tone: 'danger', icon: ReceiptText },
    ],
    createTo: '/pages/invoice/create',
    createLabel: 'Create invoice',
  },

  '/pages/team': {
    title: 'Team',
    subtitle: 'Everyone at Cearix.',
    trail: [{ label: 'Pages', to: '/pages/team' }, { label: 'Team' }],
    columns: [
      { key: 'name', header: 'Member', render: (r) => <EntityCell name={r.name} sub={r.email} seed={r.name} /> },
      { key: 'role', header: 'Role' },
      { key: 'department', header: 'Department' },
      { key: 'location', header: 'Location', align: 'end' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: team,
    searchKeys: ['name', 'role', 'department'],
    filters: [{ label: 'On leave', test: (r) => r.status === 'On leave' }],
  },

  '/pages/reviews': {
    title: 'Reviews',
    subtitle: 'Customer product reviews.',
    trail: [{ label: 'Pages', to: '/pages/reviews' }, { label: 'Reviews' }],
    columns: [
      { key: 'author', header: 'Author', render: (r) => <EntityCell name={r.author} sub={r.date} seed={r.author} /> },
      { key: 'product', header: 'Product' },
      { key: 'title', header: 'Review' },
      { key: 'rating', header: 'Rating', align: 'end', sortable: true, render: (r) => <TrendChip value={r.rating} suffix="★" /> },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: reviews,
    searchKeys: ['author', 'product', 'title'],
    filters: [
      { label: 'Pending', test: (r) => r.status === 'Pending' },
      { label: 'Flagged', test: (r) => r.status === 'Flagged' },
    ],
  },

  '/tables/basic': {
    title: 'Basic Tables',
    subtitle: 'A plain sortable table built on the oks-ui Table primitive.',
    trail: [{ label: 'Tables', to: '/tables/basic' }, { label: 'Basic' }],
    columns: productColumns,
    rows: products.slice(0, 12),
    pageSize: 12,
  },

  '/tables/grid': {
    title: 'Grid Tables',
    subtitle: 'Searchable, filterable, paginated grid.',
    trail: [{ label: 'Tables', to: '/tables/grid' }, { label: 'Grid' }],
    columns: productColumns,
    rows: products,
    searchKeys: ['name', 'sku', 'category'],
    filters: [{ label: 'In stock', test: (r) => r.stock > 0 }],
  },

  '/tables/data-table': {
    title: 'Data Tables',
    subtitle: 'Full data table — search, filters, sort, pagination.',
    trail: [{ label: 'Tables', to: '/tables/data-table' }, { label: 'Data Table' }],
    columns: [
      { key: 'id', header: 'Order' },
      { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.customer} /> },
      { key: 'channel', header: 'Channel' },
      { key: 'date', header: 'Date', align: 'end', sortable: true },
      { key: 'total', header: 'Total', align: 'end', sortable: true, render: (r) => money(r.total) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: orders,
    searchKeys: ['id', 'customer', 'channel'],
    filters: [
      { label: 'Web', test: (r) => r.channel === 'Web' },
      { label: 'Wholesale', test: (r) => r.channel === 'Wholesale' },
    ],
  },
}
