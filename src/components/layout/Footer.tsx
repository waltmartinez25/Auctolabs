import { Link } from 'react-router-dom';
import { ArrowUpRight, Envelope } from 'react-bootstrap-icons';
import logo from '@/assets/AuctoLabs_Logo_transparent.png';

const footerLinks = {
  services: [
    { name: 'Web Design', href: '/services' },
    { name: 'AI Automations', href: '/services' },
    { name: 'Lead Generation', href: '/services' },
    { name: 'Performance Systems', href: '/services' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'Process', href: '/process' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

// slug = Simple Icons identifier; bg = brand color for the icon box
// Email uses a BSI icon since it's not a third-party brand
const socialLinks = [
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/company/auctolabs', slug: 'linkedin',  bg: '#0A66C2' },
  { name: 'X',         href: 'https://x.com/AuctoLabs',                    slug: 'x',         bg: '#000000' },
  { name: 'Instagram', href: 'https://www.instagram.com/auctolabs',        slug: 'instagram', bg: '#E4405F' },
  { name: 'Email',     href: 'mailto:contact@auctolabs.com',                 slug: null,        bg: null      },
] as const;

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom section-padding">

        {/* Main grid: Brand (2 cols) + Services + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column — spans 2 on lg */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="AuctoLabs" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
              AuctoLabs builds intelligent websites and automation systems designed to attract the right people, convert them into clients, and scale with your business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  style={social.bg ? { backgroundColor: social.bg } : undefined}
                  className={`p-2.5 rounded-xl border transition-all ${
                    social.bg
                      ? 'border-transparent hover:opacity-80'
                      : 'bg-background border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  {social.slug ? (
                    <img
                      src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${social.slug}.svg`}
                      alt={social.name}
                      className="h-4 w-4"
                      draggable={false}
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  ) : (
                    <Envelope className="h-4 w-4 text-muted-foreground" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group text-sm"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group text-sm"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SEO paragraph — read by search engines */}
        <p className="mt-12 text-xs text-muted-foreground/60 leading-relaxed max-w-3xl">
          AuctoLabs specializes in AI-powered website development, automated lead generation systems,
          and automation infrastructure designed to help service businesses convert more visitors
          into clients. From conversion-focused websites to AI automation systems — we build
          the complete growth infrastructure your business needs.
        </p>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AuctoLabs. Websites engineered for growth.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
