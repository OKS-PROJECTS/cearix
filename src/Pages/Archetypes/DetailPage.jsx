import { PageHeader, PanelCard, KeyValue, ActivityFeed } from '../../Components/ui'

/**
 * Config-driven entity detail view.
 * config: { title, subtitle, trail, header?: ReactNode, sections: [{ title, rows: [{label,value}] }],
 *           aside?: [{ title, rows }] | ReactNode, timeline?: [{title,time,description}] }
 */
export default function DetailPage({ config }) {
  const { title, trail, header, sections = [], aside = [], timeline } = config

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Home', to: '/dashboards/sales' }, { label: title }]}
      />
      {header && <div className="mb-4">{header}</div>}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {sections.map((s) => (
            <PanelCard key={s.title} title={s.title}>
              {Array.isArray(s.rows) ? <KeyValue rows={s.rows} /> : s.rows}
            </PanelCard>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(aside)
            ? aside.map((a) => (
                <PanelCard key={a.title} title={a.title}>
                  {Array.isArray(a.rows) ? <KeyValue rows={a.rows} /> : a.rows}
                </PanelCard>
              ))
            : aside}
          {timeline && (
            <PanelCard title="Timeline">
              <ActivityFeed items={timeline} />
            </PanelCard>
          )}
        </div>
      </div>
    </>
  )
}
