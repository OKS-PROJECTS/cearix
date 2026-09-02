/* eslint-disable react/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const content = (n) => lazy(() => import('../Pages/Content/ContentPages').then((m) => ({ default: m[n] })))
const misc = (n) => lazy(() => import('../Pages/Misc/MiscPages').then((m) => ({ default: m[n] })))
const chat = (n) => lazy(() => import('../Pages/Apps/ChatEmailPages').then((m) => ({ default: m[n] })))
const chart = (n) => lazy(() => import('../Pages/Charts/ChartsPages').then((m) => ({ default: m[n] })))
const form = (n) => lazy(() => import('../Pages/Forms/FormsPages').then((m) => ({ default: m[n] })))
const comp = (n) => lazy(() => import('../Pages/Components/ComponentsGallery').then((m) => ({ default: m[n] })))

const MAP = {
  // Content
  '/pages/empty': content('EmptyPage'),
  '/pages/terms': content('TermsPage'),
  '/pages/faqs': content('FaqPage'),
  '/pages/pricing': content('PricingPage'),
  '/pages/notifications': content('NotificationsPage'),
  '/pages/todo': content('TodoPage'),
  '/pages/profile': content('ProfilePage'),
  '/pages/contacts': content('ContactsGridPage'),
  '/pages/timeline/feed': content('TimelineFeedPage'),
  '/pages/timeline/compact': content('TimelineCompactPage'),
  '/pages/blog': content('BlogListPage'),
  '/pages/blog/details': content('BlogDetailsPage'),
  // Misc / apps
  '/apps/calendar': misc('CalendarPage'),
  '/apps/gallery': misc('GalleryAppPage'),
  '/apps/confirmations': misc('ConfirmationsPage'),
  '/apps/ecommerce/cart': misc('CartPage'),
  '/apps/ecommerce/checkout': misc('CheckoutPage'),
  '/pages/file-manager': misc('FileManagerPage'),
  '/icons': misc('IconsPage'),
  '/widgets': misc('WidgetsPage'),
  '/nested/level-1': misc('NestedL1'),
  '/nested/level-2/child-1': misc('NestedL21'),
  '/nested/level-2/child-2': misc('NestedL22'),
  '/maps/region': misc('RegionMapPage'),
  '/maps/markers': misc('MarkersMapPage'),
  // Chat / email
  '/pages/chat': chat('ChatPage'),
  '/pages/email/inbox': chat('EmailInboxPage'),
  '/pages/email/thread': chat('EmailThreadPage'),
  // Charts
  '/charts/line-area': chart('LineAreaPage'),
  '/charts/columns-bars': chart('ColumnsBarsPage'),
  '/charts/distributions': chart('DistributionsPage'),
  '/charts/comparisons': chart('ComparisonsPage'),
  '/charts/correlations': chart('CorrelationsPage'),
  '/charts/ranges-financial': chart('RangesFinancialPage'),
  '/charts/heatmap-treemap': chart('HeatmapTreemapPage'),
  // Forms
  '/forms/inputs': form('InputsPage'),
  '/forms/checks-radios': form('ChecksRadiosPage'),
  '/forms/input-group': form('InputGroupPage'),
  '/forms/select': form('SelectPage'),
  '/forms/range': form('RangePage'),
  '/forms/masks': form('MasksPage'),
  '/forms/file-upload': form('FileUploadPage'),
  '/forms/date-time': form('DateTimePage'),
  '/forms/floating-labels': form('FloatingLabelsPage'),
  '/forms/layouts': form('LayoutsPage'),
  '/forms/editor': form('EditorPage'),
  '/forms/validation': form('ValidationPage'),
  '/forms/advanced-select': form('AdvancedSelectPage'),
  '/forms/wizard': form('WizardPage'),
  // Components gallery
  '/components': comp('ComponentsOverview'),
  '/components/kitchen-sink': comp('KitchenSink'),
  '/components/actions': comp('ActionsGroup'),
  '/components/feedback': comp('FeedbackGroup'),
  '/components/overlays': comp('OverlaysGroup'),
  '/components/navigation': comp('NavigationGroup'),
  '/components/data-display': comp('DataDisplayGroup'),
  '/components/forms': comp('FormsGroup'),
  '/components/charts': comp('ChartsGroup'),
  '/components/composed': comp('ComposedGroup'),
}

export const bespokeRoutePaths = Object.keys(MAP)
export const bespokeRoutes = Object.entries(MAP).map(([path, C]) => (
  <Route key={path} path={path} element={<C />} />
))
