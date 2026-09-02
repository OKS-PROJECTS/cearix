import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Loader } from 'oks-ui'
import { InnerTemplate } from './Components/Commom/InnerTemplate'
import ComingSoon from './Pages/ComingSoon'
import { NAV_ROUTES } from './data/nav'
import { archetypeRoutes, configuredRoutePaths } from './data/archetypeRoutes'
import { galleryRoutes, galleryRoutePaths } from './data/galleryRoutes'
import { bespokeRoutes, bespokeRoutePaths } from './data/bespokeRoutes'
import { standaloneRoutes, standaloneRoutePaths } from './data/standaloneRoutes'
import { DASHBOARD_CONFIGS } from './data/dashboards'

const SalesDashboard = lazy(() => import('./Pages/Dashboards/SalesDashboard'))
const DashboardPage = lazy(() => import('./Pages/Dashboards/DashboardPage'))

const EXPLICIT = {
  '/dashboards/sales': <SalesDashboard />,
  ...Object.fromEntries(
    Object.entries(DASHBOARD_CONFIGS).map(([path, config]) => [
      path,
      <DashboardPage key={path} config={config} />,
    ]),
  ),
}

const STANDALONE = new Set(standaloneRoutePaths)
const CONFIGURED = new Set([
  ...configuredRoutePaths,
  ...galleryRoutePaths,
  ...bespokeRoutePaths,
])

const shellRoutes = NAV_ROUTES.filter(
  (p) => !STANDALONE.has(p) && !CONFIGURED.has(p) && !EXPLICIT[p],
)

function FullPageFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center" style={{ background: 'var(--app-bg)' }}>
      <Loader variant="ring-clip" size={30} color="primary" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<FullPageFallback />}>
            <StandaloneOutlet />
          </Suspense>
        }
      >
        {standaloneRoutes}
      </Route>

      <Route element={<InnerTemplate />}>
        <Route path="/" element={<Navigate to="/dashboards/sales" replace />} />
        <Route path="/dashboards" element={<Navigate to="/dashboards/sales" replace />} />
        <Route path="/dashboard" element={<Navigate to="/dashboards/sales" replace />} />

        {Object.entries(EXPLICIT).map(([p, el]) => (
          <Route key={p} path={p} element={el} />
        ))}

        {archetypeRoutes}
        {galleryRoutes}
        {bespokeRoutes}

        {shellRoutes.map((p) => (
          <Route key={p} path={p} element={<ComingSoon />} />
        ))}

        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  )
}

function StandaloneOutlet() {
  // Layout route wrapper so the shared Suspense boundary applies to all
  // standalone (shell-less) pages.
  return <Outlet />
}
