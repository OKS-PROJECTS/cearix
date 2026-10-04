import { useNavigate, Link } from 'react-router-dom'
import { Clock, Wifi, Hammer } from 'lucide-react'
import {
  Form,
  FormFieldSet,
  TextField,
  PasswordField,
  OtpField,
  Checkbox,
  Button,
  Divider,
  toast,
} from 'oks-ui'
import { AuthShell } from './AuthShell'
import { Logo } from '../../Components/Commom/Logo'

export function SignIn({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Welcome back"
      subtitle="Sign in to your Cearix workspace."
      footer={<>New here? <Link to="/auth/sign-up" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Create an account</Link></>}
    >
      <Form onSubmit={() => navigate('/dashboards/sales')} className="flex flex-col gap-4">
        <FormFieldSet type="email" name="email" label="Email" defaultValue="cassian@cearix.io" />
        <FormFieldSet type="password" name="password" label="Password" defaultValue="cearix-demo" />
        <div className="flex items-center justify-between">
          <Checkbox name="remember" label="Remember me" defaultChecked />
          <Link to="/auth/reset-password" className="text-[0.82rem]" style={{ color: 'var(--app-primary)' }}>
            Forgot password?
          </Link>
        </div>
        <Button type="submit" color="primary" fullWidth>Sign in</Button>
        <Divider>or</Divider>
        <Button type="button" variant="bordered" fullWidth onPress={() => navigate('/dashboards/sales')}>
          Continue with SSO
        </Button>
      </Form>
    </AuthShell>
  )
}

export function SignUp({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Create your account"
      subtitle="Start exploring the Cearix template."
      footer={<>Already have an account? <Link to="/auth/sign-in" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Sign in</Link></>}
    >
      <Form onSubmit={() => { toast.success('Account created'); navigate('/dashboards/sales') }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FormFieldSet type="text" name="first" label="First name" />
          <FormFieldSet type="text" name="last" label="Last name" />
        </div>
        <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" />
        <Checkbox name="terms" label="I agree to the terms of service" defaultChecked />
        <Button type="submit" color="primary" fullWidth>Create account</Button>
      </Form>
    </AuthShell>
  )
}

export function ResetPassword({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Reset your password"
      subtitle="We'll email you a reset link."
      footer={<Link to="/auth/sign-in" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Back to sign in</Link>}
    >
      <Form onSubmit={() => { toast.success('Reset link sent'); navigate('/auth/sign-in') }} className="flex flex-col gap-4">
        <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
        <Button type="submit" color="primary" fullWidth>Send reset link</Button>
      </Form>
    </AuthShell>
  )
}

export function CreatePassword({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Set a new password"
      subtitle="Choose a strong password you don't use elsewhere."
      footer={<Link to="/auth/sign-in" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Back to sign in</Link>}
    >
      <Form onSubmit={() => { toast.success('Password updated'); navigate('/auth/sign-in') }} className="flex flex-col gap-4">
        <PasswordField name="password" label="New password" />
        <PasswordField name="confirm" label="Confirm password" />
        <Button type="submit" color="primary" fullWidth>Update password</Button>
      </Form>
    </AuthShell>
  )
}

export function LockScreen({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Cassian Holt"
      subtitle="Your session is locked. Enter your password to continue."
      footer={<Link to="/auth/sign-in" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Sign in as someone else</Link>}
    >
      <Form onSubmit={() => navigate('/dashboards/sales')} className="flex flex-col gap-4">
        <TextField type="password" name="password" label="Password" placeholder="••••••••" />
        <Button type="submit" color="primary" fullWidth>Unlock</Button>
      </Form>
    </AuthShell>
  )
}

export function TwoStep({ split }) {
  const navigate = useNavigate()
  return (
    <AuthShell
      split={split}
      title="Two-step verification"
      subtitle="Enter the 6-digit code from your authenticator app."
      footer={<Link to="/auth/sign-in" className="underline underline-offset-2" style={{ color: 'var(--app-primary)' }}>Back to sign in</Link>}
    >
      <Form onSubmit={() => navigate('/dashboards/sales')} className="flex flex-col gap-4">
        <OtpField name="code" length={6} label="Verification code" />
        <Button type="submit" color="primary" fullWidth>Verify</Button>
        <button type="button" className="text-center text-[0.82rem]" style={{ color: 'var(--app-fg-muted)' }}>
          Resend code
        </button>
      </Form>
    </AuthShell>
  )
}

function Standalone({ icon: Icon, title, description, action }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center" style={{ background: 'var(--app-bg)' }}>
      <Logo markHeight={28} />
      <span
        className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}
      >
        <Icon size={26} />
      </span>
      <h1 className="text-2xl font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{title}</h1>
      <p className="max-w-md text-[0.9rem]" style={{ color: 'var(--app-fg-muted)' }}>{description}</p>
      {action}
    </main>
  )
}

export function ComingSoonPage() {
  return (
    <Standalone
      icon={Hammer}
      title="Coming soon"
      description="We're putting the finishing touches on something new. Check back shortly."
      action={<Button as={Link} to="/dashboards/sales" color="primary" variant="soft">Back to dashboard</Button>}
    />
  )
}

export function UnderMaintenance() {
  return (
    <Standalone
      icon={Clock}
      title="Down for maintenance"
      description="Cearix is briefly offline for a scheduled upgrade. This usually takes a few minutes."
      action={<Button as={Link} to="/dashboards/sales" color="primary" variant="soft">Retry</Button>}
    />
  )
}

export function Offline() {
  return (
    <Standalone
      icon={Wifi}
      title="No connection"
      description="We can't reach the network right now. Check your connection and try again."
      action={<Button as={Link} to="/dashboards/sales" color="primary" variant="soft">Reload</Button>}
    />
  )
}

