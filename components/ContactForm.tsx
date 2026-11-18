'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { site } from '@/lib/site';

// Sends through Web3Forms. Set NEXT_PUBLIC_WEB3FORMS_KEY in Vercel to the shop's access key
// (created with the shop's email address). Without a key the form falls back to an email link.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!KEY) {
      const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('reply')}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState('sending');
    data.append('access_key', KEY);
    data.append('subject', 'New enquiry from the Value World Ballymena website');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      setState(json.success ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="rounded-3xl bg-brand-light p-8 text-center">
        <h3 className="text-2xl font-black text-brand">Thanks, message sent</h3>
        <p className="mt-2 text-ink-soft">We&apos;ll get back to you as soon as we can.</p>
      </div>
    );
  }

  const field = 'mt-2 block w-full rounded-2xl border-2 border-ink/15 bg-white px-4 py-3.5 text-[17px] outline-none focus:border-brand';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="name" className="font-display font-extrabold">Your name</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="reply" className="font-display font-extrabold">Email or phone</label>
        <input id="reply" name="reply" required className={field} />
      </div>
      <div>
        <label htmlFor="message" className="font-display font-extrabold">Message</label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      {state === 'error' && (
        <p role="alert" className="text-brand">
          Sorry, that didn&apos;t send. Please try again or email {site.email}.
        </p>
      )}
      <button type="submit" disabled={state === 'sending'} className="btn-brand w-full sm:w-auto">
        <Send size={18} aria-hidden="true" /> {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
