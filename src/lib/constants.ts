/**
 * App-wide constants.
 */

/** Booking link. Single source of truth — it was previously copy-pasted into
 *  five components, so a calendar move meant five edits and a missed one. */
export const CALENDLY_URL = 'https://calendly.com/waltermartinez-auctolabs/30min';

/**
 * CTA labels, grouped by where the button actually goes.
 *
 * The label has to predict the destination. Two buttons reading "Book a Free
 * Strategy Call" where one opens a calendar and the other opens a contact
 * form teaches visitors the wrong thing about the second one.
 *
 *   CTA_BOOK.*  → Calendly (calendar opens immediately)
 *   CTA_FORM.*  → /contact (a form to fill in)
 *   CTA_AUDIT   → /contact?audit=true (the audit offer specifically)
 */
export const CTA_BOOK = {
  /** Default for a calendar link. */
  primary: 'Book a Free Strategy Call',
  /** Where space is tight — nav, sticky mobile bar. */
  compact: 'Book a Call',
} as const;

export const CTA_FORM = {
  /** Default for a contact-form link. */
  primary: 'Tell Us About Your Project',
  /** Where the surrounding copy is about a question rather than a project. */
  question: 'Send Us a Message',
} as const;

export const CTA_AUDIT = 'Free Audit';
