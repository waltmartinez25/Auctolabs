import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PlanLevel = 'starter' | 'pro' | 'all' | string;

export interface PricingFeature {
  name: string;
  included: PlanLevel | null;
}

export interface PricingPlan {
  name: string;
  level: PlanLevel;
  price: {
    monthly: number; // one-time project price
    yearly: number;  // monthly retainer price
  };
  popular?: boolean;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: PricingFeature[];
  plans: PricingPlan[];
  onPlanSelect?: (plan: PlanLevel) => void;
  defaultPlan?: PlanLevel;
  defaultInterval?: 'monthly' | 'yearly';
  containerClassName?: string;
  buttonClassName?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shouldShowCheck(included: PricingFeature['included'], level: string): boolean {
  if (included === 'all' && level === 'all') return true;
  if (included === 'pro' && (level === 'pro' || level === 'all')) return true;
  if (included === 'starter' && (level === 'starter' || level === 'pro' || level === 'all')) return true;
  return false;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingTable({
  features,
  plans,
  onPlanSelect,
  defaultPlan = 'pro',
  defaultInterval = 'monthly',
  className,
  containerClassName,
  buttonClassName,
  ...props
}: PricingTableProps) {
  const [isRetainer, setIsRetainer] = React.useState(defaultInterval === 'yearly');
  const [selectedPlan, setSelectedPlan] = React.useState<PlanLevel>(defaultPlan);

  const handlePlanSelect = (plan: PlanLevel) => {
    setSelectedPlan(plan);
    onPlanSelect?.(plan);
  };

  return (
    <div
      className={cn('w-full max-w-3xl mx-auto px-4', containerClassName, className)}
      {...props}
    >
      {/* Toggle: Project vs +Retainer */}
      <div className="flex justify-end mb-4 sm:mb-8">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-secondary/50 border border-border/40 text-xs">
          <button
            type="button"
            aria-pressed={!isRetainer}
            onClick={() => setIsRetainer(false)}
            className={cn(
              'px-4 py-1.5 rounded-lg transition-all duration-200 font-semibold cursor-pointer',
              !isRetainer
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Project
          </button>
          <button
            type="button"
            aria-pressed={isRetainer}
            onClick={() => setIsRetainer(true)}
            className={cn(
              'px-4 py-1.5 rounded-lg transition-all duration-200 font-semibold cursor-pointer',
              isRetainer
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            + Retainer
          </button>
        </div>
      </div>

      {/* Plan selector cards */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {plans.map((plan) => (
          <button
            key={plan.name}
            type="button"
            aria-pressed={selectedPlan === plan.level}
            aria-label={`Select ${plan.name} plan`}
            onClick={() => handlePlanSelect(plan.level)}
            className={cn(
              'flex-1 p-5 rounded-2xl text-left transition-all duration-200 border cursor-pointer',
              selectedPlan === plan.level
                ? 'ring-2 ring-primary border-primary/30 bg-primary/5'
                : 'border-border/50 bg-white hover:border-primary/30',
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{plan.name}</span>
              {plan.popular && (
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <NumberFlow
                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}
                value={isRetainer ? plan.price.yearly : plan.price.monthly}
                className="text-2xl font-black text-foreground"
              />
              <span className="text-sm text-muted-foreground font-medium">
                {isRetainer ? '/mo' : ' one-time'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Features table */}
      <div className="border border-border/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[560px] divide-y divide-border/30">
            {/* Table header */}
            <div className="flex items-center px-5 py-4 bg-secondary/30">
              <div className="flex-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Features
              </div>
              <div className="flex items-center gap-6 text-xs">
                {plans.map((plan) => (
                  <div
                    key={plan.level}
                    className={cn(
                      'w-16 text-center font-bold uppercase tracking-wider text-xs',
                      plan.level === selectedPlan ? 'text-primary' : 'text-muted-foreground/60',
                    )}
                  >
                    {plan.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Feature rows */}
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className={cn(
                  'flex items-center px-5 py-3.5 transition-colors',
                  feature.included === selectedPlan
                    ? 'bg-primary/5'
                    : index % 2 === 0 ? 'bg-white' : 'bg-secondary/10',
                )}
              >
                <div className="flex-1 text-sm text-foreground font-medium">{feature.name}</div>
                <div className="flex items-center gap-6">
                  {plans.map((plan) => (
                    <div key={plan.level} className="w-16 flex justify-center">
                      {shouldShowCheck(feature.included, plan.level) ? (
                        <span
                          className={cn(
                            'text-base font-medium leading-none select-none',
                            plan.level === selectedPlan ? 'text-primary' : 'text-primary/40',
                          )}
                        >
                          ✓
                        </span>
                      ) : (
                        <span className="text-border/60 text-base leading-none select-none">—</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <Button
          asChild
          className={cn('px-10 py-5 text-base font-bold rounded-xl', buttonClassName)}
        >
          <Link to="/contact">
            Start Building Your Growth System
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
