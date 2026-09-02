import { useState } from 'react'
import { Send, Search, Star, Paperclip, Reply, Trash2, Inbox as InboxIcon } from 'lucide-react'
import {
  Message, MessageList, SplitLayout, SplitPane, TextField, Button, Avatar, Chip, Badge,
} from 'oks-ui'
import { PageHeader, PanelCard } from '../../Components/ui'
import { avatarUrl } from '../../lib/avatar'
import { useIsDesktop } from '../../lib/useMediaQuery'

/* -------------------------------------------------- Chat */
const CONVOS = [
  { id: 'wren', name: 'Wren Ashby', last: 'Pushed the token refactor', unread: 2 },
  { id: 'mira', name: 'Mira Kapoor', last: 'Contrast audit is clean', unread: 0 },
  { id: 'theo', name: 'Theo Rees', last: 'Table v2 ready for review', unread: 0 },
  { id: 'design', name: 'Design squad', last: 'Rosa: shipping Friday', unread: 5 },
]
const THREADS = {
  wren: [
    { author: 'Wren Ashby', text: 'Pushed the token refactor — all 11 stops now.', align: 'start', timestamp: '09:12' },
    { author: 'You', text: 'Nice. Did dark mode hold up?', align: 'end', timestamp: '09:14' },
    { author: 'Wren Ashby', text: 'Yep, verified both themes against the reference.', align: 'start', timestamp: '09:15' },
  ],
}
export function ChatPage() {
  const isDesktop = useIsDesktop()
  const [active, setActive] = useState('wren')
  const [draft, setDraft] = useState('')
  const [msgs, setMsgs] = useState(THREADS.wren)
  const send = () => {
    if (!draft.trim()) return
    setMsgs((m) => [...m, { author: 'You', text: draft.trim(), align: 'end', timestamp: 'now' }])
    setDraft('')
  }
  const list = (
    <div className="flex h-full flex-col">
      <div className="border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
        <TextField aria-label="Search chats" placeholder="Search…" size="sm" startIcon={<Search size={14} />} />
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto">
        {CONVOS.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => setActive(c.id)}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left"
              style={{ background: active === c.id ? 'var(--app-primary-soft)' : 'transparent' }}
            >
              <Avatar src={avatarUrl(c.id)} name={c.name} size={34} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.83rem] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{c.name}</p>
                <p className="truncate text-[0.75rem]" style={{ color: 'var(--app-fg-muted)' }}>{c.last}</p>
              </div>
              {c.unread > 0 && <Badge content={c.unread} color="primary" size="sm" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
  const thread = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
        <Avatar src={avatarUrl(active)} name={CONVOS.find((c) => c.id === active)?.name} size={32} />
        <span className="text-[0.88rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
          {CONVOS.find((c) => c.id === active)?.name}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <MessageList>
          {msgs.map((m, i) => (
            <Message key={i} author={m.author} align={m.align} timestamp={m.timestamp} variant="bubble">
              {m.text}
            </Message>
          ))}
        </MessageList>
      </div>
      <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--app-border)' }}>
        <TextField aria-label="Message" placeholder="Write a message…" value={draft} onChange={setDraft} className="flex-1" />
        <Button color="primary" isIconOnly aria-label="Send" onPress={send}><Send size={16} /></Button>
      </div>
    </div>
  )
  return (
    <>
      <PageHeader title="Chat" trail={[{ label: 'Pages' }, { label: 'Chat' }]} />
      <PanelCard title="Messages" bodyClassName="p-0">
        <div className="h-[560px]">
          {isDesktop ? (
            <SplitLayout direction="horizontal">
              <SplitPane defaultSize="30%" minSize={220}>{list}</SplitPane>
              <SplitPane>{thread}</SplitPane>
            </SplitLayout>
          ) : (
            thread
          )}
        </div>
      </PanelCard>
    </>
  )
}

/* -------------------------------------------------- Email */
const FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: InboxIcon, count: 12 },
  { id: 'starred', label: 'Starred', icon: Star, count: 3 },
  { id: 'sent', label: 'Sent', icon: Send, count: 0 },
  { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
]
const MAILS = [
  { id: 1, from: 'Meridian Supply Co.', subject: 'Wholesale pricing for Q4', preview: 'We\'d like to place a recurring order for the Aster line…', time: '08:42', unread: true, tag: 'Sales' },
  { id: 2, from: 'Rosa Delgado', subject: 'Warehouse move — final dates', preview: 'Confirmed for the 30th. Freight booked with Meridian.', time: 'Yesterday', unread: true, tag: 'Ops' },
  { id: 3, from: 'Stripe', subject: 'Your payout was sent', preview: 'A payout of $14,206.55 is on its way to your bank.', time: 'Yesterday', unread: false, tag: 'Finance' },
  { id: 4, from: 'Theo Rees', subject: 'Data table v2 — review please', preview: 'Opened a PR with the sticky header and row selection.', time: 'Mon', unread: false, tag: 'Eng' },
  { id: 5, from: 'Mira Kapoor', subject: 'Contrast audit results', preview: 'All components pass AA in both themes now.', time: 'Mon', unread: false, tag: 'Design' },
]
export function EmailInboxPage() {
  const isDesktop = useIsDesktop()
  const [folder, setFolder] = useState('inbox')
  const [selected, setSelected] = useState(MAILS[0])

  const folders = (
    <div className="flex h-full flex-col p-3">
      <Button color="primary" fullWidth className="mb-3">Compose</Button>
      <ul className="flex flex-col gap-0.5">
        {FOLDERS.map((f) => (
          <li key={f.id}>
            <button
              onClick={() => setFolder(f.id)}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[0.83rem]"
              style={{ background: folder === f.id ? 'var(--app-primary-soft)' : 'transparent', color: folder === f.id ? 'var(--app-primary)' : 'var(--app-fg)' }}
            >
              <f.icon size={16} /> {f.label}
              {f.count > 0 && <span className="ml-auto text-[0.72rem]" style={{ color: 'var(--app-fg-muted)' }}>{f.count}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
  const listPane = (
    <ul className="h-full divide-y overflow-y-auto" style={{ borderColor: 'var(--app-border)' }}>
      {MAILS.map((m) => (
        <li key={m.id}>
          <button
            onClick={() => setSelected(m)}
            className="w-full px-4 py-3 text-left"
            style={{ background: selected?.id === m.id ? 'var(--app-surface-2)' : 'transparent' }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[0.83rem]" style={{ fontWeight: m.unread ? 600 : 400, color: 'var(--app-fg-strong)' }}>{m.from}</span>
              <span className="shrink-0 text-[0.72rem]" style={{ color: 'var(--app-fg-subtle)' }}>{m.time}</span>
            </div>
            <p className="truncate text-[0.82rem]" style={{ color: 'var(--app-fg)' }}>{m.subject}</p>
            <p className="truncate text-[0.76rem]" style={{ color: 'var(--app-fg-muted)' }}>{m.preview}</p>
          </button>
        </li>
      ))}
    </ul>
  )
  const reading = selected && (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[1rem] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{selected.subject}</h2>
          <div className="mt-1 flex items-center gap-2">
            <Avatar src={avatarUrl(selected.from)} name={selected.from} size={26} />
            <span className="text-[0.8rem]" style={{ color: 'var(--app-fg-muted)' }}>{selected.from} · {selected.time}</span>
            <Chip size="sm" variant="soft">{selected.tag}</Chip>
          </div>
        </div>
        <div className="flex gap-1">
          <Button isIconOnly size="sm" variant="ghost" aria-label="Star"><Star size={15} /></Button>
          <Button isIconOnly size="sm" variant="ghost" aria-label="Attach"><Paperclip size={15} /></Button>
          <Button isIconOnly size="sm" variant="ghost" aria-label="Delete"><Trash2 size={15} /></Button>
        </div>
      </div>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto text-[0.88rem] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
        <p>{selected.preview}</p>
        <p className="mt-3">Let me know a good time this week to talk through volumes and lead times. Happy to send over a sample set first.</p>
        <p className="mt-3">Best,<br />{selected.from}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" color="primary" startContent={<Reply size={14} />}>Reply</Button>
        <Button size="sm" variant="bordered">Forward</Button>
      </div>
    </div>
  )
  return (
    <>
      <PageHeader title="Inbox" trail={[{ label: 'Email' }, { label: 'Inbox' }]} />
      <PanelCard title="Mail" bodyClassName="p-0">
        <div className="h-[600px]">
          {isDesktop ? (
            <SplitLayout direction="horizontal">
              <SplitPane defaultSize={200} minSize={160}>{folders}</SplitPane>
              <SplitPane defaultSize="34%" minSize={260}>{listPane}</SplitPane>
              <SplitPane>{reading}</SplitPane>
            </SplitLayout>
          ) : (
            listPane
          )}
        </div>
      </PanelCard>
    </>
  )
}
export function EmailThreadPage() {
  return (
    <>
      <PageHeader title="Mail Thread" trail={[{ label: 'Email' }, { label: 'Thread' }]} />
      <PanelCard title="Wholesale pricing for Q4">
        <MessageList>
          <Message author="Meridian Supply Co." align="start" timestamp="Mon 08:42" variant="bubble">
            We'd like to place a recurring order for the Aster line. What volume discounts can you offer?
          </Message>
          <Message author="You" align="end" timestamp="Mon 09:10" variant="bubble">
            Thanks for reaching out — for 500+ units/month we can do 18% off list, net-30 terms.
          </Message>
          <Message author="Meridian Supply Co." align="start" timestamp="Mon 11:05" variant="bubble">
            That works. Can you send a sample set to our Lyon office first?
          </Message>
          <Message author="You" align="end" timestamp="Mon 11:20" variant="bubble" status="read">
            On its way — tracking to follow this afternoon.
          </Message>
        </MessageList>
      </PanelCard>
    </>
  )
}
