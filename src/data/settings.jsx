export const SETTINGS_CONFIGS = {
  '/pages/email/settings': {
    title: 'Mail Settings',
    trail: [{ label: 'Email', to: '/pages/email/inbox' }, { label: 'Settings' }],
    panels: [
      {
        key: 'general',
        title: 'General',
        note: 'Display name, signature and reading preferences.',
        fields: [
          { type: 'text', name: 'displayName', label: 'Display name' },
          { type: 'email', name: 'replyTo', label: 'Reply-to address' },
          { type: 'textarea', name: 'signature', label: 'Signature', colSpan: 2 },
          { type: 'switch', name: 'threaded', label: 'Group by conversation' },
        ],
      },
      {
        key: 'notifications',
        title: 'Notifications',
        fields: [
          { type: 'switch', name: 'desktop', label: 'Desktop notifications' },
          { type: 'switch', name: 'digest', label: 'Daily digest email' },
          { type: 'select', name: 'sound', label: 'Alert sound', options: [{ label: 'Chime', value: 'chime' }, { label: 'None', value: 'none' }] },
        ],
      },
      {
        key: 'filters',
        title: 'Filters & rules',
        note: 'Incoming mail is matched top to bottom.',
        fields: [
          { type: 'text', name: 'rule1', label: 'If subject contains' },
          { type: 'select', name: 'action1', label: 'Then', options: [{ label: 'Move to folder', value: 'move' }, { label: 'Mark as read', value: 'read' }, { label: 'Star', value: 'star' }] },
        ],
      },
    ],
  },

  '/pages/profile/settings': {
    title: 'Account Settings',
    trail: [{ label: 'Profile', to: '/pages/profile' }, { label: 'Settings' }],
    panels: [
      {
        key: 'profile',
        title: 'Profile',
        fields: [
          { type: 'text', name: 'firstName', label: 'First name' },
          { type: 'text', name: 'lastName', label: 'Last name' },
          { type: 'email', name: 'email', label: 'Email' },
          { type: 'phone', name: 'phone', label: 'Phone' },
          { type: 'textarea', name: 'bio', label: 'Bio', colSpan: 2 },
        ],
      },
      {
        key: 'security',
        title: 'Security',
        fields: [
          { type: 'password', name: 'current', label: 'Current password' },
          { type: 'password', name: 'next', label: 'New password' },
          { type: 'switch', name: 'twofa', label: 'Two-factor authentication' },
        ],
      },
      {
        key: 'preferences',
        title: 'Preferences',
        fields: [
          { type: 'select', name: 'lang', label: 'Language', options: [{ label: 'English', value: 'en' }, { label: 'Français', value: 'fr' }, { label: 'Deutsch', value: 'de' }] },
          { type: 'select', name: 'tz', label: 'Timezone', options: [{ label: 'UTC', value: 'utc' }, { label: 'CET', value: 'cet' }, { label: 'PST', value: 'pst' }] },
          { type: 'switch', name: 'marketing', label: 'Product update emails' },
        ],
      },
    ],
  },
}
