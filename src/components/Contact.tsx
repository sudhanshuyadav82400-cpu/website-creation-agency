import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { ContactFormData } from '../types';

export default function Contact() {
  const agencyEmail = 'sudhanshuyadav82400@gmail.com';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    businessName: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your Name, Email, and Message.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        throw new Error(result?.error || 'Failed to send your message. Please try again.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(err.message || 'Unable to deliver message. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      businessName: '',
      message: '',
    });
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Agency Info (Email Only) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
                Email Only Agency
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Let's Build Your Website
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Ready to take your business online or modernize your existing site? Reach out directly via our email channel or send a message using the form.
              </p>

              {/* Agency Direct Contact Box */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 mb-8 space-y-5">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Agency
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">
                    Website Creation Agency
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Direct Email Contact
                  </div>
                  <a
                    href={`mailto:${agencyEmail}`}
                    className="inline-flex items-center gap-2.5 text-base font-bold text-blue-600 hover:text-blue-700 break-all transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>{agencyEmail}</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Average response time: within 24 business hours</span>
                  </div>
                </div>
              </div>

              {/* Strict email-only policy note */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 leading-relaxed">
                <strong>Communication Policy:</strong> To keep all requirements, milestones, revisions, and deliverable records clear and auditable, our team communicates strictly through email.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-slate-100/60">
            {status === 'success' ? (
              <div className="text-center py-8 px-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Your Message Has Been Sent 🎉
                </h3>
                <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for contacting Website Creation Agency. We have received your message and will get back to you through email.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  <span>Send Another Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fields marked with <span className="text-rose-500">*</span> are required.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage || 'An error occurred. Please verify your fields.'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-2">
                      Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-2">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@business.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="contact-business" className="block text-xs font-semibold text-slate-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="contact-business"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Health Clinic"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-2">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about what you want to build or any specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    id="contact-submit-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message →</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
