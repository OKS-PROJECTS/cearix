import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu as MenuIcon,
  Search,
  Globe,
  Moon,
  Sun,
  ShoppingCart,
  Bell,
  Grip,
  Maximize,
  Minimize,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Settings,
  LogOut,
  LifeBuoy,
} from 'lucide-react'
import {
  Button,
  Badge,
  Avatar,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from 'oks-ui'
import { useTheme } from '../../lib/useTheme'
import { avatarUrl } from '../../lib/avatar'
import { CommandBar } from './CommandBar'

function IconBtn({ label, children, ...rest }) {
  return (
    <Tooltip content={label} placement="bottom">
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label={label}
        className="cearix-header-btn"
        {...rest}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export function Header({ onToggleMobile, onToggleRail, rail }) {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [full, setFull] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const toggleFull = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setFull(true)).catch(() => {})
    } else {
      document.exitFullscreen?.().then(() => setFull(false)).catch(() => {})
    }
  }

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-1.5 px-3 sm:px-4"
      style={{
        height: 'var(--app-header-height)',
        background: 'var(--app-header-bg)',
        color: 'var(--app-header-fg)',
        boxShadow: 'var(--app-header-shadow)',
      }}
    >
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label="Toggle menu"
        className="cearix-header-btn lg:hidden"
        onPress={onToggleMobile}
      >
        <MenuIcon size={18} />
      </Button>
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        aria-label="Collapse sidebar"
        className="cearix-header-btn hidden lg:inline-flex"
        onPress={onToggleRail}
      >
        {rail ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </Button>

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="ml-1 hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.8rem] sm:flex"
        style={{ background: 'var(--app-header-control-bg)', color: 'var(--app-header-fg)', minWidth: 260 }}
      >
        <Search size={15} />
        <span className="opacity-80">Search for results...</span>
        <kbd className="ml-auto rounded bg-white/20 px-1.5 py-0.5 text-[0.65rem]">⌘K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-0.5">
        <div className="hidden sm:flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="ghost" size="sm" aria-label="Language" className="cearix-header-btn">
                <Globe size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Language">
              <DropdownItem key="en" title="English" />
              <DropdownItem key="fr" title="Français" />
              <DropdownItem key="de" title="Deutsch" />
              <DropdownItem key="ja" title="日本語" />
            </DropdownMenu>
          </Dropdown>
        </div>

        <IconBtn label="Toggle theme" onPress={toggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </IconBtn>

        <div className="hidden sm:block">
          <Tooltip content="Cart" placement="bottom">
            <span className="relative inline-flex">
              <Button
                isIconOnly
                variant="ghost"
                size="sm"
                aria-label="Cart"
                className="cearix-header-btn"
                onPress={() => navigate('/apps/ecommerce/cart')}
              >
                <ShoppingCart size={18} />
              </Button>
              <Badge content="5" color="secondary" size="sm" className="absolute -right-0.5 -top-0.5" />
            </span>
          </Tooltip>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <span className="relative inline-flex">
              <Button isIconOnly variant="ghost" size="sm" aria-label="Notifications" className="cearix-header-btn">
                <Bell size={18} />
              </Button>
              <Badge content="3" color="danger" size="sm" className="absolute -right-0.5 -top-0.5" />
            </span>
          </DropdownTrigger>
          <DropdownMenu aria-label="Notifications" className="w-72">
            <DropdownSection title="Notifications">
              <DropdownItem key="n1" title="New order #CRX-2048" description="A moment ago" />
              <DropdownItem key="n2" title="Payout processed" description="24 minutes ago" />
              <DropdownItem key="n3" title="Server load normalised" description="1 hour ago" />
            </DropdownSection>
            <DropdownItem key="all" title="View all notifications" href="/pages/notifications" />
          </DropdownMenu>
        </Dropdown>

        <div className="hidden md:block">
          <IconBtn label="Apps" onPress={() => navigate('/widgets')}>
            <Grip size={18} />
          </IconBtn>
        </div>
        <div className="hidden md:block">
          <IconBtn label="Fullscreen" onPress={toggleFull}>
            {full ? <Minimize size={18} /> : <Maximize size={18} />}
          </IconBtn>
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button type="button" className="ml-1 flex items-center gap-2 rounded-full py-1 pl-1 pr-2" style={{ background: 'var(--app-header-control-bg)' }}>
              <Avatar src={avatarUrl('cassian-holt')} name="Cassian Holt" size={30} />
              <span className="hidden text-[0.8rem] font-medium lg:block">Cassian Holt</span>
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account">
            <DropdownSection title="Cassian Holt">
              <DropdownItem key="profile" title="Profile" startContent={<User size={15} />} href="/pages/profile" />
              <DropdownItem key="settings" title="Settings" startContent={<Settings size={15} />} href="/pages/profile" />
              <DropdownItem key="help" title="Help center" startContent={<LifeBuoy size={15} />} href="/pages/faqs" />
            </DropdownSection>
            <DropdownItem key="signout" title="Sign out" color="danger" startContent={<LogOut size={15} />} href="/auth/sign-in" />
          </DropdownMenu>
        </Dropdown>

        <IconBtn label="Settings" onPress={() => navigate('/pages/profile')}>
          <Settings size={18} />
        </IconBtn>
      </div>

      <CommandBar isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  )
}
