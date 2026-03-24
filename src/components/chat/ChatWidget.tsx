import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatDots, XLg, Robot, Calendar3 } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { chatSteps, getTierRecommendation, type TierResult } from './chatFlow';
import { analytics, trackEvent } from '@/lib/analytics';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
}

interface Answers {
  industry: string;
  challenge: string;
  volume: string;
  budget: string;
}

const CALENDLY_URL = 'https://calendly.com/waltermartinez-auctolabs/30min';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'bot-0', from: 'bot', text: chatSteps[0].botMessage },
  ]);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [tier, setTier] = useState<TierResult | null>(null);
  const [savedLead, setSavedLead] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent('chat_open');
  };

  const handleSelect = (optionLabel: string, optionValue: string) => {
    const answerKeys: (keyof Answers)[] = ['industry', 'challenge', 'volume', 'budget'];
    const key = answerKeys[step];
    const newAnswers = { ...answers, [key]: optionValue };
    setAnswers(newAnswers);

    // Add user bubble
    const userMsg: Message = { id: `user-${step}`, from: 'user', text: optionLabel };
    setMessages((prev) => [...prev, userMsg]);

    const nextStep = step + 1;

    if (nextStep < chatSteps.length) {
      // Show typing indicator then next bot message
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: `bot-${nextStep}`, from: 'bot', text: chatSteps[nextStep].botMessage },
        ]);
        setStep(nextStep);
      }, 700);
    } else {
      // Final step — compute recommendation
      const result = getTierRecommendation(
        newAnswers.volume ?? '',
        newAnswers.budget ?? ''
      );
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot-result',
            from: 'bot',
            text: `Based on your answers, the **${result.name}** looks like a great fit. ${result.description}`,
          },
        ]);
        setTier(result);
        setStep(nextStep);
        // Save lead to Supabase
        saveLead(newAnswers as Answers, result.name);
      }, 900);
    }
  };

  const saveLead = async (a: Answers, tierName: string) => {
    if (savedLead) return;
    setSavedLead(true);
    try {
      await supabase.from('form_submissions').insert({
        first_name: 'Chat Lead',
        last_name: '',
        email: '',
        message: `Industry: ${a.industry} | Challenge: ${a.challenge} | Volume: ${a.volume} | Budget: ${a.budget} | Recommended: ${tierName}`,
      });
    } catch {
      // Silent fail — lead capture is secondary to UX
    }
  };

  const isDone = step >= chatSteps.length;

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-4 lg:bottom-28 lg:right-8 z-40 w-80 max-h-[520px] flex flex-col rounded-2xl shadow-2xl border border-border/60 bg-background/98 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-primary/5 border-b border-border/40 shrink-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Robot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground leading-none mb-0.5">AuctoLabs Assistant</p>
                <p className="text-xs text-primary font-medium">● Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-border/40 transition-colors text-muted-foreground"
                aria-label="Close chat"
              >
                <XLg className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Robot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.from === 'bot'
                        ? 'bg-secondary/50 text-foreground rounded-2xl rounded-tl-sm'
                        : 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm font-medium'
                    }`}
                  >
                    {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Robot className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-3.5 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Options or Final CTA */}
            <div className="shrink-0 px-4 pb-4 space-y-2 border-t border-border/30 pt-3">
              {!isDone && !isTyping && step < chatSteps.length && (
                <div className="flex flex-wrap gap-2">
                  {chatSteps[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.label, opt.value)}
                      className="px-3 py-1.5 rounded-xl border border-border bg-background hover:border-primary/40 hover:bg-primary/5 text-xs font-medium text-foreground transition-all cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {isDone && tier && !isTyping && (
                <div className="space-y-2">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 px-3 py-2.5">
                    <p className="text-xs font-bold text-primary mb-0.5">{tier.name} — {tier.price}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{tier.description}</p>
                  </div>
                  <Button asChild variant="hero" size="sm" className="w-full">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.calendlyOpen('chatbot')}
                    >
                      <Calendar3 className="mr-1.5 w-3.5 h-3.5" />
                      Book a Free Strategy Call
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
        style={{ display: isOpen ? 'none' : 'flex' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <ChatDots className="w-6 h-6" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      </motion.button>
    </>
  );
};
