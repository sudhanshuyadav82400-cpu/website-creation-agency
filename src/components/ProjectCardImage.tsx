import { useState } from 'react';
import { Globe, Layout, Sparkles } from 'lucide-react';

interface ProjectCardImageProps {
  src: string;
  alt: string;
  title: string;
  category: string;
  accentColor?: string;
  priority?: boolean;
}

export default function ProjectCardImage({
  src,
  alt,
  title,
  category,
  accentColor = '#2563eb',
  priority = false,
}: ProjectCardImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden group/img">
      {/* Mock Browser Top Header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-7 bg-slate-900/90 backdrop-blur-md px-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono tracking-tight bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 max-w-[170px] truncate">
          <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="truncate">{category.toLowerCase().replace(/\s+/g, '-')}.preview</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Main Image or Fallback */}
      {!hasError ? (
        <>
          {/* Subtle Skeleton Loader while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 pt-7 bg-slate-800 animate-pulse flex items-center justify-center">
              <div className="text-slate-500 text-xs flex items-center gap-2">
                <Layout className="w-4 h-4 animate-spin" />
                <span>Loading preview...</span>
              </div>
            </div>
          )}

          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full pt-7 object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Subtle gradient vignette at bottom to ground the image */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none z-10" />
        </>
      ) : (
        /* Professional Built-in Website Mockup Fallback (Never shows broken icon or blank) */
        <div className="w-full h-full pt-7 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 flex flex-col justify-between text-white relative overflow-hidden">
          <div
            className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-semibold tracking-wide uppercase border border-white/15">
              <Sparkles className="w-2.5 h-2.5 text-blue-400" />
              <span>{category}</span>
            </div>
            <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
              {title}
            </h4>
          </div>

          {/* Wireframe Mockup Lines */}
          <div className="relative z-10 space-y-1.5 pt-2">
            <div className="h-1.5 w-3/4 rounded bg-white/20" />
            <div className="h-1.5 w-1/2 rounded bg-white/15" />
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-16 rounded bg-blue-600/60 border border-blue-400/30" />
              <div className="h-5 w-16 rounded bg-white/10 border border-white/20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
