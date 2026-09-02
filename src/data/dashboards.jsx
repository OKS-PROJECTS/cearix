import {
  Bitcoin, Briefcase, Users, ShoppingBag, LineChart, FolderKanban, Gem,
  Wallet, TrendingUp, Activity, DollarSign,
  UserCheck, Clock, Target, Award, Heart, Flame, BookOpen,
} from 'lucide-react'
import { StatusChip, EntityCell } from '../Components/ui'
import { fmtDate } from '../lib/date'

const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const wave = (base, amp, step, phase = 0) =>
  M.map((m, i) => ({ month: m, value: Math.round(base + Math.sin(i / 1.9 + phase) * amp + i * step) }))
const series2 = (base, amp, step, k1, k2) =>
  M.map((m, i) => ({
    month: m,
    [k1]: Math.round(base + Math.sin(i / 1.9) * amp + i * step),
    [k2]: Math.round(base * 0.6 + Math.cos(i / 2.2) * amp * 0.8 + i * step * 0.7),
  }))

const kpi = (label, value, delta, icon, tone, to) => ({ label, value, delta, icon, tone, to })

export const DASHBOARD_CONFIGS = {
  '/dashboards/crypto': {
    title: 'Crypto',
    action: { label: 'Open wallet', to: '/dashboards/stocks' },
    kpis: [
      kpi('Portfolio value', '$84,210', 6.3, Bitcoin, 'primary', '/dashboards/stocks'),
      kpi('24h change', '+$1,940', 2.4, TrendingUp, 'success'),
      kpi('Staking rewards', '$612', 11.8, Gem, 'info'),
      kpi('Open positions', '9', -1.2, Activity, 'warning'),
    ],
    chart: {
      title: 'Portfolio performance', subtitle: 'BTC vs. ETH allocation',
      type: 'area', x: 'month', data: series2(24000, 6000, 900, 'btc', 'eth'),
      series: [{ key: 'btc', name: 'BTC', color: 'var(--oks-color-primary-500)' }, { key: 'eth', name: 'ETH', color: 'var(--oks-color-info-500)' }],
      dataFormat: { prefix: '$', format: 'compact' }, legend: true,
    },
    side: {
      kind: 'donut', title: 'Allocation', subtitle: 'By asset',
      data: [
        { label: 'Bitcoin', value: 44 }, { label: 'Ethereum', value: 26 },
        { label: 'Solana', value: 14 }, { label: 'Stablecoins', value: 10 }, { label: 'Other', value: 6 },
      ],
      centerValue: '$84.2k', centerLabel: 'Total',
    },
    table: {
      title: 'Recent trades',
      columns: [
        { key: 'pair', header: 'Pair' },
        { key: 'side', header: 'Side', render: (r) => <StatusChip status={r.side === 'Buy' ? 'Active' : 'Cancelled'} /> },
        { key: 'amount', header: 'Amount', align: 'end' },
        { key: 'price', header: 'Price', align: 'end' },
        { key: 'time', header: 'Time', align: 'end' },
      ],
      rows: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'BTC/USD', 'ADA/USD', 'ETH/USD'].map((pair, i) => ({
        id: i, pair, side: i % 2 ? 'Sell' : 'Buy',
        amount: `${(0.4 + i * 0.3).toFixed(2)}`, price: `$${(2000 + i * 640).toLocaleString()}`,
        time: `${9 + i}:0${i} AM`,
      })),
    },
    activity: {
      title: 'Alerts',
      data: [
        { title: 'BTC crossed $64,000', time: '10m ago', color: 'success' },
        { title: 'Staking payout received', time: '2h ago', color: 'info' },
        { title: 'Gas fees elevated', time: '5h ago', color: 'warning' },
      ],
    },
  },

  '/dashboards/jobs': {
    title: 'Jobs',
    action: { label: 'Post a job', to: '/forms/wizard' },
    kpis: [
      kpi('Active listings', '38', 4.1, Briefcase, 'primary'),
      kpi('Applicants', '1,204', 18.6, Users, 'success'),
      kpi('Interviews', '76', 7.2, UserCheck, 'info'),
      kpi('Offers out', '12', -2.0, Award, 'warning'),
    ],
    chart: {
      title: 'Applications received', subtitle: 'Rolling 12 months',
      type: 'column', x: 'month', data: wave(80, 30, 6).map((d) => ({ month: d.month, applications: d.value })),
      series: [{ key: 'applications', name: 'Applications', color: 'var(--oks-color-primary-500)' }],
      column: { radius: 4 },
    },
    side: {
      kind: 'meters', title: 'Pipeline by stage',
      data: [
        { label: 'Applied', value: 82, color: 'primary' },
        { label: 'Screening', value: 54, color: 'info' },
        { label: 'Interview', value: 33, color: 'warning' },
        { label: 'Offer', value: 12, color: 'success' },
      ],
    },
    table: {
      title: 'Open roles',
      searchKeys: ['role', 'team'],
      columns: [
        { key: 'role', header: 'Role' },
        { key: 'team', header: 'Team' },
        { key: 'location', header: 'Location' },
        { key: 'applicants', header: 'Applicants', align: 'end', sortable: true },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: [
        ['Senior Product Designer', 'Design', 'Remote', 64, 'Open'],
        ['Backend Engineer', 'Platform', 'Lyon', 88, 'Open'],
        ['Data Analyst', 'Analytics', 'Austin', 41, 'Review'],
        ['Support Specialist', 'Support', 'Remote', 120, 'Open'],
        ['Growth Marketer', 'Marketing', 'Bristol', 33, 'Draft'],
        ['Engineering Manager', 'Platform', 'Remote', 27, 'Open'],
      ].map((r, i) => ({ id: i, role: r[0], team: r[1], location: r[2], applicants: r[3], status: r[4] })),
    },
  },

  '/dashboards/crm': {
    title: 'CRM',
    action: { label: 'View contacts', to: '/pages/contacts' },
    kpis: [
      kpi('Pipeline value', '$412k', 9.4, DollarSign, 'primary'),
      kpi('Won this month', '$88k', 14.2, Target, 'success'),
      kpi('Active deals', '146', 3.1, FolderKanban, 'info'),
      kpi('Win rate', '31%', 1.8, Award, 'warning'),
    ],
    chart: {
      title: 'Revenue won vs. lost', subtitle: 'Rolling 12 months',
      type: 'area', x: 'month', data: series2(30000, 9000, 700, 'won', 'lost'),
      series: [{ key: 'won', name: 'Won', color: 'var(--oks-color-success-500)' }, { key: 'lost', name: 'Lost', color: 'var(--oks-color-danger-500)' }],
      dataFormat: { prefix: '$', format: 'compact' }, legend: true,
    },
    side: {
      kind: 'donut', title: 'Deals by stage',
      data: [
        { label: 'Prospect', value: 48 }, { label: 'Qualified', value: 32 },
        { label: 'Proposal', value: 24 }, { label: 'Negotiation', value: 16 }, { label: 'Closing', value: 8 },
      ],
      centerValue: '128', centerLabel: 'Deals',
    },
    table: {
      title: 'Recent deals',
      columns: [
        { key: 'company', header: 'Company', render: (r) => <EntityCell name={r.company} sub={r.owner} company /> },
        { key: 'value', header: 'Value', align: 'end', sortable: true },
        { key: 'stage', header: 'Stage' },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: [
        ['Northwind Studio', 'Rosa Delgado', '$42,000', 'Proposal', 'Active'],
        ['Cobalt Interiors', 'Theo Rees', '$28,500', 'Negotiation', 'Active'],
        ['Harbor Goods', 'Nadia Karim', '$16,200', 'Qualified', 'Pending'],
        ['Meridian Supply', 'Bruno Costa', '$61,000', 'Closing', 'Active'],
        ['Vale & Co.', 'Wren Ashby', '$9,400', 'Prospect', 'New'],
        ['Ember Retail', 'Kian Rees', '$34,800', 'Proposal', 'Active'],
      ].map((r, i) => ({ id: i, company: r[0], owner: r[1], value: r[2], stage: r[3], status: r[4] })),
    },
  },

  '/dashboards/ecommerce': {
    title: 'E-Commerce',
    action: { label: 'View products', to: '/apps/ecommerce/products' },
    kpis: [
      kpi('Revenue', '$128,940', 12.4, ShoppingBag, 'primary', '/dashboards/analytics'),
      kpi('Orders', '3,412', 6.8, ShoppingBag, 'info', '/apps/ecommerce/orders'),
      kpi('Avg. order value', '$37.80', 2.1, DollarSign, 'success'),
      kpi('Refund rate', '1.9%', -0.4, Activity, 'warning'),
    ],
    chart: {
      title: 'Sales & sessions', subtitle: 'Rolling 12 months',
      type: 'area', x: 'month', data: series2(9000, 2600, 500, 'sales', 'sessions'),
      series: [{ key: 'sales', name: 'Sales', color: 'var(--oks-color-primary-500)' }, { key: 'sessions', name: 'Sessions', color: 'var(--oks-color-info-500)' }],
      dataFormat: { format: 'compact' }, legend: true,
    },
    side: {
      kind: 'donut', title: 'Sales by category',
      data: [
        { label: 'Furniture', value: 34 }, { label: 'Lighting', value: 22 },
        { label: 'Textiles', value: 18 }, { label: 'Audio', value: 15 }, { label: 'Decor', value: 11 },
      ],
      centerValue: '100%', centerLabel: 'Sales',
    },
    table: {
      title: 'Best sellers',
      columns: [
        { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={r.category} company /> },
        { key: 'units', header: 'Units', align: 'end', sortable: true },
        { key: 'revenue', header: 'Revenue', align: 'end', sortable: true },
      ],
      rows: [
        ['Vantage Desk Chair', 'Furniture', 412, '$98,880'],
        ['Aster Table Lamp', 'Lighting', 388, '$34,532'],
        ['Halcyon Speaker', 'Audio', 322, '$47,978'],
        ['Corda Wool Throw', 'Textiles', 298, '$19,370'],
        ['Orbit Wall Clock', 'Decor', 265, '$19,080'],
        ['Nimbus Diffuser', 'Wellness', 244, '$13,176'],
      ].map((r, i) => ({ id: i, name: r[0], category: r[1], units: r[2], revenue: r[3] })),
    },
  },

  '/dashboards/analytics': {
    title: 'Analytics',
    kpis: [
      kpi('Sessions', '184,204', 8.1, LineChart, 'primary'),
      kpi('Users', '92,880', 5.4, Users, 'info'),
      kpi('Bounce rate', '38.2%', -1.6, Activity, 'success'),
      kpi('Avg. duration', '3m 42s', 4.0, Clock, 'warning'),
    ],
    chart: {
      title: 'Traffic overview', subtitle: 'Sessions by month',
      type: 'area', x: 'month', data: wave(12000, 3400, 700).map((d) => ({ month: d.month, sessions: d.value })),
      series: [{ key: 'sessions', name: 'Sessions', color: 'var(--oks-color-primary-500)' }],
      dataFormat: { format: 'compact' },
    },
    side: {
      kind: 'donut', title: 'Traffic by source',
      data: [
        { label: 'Organic', value: 42 }, { label: 'Direct', value: 24 },
        { label: 'Referral', value: 18 }, { label: 'Social', value: 10 }, { label: 'Email', value: 6 },
      ],
      centerValue: '100%', centerLabel: 'Sessions',
    },
    table: {
      title: 'Top pages',
      columns: [
        { key: 'path', header: 'Page' },
        { key: 'views', header: 'Views', align: 'end', sortable: true },
        { key: 'avg', header: 'Avg. time', align: 'end' },
        { key: 'bounce', header: 'Bounce', align: 'end' },
      ],
      rows: [
        ['/', '48,204', '1m 12s', '32%'],
        ['/pricing', '18,900', '2m 40s', '28%'],
        ['/blog/scaling-design-systems', '12,340', '4m 05s', '19%'],
        ['/product/vantage-chair', '9,880', '3m 20s', '41%'],
        ['/docs/getting-started', '7,650', '5m 55s', '12%'],
        ['/changelog', '5,210', '2m 02s', '35%'],
      ].map((r, i) => ({ id: i, path: r[0], views: r[1], avg: r[2], bounce: r[3] })),
    },
  },

  '/dashboards/projects': {
    title: 'Projects',
    action: { label: 'Open board', to: '/advanced-ui/draggable-cards' },
    kpis: [
      kpi('Active projects', '24', 2.0, FolderKanban, 'primary'),
      kpi('On track', '18', 6.0, Target, 'success'),
      kpi('At risk', '4', 1.0, Activity, 'warning'),
      kpi('Overdue', '2', -1.0, Clock, 'danger'),
    ],
    chart: {
      title: 'Tasks completed', subtitle: 'Rolling 12 months',
      type: 'column', x: 'month', data: wave(120, 40, 5).map((d) => ({ month: d.month, tasks: d.value })),
      series: [{ key: 'tasks', name: 'Tasks', color: 'var(--oks-color-primary-500)' }],
      column: { radius: 4 },
    },
    side: {
      kind: 'meters', title: 'Progress by project',
      data: [
        { label: 'Brand refresh', value: 82, color: 'primary' },
        { label: 'Mobile app v2', value: 58, color: 'info' },
        { label: 'Warehouse move', value: 40, color: 'warning' },
        { label: 'Docs overhaul', value: 24, color: 'success' },
      ],
    },
    table: {
      title: 'Projects',
      searchKeys: ['name', 'lead'],
      columns: [
        { key: 'name', header: 'Project' },
        { key: 'lead', header: 'Lead', render: (r) => <EntityCell name={r.lead} seed={r.lead} size={26} /> },
        { key: 'due', header: 'Due', align: 'end', render: (r) => fmtDate(r.due) },
        { key: 'progress', header: 'Progress', align: 'end', render: (r) => `${r.progress}%` },
        { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      ],
      rows: [
        ['Brand refresh', 'Wren Ashby', '2026-09-20', 82, 'Active'],
        ['Mobile app v2', 'Theo Rees', '2026-10-04', 58, 'Active'],
        ['Warehouse move', 'Rosa Delgado', '2026-09-30', 40, 'Review'],
        ['Docs overhaul', 'Kian Rees', '2026-11-12', 24, 'Active'],
        ['Loyalty program', 'Nadia Karim', '2026-10-22', 12, 'Pending'],
      ].map((r, i) => ({ id: i, name: r[0], lead: r[1], due: r[2], progress: r[3], status: r[4] })),
    },
  },

  '/dashboards/nft': {
    title: 'NFT',
    kpis: [
      kpi('Floor price', '2.4 ETH', 5.2, Gem, 'primary'),
      kpi('Volume (24h)', '184 ETH', 22.0, TrendingUp, 'success'),
      kpi('Owners', '3,120', 1.4, Users, 'info'),
      kpi('Listed', '18%', -2.1, Activity, 'warning'),
    ],
    chart: {
      title: 'Floor price & volume', subtitle: 'Rolling 12 months',
      type: 'area', x: 'month', data: series2(40, 14, 1.4, 'floor', 'volume'),
      series: [{ key: 'floor', name: 'Floor (ETH)', color: 'var(--oks-color-primary-500)' }, { key: 'volume', name: 'Volume (ETH)', color: 'var(--oks-color-secondary-500)' }],
      legend: true,
    },
    side: {
      kind: 'donut', title: 'Collection by rarity',
      data: [
        { label: 'Common', value: 52 }, { label: 'Uncommon', value: 28 },
        { label: 'Rare', value: 14 }, { label: 'Legendary', value: 6 },
      ],
      centerValue: '10k', centerLabel: 'Items',
    },
    table: {
      title: 'Recent sales',
      columns: [
        { key: 'item', header: 'Item' },
        { key: 'price', header: 'Price', align: 'end', sortable: true },
        { key: 'from', header: 'From' },
        { key: 'to', header: 'To' },
        { key: 'time', header: 'Time', align: 'end' },
      ],
      rows: Array.from({ length: 6 }, (_, i) => ({
        id: i, item: `Aster #${1200 + i * 37}`, price: `${(1.8 + i * 0.6).toFixed(2)} ETH`,
        from: `0x${(i * 4210).toString(16)}…`, to: `0x${(i * 8820).toString(16)}…`, time: `${i + 1}h ago`,
      })),
    },
  },

  '/dashboards/hrm': {
    title: 'HRM',
    kpis: [
      kpi('Headcount', '248', 3.2, Users, 'primary', '/pages/team'),
      kpi('New hires (30d)', '11', 8.0, UserCheck, 'success'),
      kpi('Attrition', '4.1%', -0.6, Activity, 'warning'),
      kpi('Open roles', '18', 2.0, Briefcase, 'info', '/dashboards/jobs'),
    ],
    chart: {
      title: 'Headcount trend', subtitle: 'Rolling 12 months',
      type: 'area', x: 'month', data: wave(210, 12, 4).map((d) => ({ month: d.month, headcount: d.value })),
      series: [{ key: 'headcount', name: 'Headcount', color: 'var(--oks-color-primary-500)' }],
    },
    side: {
      kind: 'donut', title: 'By department',
      data: [
        { label: 'Engineering', value: 96 }, { label: 'Sales', value: 54 },
        { label: 'Design', value: 32 }, { label: 'Support', value: 40 }, { label: 'Ops', value: 26 },
      ],
      centerValue: '248', centerLabel: 'People',
    },
    meters: {
      title: 'Engagement by team',
      data: [
        { label: 'Engineering', value: 78, color: 'primary' },
        { label: 'Design', value: 84, color: 'success' },
        { label: 'Sales', value: 66, color: 'warning' },
        { label: 'Support', value: 71, color: 'info' },
      ],
    },
    activity: {
      title: 'People updates',
      data: [
        { title: 'Mira Kapoor joined Design', time: '2d ago', color: 'success' },
        { title: 'Q3 review cycle opened', time: '4d ago', color: 'primary' },
        { title: 'Two offers accepted', time: '1w ago', color: 'info' },
      ],
    },
  },

  '/dashboards/personal': {
    title: 'Personal',
    kpis: [
      kpi('Tasks today', '7', 0, Target, 'primary', '/pages/todo'),
      kpi('Focus time', '4h 20m', 12.0, Clock, 'success'),
      kpi('Habits kept', '5 / 6', 4.0, Heart, 'info'),
      kpi('Unread', '12', -8.0, Activity, 'warning'),
    ],
    chart: {
      title: 'Focus hours', subtitle: 'This year',
      type: 'column', x: 'month', data: wave(60, 18, 1.5).map((d) => ({ month: d.month, hours: d.value })),
      series: [{ key: 'hours', name: 'Hours', color: 'var(--oks-color-primary-500)' }],
      column: { radius: 4 },
    },
    side: {
      kind: 'meters', title: 'Goals',
      data: [
        { label: 'Read 24 books', value: 62, color: 'primary' },
        { label: 'Run 500 km', value: 48, color: 'success' },
        { label: 'Ship side project', value: 30, color: 'warning' },
      ],
    },
    activity: {
      title: 'Today',
      data: [
        { title: 'Standup', time: '9:00', color: 'primary' },
        { title: 'Design review', time: '11:30', color: 'info' },
        { title: 'Gym', time: '18:00', color: 'success' },
      ],
    },
  },

  '/dashboards/stocks': {
    title: 'Stocks',
    kpis: [
      kpi('Net worth', '$312,480', 4.8, Wallet, 'primary'),
      kpi('Day change', '+$2,140', 0.7, TrendingUp, 'success'),
      kpi('Dividends (YTD)', '$4,860', 9.0, DollarSign, 'info'),
      kpi('Cash', '$18,200', -3.0, Activity, 'warning'),
    ],
    chart: {
      title: 'Portfolio value', subtitle: 'Rolling 12 months',
      type: 'area', x: 'month', data: wave(240000, 30000, 6000).map((d) => ({ month: d.month, value: d.value })),
      series: [{ key: 'value', name: 'Value', color: 'var(--oks-color-primary-500)' }],
      dataFormat: { prefix: '$', format: 'compact' },
    },
    side: {
      kind: 'donut', title: 'Holdings',
      data: [
        { label: 'Index funds', value: 46 }, { label: 'Tech', value: 22 },
        { label: 'Energy', value: 12 }, { label: 'Bonds', value: 12 }, { label: 'Cash', value: 8 },
      ],
      centerValue: '$312k', centerLabel: 'Total',
    },
    table: {
      title: 'Watchlist',
      columns: [
        { key: 'ticker', header: 'Ticker' },
        { key: 'name', header: 'Name' },
        { key: 'price', header: 'Price', align: 'end' },
        { key: 'change', header: 'Change', align: 'end', render: (r) => <StatusChip status={r.change.startsWith('-') ? 'Cancelled' : 'Active'} /> },
      ],
      rows: [
        ['ASTR', 'Aster Industries', '$142.10', '+1.4%'],
        ['MRDN', 'Meridian Freight', '$88.55', '-0.6%'],
        ['HLCN', 'Halcyon Audio', '$54.20', '+2.1%'],
        ['CRDA', 'Corda Textiles', '$31.90', '+0.3%'],
        ['ORBT', 'Orbit Devices', '$76.40', '-1.2%'],
      ].map((r, i) => ({ id: i, ticker: r[0], name: r[1], price: r[2], change: r[3] })),
    },
  },

  '/dashboards/courses': {
    title: 'Courses',
    action: { label: 'Browse catalog', to: '/pages/pricing' },
    kpis: [
      kpi('Enrolled', '18', 2.0, BookOpen, 'primary'),
      kpi('Completed', '11', 10.0, Award, 'success'),
      kpi('Hours learned', '146', 6.0, Clock, 'info'),
      kpi('Streak', '23 days', 4.0, Flame, 'warning'),
    ],
    chart: {
      title: 'Learning hours', subtitle: 'This year',
      type: 'column', x: 'month', data: wave(12, 6, 0.4).map((d) => ({ month: d.month, hours: d.value })),
      series: [{ key: 'hours', name: 'Hours', color: 'var(--oks-color-primary-500)' }],
      column: { radius: 4 },
    },
    side: {
      kind: 'meters', title: 'Courses in progress',
      data: [
        { label: 'Design systems', value: 74, color: 'primary' },
        { label: 'Data viz foundations', value: 52, color: 'info' },
        { label: 'Accessible interfaces', value: 38, color: 'success' },
        { label: 'Motion basics', value: 20, color: 'warning' },
      ],
    },
    table: {
      title: 'Recommended',
      columns: [
        { key: 'title', header: 'Course' },
        { key: 'level', header: 'Level' },
        { key: 'length', header: 'Length', align: 'end' },
        { key: 'rating', header: 'Rating', align: 'end' },
      ],
      rows: [
        ['Advanced React patterns', 'Advanced', '6h', '4.8'],
        ['Design tokens in practice', 'Intermediate', '3h', '4.7'],
        ['Charts that communicate', 'Intermediate', '4h', '4.9'],
        ['Interviewing users', 'Beginner', '2h', '4.6'],
      ].map((r, i) => ({ id: i, title: r[0], level: r[1], length: r[2], rating: r[3] })),
    },
  },
}
