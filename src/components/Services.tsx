import { SERVICES } from '../data';
import { Building2, Rocket, ShoppingBag, Smartphone, RefreshCw, Cpu, ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-indigo-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-purple-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-indigo-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-600" />;
      default:
        return <Building2 className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Our Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything You Need to Build Your Online Presence
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Tailored digital solutions engineered to elevate brand credibility, convert visitors, and deliver smooth performance on every screen.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${index + 1}`}
              className="group relative flex flex-col justify-between bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-200/80 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Icon Container with subtle gradient hover */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 group-hover:bg-gradient-to-tr group-hover:from-blue-50 group-hover:to-purple-50 flex items-center justify-center mb-6 transition-colors border border-slate-100">
                  {getIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature checklist */}
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-blue-600" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-indigo-600 transition-colors py-1 cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
