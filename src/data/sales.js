// Deterministic mock data — index-generated, never Math.random, never the
// reference's strings/numbers.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const salesKpis = [
  { key: 'sales', label: 'Total Sales', value: '$21,320', delta: 18.2, tone: 'primary', to: '/apps/ecommerce/orders' },
  { key: 'revenue', label: 'Total Revenue', value: '$37,940', delta: 4.6, tone: 'success', to: '/dashboards/analytics' },
  { key: 'products', label: 'Total Products', value: '24,806', delta: 9.1, tone: 'info', to: '/apps/ecommerce/products' },
  { key: 'expenses', label: 'Total Expenses', value: '$68,215', delta: -3.4, tone: 'warning', to: '/dashboards/analytics' },
  { key: 'subs', label: 'Active Subscribers', value: '5,120', delta: 12.7, tone: 'secondary', to: '/pages/team' },
]

export const revenueSeries = MONTHS.map((m, i) => ({
  month: m,
  revenue: 12000 + Math.round(Math.sin(i / 1.7) * 3200) + i * 640,
  orders: 3200 + Math.round(Math.cos(i / 2.1) * 900) + i * 130,
}))

export const salesByCountry = [
  { country: 'United States', code: 'US', sales: 4820, bounce: 12.4, trend: 'down' },
  { country: 'Germany', code: 'DE', sales: 3110, bounce: 21.9, trend: 'up' },
  { country: 'United Kingdom', code: 'GB', sales: 2740, bounce: 9.2, trend: 'down' },
  { country: 'Canada', code: 'CA', sales: 1980, bounce: 15.6, trend: 'up' },
  { country: 'Australia', code: 'AU', sales: 1420, bounce: 18.1, trend: 'up' },
  { country: 'India', code: 'IN', sales: 1260, bounce: 11.0, trend: 'down' },
]

export const channelSplit = [
  { label: 'Direct', value: 38 },
  { label: 'Organic search', value: 27 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 11 },
  { label: 'Email', value: 6 },
]

export const recentActivity = [
  { title: 'Order CRX-4821 marked delivered', time: '9m ago', description: 'Fulfilment · Priya Nandakumar', color: 'success' },
  { title: 'Refund issued for CRX-4790', time: '46m ago', description: 'Payments · $128.00', color: 'danger' },
  { title: 'New wholesale enquiry', time: '2h ago', description: 'Sales · Meridian Supply Co.', color: 'primary' },
  { title: 'Inventory low: Aster Table Lamp', time: '5h ago', description: '8 units remaining', color: 'warning' },
  { title: 'Weekly payout settled', time: '1d ago', description: 'Finance · $14,206.55', color: 'info' },
]

export const topProducts = [
  { id: 'P-1001', name: 'Aster Table Lamp', category: 'Lighting', price: 89, sold: 412, stock: 8, status: 'Active' },
  { id: 'P-1002', name: 'Vantage Desk Chair', category: 'Furniture', price: 240, sold: 388, stock: 54, status: 'Active' },
  { id: 'P-1003', name: 'Corda Wool Throw', category: 'Textiles', price: 65, sold: 356, stock: 0, status: 'Draft' },
  { id: 'P-1004', name: 'Halcyon Speaker', category: 'Audio', price: 149, sold: 322, stock: 27, status: 'Active' },
  { id: 'P-1005', name: 'Nimbus Diffuser', category: 'Wellness', price: 54, sold: 298, stock: 12, status: 'Active' },
  { id: 'P-1006', name: 'Orbit Wall Clock', category: 'Decor', price: 72, sold: 265, stock: 41, status: 'Active' },
]

export const recentOrders = [
  { id: 'CRX-4821', customer: 'Priya Nandakumar', date: '2026-08-30', total: 318.0, status: 'Delivered' },
  { id: 'CRX-4820', customer: 'Dominic Alvarez', date: '2026-08-30', total: 129.5, status: 'Shipped' },
  { id: 'CRX-4819', customer: 'Sofia Renner', date: '2026-08-29', total: 542.0, status: 'Processing' },
  { id: 'CRX-4818', customer: 'Emeka Obi', date: '2026-08-29', total: 89.0, status: 'Pending' },
  { id: 'CRX-4817', customer: 'Lena Fischer', date: '2026-08-28', total: 216.75, status: 'Delivered' },
  { id: 'CRX-4816', customer: 'Marco Bianchi', date: '2026-08-28', total: 74.0, status: 'Cancelled' },
]
