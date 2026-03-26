import { useState } from 'react';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────────────────

const entries = [
  {
    category: '/AI Automations',
    client: 'Pinnacle Law Group',
    segment: 'Law Firms',
    description:
      'For law firms, your website is the first conversation with a potential client. We build digital experiences that establish credibility instantly and convert visitors into qualified leads.',
    stats: [
      { value: '35%', label: 'Increase in qualified leads' },
      { value: '15 min', label: 'Avg lead response time' },
    ],
    mockUrl: 'pinnaclelawgroup.com',
    preview: '/mockups/mock-ai-automations.jpg',
  },
  {
    category: '/Web Design',
    client: 'Dream Home Realty',
    segment: 'Real Estate',
    description:
      'For agencies, growth demands more than a portfolio site. We build conversion-focused websites with CRM integration and real-time analytics designed to close more deals.',
    stats: [
      { value: '2×', label: 'Lead volume increase' },
      { value: '35%', label: 'Reduction in bounce rate' },
    ],
    mockUrl: 'dreamhomerealty.com',
    preview: '/mockups/mock-web-design.png',
  },
  {
    category: '/Lead Generation',
    client: 'Group Room Gold',
    segment: 'Health & Wellness',
    description:
      'For construction firms, trust and visibility win contracts. We build websites that generate qualified leads, automate follow-up, and keep your pipeline full year-round.',
    stats: [
      { value: '120%', label: 'ROI in 90 days' },
      { value: '18/mo', label: 'Qualified consultations booked' },
    ],
    mockUrl: 'grouproomgold.com',
    preview: '/mockups/mock-lead-generation.jpg',
  },
  {
    category: '/AI Workflows',
    client: 'Mitrix IT',
    segment: 'IT & Cybersecurity',
    description:
      'For SaaS teams, speed is a competitive advantage. We build workflow automations that eliminate manual work, connect your tools, and multiply team output.',
    stats: [
      { value: '45%', label: 'Reduction in manual tasks' },
      { value: '1.6×', label: 'Faster team output' },
    ],
    mockUrl: 'mitrixit.com',
    preview: '/mockups/mock-ai-workflows.jpg',
  },
  {
    category: '/E-Commerce',
    client: 'Grandma Walker\'s',
    segment: 'Small Business',
    description:
      'For small businesses, your online presence is your storefront. We build beautiful e-commerce experiences that showcase your brand, drive sales, and turn visitors into loyal customers.',
    stats: [
      { value: '1.8×', label: 'Increase in online sales' },
      { value: '18%', label: 'Higher customer retention' },
    ],
    mockUrl: 'grandmawalkers.com',
    preview: '/mockups/mock-ecommerce.jpg',
  },
] as const;

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// ─── Browser mockup ────────────────────────────────────────────────────────────

const BrowserMockup = ({ entry }: { entry: (typeof entries)[number] }) => (
  <div className="relative mx-auto w-full max-w-[280px] sm:max-w-xs mt-6">
    {/* Browser frame */}
    <div className="bg-[#f1f3f5] rounded-xl overflow-hidden shadow-2xl border border-black/8">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#e8eaed] border-b border-black/8">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-white rounded-md px-2 py-0.5 flex items-center gap-1.5 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
          <span className="text-[9px] text-muted-foreground truncate">{entry.mockUrl}</span>
        </div>
      </div>
      {/* Screenshot — above-the-fold crop */}
      <div className="h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden">
        <img
          src={entry.preview}
          alt={`${entry.client} website preview`}
          className="w-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
    {/* Shadow beneath */}
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-foreground/10 blur-xl rounded-full" />
  </div>
);

// ─── Services Section ──────────────────────────────────────────────────────────

export const ServicesSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeEntry = entries[activeIdx];

  return (
    <section className="section-padding bg-white border-t border-border/40">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-8 block">Case Studies</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mb-10"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
                  For{' '}
                  <span className="text-primary underline decoration-primary/40 decoration-2 underline-offset-4">
                    {activeEntry.segment}
                  </span>
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {activeEntry.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-border/30">
              {entries.map((entry, i) => {
                const isActive = i === activeIdx;
                return (
                  <div
                    key={entry.client}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${entry.client} — ${entry.segment}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveIdx(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveIdx(i)}
                    className="border-b border-border/30 cursor-pointer"
                  >
                    <div className="relative flex items-center gap-2 py-4 pr-1 group">
                      <span className="text-[11px] font-mono text-muted-foreground/60 shrink-0">
                        {entry.category}
                      </span>
                      <span className="text-muted-foreground/30 shrink-0">|</span>
                      <span
                        className={`text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground'
                          }`}
                      >
                        {entry.client}
                      </span>
                      <BoxArrowUpRight
                        className={`ml-auto w-3.5 h-3.5 shrink-0 transition-all duration-200 ${isActive
                          ? 'text-primary opacity-100'
                          : 'text-muted-foreground/40 opacity-0 group-hover:opacity-100'
                          }`}
                      />
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {/* Stat rows */}
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                  Projected outcomes
                </p>
                <div className="space-y-0">
                  {activeEntry.stats.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="py-5 flex items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-black text-primary leading-none">
                          {stat.value}
                        </span>
                        <span className="text-foreground font-bold text-sm">—</span>
                        <span className="text-foreground font-semibold text-sm leading-snug">
                          {stat.label}
                        </span>
                      </div>
                      {i < activeEntry.stats.length - 1 && (
                        <div className="h-px bg-primary/15" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Browser mockup */}
                <BrowserMockup entry={activeEntry} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
