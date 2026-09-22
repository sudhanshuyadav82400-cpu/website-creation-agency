interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  isFooter?: boolean;
}

export default function Logo({ className = '', variant = 'dark', isFooter = false }: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Original Geometric Agency Symbol */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-sm shadow-blue-500/10">
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[11px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          
          {/* Modern vector geometry: Monogram W + C + Digital Browser Canvas */}
          <svg
            className="w-5 h-5 text-blue-600 relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer browser/viewport frame */}
            <rect x="3" y="3" width="18" height="18" rx="3.5" stroke="url(#logo-grad)" />
            {/* Top browser bar dot/indicator */}
            <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
            <line x1="10" y1="7" x2="10.01" y2="7" strokeWidth="2.5" />
            {/* Dynamic Web Creation 'W' & 'C' geometry */}
            <path d="M7 11.5L9.5 17L12 12.5L14.5 17L17 11.5" stroke="url(#logo-grad)" strokeWidth="2" />
            <defs>
              <linearGradient id="logo-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`text-base font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          Website Creation Agency
        </span>
        {!isFooter && (
          <span className="text-[10px] font-semibold tracking-widest text-indigo-600 uppercase">
            Web Studio
          </span>
        )}
      </div>
    </div>
  );
}
