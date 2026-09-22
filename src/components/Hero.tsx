import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  RefreshCw,
  TrendingUp,
  Shield,
  Layers,
  Star,
  Monitor,
  Smartphone,
} from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onViewWork: () => void;
}

export default function Hero({ onOpenQuote, onViewWork }: HeroProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white"
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/4 -z-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Tagline: WEB STUDIO */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>WEB STUDIO</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Professional Websites.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Built for Your Business.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Modern, fast and mobile-friendly websites designed to give your business a strong online presence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                id="hero-primary-quote-btn"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                id="hero-secondary-work-btn"
                onClick={onViewWork}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-200 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View Our Work</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Mobile-First Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Search Engine Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Ultra Fast Performance</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Browser-Style Website Mockup */}
          <div className="lg:col-span-6 xl:col-span-6 w-full relative">
            
            {/* Floating Metric 1: Top-Right */}
            <div className="absolute -top-4 right-2 sm:right-6 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Google PageSpeed</div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">99 / 100 Performance</div>
              </div>
            </div>

            {/* Floating Metric 2: Bottom-Left */}
            <div className="absolute -bottom-4 left-2 sm:left-4 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Architecture</div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900">100% Mobile Ready</div>
              </div>
            </div>

            {/* The Main Realistic Browser Frame */}
            <div className="relative w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-300/60 overflow-hidden">
              
              {/* 1. Browser Window Top Bar */}
              <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
                {/* 3 Window Control Dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 border border-rose-600/30" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-600/30" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-600/30" />
                </div>

                {/* Browser URL Search Bar */}
                <div className="flex-1 max-w-[280px] sm:max-w-xs mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/90 text-[11px] text-slate-600 font-mono shadow-2xs">
                  <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">https://apex-advisory.com</span>
                  <RefreshCw className="w-2.5 h-2.5 text-slate-400 ml-auto shrink-0" />
                </div>

                {/* Device Viewport Mode Toggle */}
                <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveDevice('desktop')}
                    className={`p-1 rounded transition-colors ${
                      activeDevice === 'desktop'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDevice('mobile')}
                    className={`p-1 rounded transition-colors ${
                      activeDevice === 'mobile'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Realistic Website Content Canvas */}
              <div className="bg-slate-50/50 p-4 sm:p-5 select-none min-h-[420px] flex flex-col justify-between">
                
                {activeDevice === 'desktop' ? (
                  /* ================= DESKTOP WEBSITE SIMULATION ================= */
                  <div className="space-y-4">
                    {/* Website Navbar */}
                    <div className="bg-white rounded-xl px-4 py-2.5 border border-slate-200/70 shadow-xs flex items-center justify-between">
                      {/* Logo */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-xs">
                          A
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                          Apex Advisory
                        </span>
                      </div>

                      {/* Nav Links */}
                      <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-slate-600">
                        <span className="text-blue-600 font-semibold">Services</span>
                        <span>Case Studies</span>
                        <span>About</span>
                        <span>Insights</span>
                      </div>

                      {/* Header CTA Button */}
                      <div className="flex items-center">
                        <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold shadow-xs">
                          Book Call
                        </span>
                      </div>
                    </div>

                    {/* Website Hero Banner */}
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-inner">
                      {/* Subtle Glow */}
                      <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10 max-w-sm space-y-2.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-semibold uppercase tracking-wider">
                          <Sparkles className="w-2.5 h-2.5" />
                          Modern Corporate Web
                        </span>

                        <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                          Accelerating Enterprise Growth Through Modern Design.
                        </h2>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          We engineer lightning-fast digital experiences that turn visitors into long-term clients.
                        </p>

                        <div className="pt-2 flex items-center gap-2.5">
                          <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-md cursor-default">
                            Get Consultation
                          </span>
                          <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white text-[11px] font-medium border border-white/15">
                            Our Solutions
                          </span>
                        </div>
                      </div>

                      {/* Stat Ribbon */}
                      <div className="relative z-10 mt-5 pt-3.5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-xs sm:text-sm font-black text-white">99.8%</div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wide">Client Rating</div>
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black text-blue-300">0.8s</div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wide">Fast Load</div>
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-black text-emerald-400">120+</div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wide">Projects Done</div>
                        </div>
                      </div>
                    </div>

                    {/* Website 3 Feature Cards */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">SEO Strategy</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Rank on page one</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5">
                          <Shield className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">High Security</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">SSL & enterprise safe</div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">Responsive</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Fits all devices</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= MOBILE WEBSITE SIMULATION ================= */
                  <div className="max-w-[280px] mx-auto bg-white p-3.5 rounded-3xl border-4 border-slate-800 shadow-xl space-y-3">
                    {/* Mobile Speaker / Camera Notch */}
                    <div className="w-16 h-3.5 bg-slate-800 rounded-full mx-auto mb-2" />

                    {/* Mobile Nav */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                          A
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">Apex Advisory</span>
                      </div>
                      <div className="space-y-1">
                        <div className="w-4 h-0.5 bg-slate-700 rounded" />
                        <div className="w-4 h-0.5 bg-slate-700 rounded" />
                      </div>
                    </div>

                    {/* Mobile Hero */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-4 rounded-2xl text-white space-y-2">
                      <span className="text-[9px] uppercase font-bold text-blue-400">Business Web</span>
                      <div className="text-xs font-extrabold leading-snug">
                        Accelerate Growth with Fast Web Design.
                      </div>
                      <div className="h-6 w-full bg-blue-600 rounded-lg flex items-center justify-center text-[10px] font-bold">
                        Schedule Call
                      </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <div className="text-[10px] font-bold text-slate-800">SEO & Lead Generation</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <div className="text-[10px] font-bold text-slate-800">Ultra-fast Mobile Loading</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Browser Inner Footer Tag */}
                <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>Real-world Agency Architecture</span>
                  </span>
                  <span className="text-emerald-600 font-semibold">● Production Ready</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
