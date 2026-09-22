import { PROCESS_STEPS } from '../data';
import { MessageSquareText, Compass, Code2, Rocket, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onStartProcess: () => void;
}

export default function Process({ onStartProcess }: ProcessProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6 text-blue-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-indigo-600" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-purple-600" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-blue-600" />;
      default:
        return <MessageSquareText className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple Process. Professional Results.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A clear, straightforward collaborative workflow ensuring your project stays on schedule, looks exceptional, and meets all your business objectives.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              id={`process-step-${idx + 1}`}
              className="relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Step indicator tag & icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-mono">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50/80 flex items-center justify-center border border-slate-100 transition-colors">
                    {getIcon(step.icon)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Phase {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50 border border-blue-100 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Ready to begin your project plan?
              </h4>
              <p className="text-sm text-slate-600">
                It only takes 2 minutes to fill out our quick website questionnaire.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartProcess}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Start Phase 01 Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
