import { useState } from 'react';
import { QuestionnaireFormData } from '../types';
import { QUESTIONNAIRE_OPTIONS } from '../data';
import { X, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Sparkles, Building2, Globe, LayoutList, CalendarCheck } from 'lucide-react';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
  initialPlan?: string;
}

export default function QuestionnaireModal({
  isOpen,
  onClose,
  initialType,
  initialPlan,
}: QuestionnaireModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [formData, setFormData] = useState<QuestionnaireFormData>({
    clientName: '',
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    city: '',
    stateProvince: '',
    country: 'India',
    zipPostalCode: '',
    currentWebsite: '',
    socialMediaLinks: '',
    businessDescription: '',
    websiteType: initialType || 'Business Website',
    numberOfPages: initialPlan === 'Starter' ? '4–5' : initialPlan === 'Business' ? '6–10' : '4–5',
    requiredFeatures: ['Contact Form', 'Social Media Integration'],
    estimatedBudget: initialPlan === 'Starter' ? '₹10,000 – ₹15,000' : initialPlan === 'Business' ? '₹15,000 – ₹20,000' : '₹15,000 – ₹20,000',
    targetLaunchSchedule: '1–2 Weeks',
    projectDescription: initialPlan ? `I am interested in the ${initialPlan} website package.` : '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.requiredFeatures.includes(feature);
      if (exists) {
        return {
          ...prev,
          requiredFeatures: prev.requiredFeatures.filter((f) => f !== feature),
        };
      } else {
        return {
          ...prev,
          requiredFeatures: [...prev.requiredFeatures, feature],
        };
      }
    });
  };

  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      if (!formData.businessName.trim()) {
        setErrorMessage('Please enter your Business Name.');
        return false;
      }
      if (!formData.businessEmail.trim()) {
        setErrorMessage('Please enter your Business Email.');
        return false;
      }
      // Simple email check
      if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
        setErrorMessage('Please provide a valid email address.');
        return false;
      }
      return true;
    }
    if (step === 4) {
      if (!formData.projectDescription.trim()) {
        setErrorMessage('Please describe your project or requirements.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        const failureMessage =
          result?.error ||
          result?.detail ||
          'Failed to send website request. Please verify your email configuration or try again.';
        throw new Error(failureMessage);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting questionnaire:', err);
      setErrorMessage(err.message || 'Unable to deliver website request email. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
                Website Creation Agency
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Create Your Website Plan
            </h2>
          </div>
          <button
            type="button"
            onClick={resetModal}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close Questionnaire"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Indicators (When not success) */}
        {!isSuccess && (
          <div className="px-6 pt-4 pb-3 bg-slate-50 border-b border-slate-200/80 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span className="flex items-center gap-1.5 text-blue-600">
                {currentStep === 1 && <Building2 className="w-3.5 h-3.5" />}
                {currentStep === 2 && <Globe className="w-3.5 h-3.5" />}
                {currentStep === 3 && <LayoutList className="w-3.5 h-3.5" />}
                {currentStep === 4 && <CalendarCheck className="w-3.5 h-3.5" />}
                <span>
                  {currentStep === 1 && 'Step 1: Business Details'}
                  {currentStep === 2 && 'Step 2: Online Presence'}
                  {currentStep === 3 && 'Step 3: Website Requirements'}
                  {currentStep === 4 && 'Step 4: Final Details'}
                </span>
              </span>
              <span className="font-mono text-slate-500">Step {currentStep} of 4</span>
            </div>

            {/* Segmented Progress Track */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            /* Success View */
            <div className="py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Your Website Request Has Been Received 🎉
              </h3>
              <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed mb-6">
                Thank you for choosing Website Creation Agency. We have received your requirements and will contact you through the email address you provided.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-slate-500 mb-8">
                <strong>Notification Destination:</strong> All details have been logged and routed to the agency review queue at <span className="font-mono font-semibold text-slate-700">sudhanshuyadav82400@gmail.com</span>.
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: BUSINESS DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 1 — Business Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Provide your primary business identity and location information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Client / Contact Name
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Business Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Health Clinic"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      required
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. contact@yourbusiness.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      All proposal drafts and correspondence will be delivered strictly to this email.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Suite 402, MG Road Commercial Center"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Bengaluru"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">State/Province</label>
                      <input
                        type="text"
                        name="stateProvince"
                        value={formData.stateProvince}
                        onChange={handleInputChange}
                        placeholder="e.g. Karnataka"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="e.g. India"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">ZIP/Postal Code</label>
                      <input
                        type="text"
                        name="zipPostalCode"
                        value={formData.zipPostalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 560001"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: ONLINE PRESENCE */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 2 — Online Presence
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tell us about your current digital footprint and company story.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Website (if existing)
                    </label>
                    <input
                      type="url"
                      name="currentWebsite"
                      value={formData.currentWebsite}
                      onChange={handleInputChange}
                      placeholder="https://yourdomain.com (or leave blank if brand new)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Social Media Links
                    </label>
                    <input
                      type="text"
                      name="socialMediaLinks"
                      value={formData.socialMediaLinks}
                      onChange={handleInputChange}
                      placeholder="e.g. LinkedIn, Instagram, X profiles"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Business Description / What does your business do?
                    </label>
                    <textarea
                      rows={4}
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      placeholder="Briefly describe what your business offers, who your primary customers are, and your main selling points..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-y"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: WEBSITE REQUIREMENTS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 3 — Website Requirements
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select your desired website format, scale, required features, and budget.
                    </p>
                  </div>

                  {/* Website Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Website Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {QUESTIONNAIRE_OPTIONS.websiteTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, websiteType: type }))}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                            formData.websiteType === type
                              ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of Pages */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Number of Pages
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {QUESTIONNAIRE_OPTIONS.numberOfPages.map((pages) => (
                        <button
                          key={pages}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, numberOfPages: pages }))}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                            formData.numberOfPages === pages
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {pages}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Required Features (Multi-select) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Required Features (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {QUESTIONNAIRE_OPTIONS.requiredFeatures.map((feat) => {
                        const selected = formData.requiredFeatures.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => handleFeatureToggle(feat)}
                            className={`p-2 rounded-xl text-xs font-medium border flex items-center justify-between transition-all cursor-pointer ${
                              selected
                                ? 'bg-blue-50 border-blue-600 text-blue-700'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{feat}</span>
                            {selected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Estimated Budget (INR ONLY) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Estimated Budget (Indian Rupees — INR Only)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {QUESTIONNAIRE_OPTIONS.estimatedBudgets.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, estimatedBudget: budget }))}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                            formData.estimatedBudget === budget
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: FINAL DETAILS */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Step 4 — Final Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select your target launch timeline and describe your website project goals.
                    </p>
                  </div>

                  {/* Target Launch Schedule */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Target Launch Schedule
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {QUESTIONNAIRE_OPTIONS.targetLaunchSchedules.map((schedule) => (
                        <button
                          key={schedule}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, targetLaunchSchedule: schedule }))}
                          className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                            formData.targetLaunchSchedule === schedule
                              ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {schedule}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Project Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={6}
                      name="projectDescription"
                      required
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Please provide any additional details, design styles you like, specific pages or sections you envision, and any deadlines..."
                      className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-y"
                    />
                  </div>

                  {/* Review Summary snippet */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <div><strong>Business:</strong> {formData.businessName} ({formData.businessEmail})</div>
                    <div><strong>Scope:</strong> {formData.websiteType} • {formData.numberOfPages} Pages • Budget: {formData.estimatedBudget}</div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold text-sm shadow-md active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Website Request</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
