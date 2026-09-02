/* eslint-disable react/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const load = (name) => lazy(() => import('../Pages/Gallery/UiPages').then((m) => ({ default: m[name] })))
const loadU = (name) => lazy(() => import('../Pages/Gallery/UtilityPages').then((m) => ({ default: m[name] })))
const loadA = (name) => lazy(() => import('../Pages/Gallery/AdvancedPages').then((m) => ({ default: m[name] })))

const ADV = {
  '/advanced-ui/accordions': 'AccordionsPage',
  '/advanced-ui/carousel': 'CarouselPage',
  '/advanced-ui/draggable-cards': 'DraggableCardsPage',
  '/advanced-ui/modals': 'ModalsPage',
  '/advanced-ui/navbar': 'NavbarPage',
  '/advanced-ui/offcanvas': 'OffcanvasPage',
  '/advanced-ui/placeholders': 'PlaceholdersPage',
  '/advanced-ui/ratings': 'RatingsPage',
  '/advanced-ui/sliders': 'SlidersPage',
}

const UI = {
  '/ui/alerts': 'AlertsPage',
  '/ui/badge': 'BadgePage',
  '/ui/breadcrumbs': 'BreadcrumbsPage',
  '/ui/buttons': 'ButtonsPage',
  '/ui/button-group': 'ButtonGroupPage',
  '/ui/cards': 'CardsPage',
  '/ui/dropdowns': 'DropdownsPage',
  '/ui/images': 'ImagesPage',
  '/ui/list-group': 'ListGroupPage',
  '/ui/tabs': 'TabsPage',
  '/ui/object-fit': 'ObjectFitPage',
  '/ui/pagination': 'PaginationPage',
  '/ui/popovers': 'PopoversPage',
  '/ui/progress': 'ProgressPage',
  '/ui/spinners': 'SpinnersPage',
  '/ui/toasts': 'ToastsPage',
  '/ui/tooltips': 'TooltipsPage',
  '/ui/typography': 'TypographyPage',
}

const UTIL = {
  '/utilities/avatars': 'AvatarsUtilPage',
  '/utilities/borders': 'BordersPage',
  '/utilities/breakpoints': 'BreakpointsPage',
  '/utilities/colors': 'ColorsPage',
  '/utilities/columns': 'ColumnsPage',
  '/utilities/flex': 'FlexPage',
  '/utilities/gutters': 'GuttersPage',
  '/utilities/helpers': 'HelpersPage',
  '/utilities/position': 'PositionPage',
  '/utilities/extras': 'ExtrasPage',
}

export const galleryRoutePaths = [...Object.keys(UI), ...Object.keys(UTIL), ...Object.keys(ADV)]

const mk = (map, loader) =>
  Object.entries(map).map(([path, name]) => {
    const C = loader(name)
    return <Route key={path} path={path} element={<C />} />
  })

export const galleryRoutes = [...mk(UI, load), ...mk(UTIL, loadU), ...mk(ADV, loadA)]
