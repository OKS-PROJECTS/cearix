import {
  Briefcase, Users, ShoppingBag, LineChart, FolderKanban,
  Activity, DollarSign, UserCheck, Clock, Target,
  Award, Flame, BookOpen,
} from 'lucide-react'
import { StatusChip, EntityCell } from '../Components/ui'
import { fmtDate } from '../lib/date'

const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const wave = (base, amp, step, key = 'value', phase = 0) =>
  M.map((m, i) => ({ month: m, [key]: Math.round(base + Math.sin(i / 1.9 + phase) * amp + i * step) }))
const wave2 = (b1, a1, s1, k1, b2, a2, s2, k2) =>
  M.map((m, i) => ({
    month: m,
    [k1]: Math.round(b1 + Math.sin(i / 1.9) * a1 + i * s1),
    [k2]: Math.round(b2 + Math.cos(i / 2.2) * a2 + i * s2),
  }))
const kpi = (label, value, delta, icon, tone, to) => ({ label, value, delta, icon, tone, to })
const P = 'var(--oks-color-primary-500)'
const I = 'var(--oks-color-info-500)'
const S = 'var(--oks-color-success-500)'
const D = 'var(--oks-color-danger-500)'
const SEC = 'var(--oks-color-secondary-500)'

export const DASHBOARD_CONFIGS = {
  /* ---------------------------------------------------------------- Crypto */
  '/dashboards/crypto': {
    title: 'Crypto',
    action: { label: 'Open wallet', to: '/dashboards/stocks' },
    rows: [
      [
        {
          type: 'hero', w: 4, label: 'Portfolio balance', value: '$84,210.44', delta: 6.3,
          sub: 'Across 9 assets · updated 2 min ago', tone: 'primary',
          chartData: wave(60000, 9000, 1600), chartKey: 'value',
          footer: '24h P/L +$1,940.12 · This month +$8,204.55',
        },
        {
          type: 'list', w: 2, title: 'Watchlist',
          items: [
            { badge: 'BTC', title: 'Bitcoin', sub: 'BTC/USD', value: '$64,120', delta: 1.4 },
            { badge: 'ETH', title: 'Ethereum', sub: 'ETH/USD', value: '$3,410', delta: 2.1 },
            { badge: 'SOL', title: 'Solana', sub: 'SOL/USD', value: '$168', delta: -0.6 },
            { badge: 'ADA', title: 'Cardano', sub: 'ADA/USD', value: '$0.62', delta: 3.2 },
            { badge: 'DOT', title: 'Polkadot', sub: 'DOT/USD', value: '$8.10', delta: -1.1 },
          ],
        },
      ],
      [
        {
          type: 'chart', w: 6, chartType: 'area', title: 'Market performance', subtitle: 'BTC vs. ETH — 12 months',
          x: 'month', data: wave2(28000, 6000, 900, 'btc', 15000, 3000, 500, 'eth'),
          series: [{ key: 'btc', name: 'BTC', color: P }, { key: 'eth', name: 'ETH', color: I }],
          dataFormat: { prefix: '$', format: 'compact' }, height: 280,
        },
      ],
      [
        {
          type: 'donut', w: 2, title: 'Allocation', centerValue: '$84.2k', centerLabel: 'Total',
          data: [
            { label: 'Bitcoin', value: 44 }, { label: 'Ethereum', value: 26 },
            { label: 'Solana', value: 14 }, { label: 'Stablecoins', value: 10 }, { label: 'Other', value: 6 },
          ],
        },
        {
          type: 'table', w: 4, title: 'Recent trades',
          columns: [
            { key: 'pair', header: 'Pair' },
            { key: 'side', header: 'Side', render: (r) => <StatusChip status={r.side === 'Buy' ? 'Active' : 'Cancelled'} /> },
            { key: 'amount', header: 'Amount', align: 'end' },
            { key: 'price', header: 'Price', align: 'end' },
            { key: 'time', header: 'Time', align: 'end' },
          ],
          rows: ['BTC/USD', 'ETH/USD', 'SOL/USD', 'BTC/USD', 'ADA/USD', 'ETH/USD'].map((pair, i) => ({
            id: i, pair, side: i % 2 ? 'Sell' : 'Buy',
            amount: (0.4 + i * 0.3).toFixed(2), price: `$${(2000 + i * 640).toLocaleString()}`,
            time: `${9 + i}:0${i} AM`,
          })),
        },
      ],
      [
        {
          type: 'activity', w: 3, title: 'Alerts',
          items: [
            { title: 'BTC crossed $64,000', time: '10 min ago', color: 'success' },
            { title: 'Staking payout received', time: '2 hr ago', description: '+0.42 ETH', color: 'info' },
            { title: 'Gas fees elevated', time: '5 hr ago', color: 'warning' },
          ],
        },
        {
          type: 'meters', w: 3, title: 'Staking positions',
          items: [
            { label: 'ETH 2.0', value: 62, color: 'primary', display: '3.1 ETH' },
            { label: 'SOL', value: 40, color: 'info', display: '48 SOL' },
            { label: 'DOT', value: 22, color: 'success', display: '120 DOT' },
          ],
        },
      ],
    ],
  },

  /* ------------------------------------------------------------------ Jobs */
  '/dashboards/jobs': {
    title: 'Jobs',
    action: { label: 'Post a job', to: '/forms/wizard' },
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Active listings', '38', 4.1, Briefcase, 'primary'),
          kpi('Applicants', '1,204', 18.6, Users, 'success'),
          kpi('Interviews', '76', 7.2, UserCheck, 'info'),
          kpi('Offers out', '12', -2.0, Award, 'warning'),
        ],
      }],
      [
        {
          type: 'chart', w: 4, chartType: 'column', title: 'Applications received', subtitle: 'Rolling 12 months',
          x: 'month', data: wave(60, 34, 5, 'applications'),
          series: [{ key: 'applications', name: 'Applications', color: P }], height: 280,
        },
        {
          type: 'meters', w: 2, title: 'Pipeline by stage',
          items: [
            { label: 'Applied', value: 82, color: 'primary', display: '984' },
            { label: 'Screening', value: 54, color: 'info', display: '312' },
            { label: 'Interview', value: 33, color: 'warning', display: '76' },
            { label: 'Offer', value: 12, color: 'success', display: '12' },
          ],
        },
      ],
      [
        {
          type: 'table', w: 4, title: 'Open roles', searchKeys: ['role', 'team'],
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
        {
          type: 'list', w: 2, title: 'Top applicants',
          items: [
            { avatar: 'Nadia Karim', title: 'Nadia Karim', sub: 'Product Designer', chip: 'Interview' },
            { avatar: 'Bruno Costa', title: 'Bruno Costa', sub: 'Backend Engineer', chip: 'Screening' },
            { avatar: 'Mira Kapoor', title: 'Mira Kapoor', sub: 'Data Analyst', chip: 'Offer' },
            { avatar: 'Theo Rees', title: 'Theo Rees', sub: 'Support Specialist', chip: 'Applied' },
          ],
        },
      ],
    ],
  },

  /* ------------------------------------------------------------------- CRM */
  '/dashboards/crm': {
    title: 'CRM',
    action: { label: 'View contacts', to: '/pages/contacts' },
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Pipeline value', '$412k', 9.4, DollarSign, 'primary'),
          kpi('Won this month', '$88k', 14.2, Target, 'success'),
          kpi('Active deals', '146', 3.1, FolderKanban, 'info'),
          kpi('Win rate', '31%', 1.8, Award, 'warning'),
        ],
      }],
      [
        {
          type: 'chart', w: 4, chartType: 'area', title: 'Revenue won vs. lost', subtitle: 'Rolling 12 months',
          x: 'month', data: wave2(24000, 8000, 700, 'won', 12000, 4000, 300, 'lost'),
          series: [{ key: 'won', name: 'Won', color: S }, { key: 'lost', name: 'Lost', color: D }],
          dataFormat: { prefix: '$', format: 'compact' }, height: 280,
        },
        {
          type: 'donut', w: 2, title: 'Deals by stage', centerValue: '128', centerLabel: 'Deals',
          data: [
            { label: 'Prospect', value: 48 }, { label: 'Qualified', value: 32 },
            { label: 'Proposal', value: 24 }, { label: 'Negotiation', value: 16 }, { label: 'Closing', value: 8 },
          ],
        },
      ],
      [
        {
          type: 'list', w: 2, title: 'Top accounts',
          items: [
            { title: 'Meridian Supply', sub: 'Closing · $61,000', value: '92%' },
            { title: 'Northwind Studio', sub: 'Proposal · $42,000', value: '68%' },
            { title: 'Ember Retail', sub: 'Proposal · $34,800', value: '61%' },
            { title: 'Cobalt Interiors', sub: 'Negotiation · $28,500', value: '77%' },
          ],
        },
        {
          type: 'table', w: 4, title: 'Recent deals',
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
      ],
      [{
        type: 'activity', w: 6, title: 'Activity',
        items: [
          { title: 'Rosa logged a call with Northwind Studio', time: '20 min ago', color: 'primary' },
          { title: 'Meridian Supply moved to Closing', time: '2 hr ago', description: '$61,000 · Bruno Costa', color: 'success' },
          { title: 'New lead — Harbor Goods', time: 'Yesterday', color: 'info' },
          { title: 'Vale & Co. proposal expired', time: '2 days ago', color: 'warning' },
        ],
      }],
    ],
  },

  /* ------------------------------------------------------------ E-Commerce */
  '/dashboards/ecommerce': {
    title: 'E-Commerce',
    action: { label: 'View products', to: '/apps/ecommerce/products' },
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Revenue', '$128,940', 12.4, ShoppingBag, 'primary', '/dashboards/analytics'),
          kpi('Orders', '3,412', 6.8, ShoppingBag, 'info', '/apps/ecommerce/orders'),
          kpi('Avg. order value', '$37.80', 2.1, DollarSign, 'success'),
          kpi('Refund rate', '1.9%', -0.4, Activity, 'warning'),
        ],
      }],
      [
        {
          type: 'chart', w: 4, chartType: 'area', title: 'Sales & sessions', subtitle: 'Rolling 12 months',
          x: 'month', data: wave2(9000, 2600, 500, 'sales', 6000, 1600, 300, 'sessions'),
          series: [{ key: 'sales', name: 'Sales', color: P }, { key: 'sessions', name: 'Sessions', color: I }],
          dataFormat: { format: 'compact' }, height: 280,
        },
        {
          type: 'donut', w: 2, title: 'Sales by category', centerValue: '100%', centerLabel: 'Sales',
          data: [
            { label: 'Furniture', value: 34 }, { label: 'Lighting', value: 22 },
            { label: 'Textiles', value: 18 }, { label: 'Audio', value: 15 }, { label: 'Decor', value: 11 },
          ],
        },
      ],
      [
        {
          type: 'table', w: 4, title: 'Best sellers',
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
          ].map((r, i) => ({ id: i, name: r[0], category: r[1], units: r[2], revenue: r[3] })),
        },
        {
          type: 'list', w: 2, title: 'Traffic sources',
          items: [
            { title: 'Organic search', value: '42%', delta: 3 },
            { title: 'Direct', value: '24%', delta: 1 },
            { title: 'Referral', value: '18%', delta: -2 },
            { title: 'Social', value: '10%', delta: 5 },
            { title: 'Email', value: '6%', delta: 0 },
          ],
        },
      ],
    ],
  },

  /* ------------------------------------------------------------- Analytics */
  '/dashboards/analytics': {
    title: 'Analytics',
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Sessions', '184,204', 8.1, LineChart, 'primary'),
          kpi('Users', '92,880', 5.4, Users, 'info'),
          kpi('Bounce rate', '38.2%', -1.6, Activity, 'success'),
          kpi('Avg. duration', '3m 42s', 4.0, Clock, 'warning'),
        ],
      }],
      [{
        type: 'chart', w: 6, chartType: 'area', title: 'Traffic overview', subtitle: 'Sessions by month',
        x: 'month', data: wave(12000, 3400, 700, 'sessions'),
        series: [{ key: 'sessions', name: 'Sessions', color: P }],
        dataFormat: { format: 'compact' }, height: 280,
      }],
      [
        {
          type: 'donut', w: 2, title: 'Traffic by source', centerValue: '100%', centerLabel: 'Sessions',
          data: [
            { label: 'Organic', value: 42 }, { label: 'Direct', value: 24 },
            { label: 'Referral', value: 18 }, { label: 'Social', value: 10 }, { label: 'Email', value: 6 },
          ],
        },
        {
          type: 'table', w: 4, title: 'Top pages',
          columns: [
            { key: 'path', header: 'Page' },
            { key: 'views', header: 'Views', align: 'end', sortable: true },
            { key: 'avg', header: 'Avg. time', align: 'end' },
            { key: 'bounce', header: 'Bounce', align: 'end' },
          ],
          actionsColumn: false,
          rows: [
            ['/', '48,204', '1m 12s', '32%'],
            ['/pricing', '18,900', '2m 40s', '28%'],
            ['/blog/scaling-design-systems', '12,340', '4m 05s', '19%'],
            ['/product/vantage-chair', '9,880', '3m 20s', '41%'],
            ['/docs/getting-started', '7,650', '5m 55s', '12%'],
            ['/changelog', '5,210', '2m 02s', '35%'],
          ].map((r, i) => ({ id: i, path: r[0], views: r[1], avg: r[2], bounce: r[3] })),
        },
      ],
      [
        {
          type: 'rings', w: 3, title: 'Engagement',
          items: [
            { label: 'Bounce', value: 38, color: 'success' },
            { label: 'Scroll depth', value: 71, color: 'primary' },
            { label: 'Goal completion', value: 24, color: 'warning' },
          ],
        },
        {
          type: 'list', w: 3, title: 'Devices',
          items: [
            { title: 'Desktop', value: '58%', delta: 2 },
            { title: 'Mobile', value: '36%', delta: 4 },
            { title: 'Tablet', value: '6%', delta: -1 },
          ],
        },
      ],
    ],
  },

  /* -------------------------------------------------------------- Projects */
  '/dashboards/projects': {
    title: 'Projects',
    action: { label: 'Open board', to: '/advanced-ui/draggable-cards' },
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Active projects', '24', 2.0, FolderKanban, 'primary'),
          kpi('On track', '18', 6.0, Target, 'success'),
          kpi('At risk', '4', 1.0, Activity, 'warning'),
          kpi('Overdue', '2', -1.0, Clock, 'danger'),
        ],
      }],
      [
        {
          type: 'progress', w: 4, title: 'Projects in flight', cols: 2,
          items: [
            { title: 'Brand refresh', sub: 'Due 20 Sept · Wren Ashby', value: 82, color: 'primary' },
            { title: 'Mobile app v2', sub: 'Due 4 Oct · Theo Rees', value: 58, color: 'info' },
            { title: 'Warehouse move', sub: 'Due 30 Sept · Rosa Delgado', value: 40, color: 'warning' },
            { title: 'Docs overhaul', sub: 'Due 12 Nov · Kian Rees', value: 24, color: 'success' },
          ],
        },
        {
          type: 'rings', w: 2, title: 'Health',
          items: [
            { label: 'On track', value: 75, color: 'success' },
            { label: 'At risk', value: 17, color: 'warning' },
          ],
        },
      ],
      [
        {
          type: 'chart', w: 3, chartType: 'column', title: 'Tasks completed', subtitle: 'Rolling 12 months',
          x: 'month', data: wave(90, 40, 5, 'tasks'),
          series: [{ key: 'tasks', name: 'Tasks', color: P }], height: 240,
        },
        {
          type: 'activity', w: 3, title: 'Recent updates',
          items: [
            { title: 'Brand refresh moved to review', time: '1 hr ago', color: 'primary' },
            { title: 'Warehouse move flagged at risk', time: '4 hr ago', color: 'warning' },
            { title: 'Mobile app v2 sprint closed', time: 'Yesterday', color: 'success' },
          ],
        },
      ],
      [{
        type: 'table', w: 6, title: 'All projects', searchKeys: ['name', 'lead'],
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
      }],
    ],
  },

  /* ------------------------------------------------------------------- NFT */
  '/dashboards/nft': {
    title: 'NFT',
    rows: [
      [
        {
          type: 'hero', w: 3, label: 'Floor price', value: '2.42 ETH', delta: 5.2,
          sub: 'Aster Genesis collection', tone: 'primary',
          chartData: wave(2, 0.6, 0.06), chartKey: 'value',
        },
        {
          type: 'hero', w: 3, label: '24h volume', value: '184 ETH', delta: 22.0,
          sub: '312 sales in the last day', tone: 'success',
          chartData: wave(120, 40, 6), chartKey: 'value',
        },
      ],
      [
        {
          type: 'chart', w: 4, chartType: 'area', title: 'Floor & volume', subtitle: 'Rolling 12 months',
          x: 'month', data: wave2(2, 0.5, 0.05, 'floor', 90, 30, 4, 'volume'),
          series: [{ key: 'floor', name: 'Floor (ETH)', color: P }, { key: 'volume', name: 'Volume (ETH)', color: SEC }],
          height: 280,
        },
        {
          type: 'list', w: 2, title: 'Top collections',
          items: [
            { badge: 'AG', title: 'Aster Genesis', sub: 'Floor 2.42 ETH', delta: 5 },
            { badge: 'OR', title: 'Orbit Relics', sub: 'Floor 0.88 ETH', delta: -2 },
            { badge: 'HL', title: 'Halcyon Loops', sub: 'Floor 1.14 ETH', delta: 8 },
            { badge: 'CV', title: 'Corda Voxels', sub: 'Floor 0.31 ETH', delta: 1 },
          ],
        },
      ],
      [
        {
          type: 'donut', w: 2, title: 'By rarity', centerValue: '10k', centerLabel: 'Items',
          data: [
            { label: 'Common', value: 52 }, { label: 'Uncommon', value: 28 },
            { label: 'Rare', value: 14 }, { label: 'Legendary', value: 6 },
          ],
        },
        {
          type: 'table', w: 4, title: 'Recent sales',
          columns: [
            { key: 'item', header: 'Item' },
            { key: 'price', header: 'Price', align: 'end', sortable: true },
            { key: 'from', header: 'From' },
            { key: 'to', header: 'To' },
            { key: 'time', header: 'Time', align: 'end' },
          ],
          actionsColumn: false,
          rows: Array.from({ length: 6 }, (_, i) => ({
            id: i, item: `Aster #${1200 + i * 37}`, price: `${(1.8 + i * 0.6).toFixed(2)} ETH`,
            from: `0x${(i * 4210).toString(16)}…`, to: `0x${(i * 8820).toString(16)}…`, time: `${i + 1}h ago`,
          })),
        },
      ],
    ],
  },

  /* ------------------------------------------------------------------- HRM */
  '/dashboards/hrm': {
    title: 'HRM',
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Headcount', '248', 3.2, Users, 'primary', '/pages/team'),
          kpi('New hires (30d)', '11', 8.0, UserCheck, 'success'),
          kpi('Attrition', '4.1%', -0.6, Activity, 'warning'),
          kpi('Open roles', '18', 2.0, Briefcase, 'info', '/dashboards/jobs'),
        ],
      }],
      [
        {
          type: 'donut', w: 2, title: 'By department', centerValue: '248', centerLabel: 'People',
          data: [
            { label: 'Engineering', value: 96 }, { label: 'Sales', value: 54 },
            { label: 'Design', value: 32 }, { label: 'Support', value: 40 }, { label: 'Ops', value: 26 },
          ],
        },
        {
          type: 'chart', w: 4, chartType: 'area', title: 'Headcount trend', subtitle: 'Rolling 12 months',
          x: 'month', data: wave(210, 12, 4, 'headcount'),
          series: [{ key: 'headcount', name: 'Headcount', color: P }], height: 260,
        },
      ],
      [
        {
          type: 'meters', w: 3, title: 'Engagement by team',
          items: [
            { label: 'Engineering', value: 78, color: 'primary', display: '78' },
            { label: 'Design', value: 84, color: 'success', display: '84' },
            { label: 'Sales', value: 66, color: 'warning', display: '66' },
            { label: 'Support', value: 71, color: 'info', display: '71' },
          ],
        },
        {
          type: 'list', w: 3, title: 'New this month',
          items: [
            { avatar: 'Mira Kapoor', title: 'Mira Kapoor', sub: 'Product Designer · Design', chip: 'Active' },
            { avatar: 'Idris Bello', title: 'Idris Bello', sub: 'SRE · Engineering', chip: 'Active' },
            { avatar: 'Rosa Delgado', title: 'Rosa Delgado', sub: 'Ops Lead · Operations', chip: 'Active' },
          ],
        },
      ],
      [{
        type: 'activity', w: 6, title: 'People updates',
        items: [
          { title: 'Mira Kapoor joined Design', time: '2 days ago', color: 'success' },
          { title: 'Q3 review cycle opened', time: '4 days ago', color: 'primary' },
          { title: 'Two offers accepted', time: '1 week ago', color: 'info' },
        ],
      }],
    ],
  },

  /* -------------------------------------------------------------- Personal */
  '/dashboards/personal': {
    title: 'Personal',
    rows: [
      [
        {
          type: 'hero', w: 2, label: 'Focus time today', value: '4h 20m', delta: 12.0,
          sub: 'Goal 5h · 87% there', tone: 'primary',
        },
        {
          type: 'rings', w: 4, title: 'Goals this quarter',
          items: [
            { label: 'Books read', value: 62, color: 'primary' },
            { label: 'Distance run', value: 48, color: 'success' },
            { label: 'Side project', value: 30, color: 'warning' },
          ],
        },
      ],
      [
        {
          type: 'chart', w: 3, chartType: 'column', title: 'Focus hours', subtitle: 'This year',
          x: 'month', data: wave(48, 18, 1.5, 'hours'),
          series: [{ key: 'hours', name: 'Hours', color: P }], height: 240,
        },
        {
          type: 'activity', w: 3, title: "Today's schedule",
          items: [
            { title: 'Standup', time: '9:00 AM', color: 'primary' },
            { title: 'Design review', time: '11:30 AM', color: 'info' },
            { title: 'Lunch with Theo', time: '1:00 PM', color: 'success' },
            { title: 'Gym', time: '6:00 PM', color: 'warning' },
          ],
        },
      ],
      [{
        type: 'progress', w: 6, title: 'Habit tracker', cols: 3,
        items: [
          { title: 'Read 30 min', sub: '5 / 7 days this week', value: 71, color: 'primary' },
          { title: 'No phone before 9', sub: '6 / 7 days', value: 86, color: 'success' },
          { title: 'Walk 8k steps', sub: '4 / 7 days', value: 57, color: 'warning' },
          { title: 'Journal', sub: '7 / 7 days', value: 100, color: 'info' },
          { title: 'Sleep by 11', sub: '3 / 7 days', value: 43, color: 'danger' },
          { title: 'Water 2L', sub: '6 / 7 days', value: 86, color: 'success' },
        ],
      }],
    ],
  },

  /* ---------------------------------------------------------------- Stocks */
  '/dashboards/stocks': {
    title: 'Stocks',
    rows: [
      [
        {
          type: 'hero', w: 4, label: 'Net worth', value: '$312,480.19', delta: 4.8,
          sub: 'Invested $294,280 · Cash $18,200', tone: 'primary',
          chartData: wave(240000, 30000, 6000), chartKey: 'value',
          footer: 'Day +$2,140.55 · Dividends YTD $4,860',
        },
        {
          type: 'list', w: 2, title: 'Market movers',
          items: [
            { badge: 'ASTR', title: 'Aster Industries', value: '$142.10', delta: 1.4 },
            { badge: 'HLCN', title: 'Halcyon Audio', value: '$54.20', delta: 2.1 },
            { badge: 'MRDN', title: 'Meridian Freight', value: '$88.55', delta: -0.6 },
            { badge: 'ORBT', title: 'Orbit Devices', value: '$76.40', delta: -1.2 },
          ],
        },
      ],
      [{
        type: 'chart', w: 6, chartType: 'area', title: 'Portfolio value', subtitle: 'Rolling 12 months',
        x: 'month', data: wave(240000, 30000, 6000, 'value'),
        series: [{ key: 'value', name: 'Value', color: P }],
        dataFormat: { prefix: '$', format: 'compact' }, height: 280,
      }],
      [
        {
          type: 'donut', w: 2, title: 'Holdings', centerValue: '$312k', centerLabel: 'Total',
          data: [
            { label: 'Index funds', value: 46 }, { label: 'Tech', value: 22 },
            { label: 'Energy', value: 12 }, { label: 'Bonds', value: 12 }, { label: 'Cash', value: 8 },
          ],
        },
        {
          type: 'table', w: 4, title: 'Watchlist',
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
      ],
    ],
  },

  /* --------------------------------------------------------------- Courses */
  '/dashboards/courses': {
    title: 'Courses',
    action: { label: 'Browse catalog', to: '/pages/pricing' },
    rows: [
      [{
        type: 'kpis', w: 6, items: [
          kpi('Enrolled', '18', 2.0, BookOpen, 'primary'),
          kpi('Completed', '11', 10.0, Award, 'success'),
          kpi('Hours learned', '146', 6.0, Clock, 'info'),
          kpi('Streak', '23 days', 4.0, Flame, 'warning'),
        ],
      }],
      [
        {
          type: 'progress', w: 4, title: 'In progress', cols: 2,
          items: [
            { title: 'Design systems', sub: 'Module 6 of 8', value: 74, color: 'primary' },
            { title: 'Data viz foundations', sub: 'Module 4 of 7', value: 52, color: 'info' },
            { title: 'Accessible interfaces', sub: 'Module 3 of 9', value: 38, color: 'success' },
            { title: 'Motion basics', sub: 'Module 1 of 5', value: 20, color: 'warning' },
          ],
        },
        {
          type: 'rings', w: 2, title: 'This week',
          items: [
            { label: 'Goal', value: 68, color: 'primary' },
            { label: 'Streak', value: 82, color: 'warning' },
          ],
        },
      ],
      [
        {
          type: 'chart', w: 3, chartType: 'column', title: 'Learning hours', subtitle: 'This year',
          x: 'month', data: wave(10, 6, 0.4, 'hours'),
          series: [{ key: 'hours', name: 'Hours', color: P }], height: 240,
        },
        {
          type: 'list', w: 3, title: 'Recommended',
          items: [
            { title: 'Advanced React patterns', sub: 'Advanced · 6h', value: '4.8' },
            { title: 'Design tokens in practice', sub: 'Intermediate · 3h', value: '4.7' },
            { title: 'Charts that communicate', sub: 'Intermediate · 4h', value: '4.9' },
            { title: 'Interviewing users', sub: 'Beginner · 2h', value: '4.6' },
          ],
        },
      ],
    ],
  },
}
