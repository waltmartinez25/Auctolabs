import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StickyMobileCTA } from './StickyMobileCTA';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { trackPageView } from '@/lib/analytics';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <ChatWidget />
    </div>
  );
};
