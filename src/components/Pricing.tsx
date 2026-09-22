import { PRICING_PLANS } from '../data';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Clear, Predictable Investment Plans
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Fixed Indian Rupee pricing with no hidden charges or surprise renewal fees. Choose the tier that matches your current business stage.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              id={`pricing-card-${plan.name.toLowerCase()}`}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 lg:-translate-y-2'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Badge for Most Popular */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold tracking-wide uppercase shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                {/* Plan Name & Tagline */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                </div>

                <p className="text-sm text-slate-600 mb-6 min-h-[40px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 mt-1 block">
                    {plan.price === 'Custom Quote' ? 'Tailored to project specifications' : 'One-time investment • Indian Rupees'}
                  </span>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Included Features:
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        plan.highlighted ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan Action CTA */}
              <div>
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fixed milestone-based agreements</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Full project code delivery upon launch</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Transparent communication via email</span>
          </div>
        </div>

      </div>
    </section>
  );
}
