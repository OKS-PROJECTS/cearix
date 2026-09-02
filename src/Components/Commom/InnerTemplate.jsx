import { Suspense, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Drawer, Loader } from 'oks-ui'
import { useTheme } from '../../lib/useTheme'
import { useIsDesktop } from '../../lib/useMediaQuery'
import { HeroSlotContext } from '../../lib/hero-context'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader variant="ring-clip" size={28} color="primary" label="Loading page" />
    </div>
  )
}

export function InnerTemplate() {
  const { rail, toggleRail } = useTheme()
  const isDesktop = useIsDesktop()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [heroNode, setHeroNode] = useState(null)
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  const railOn = isDesktop && rail

  return (
    <div className="flex h-dvh w-full overflow-hidden" style={{ background: 'var(--app-bg)' }}>
      <aside
        className="hidden shrink-0 transition-[width] duration-200 lg:block"
        style={{ width: railOn ? 'var(--app-sidebar-rail)' : 'var(--app-sidebar-width)' }}
      >
        <Sidebar collapsed={railOn} />
      </aside>

      {!isDesktop && (
        <Drawer
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          position="left"
          width={272}
          classNames={{ body: 'p-0' }}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          rail={rail}
          onToggleRail={toggleRail}
          onToggleMobile={() => setMobileOpen((v) => !v)}
        />
        <main ref={mainRef} className="cearix-scroll min-h-0 flex-1 overflow-y-auto">
          {/* Gradient page-hero band — <PageHeader> portals its title + breadcrumb here */}
          <div className="cearix-hero">
            <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 pt-4 sm:px-6">
              <div ref={setHeroNode} className="min-h-[2.25rem]" />
            </div>
          </div>

          <div className="mx-auto -mt-11 w-full max-w-[1600px] px-4 pb-4 sm:px-6">
            <HeroSlotContext.Provider value={heroNode}>
              <Suspense fallback={<RouteFallback />}>
                <Outlet />
              </Suspense>
            </HeroSlotContext.Provider>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}
