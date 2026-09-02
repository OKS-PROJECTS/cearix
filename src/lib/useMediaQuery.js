import { useSyncExternalStore } from 'react'

/**
 * SSR-safe media-query hook. `useSyncExternalStore` (not useEffect + setState)
 * keeps oxlint's react-hooks/set-state-in-effect happy.
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLg = () => useMediaQuery('(min-width: 1024px)')
