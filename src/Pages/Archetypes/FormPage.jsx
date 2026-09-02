import { useNavigate } from 'react-router-dom'
import { Form, FormFieldSet, Button, toast } from 'oks-ui'
import { PageHeader, PanelCard } from '../../Components/ui'

/**
 * Config-driven create / edit form.
 * config: { title, subtitle, trail, sections: [{ title, fields: [FormFieldSet props] }],
 *           submitLabel?, backTo? }
 */
export default function FormPage({ config }) {
  const navigate = useNavigate()
  const { title, trail, sections = [], submitLabel = 'Save', backTo } = config

  return (
    <>
      <PageHeader
        title={title}
        trail={trail || [{ label: 'Home', to: '/dashboards/sales' }, { label: title }]}
      />
      <Form
        onSubmit={() => {
          toast.success('Saved', { description: `${title} was saved.` })
          if (backTo) navigate(backTo)
        }}
        className="flex flex-col gap-4"
      >
        {sections.map((section) => (
          <PanelCard key={section.title} title={section.title} subtitle={section.subtitle}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {section.fields.map((f) => (
                <FormFieldSet key={f.name} {...f} />
              ))}
            </div>
          </PanelCard>
        ))}
        <div className="flex items-center justify-end gap-2">
          {backTo && (
            <Button type="button" variant="bordered" onPress={() => navigate(backTo)}>
              Cancel
            </Button>
          )}
          <Button type="submit" color="primary">
            {submitLabel}
          </Button>
        </div>
      </Form>
    </>
  )
}
