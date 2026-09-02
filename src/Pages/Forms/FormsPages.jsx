import {
  Form, FormFieldSet, TextField, TextAreaField, PasswordField, SelectField,
  CheckboxGroupField, RadioGroupField, SwitchField, RangeField, OtpField,
  PhoneField, DatePickerField, FileField, TextEditor, SteppedForm, defineStep,
  Button, toast, Checkbox, Radio,
} from 'oks-ui'
import { useState } from 'react'
import { PageHeader, PanelCard } from '../../Components/ui'

const GT = '/forms/inputs'
const Wrap = ({ title, group = 'Forms', children }) => (
  <>
    <PageHeader title={title} trail={[{ label: group, to: GT }, { label: title }]} />
    <div className="flex flex-col gap-4">{children}</div>
  </>
)
const grid = 'grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2'

export function InputsPage() {
  return (
    <Wrap title="Inputs">
      <PanelCard title="Text inputs">
        <div className={grid}>
          <TextField name="a" label="Default" placeholder="Type here" />
          <TextField name="b" label="With icon" startIcon={<span>@</span>} placeholder="username" />
          <TextField name="c" label="Filled variant" variant="filled" placeholder="Search" />
          <TextField name="d" label="Underlined" variant="underlined" placeholder="Inline" />
          <TextField name="e" label="Disabled" isDisabled placeholder="Can't edit" />
          <TextField name="f" label="With error" error="This field is required" />
        </div>
      </PanelCard>
      <PanelCard title="Textarea & password">
        <div className={grid}>
          <TextAreaField name="bio" label="Bio" showLengthCounter placeholder="A few words…" />
          <PasswordField name="pw" label="Password" />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function ChecksRadiosPage() {
  return (
    <Wrap title="Checks & Radios">
      <PanelCard title="Checkboxes">
        <div className="flex flex-col gap-2">
          <Checkbox label="Email notifications" defaultChecked />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Weekly digest" />
        </div>
      </PanelCard>
      <PanelCard title="Checkbox group">
        <CheckboxGroupField name="feat" label="Enable features" options={[
          { label: 'Analytics', value: 'a' }, { label: 'Exports', value: 'e' }, { label: 'API access', value: 'api' },
        ]} defaultValue={['a']} />
      </PanelCard>
      <PanelCard title="Radios">
        <div className="flex flex-col gap-2">
          <Radio name="plan" value="m" label="Monthly" defaultChecked />
          <Radio name="plan" value="y" label="Yearly" />
        </div>
      </PanelCard>
      <PanelCard title="Radio group">
        <RadioGroupField name="size" label="T-shirt size" options={[
          { label: 'Small', value: 's' }, { label: 'Medium', value: 'm' }, { label: 'Large', value: 'l' },
        ]} defaultValue="m" />
      </PanelCard>
      <PanelCard title="Switches">
        <div className="flex flex-col gap-3">
          <SwitchField name="wifi" label="Wi-Fi" defaultChecked showStateText checkedText="On" uncheckedText="Off" />
          <SwitchField name="bt" label="Bluetooth" />
          <SwitchField name="dnd" label="Do not disturb" showStateText />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function InputGroupPage() {
  return (
    <Wrap title="Input Group">
      <PanelCard title="Prefix / suffix">
        <div className={grid}>
          <TextField name="price" label="Price" prefix="$" suffix="USD" placeholder="0.00" />
          <TextField name="site" label="Website" prefix="https://" placeholder="example.com" />
          <TextField name="weight" label="Weight" suffix="kg" placeholder="0" />
          <TextField name="disc" label="Discount" suffix="%" placeholder="0" />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function SelectPage() {
  return (
    <Wrap title="Form Select">
      <PanelCard title="Select fields">
        <div className={grid}>
          <SelectField name="country" label="Country" options={['United States', 'Germany', 'Japan', 'Brazil'].map((v) => ({ label: v, value: v }))} placeholderOption="Choose…" />
          <SelectField name="native" label="Native select" native options={['One', 'Two', 'Three'].map((v) => ({ label: v, value: v }))} />
          <SelectField name="multi" label="Multi-select" multiple options={['Design', 'Engineering', 'Sales', 'Support'].map((v) => ({ label: v, value: v }))} />
          <SelectField name="disabled" label="Disabled" isDisabled options={[{ label: 'Locked', value: 'x' }]} />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function RangePage() {
  return (
    <Wrap title="Range Slider">
      <PanelCard title="Sliders">
        <div className="flex flex-col gap-6">
          <RangeField name="a" label="Opacity" min={0} max={100} defaultValue={65} showValue />
          <RangeField name="b" label="Budget" selection="range" min={0} max={1000} defaultValue={{ min: 200, max: 700 }} showValue formatValue={(n) => `$${n}`} />
          <RangeField name="c" label="Steps" min={0} max={10} step={1} defaultValue={4} marks={[{ value: 0, label: '0' }, { value: 10, label: '10' }]} showValue />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function MasksPage() {
  return (
    <Wrap title="Input Masks">
      <PanelCard title="Masked inputs (composed via pattern validation)">
        <div className={grid}>
          <PhoneField name="phone" label="Phone" defaultCountryCode="US" />
          <TextField name="card" label="Card number" placeholder="0000 0000 0000 0000" />
          <TextField name="exp" label="Expiry" placeholder="MM / YY" />
          <OtpField name="pin" label="PIN" length={4} />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function FileUploadPage() {
  return (
    <Wrap title="File Uploads">
      <PanelCard title="Dropzone">
        <FileField name="files" ui="dropzone" isDroppable multiple maxFiles={5} preview="thumbnails" />
      </PanelCard>
      <PanelCard title="Inline">
        <FileField name="doc" ui="inline" clearable />
      </PanelCard>
    </Wrap>
  )
}

export function DateTimePage() {
  return (
    <Wrap title="Date & Time">
      <PanelCard title="Date pickers">
        <div className={grid}>
          <DatePickerField name="d1" label="Date" />
          <DatePickerField name="d2" label="Date range" range />
          <DatePickerField name="d3" label="With time" withTime />
          <DatePickerField name="d4" label="With presets" showPresets />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function FloatingLabelsPage() {
  return (
    <Wrap title="Floating Labels">
      <PanelCard title="Floating label placement">
        <div className={grid}>
          <TextField name="name" label="Full name" labelPlacement="floating" />
          <TextField name="email" label="Email address" labelPlacement="floating" type="email" />
          <TextField name="company" label="Company" labelPlacement="floating" />
          <TextField name="role" label="Job title" labelPlacement="floating" />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function LayoutsPage() {
  return (
    <Wrap title="Form Layouts">
      <PanelCard title="Two-column form">
        <Form onSubmit={() => toast.success('Submitted')} className="flex flex-col gap-4">
          <div className={grid}>
            <FormFieldSet type="text" name="first" label="First name" />
            <FormFieldSet type="text" name="last" label="Last name" />
            <FormFieldSet type="email" name="email" label="Email" colSpan={2} />
            <FormFieldSet type="select" name="country" label="Country" options={['US', 'DE', 'JP'].map((v) => ({ label: v, value: v }))} />
            <FormFieldSet type="text" name="city" label="City" />
            <FormFieldSet type="textarea" name="notes" label="Notes" colSpan={2} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="bordered">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </div>
        </Form>
      </PanelCard>
    </Wrap>
  )
}

export function EditorPage() {
  const [value, setValue] = useState([
    { id: '1', type: 'heading', props: { level: 2 }, content: [{ type: 'text', text: 'Release notes' }], children: [] },
    { id: '2', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Write rich content with the oks-ui block editor.' }], children: [] },
  ])
  return (
    <Wrap title="Form Editor">
      <PanelCard title="Rich text editor">
        <TextEditor value={value} onChange={setValue} />
      </PanelCard>
    </Wrap>
  )
}

export function ValidationPage() {
  return (
    <Wrap title="Validation">
      <PanelCard title="Live validation (oks-ui VALIDATION_RULES)">
        <Form onSubmit={() => toast.success('Valid!')} validationMode="blur" className="flex flex-col gap-4">
          <div className={grid}>
            <FormFieldSet type="text" name="username" label="Username" validation={{ rules: { required: true, minLength: 3 } }} />
            <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
            <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true, strongPassword: true } }} />
            <FormFieldSet type="number" name="age" label="Age" validation={{ rules: { min: 18, max: 120 } }} />
          </div>
          <div><Button type="submit" color="primary">Validate</Button></div>
        </Form>
      </PanelCard>
    </Wrap>
  )
}

export function AdvancedSelectPage() {
  return (
    <Wrap title="Advanced Select">
      <PanelCard title="Rich options">
        <div className={grid}>
          <SelectField
            name="assignee"
            label="Assignee"
            options={['Wren Ashby', 'Mira Kapoor', 'Theo Rees', 'Rosa Delgado'].map((n) => ({ label: n, value: n }))}
            placeholderOption="Unassigned"
          />
          <SelectField
            name="labels"
            label="Labels"
            multiple
            options={['bug', 'feature', 'docs', 'design', 'infra'].map((v) => ({ label: v, value: v }))}
          />
        </div>
      </PanelCard>
    </Wrap>
  )
}

export function WizardPage() {
  return (
    <Wrap title="Form Wizard">
      <PanelCard title="Stepped form">
        <SteppedForm
          headerVariant="progress"
          onSubmit={() => toast.success('Onboarding complete')}
          steps={[
            defineStep({
              key: 'account',
              title: 'Account',
              fields: [
                { type: 'text', name: 'name', label: 'Full name', validation: { rules: { required: true } } },
                { type: 'email', name: 'email', label: 'Email', validation: { rules: { required: true, email: true } } },
              ],
            }),
            defineStep({
              key: 'company',
              title: 'Company',
              fields: [
                { type: 'text', name: 'company', label: 'Company name' },
                { type: 'select', name: 'size', label: 'Team size', options: ['1–10', '11–50', '51–200', '200+'].map((v) => ({ label: v, value: v })) },
              ],
            }),
            defineStep({
              key: 'prefs',
              title: 'Preferences',
              fields: [
                { type: 'switch', name: 'newsletter', label: 'Send me product updates' },
                { type: 'radio', name: 'theme', label: 'Default theme', options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }] },
              ],
            }),
          ]}
        />
      </PanelCard>
    </Wrap>
  )
}
