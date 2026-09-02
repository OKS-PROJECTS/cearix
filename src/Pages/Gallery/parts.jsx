import { PageHeader, PanelCard } from '../../Components/ui'

export function GalleryPage({ title, group = 'UI Elements', groupTo, children }) {
  return (
    <>
      <PageHeader
        title={title}
        trail={[{ label: group, to: groupTo }, { label: title }]}
      />
      <div className="flex flex-col gap-4">{children}</div>
    </>
  )
}

export function Demo({ title, subtitle, children, className }) {
  return (
    <PanelCard title={title} subtitle={subtitle}>
      <div className={className || 'flex flex-wrap items-center gap-3'}>{children}</div>
    </PanelCard>
  )
}

export function Row({ children }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

export function Stack({ children }) {
  return <div className="flex flex-col gap-3">{children}</div>
}
