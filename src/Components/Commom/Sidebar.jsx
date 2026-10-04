import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Badge, Tooltip } from 'oks-ui'
import { cx } from '../../lib/cx'
import { NAV } from '../../data/nav'
import { Logo } from './Logo'

/* --------------------------------------------------------------------------
   Recursive sidebar. Split by node type so hooks never sit after an early
   return. Open state is derived (`manual ?? pathActive`) — never a
   useEffect + setState.
   -------------------------------------------------------------------------- */

const rowBase = (depth) =>
  cx(
    'group relative flex items-center gap-2.5 rounded-md text-[0.82rem] transition-colors',
    depth === 0 ? 'px-3 py-2.5' : 'py-2 pr-3',
  )

function LeafMarker({ depth }) {
  if (depth === 0) return null
  return (
    <span
      aria-hidden
      className="cearix-navmarker ml-2 mr-1.5 h-[3px] w-[7px] shrink-0 rounded-full border transition-colors"
      style={{ borderColor: 'var(--app-menu-fg-muted)', background: 'transparent' }}
    />
  )
}

function NavLeaf({ node, depth, collapsed, onNavigate }) {
  const content = (
    <NavLink
      to={node.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cx(rowBase(depth), 'cearix-navrow', isActive && 'is-active')
      }

    >
      {depth === 0 && node.icon ? (
        <node.icon size={17} className="shrink-0" />
      ) : (
        <LeafMarker depth={depth} />
      )}
      {!collapsed && <span className="truncate">{node.label}</span>}
      {!collapsed && node.badge && (
        <Badge
          content={node.badge}
          color="primary"
          variant="soft"
          size="sm"
          className="ml-auto"
        />
      )}
    </NavLink>
  )
  if (collapsed && depth === 0) {
    return (
      <Tooltip content={node.label} placement="right">
        {content}
      </Tooltip>
    )
  }
  return content
}

function NavGroup({ node, depth, collapsed, onNavigate }) {
  const { pathname } = useLocation()
  const pathActive = containsActive(node, pathname)
  const [manual, setManual] = useState(null)
  const open = manual ?? pathActive

  const Icon = node.icon

  return (
    <div className={cx(depth === 0 && 'cearix-nav-group')}>
      <button
        type="button"
        onClick={() => setManual(!open)}
        aria-expanded={open}
        className={cx(
          rowBase(depth),
          'cearix-navrow w-full text-left',
          pathActive && 'is-parent-active',
        )}
  
      >
        {depth === 0 && Icon ? (
          <Icon size={17} className="shrink-0" />
        ) : (
          <LeafMarker depth={depth} />
        )}
        {!collapsed && <span className="truncate">{node.label}</span>}
        {!collapsed && node.badge && (
          <Badge
            content={node.badge}
            color={node.badge === 'Hot' ? 'danger' : 'primary'}
            variant="soft"
            size="sm"
            className="ml-auto"
          />
        )}
        {!collapsed && (
          <ChevronRight
            size={14}
            className={cx(
              'ml-auto shrink-0 transition-transform',
              node.badge && 'ml-1.5',
              open && 'rotate-90',
            )}
          />
        )}
      </button>

      {!collapsed && (
        <div
          className={cx(
            'grid transition-[grid-template-rows] duration-200',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cx('mt-0.5 flex flex-col gap-0.5', depth === 0 && 'ml-3.5 border-l pl-1.5')}
              style={depth === 0 ? { borderColor: 'var(--app-menu-border)' } : undefined}
            >
              {node.children.map((c) => (
                <NavNode
                  key={c.label}
                  node={c}
                  depth={depth + 1}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {collapsed && depth === 0 && (
        <div className="cearix-flyout">
          <div className="cearix-flyout-panel">
            <p className="mb-1 px-2 text-[0.7rem] font-semibold uppercase tracking-wide"
               style={{ color: 'var(--app-menu-heading)' }}>
              {node.label}
            </p>
            {node.children.map((c) => (
              <NavNode
                key={c.label}
                node={c}
                depth={1}
                collapsed={false}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NavNode(props) {
  return props.node.children ? <NavGroup {...props} /> : <NavLeaf {...props} />
}

function containsActive(node, pathname) {
  if (node.to) return pathname === node.to || pathname.startsWith(node.to + '/')
  return (node.children || []).some((c) => containsActive(c, pathname))
}

export function Sidebar({ collapsed = false, onNavigate }) {
  return (
    <nav
      className="flex h-full flex-col"
      style={{ background: 'var(--app-menu-bg)' }}
      aria-label="Primary"
    >
      <div
        className="flex shrink-0 items-center px-4"
        style={{ height: 'var(--app-header-height)' }}
      >
        <NavLink to="/dashboards/sales" onClick={onNavigate} aria-label="Cearix home">
          <Logo onDark showWordmark={!collapsed} markHeight={20} />
        </NavLink>
      </div>

      <div
        className="cearix-scroll min-h-0 flex-1 overflow-y-auto px-2.5 pb-6"
        style={{ borderTop: '1px solid var(--app-menu-border)' }}
      >
        {NAV.map((section) => (
          <div key={section.heading} className="mt-3.5 first:mt-2">
            {!collapsed && (
              <p
                className="px-3 pb-1 pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.09em]"
                style={{ color: 'var(--app-menu-fg-muted)' }}
              >
                {section.heading}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavNode
                  key={item.label}
                  node={item}
                  depth={0}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
}
