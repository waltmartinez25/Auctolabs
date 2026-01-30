import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className, showText = false, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 100 80"
        className={cn(sizeClasses[size], 'w-auto')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* A Letter - Left side */}
        <path
          d="M10 70 L35 10 L50 45 L40 45 L35 35 L25 35 L20 45 L10 70"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-foreground"
        />
        <path
          d="M35 10 L60 70"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-foreground"
        />
        
        {/* L Letter - Right side */}
        <path
          d="M55 15 L55 65 L85 65"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-foreground"
        />
        
        {/* Circuit lines inside A */}
        <path
          d="M20 55 L25 55 L25 50 L30 50"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          className="opacity-80"
        />
        <path
          d="M35 30 L35 40 L45 40"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          className="opacity-80"
        />
        <path
          d="M22 62 L28 62 L28 58"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          className="opacity-80"
        />
        
        {/* Circuit lines from L */}
        <path
          d="M60 25 L60 35 L70 35 L70 45"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          className="opacity-80"
        />
        <path
          d="M75 55 L75 60 L80 60"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          fill="none"
          className="opacity-80"
        />
        
        {/* Glowing nodes */}
        <circle cx="70" cy="45" r="3" className="fill-primary" />
        <circle cx="70" cy="45" r="5" className="fill-primary opacity-30" />
        
        <circle cx="75" cy="32" r="2.5" className="fill-primary" />
        <circle cx="75" cy="32" r="4" className="fill-primary opacity-30" />
        
        <circle cx="82" cy="38" r="2" className="fill-primary" />
        <circle cx="82" cy="38" r="3.5" className="fill-primary opacity-30" />
        
        {/* Additional circuit details on L */}
        <path
          d="M65 50 L72 50"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          className="opacity-60"
        />
        <rect x="72" y="48" width="4" height="4" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" className="opacity-60" />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider text-foreground">AUCTO LABS</span>
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Automated Client-Generating Machines</span>
        </div>
      )}
    </div>
  );
};
