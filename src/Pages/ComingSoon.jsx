import { Link } from 'react-router-dom'
import { Hammer } from 'lucide-react'
import { Button } from 'oks-ui'
import { PageHeader, Surface } from '../Components/ui'

export default function ComingSoon() {
  return (
    <>
      <PageHeader title="Coming soon" trail={[{ label: 'Home', to: '/dashboards/sales' }, { label: 'Coming soon' }]} />
      <Surface bodyClassName="flex flex-col items-center gap-3 py-16 text-center">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}
        >
          <Hammer size={22} />
        </span>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
          This screen is being built
        </h2>
        <p className="max-w-md text-[0.85rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Every route in Cearix ships as a real page. This one is still in the queue.
        </p>
        <Button as={Link} to="/dashboards/sales" color="primary" variant="soft" size="sm">
          Back to dashboard
        </Button>
      </Surface>
    </>
  )
}
