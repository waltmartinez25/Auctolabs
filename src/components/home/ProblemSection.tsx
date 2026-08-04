import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { RaceLanes } from '@/components/home/RaceLanes';
import { CircuitBloom } from '@/components/home/CircuitBloom';
import { ProveIt } from '@/components/home/ProveIt';

/**
 * Names the reader's problem before any solution is offered.
 *
 * The anecdotes here are paraphrased from real client testimonials already on
 * this page (see `clean-testimonial.tsx`) — kept unattributed, since those
 * clients are named in the carousel further down. The only figure used is the
 * Velocify first-responder stat, cited elsewhere on the page with attribution.
 */
export const ProblemSection = () => (
  <section className="relative overflow-hidden border-t border-border/40 bg-secondary py-20 md:py-28">

    {/* ── Copy band: the illustration flanks only this part, so it never
           reaches the wider race card below. ── */}
    <div className="relative">

      {/* Widths are capped so the branches stay outside the centred copy —
          the reference keeps its art strictly beside the text, never behind
          it. Hidden below lg, where there is no clear space beside it. */}
      <CircuitBloom className="pointer-events-none absolute left-0 top-1/2 hidden h-[130%] w-[calc((100%-40rem)/2)] max-w-[360px] -translate-y-1/2 lg:block" />
      <CircuitBloom
        flip
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[130%] w-[calc((100%-40rem)/2)] max-w-[360px] -translate-y-1/2 lg:block"
      />

      <div className="container-custom relative">
        <AnimatedSection variant="fadeUp">
        {/* mb-0: this block continues into a divider and body copy rather
            than sitting above a grid, so it supplies its own spacing. */}
        <div className="section-head mb-0">
          <span className="eyebrow">The real reason leads go cold</span>

          <h2 className="!mb-0">
            Your website looks fine.
            <br />
            <em>It&apos;s just not doing anything.</em>
          </h2>

          <div aria-hidden="true" className="mx-auto my-8 h-px w-16 bg-border" />

          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              A contact form quietly broken on iPhones for months, while the ads kept
              running. Two years of asking why the business never showed up locally,
              and never getting a straight answer. Twelve thousand dollars nearly spent
              on a redesign when the design was never the problem.
            </p>
            <p>
              None of this is your fault. You paid for a website and you got one. But a
              site that just sits there isn&apos;t a system — and{' '}
              <span className="font-semibold text-foreground">
                78% of buyers go with whoever answers first
              </span>
              . Most of the time, that decision is made long before you&apos;ve read the
              email.
            </p>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground/70">Source: Velocify</p>
          </div>
        </AnimatedSection>
      </div>
    </div>

    {/* ── The race — full container width, clear of the illustration ── */}
    <div className="container-custom relative">
      <AnimatedSection variant="fadeUp" delay={120}>
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-card p-7 shadow-soft-sm md:mt-16 md:p-10">
          <RaceLanes />
        </div>
      </AnimatedSection>

      {/* Having just watched the two lanes diverge, the visitor can test the
          fast one against their own inbox. */}
      <AnimatedSection variant="fadeUp" delay={200}>
        <ProveIt />
      </AnimatedSection>
    </div>
  </section>
);
