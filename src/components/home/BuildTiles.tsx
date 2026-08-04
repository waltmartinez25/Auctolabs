import { Link } from 'react-router-dom';
import { CheckLg, ArrowRight } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BlueprintGrid, type Rule } from '@/components/ui/grid-frame';
import { analytics } from '@/lib/analytics';
import { CTA_FORM } from '@/lib/constants';
import { AutomationFlow } from '@/components/home/AutomationFlow';
import { MockupStack } from '@/components/home/MockupStack';
import { LeadNotifications } from '@/components/home/LeadNotifications';
import { WorkflowRelay } from '@/components/home/WorkflowRelay';

// ─── Data ─────────────────────────────────────────────────────────────────────
// Capability bullets only — what we build, never projected performance numbers.

const automationTile = {
  eyebrow: 'AI Automations',
  title: 'Systems that answer for you',
  body: 'Inquiries get replied to, qualified, and routed the moment they arrive — day or night.',
  bullets: ['Instant auto-response', 'AI-assisted qualification', 'Smart routing to your team'],
  href: '/services',
  linkText: 'Explore automations',
};

const webDesignTile = {
  eyebrow: 'Web Design',
  title: 'Websites engineered to convert',
  body: 'Every build starts with how your visitors actually decide — then we design the path that gets them to act.',
  bullets: ['Mobile-first and fast', 'SEO-ready structure', 'Built to convert'],
  href: '/services',
  linkText: 'Explore web design',
};

const leadGenTile = {
  eyebrow: 'Lead Generation',
  title: 'A pipeline that stays full',
  body: 'Capture points across your site feed one place, so nothing slips between tools.',
  bullets: ['Forms wired to your CRM', 'Email and SMS follow-up', 'Booking straight to calendar'],
  href: '/services',
  linkText: 'Explore lead generation',
};

const workflowTile = {
  eyebrow: 'AI Workflows',
  title: 'Your tools, finally connected',
  body: 'We wire the software you already pay for into one workflow that runs without babysitting.',
  bullets: ['CRM and calendar sync', 'Internal task automation', 'Reporting in one place'],
  href: '/services',
  linkText: 'Explore workflows',
};

// Interior cell walls. The grid is 6 columns wide at lg; the automation tile
// spans 4 and web design spans 2, so the only full-height wall sits at 2/3.
const RULES: Rule[] = [
  { dir: 'v', at: '66.666%' },
  { dir: 'h', at: '50%', length: '66.666%' },
  { dir: 'v', at: '33.333%', from: '50%', length: '50%' },
];

/**
 * Ambient tile glow — for the two tiles whose graphic does not animate.
 *
 * Laravel uses these two techniques at different scales: a soft radial wash
 * behind a *section*, and a hard 44px bloom on a single *active element*. We
 * had both stacked on the same tile, which is redundant — they both say "this
 * is the live part", and the wash raises the surrounding brightness so the
 * bloom has less to contrast against.
 *
 * So the split is by tile, not by taste:
 *
 *   AI Automations  — static flow diagram   -> ambient wash (below)
 *   Web Design      — static mockup cascade -> ambient wash (below)
 *   Lead Generation — animated feed         -> `.lit-node` bloom, no wash
 *   AI Workflows    — animated relay chain  -> `.lit-node` bloom, no wash
 *
 * Copied from laravel.com's build CSS, azure for their #F53003, at their real
 * opacities (0.15–0.20 — a 3–5% tint is invisible). Anchors differ per tile so
 * the light sits where that tile's artwork actually is.
 *
 * Radii must satisfy `rx <= min(cx, 100-cx)` and `ry <= min(cy, 100-cy)`, or
 * the ellipse runs past the element box and gets clipped — which reads as a
 * hard straight edge, not a fade. Laravel's own numbers (45% 100%, 80% 50%…)
 * exceed that, but their cells are wide and short so the overflow falls outside
 * the visible area; ours are tall, so it showed.
 *
 * Desktop-only, like theirs: stacked on mobile the offsets stop meaning much.
 */
const TILE_GLOWS = [
  'md:bg-[radial-gradient(38%_34%_at_62%_66%,rgba(26,91,255,0.20),transparent)]',
  'md:bg-[radial-gradient(34%_26%_at_66%_74%,rgba(26,91,255,0.15),transparent)]',
] as const;

/**
 * Laravel layers the glow as its own absolute element over a solid base,
 * rather than putting it on the cell — so cell content keeps its own stacking.
 *
 * `bottom-[8%]` matters. The BlueprintGrid rules are positioned at fixed
 * percentages of the *grid* (50%, 66.6%…), while a cell's real edge depends on
 * its content — those disagreed by ~13px here, so a glow run to the cell edge
 * spilled visibly past the drawn rule. Ending the glow short of the edge, with
 * the gradient already faded to transparent by then, means the two can drift
 * without ever showing a seam.
 */
const TileGlow = ({ variant }: { variant: number }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute inset-x-0 bottom-[8%] top-[40%] z-0 ${TILE_GLOWS[variant]}`}
  />
);

// Crosshairs belong where rules actually cross — not on every cell corner.
const MARKS: [string, string][] = [
  ['66.666%', '0%'],
  ['66.666%', '50%'],
  ['66.666%', '100%'],
  ['33.333%', '50%'],
  ['33.333%', '100%'],
  ['0%', '50%'],
];

// ─── Tile body ────────────────────────────────────────────────────────────────

interface TileProps {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  href: string;
  linkText: string;
}

const TileBody = ({ eyebrow, title, body, bullets, href, linkText }: TileProps) => (
  <>
    <span className="text-primary font-bold text-[11px] uppercase tracking-[0.18em] mb-3 block">
      {eyebrow}
    </span>
    <h3 className="font-serif font-medium text-foreground text-2xl md:text-[1.75rem] leading-[1.15] mb-3">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{body}</p>

    <ul className="space-y-2.5 mb-6">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2.5">
          <CheckLg aria-hidden="true" className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="text-sm text-foreground leading-snug">{b}</span>
        </li>
      ))}
    </ul>

    <Link to={href} className="link-arrow text-primary font-semibold text-sm">
      {linkText}
      <ArrowRight aria-hidden="true" className="w-4 h-4" />
    </Link>
  </>
);

// ─── Build Tiles ──────────────────────────────────────────────────────────────

export const BuildTiles = () => {
  return (
    <section className="section-padding bg-background border-t border-border/40">
      <div className="container-custom">

        {/* Section heading */}
        <AnimatedSection variant="fadeUp">
          <div className="section-head section-head-left">
            <span className="eyebrow">What We Build</span>
            <h2>
              The website and{' '}
              <em>the system behind it.</em>
            </h2>
            <p>
              Most agencies hand you a site and walk away. We build the site, then wire the
              automation that turns visitors into booked calls.
            </p>
          </div>
        </AnimatedSection>

        {/* ── One continuous grid: cells share walls, no gaps ── */}
        <BlueprintGrid rules={RULES} marks={MARKS} className="grid lg:grid-cols-6">

          {/* Automation — span 4, holds the animated flow graphic */}
          <div className="relative lg:col-span-4 flex flex-col p-7 md:p-9">
            <TileGlow variant={0} />
            <div className="relative z-10 flex flex-1 flex-col">
              <TileBody {...automationTile} />
              <div className="mt-auto pt-6">
                <AutomationFlow />
              </div>
            </div>
          </div>

          {/* Web design — span 2, full height on the right. All the site
              mockups live here, since every one of them is web-design work. */}
          <div className="relative lg:col-span-2 lg:row-span-2 flex flex-col p-7 md:p-9">
            <TileGlow variant={1} />
            <div className="relative z-10 flex flex-1 flex-col">
              <TileBody {...webDesignTile} />
              {/* -mr cancels the tile's own padding so the cascade can run all
                  the way to the tile edge and clip there. */}
              <div className="-mr-7 pt-8 md:-mr-9 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
                <MockupStack />
              </div>
            </div>
          </div>

          {/* Lead generation — the feed of arriving leads */}
          <div className="relative lg:col-span-2 flex flex-col p-7 md:p-9">
            <div className="relative z-10 flex flex-1 flex-col">
              <TileBody {...leadGenTile} />
              <div className="mt-auto pt-6">
                <LeadNotifications />
              </div>
            </div>
          </div>

          {/* AI workflows — the tool chain relay. The chain is short, so it
              centres in the leftover space rather than sitting on the floor. */}
          <div className="relative lg:col-span-2 flex flex-col p-7 md:p-9">
            <div className="relative z-10 flex flex-1 flex-col">
              <TileBody {...workflowTile} />
              <div className="flex flex-1 items-center pt-6">
                <WorkflowRelay />
              </div>
            </div>
          </div>

        </BlueprintGrid>

        {/* A quiet way to act without interrupting the scroll with a banner. */}
        <AnimatedSection variant="fadeIn" delay={200}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Ready when you are.{' '}
            <Link
              to="/contact"
              onClick={() => analytics.contactFormClick('build_tiles')}
              className="link-arrow font-semibold text-primary"
            >
              {CTA_FORM.primary}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </p>
        </AnimatedSection>

      </div>
    </section>
  );
};
