import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ToolLogo } from '@/components/ui/tool-logo';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stat { value: string; label: string; }
interface Integration { name: string; slug: string; color: string; bg: string; manyMore?: boolean; }

// ─── Data ────────────────────────────────────────────────────────────────────

const statSets: Stat[][] = [
  [
    // Industry research stats — cited sources
    { value: '21×',    label: 'More Likely to Qualify'    }, // InsideSales.com: 5 min vs 30 min response
    { value: '78%',    label: 'Buy From First Responder'  }, // Velocify research
    { value: '<5 min', label: 'Target Speed to Lead'      }, // achievable with automated systems
    { value: '40%',    label: 'Of Work Tasks Automatable' }, // McKinsey Global Institute
  ],
  [
    // AuctoLabs delivery targets — realistic estimates
    { value: '12 wks', label: 'Avg. Time To Value'        },
    { value: '<6 wks', label: 'Avg. First Deployment'     },
    { value: '30%',    label: 'Avg. Admin Time Reduction' }, // Deloitte automation study (conservative)
    { value: '3×',     label: 'ROI on Automation'         }, // Deloitte: avg 3.5× ROI on automation
  ],
];

// Two sets of 9 — each fills the 3×3 grid, then swaps in with the slide animation
// Slugs are Simple Icons identifiers: https://simpleicons.org
const integrationSets: Integration[][] = [
  [
    { name: 'Trello',       slug: 'trello',       color: '#0052CC', bg: '#DBEAFE' },
    { name: 'Notion',       slug: 'notion',       color: '#191919', bg: '#F3F4F6' },
    { name: 'n8n',          slug: 'n8n',          color: '#EA4B71', bg: '#FDE8EE' },
    { name: 'Airtable',     slug: 'airtable',     color: '#2D7FF9', bg: '#DBEAFE' },
    { name: 'OpenAI',       slug: 'openai',       color: '#412991', bg: '#EDE9FE' },
    { name: 'Google Cloud', slug: 'googlecloud',  color: '#4285F4', bg: '#EBF2FF' },
    { name: 'Oracle',       slug: 'oracle',       color: '#F80000', bg: '#FEE2E2' },
    { name: 'Zapier',       slug: 'zapier',       color: '#FF4A00', bg: '#FFF0EA' },
    { name: 'Make',         slug: 'make',         color: '#6D00CC', bg: '#F3E8FF' },
  ],
  [
    { name: 'HubSpot',       slug: 'hubspot',      color: '#FF7A59', bg: '#FFF4F0' },
    { name: 'Salesforce',    slug: 'salesforce',   color: '#00A1E0', bg: '#E0F7FF' },
    { name: 'Slack',         slug: 'slack',        color: '#4A154B', bg: '#F5EEF8' },
    { name: 'Gmail',         slug: 'gmail',        color: '#EA4335', bg: '#FDEDEC' },
    { name: 'Google Sheets', slug: 'googlesheets', color: '#34A853', bg: '#E8F8EE' },
    { name: 'Stripe',        slug: 'stripe',       color: '#635BFF', bg: '#EEEEFE' },
    { name: 'Twilio',        slug: 'twilio',       color: '#F22F46', bg: '#FEE6E9' },
    { name: 'Typeform',      slug: 'typeform',     color: '#262627', bg: '#F3F4F6' },
    // Pale azure, not the near-black #0C1445 it used to be — one dark tile
    // among eight pastels read as an error rather than a nineth option.
    { name: 'Many More',     slug: 'many-more',    color: '#1A56FF', bg: '#E8EEFF', manyMore: true },
  ],
];

const EASE: [number, number, number, number] = [0, 0, 0.2, 1];
const STAT_EASE: [number, number, number, number] = [0.4, 0, 0.6, 1];

// ─── Component ───────────────────────────────────────────────────────────────

export const SocialProofSection = () => {
  const reduceMotion = useReducedMotion();
  const [statSet,  setStatSet]  = useState(0);
  const [integSet, setIntegSet] = useState(0);
  const [active,   setActive]   = useState(false);

  const { ref: widgetRef, isInView: widgetInView } = useInView({ threshold: 0.2 });

  // Cycle stats every 4 s
  useEffect(() => {
    const t = setInterval(() => setStatSet(s => (s === 0 ? 1 : 0)), 4000);
    return () => clearInterval(t);
  }, []);

  // Activate on first scroll into view
  useEffect(() => {
    if (widgetInView && !active) setActive(true);
  }, [widgetInView, active]);

  // Cycle integrations every 7 s once active
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setIntegSet(s => (s === 0 ? 1 : 0)), 7000);
    return () => clearInterval(t);
  }, [active]);

  return (
    <section className="py-20 md:py-28 bg-secondary border-t border-border/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: Headline + Cycling Stats ─────────────────────────────── */}
          <div>
            <div className="section-head section-head-aside mb-10">
              <span className="eyebrow">By the Numbers</span>

              <h2>
                Built for outcomes,{' '}
                <em>not just output.</em>
              </h2>

              <p>
                A great website means nothing if it doesn&apos;t grow your business.
                Every decision we make is grounded in performance, user behavior,
                and long-term results, because the best websites don&apos;t just look
                good. They work.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {statSets[statSet].map((stat, i) => (
                  <motion.div
                    key={`s${statSet}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.32, delay: i * 0.06, ease: STAT_EASE }}
                    className="rounded-2xl border border-border/50 bg-background px-3 py-4 sm:px-5 sm:py-5 hover:border-primary/30 hover:bg-muted hover:shadow-sm transition-all duration-200 cursor-default"
                  >
                    <p className="text-[2rem] sm:text-[2.75rem] md:text-[3rem] font-serif font-black leading-none tracking-tight text-primary mb-1.5 select-none">
                      {stat.value}
                    </p>
                    <p className="text-[0.8125rem] font-bold text-foreground leading-snug">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 mt-5">
              {statSets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStatSet(i)}
                  aria-label={`Show stat set ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    statSet === i ? 'w-7 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Browser Integration Widget ──────────────────────────── */}
          <div ref={widgetRef} className="lg:pt-[4.5rem]">
            <span className="eyebrow mb-5">Seamless Integrations</span>

            <div className="rounded-3xl border border-border/50 overflow-hidden shadow-soft-lg">

              {/* Title bar.
                  The macOS traffic lights are gone — three saturated dots are a
                  skeuomorphic tell, and they were the only red and amber in a
                  section built from white, azure and the tools' own brand
                  colours. A single live dot says the same "this is a running
                  surface" without borrowing another OS's furniture.
                  Greys come from tokens now; this was hard-coded #F3F4F6 and
                  #FFFFFF, which ignored the palette entirely. */}
              <div className="flex items-center gap-2.5 px-4 py-3 bg-secondary border-b border-border/40">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-soft" />
                  <span className="relative m-auto h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <div className="flex-1 rounded-lg bg-card px-3 py-1 border border-border/40">
                  <span className="text-[11px] text-muted-foreground/60 font-medium select-none">
                    AuctoLabs Integration Hub
                  </span>
                </div>
              </div>

              {/*
                3×3 grid of stable cells.
                Only cell content animates — the grid structure never collapses.
                On scroll: logos slide in from the right, one by one (cascading "connecting" effect).
                Every 7 s: old logos fade out, new set slides in the same way.
              */}
              <div className="p-5 grid grid-cols-3 gap-3 bg-card">
                {Array.from({ length: 9 }, (_, i) => {
                  const intg = integrationSets[integSet][i];
                  return (
                    <div key={i} className="relative h-[90px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${integSet}-${intg.slug}`}
                          initial={{ opacity: 0, x: 24 }}
                          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                          exit={{ opacity: 0, transition: { duration: 0.15, ease: EASE } }}
                          // Snappier than the original 0.32s / 0.08s stagger,
                          // which took ~0.96s to fill the grid — long enough
                          // that the cascade was over before the eye found it.
                          // Now ~0.58s: still reads tile-by-tile, but lands.
                          transition={{
                            duration: 0.24,
                            delay: active ? i * 0.045 : 0,
                            ease: EASE,
                          }}
                          // Hover lift + a hairline inset border. The tiles were
                          // flat fills with no depth and no response to the
                          // pointer; this gives them a surface without touching
                          // the brand colour, which stays the tile's own.
                          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
                          className="group/tile absolute inset-0 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 cursor-default shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9),0_8px_20px_-8px_rgba(37,51,86,0.25)]"
                          style={{ backgroundColor: intg.bg }}
                        >
                          {intg.manyMore ? (
                            /* "Many More" variant */
                            <>
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-dashed border-primary/30 bg-primary/10">
                                <span className="text-primary text-xl font-black leading-none select-none">+</span>
                              </div>
                              {/* Full opacity, not /70 — on the old near-black
                                  tile the label needed dimming; on pale azure
                                  70% dropped it to ~3.4:1. */}
                              <span className="text-[10px] font-semibold text-center leading-tight text-primary">
                                Many More
                              </span>
                            </>
                          ) : (
                            /* Brand logo from Simple Icons CDN — white on brand color */
                            <>
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
                                style={{ backgroundColor: intg.color }}
                              >
                                <ToolLogo
                                  slug={intg.slug}
                                  className="w-6 h-6"
                                  style={{ filter: 'brightness(0) invert(1)' }}
                                />
                              </div>
                              <span
                                className="text-[10px] font-semibold text-center leading-tight"
                                style={{ color: intg.color }}
                              >
                                {intg.name}
                              </span>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Not just a website.{' '}
              <span className="text-foreground font-medium">A smarter system for growth.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
