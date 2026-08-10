import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircleFill, LightningChargeFill } from 'react-bootstrap-icons';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { analytics } from '@/lib/analytics';

const emailSchema = z.string().email('Enter a valid email address');

// Two submissions in quick succession is a bot, not a person changing their mind.
const THROTTLE_MS = 4000;

// n8n workflow "Prove It Demo — Instant Lead Response" (IAgZ5fJnNuUuhSIa)
const PROVE_IT_WEBHOOK_URL = 'https://n8n.auctolabs.com/webhook/prove-it-demo';

/**
 * Lets a visitor act on the speed claim instead of just reading it.
 *
 * Captures the address to Supabase for the lead record, and calls the n8n
 * webhook above to actually send the instant demo email via Gmail.
 */
export const ProveIt = () => {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const lastSubmit = useRef(0);
  // Bots fill every field they find; humans never see this one.
  const honeypot = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    if (honeypot.current?.value) return; // silently drop

    const now = Date.now();
    if (now - lastSubmit.current < THROTTLE_MS) return;

    const parsed = emailSchema.safeParse(email.trim());
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setError(null);
    setStatus('sending');
    lastSubmit.current = now;

    try {
      await supabase.from('form_submissions').insert({
        first_name: 'Speed Test',
        last_name: '',
        email: parsed.data,
        message: 'Prove-it widget: visitor asked to see the lead response in action',
      });
    } catch {
      // Capture is best-effort; never strand the visitor on an error state.
    }

    try {
      await fetch(PROVE_IT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: parsed.data }),
      });
    } catch {
      // The demo email is best-effort too — a failed send shouldn't strand the visitor.
    }

    analytics.contactFormClick('prove_it');

    setStatus('done');
  };

  return (
    <div
      data-testid="prove-it"
      className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:mt-14 md:p-8"
    >
      <div className="flex items-center justify-center gap-2">
        <LightningChargeFill aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
        <span className="eyebrow">See it for yourself</span>
      </div>

      <p className="mt-3 text-center text-[15px] leading-relaxed text-muted-foreground">
        Reading about fast follow-up is one thing. Drop your email and find out
        what landing in our system actually feels like.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === 'done' ? (
          <motion.div
            key="done"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-primary/25 bg-accent px-4 py-3.5"
            role="status"
          >
            <CheckCircleFill aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm leading-snug text-foreground">
              <span className="font-semibold">Check your inbox.</span>{' '}
              That email just landed in seconds — this is what your leads feel
              the moment they submit a form.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={false}
            className="mt-6"
            noValidate
          >
            {/* Honeypot — hidden from people, irresistible to bots */}
            <input
              ref={honeypot}
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute h-0 w-0 overflow-hidden opacity-0"
            />

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="prove-it-email" className="sr-only">
                Your email address
              </label>
              <input
                id="prove-it-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@company.com"
                aria-invalid={!!error}
                aria-describedby={error ? 'prove-it-error' : undefined}
                className="min-h-[48px] flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              >
                {status === 'sending' ? 'Sending…' : 'Try it'}
                {status !== 'sending' && (
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </div>

            {error && (
              <p id="prove-it-error" role="alert" className="mt-2 text-xs font-medium text-destructive">
                {error}
              </p>
            )}

            <p className="mt-3 text-center text-[11px] text-muted-foreground/80">
              No newsletter, no sequence. Just a reply.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
