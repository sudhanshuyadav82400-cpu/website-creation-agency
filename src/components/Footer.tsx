import Logo from './Logo';
import { Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  const agencyEmail = 'sudhanshuyadav82400@gmail.com';

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1: Agency Brand & Mission */}
          <div className="md:col-span-6 flex flex-col items-start space-y-4">
            <Logo variant="light" isFooter={true} />
            
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Professional websites built for businesses that want to grow online.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`mailto:${agencyEmail}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{agencyEmail}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Project Start */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Start Your Website
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Fill out our structured website questionnaire to receive an accurate timeline and proposal.
              </p>
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Get a Free Quote</span>
              </button>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Website Creation Agency. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Email Only Agency</span>
            <span>•</span>
            <span className="font-mono">{agencyEmail}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
