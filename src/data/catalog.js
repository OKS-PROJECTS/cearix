// Deterministic mock catalog — shared by list / detail / dashboard pages.

const FIRST = ['Priya', 'Dominic', 'Sofia', 'Emeka', 'Lena', 'Marco', 'Aria', 'Noah', 'Yuki', 'Omar', 'Clara', 'Idris', 'Mira', 'Theo', 'Rosa', 'Kian', 'Nadia', 'Bruno', 'Wren', 'Cassian']
const LAST = ['Nandakumar', 'Alvarez', 'Renner', 'Obi', 'Fischer', 'Bianchi', 'Holt', 'Whitlock', 'Tanaka', 'Haddad', 'Mendez', 'Bello', 'Kapoor', 'Novak', 'Delgado', 'Rees', 'Karim', 'Costa', 'Ashby', 'Vale']
const CITIES = ['Portland', 'Lyon', 'Bristol', 'Utrecht', 'Porto', 'Malmö', 'Austin', 'Cork', 'Kyoto', 'Tallinn']
const CATEGORIES = ['Lighting', 'Furniture', 'Textiles', 'Audio', 'Wellness', 'Decor', 'Outdoor', 'Storage']
const PRODUCTS = ['Aster Table Lamp', 'Vantage Desk Chair', 'Corda Wool Throw', 'Halcyon Speaker', 'Nimbus Diffuser', 'Orbit Wall Clock', 'Meridian Shelf', 'Cove Floor Rug', 'Pallas Planter', 'Solace Armchair', 'Drift Side Table', 'Ember Lantern', 'Cirrus Duvet', 'Nolan Bookend', 'Terra Vase', 'Vela Pendant Light', 'Grove Coat Rack', 'Lumen Desk Mat', 'Marlow Ottoman', 'Fable Bookcase']
const STATUS_ORDER = ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled', 'Refunded']
const STATUS_PROD = ['Active', 'Active', 'Active', 'Draft', 'Archived']

const person = (i) => ({
  name: `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`,
  city: CITIES[i % CITIES.length],
})

export const products = Array.from({ length: 34 }, (_, i) => {
  const name = PRODUCTS[i % PRODUCTS.length] + (i >= PRODUCTS.length ? ' II' : '')
  return {
    id: `P-${1001 + i}`,
    name,
    sku: `CRX-${4200 + i * 7}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: 40 + ((i * 17) % 260),
    stock: (i * 13) % 90,
    sold: 60 + ((i * 29) % 380),
    rating: (3.6 + ((i * 7) % 14) / 10).toFixed(1),
    status: STATUS_PROD[i % STATUS_PROD.length],
  }
})

export const orders = Array.from({ length: 42 }, (_, i) => {
  const p = person(i)
  return {
    id: `CRX-${4900 - i}`,
    customer: p.name,
    email: `${p.name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`,
    date: `2026-08-${String(30 - (i % 28)).padStart(2, '0')}`,
    items: 1 + (i % 5),
    total: 45 + ((i * 37) % 700) + 0.5,
    channel: ['Web', 'Retail', 'Wholesale', 'Marketplace'][i % 4],
    status: STATUS_ORDER[i % STATUS_ORDER.length],
  }
})

export const contacts = Array.from({ length: 36 }, (_, i) => {
  const p = person(i + 2)
  return {
    id: `C-${200 + i}`,
    name: p.name,
    email: `${p.name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`,
    phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String((i * 41) % 9000 + 1000)}`,
    company: `${LAST[(i * 5) % LAST.length]} & Co.`,
    role: ['Buyer', 'Supplier', 'Partner', 'Lead'][i % 4],
    city: p.city,
    status: ['Active', 'Active', 'Inactive', 'Lead'][i % 4],
  }
})

export const invoices = Array.from({ length: 28 }, (_, i) => {
  const p = person(i + 5)
  const amount = 220 + ((i * 53) % 4200)
  return {
    id: `INV-${2048 + i}`,
    client: `${LAST[(i * 7) % LAST.length]} Studio`,
    contact: p.name,
    issued: `2026-0${(i % 8) + 1}-${String((i % 27) + 1).padStart(2, '0')}`,
    due: `2026-0${(i % 8) + 2}-${String((i % 27) + 1).padStart(2, '0')}`,
    amount,
    status: ['Paid', 'Paid', 'Pending', 'Overdue', 'Draft'][i % 5],
  }
})

export const team = Array.from({ length: 24 }, (_, i) => {
  const p = person(i + 1)
  return {
    id: `U-${10 + i}`,
    name: p.name,
    email: `${p.name.toLowerCase().replace(/[^a-z]+/g, '.')}@cearix.io`,
    role: ['Product Designer', 'Frontend Engineer', 'Account Manager', 'Data Analyst', 'Support Lead', 'Operations'][i % 6],
    department: ['Design', 'Engineering', 'Sales', 'Analytics', 'Support', 'Operations'][i % 6],
    location: p.city,
    status: ['Active', 'Active', 'On leave', 'Active'][i % 4],
  }
})

export const reviews = Array.from({ length: 30 }, (_, i) => {
  const p = person(i + 4)
  return {
    id: `R-${500 + i}`,
    author: p.name,
    product: PRODUCTS[i % PRODUCTS.length],
    rating: 1 + (i % 5),
    title: ['Exactly as pictured', 'Great value', 'Shipping was slow', 'Would buy again', 'Not quite right'][i % 5],
    date: `2026-08-${String((i % 27) + 1).padStart(2, '0')}`,
    status: ['Published', 'Published', 'Pending', 'Flagged'][i % 4],
  }
})

export const wishlist = products.slice(0, 12).map((p, i) => ({
  ...p,
  addedOn: `2026-08-${String((i % 27) + 1).padStart(2, '0')}`,
}))
