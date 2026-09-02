import { fmtDate, fmtDateTime } from '../lib/date'
import { orders, products, invoices } from './catalog'

const money = (n) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const order = orders[0]
const product = products[0]
const invoice = invoices[0]

export const DETAIL_CONFIGS = {
  '/apps/ecommerce/order-details': {
    title: `Order ${order.id}`,
    trail: [{ label: 'Orders', to: '/apps/ecommerce/orders' }, { label: order.id }],
    sections: [
      {
        title: 'Summary',
        rows: [
          { label: 'Order number', value: order.id },
          { label: 'Placed', value: fmtDate(order.date) },
          { label: 'Channel', value: order.channel },
          { label: 'Items', value: order.items },
          { label: 'Status', value: order.status },
          { label: 'Total', value: money(order.total) },
        ],
      },
      {
        title: 'Line items',
        rows: [
          { label: products[0].name, value: money(products[0].price) },
          { label: products[1].name, value: money(products[1].price) },
          { label: products[4].name, value: money(products[4].price) },
        ],
      },
    ],
    aside: [
      {
        title: 'Customer',
        rows: [
          { label: 'Name', value: order.customer },
          { label: 'Email', value: order.email },
        ],
      },
      {
        title: 'Shipping',
        rows: [
          { label: 'Method', value: 'Standard · 3-5 days' },
          { label: 'Carrier', value: 'Meridian Freight' },
          { label: 'Tracking', value: 'MF-' + order.id.replace('CRX-', '') },
        ],
      },
    ],
    timeline: [
      { title: 'Order placed', time: fmtDateTime(order.date + 'T09:04'), color: 'primary' },
      { title: 'Payment captured', time: fmtDateTime(order.date + 'T09:05'), color: 'success' },
      { title: 'Packed', time: fmtDateTime('2026-08-29T14:20'), color: 'info' },
      { title: 'Handed to carrier', time: fmtDateTime('2026-08-30T08:10', { time24: true }), color: 'warning' },
    ],
  },

  '/apps/ecommerce/product-details': {
    title: product.name,
    trail: [{ label: 'Products', to: '/apps/ecommerce/products' }, { label: product.name }],
    sections: [
      {
        title: 'Overview',
        rows: [
          { label: 'SKU', value: product.sku },
          { label: 'Category', value: product.category },
          { label: 'Price', value: `$${product.price}` },
          { label: 'Rating', value: `${product.rating} / 5` },
          { label: 'Status', value: product.status },
        ],
      },
      {
        title: 'Description',
        rows: (
          <p className="text-[0.86rem] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
            A considered piece for everyday use — matte finish, replaceable parts, and a
            five-year warranty. Ships flat-packed with tool-free assembly.
          </p>
        ),
      },
    ],
    aside: [
      {
        title: 'Inventory',
        rows: [
          { label: 'On hand', value: product.stock },
          { label: 'Committed', value: Math.round(product.stock / 4) },
          { label: 'Reorder point', value: 12 },
        ],
      },
      {
        title: 'Performance',
        rows: [
          { label: 'Units sold', value: product.sold },
          { label: 'Return rate', value: '2.1%' },
        ],
      },
    ],
  },

  '/pages/invoice/details': {
    title: invoice.id,
    trail: [{ label: 'Invoices', to: '/pages/invoice/list' }, { label: invoice.id }],
    sections: [
      {
        title: 'Invoice',
        rows: [
          { label: 'Invoice number', value: invoice.id },
          { label: 'Issued', value: fmtDate(invoice.issued) },
          { label: 'Due', value: fmtDate(invoice.due) },
          { label: 'Status', value: invoice.status },
          { label: 'Amount due', value: money(invoice.amount) },
        ],
      },
      {
        title: 'Line items',
        rows: [
          { label: 'Design retainer — August', value: money(invoice.amount * 0.6) },
          { label: 'Asset production', value: money(invoice.amount * 0.3) },
          { label: 'Expenses', value: money(invoice.amount * 0.1) },
        ],
      },
    ],
    aside: [
      {
        title: 'Client',
        rows: [
          { label: 'Company', value: invoice.client },
          { label: 'Contact', value: invoice.contact },
        ],
      },
    ],
  },

  '/pages/file-manager/details': {
    title: 'Q3 Brand Refresh.fig',
    trail: [{ label: 'File Manager', to: '/pages/file-manager' }, { label: 'Details' }],
    sections: [
      {
        title: 'File',
        rows: [
          { label: 'Type', value: 'Figma document' },
          { label: 'Size', value: '48.2 MB' },
          { label: 'Owner', value: 'Wren Ashby' },
          { label: 'Modified', value: fmtDate('2026-08-28') },
          { label: 'Shared with', value: '6 people' },
        ],
      },
    ],
    aside: [
      {
        title: 'Activity',
        rows: [
          { label: 'Opened', value: '38 times' },
          { label: 'Comments', value: '12' },
        ],
      },
    ],
  },
}
