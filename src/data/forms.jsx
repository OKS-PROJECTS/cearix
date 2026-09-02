const productFields = (prefix) => ({
  title: `${prefix} details`,
  fields: [
    { type: 'text', name: 'name', label: 'Product name', validation: { rules: { required: true } }, colSpan: 2 },
    { type: 'text', name: 'sku', label: 'SKU' },
    { type: 'select', name: 'category', label: 'Category', options: ['Lighting', 'Furniture', 'Textiles', 'Audio', 'Wellness', 'Decor'].map((v) => ({ label: v, value: v })) },
    { type: 'number', name: 'price', label: 'Price (USD)', validation: { rules: { required: true, min: 0 } } },
    { type: 'number', name: 'stock', label: 'Stock on hand' },
    { type: 'textarea', name: 'description', label: 'Description', colSpan: 2 },
    { type: 'switch', name: 'active', label: 'Visible in store', checkedText: 'Yes', uncheckedText: 'No' },
  ],
})

export const FORM_CONFIGS = {
  '/apps/ecommerce/add-product': {
    title: 'Add Product',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Add Product' }],
    sections: [
      productFields('Product'),
      {
        title: 'Pricing & shipping',
        fields: [
          { type: 'number', name: 'compareAt', label: 'Compare-at price' },
          { type: 'number', name: 'weight', label: 'Weight (kg)' },
          { type: 'select', name: 'taxClass', label: 'Tax class', options: [{ label: 'Standard', value: 'std' }, { label: 'Reduced', value: 'red' }] },
        ],
      },
    ],
    submitLabel: 'Create product',
    backTo: '/apps/ecommerce/products',
  },
  '/apps/ecommerce/edit-product': {
    title: 'Edit Product',
    trail: [{ label: 'E-Commerce', to: '/apps/ecommerce/products' }, { label: 'Edit Product' }],
    sections: [productFields('Product')],
    submitLabel: 'Save changes',
    backTo: '/apps/ecommerce/products',
  },
  '/pages/blog/create': {
    title: 'Create Blog',
    trail: [{ label: 'Blog', to: '/pages/blog' }, { label: 'Create' }],
    sections: [
      {
        title: 'Article',
        fields: [
          { type: 'text', name: 'title', label: 'Title', validation: { rules: { required: true } }, colSpan: 2 },
          { type: 'text', name: 'slug', label: 'Slug', colSpan: 2 },
          { type: 'select', name: 'category', label: 'Category', options: [{ label: 'Product', value: 'product' }, { label: 'Company', value: 'company' }, { label: 'Engineering', value: 'eng' }] },
          { type: 'text', name: 'tags', label: 'Tags' },
          { type: 'textarea', name: 'excerpt', label: 'Excerpt', colSpan: 2 },
          { type: 'file', name: 'cover', label: 'Cover image', ui: 'dropzone', colSpan: 2 },
        ],
      },
    ],
    submitLabel: 'Publish',
    backTo: '/pages/blog',
  },
  '/pages/invoice/create': {
    title: 'Create Invoice',
    trail: [{ label: 'Invoices', to: '/pages/invoice/list' }, { label: 'Create' }],
    sections: [
      {
        title: 'Bill to',
        fields: [
          { type: 'text', name: 'client', label: 'Client', validation: { rules: { required: true } } },
          { type: 'email', name: 'email', label: 'Email', validation: { rules: { required: true, email: true } } },
          { type: 'textarea', name: 'address', label: 'Billing address', colSpan: 2 },
        ],
      },
      {
        title: 'Invoice',
        fields: [
          { type: 'text', name: 'number', label: 'Invoice number' },
          { type: 'datepicker', name: 'issued', label: 'Issue date' },
          { type: 'datepicker', name: 'due', label: 'Due date' },
          { type: 'number', name: 'amount', label: 'Amount (USD)' },
          { type: 'textarea', name: 'notes', label: 'Notes', colSpan: 2 },
        ],
      },
    ],
    submitLabel: 'Create invoice',
    backTo: '/pages/invoice/list',
  },
}
