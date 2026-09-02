import { Tabs, Tab, Form, FormFieldSet, Button, toast } from 'oks-ui'
import { PageHeader, PanelCard } from '../../Components/ui'
import { useIsDesktop } from '../../lib/useMediaQuery'

/**
 * Config-driven settings panel.
 * config: { title, trail, panels: [{ key, title, fields: [FormFieldSet props], note? }] }
 */
export default function SettingsPage({ config }) {
  const { title, trail, panels = [] } = config
  const isDesktop = useIsDesktop()

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Home', to: '/dashboards/sales' }, { label: title }]}
      />
      <PanelCard title={title} bodyClassName="p-0">
        <div className="p-5">
          <Tabs
            aria-label={`${title} sections`}
            isVertical={isDesktop}
            variant={isDesktop ? 'light' : 'underlined'}
            color="primary"
          >
            {panels.map((panel) => (
              <Tab key={panel.key} title={panel.title}>
                <Form
                  onSubmit={() => toast.success('Settings saved')}
                  className="flex max-w-2xl flex-col gap-4 pt-1 sm:pl-4"
                >
                  {panel.note && (
                    <p className="text-[0.83rem]" style={{ color: 'var(--app-fg-muted)' }}>
                      {panel.note}
                    </p>
                  )}
                  <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                    {panel.fields.map((f) => (
                      <FormFieldSet key={f.name} {...f} />
                    ))}
                  </div>
                  <div>
                    <Button type="submit" color="primary" size="sm">
                      Save changes
                    </Button>
                  </div>
                </Form>
              </Tab>
            ))}
          </Tabs>
        </div>
      </PanelCard>
    </>
  )
}
