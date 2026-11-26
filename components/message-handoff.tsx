'use client'

import { useState } from 'react'
import { ArrowRight, Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { business, whatsappLink } from '@/lib/fleet'

export function MessageHandoff({
  message,
  subject,
  onSent,
}: {
  message: string
  subject: string
  onSent: () => void
}) {
  const [opened, setOpened] = useState<'' | 'WhatsApp' | 'email'>('')
  const [copied, setCopied] = useState<'idle' | 'done' | 'manual'>('idle')
  async function copy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied('done')
    } catch {
      setCopied('manual')
    }
  }
  return (
    <div className="message-handoff">
      <div className="send-note">
        <strong>Send directly to U Drive.</strong>
        <p>
          Your message will open ready to send. Tap Send in WhatsApp or your email app to deliver it
          to the team.
        </p>
      </div>
      <a
        className="action action-gold send-action"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpened('WhatsApp')}
      >
        <MessageCircle />
        {opened === 'WhatsApp' ? 'Reopen WhatsApp' : 'Continue to WhatsApp'}
        <ArrowRight />
      </a>
      <div className="send-alternatives">
        <a
          href={`mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
          onClick={() => setOpened('email')}
        >
          <Mail size={16} /> Open email draft
        </a>
        <button type="button" onClick={copy}>
          {copied === 'done' ? <Check size={16} /> : <Copy size={16} />}{' '}
          {copied === 'done' ? 'Message copied' : 'Copy message'}
        </button>
      </div>
      <p className="sr-only" role="status">
        {copied === 'done' ? 'Message copied to clipboard.' : ''}
      </p>
      {copied === 'manual' && (
        <label className="manual-copy">
          Copy your message:
          <textarea readOnly rows={7} value={message} onFocus={(e) => e.target.select()} />
        </label>
      )}
      {opened && (
        <div className="handoff-check">
          <p role="status">
            <strong>Finish sending in {opened}.</strong> Opening a draft does not submit it. Once
            you’ve sent your message, mark it below.
          </p>
          <button type="button" className="action action-outline" onClick={onSent}>
            I’ve sent my message <Check />
          </button>
        </div>
      )}
    </div>
  )
}
