import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuestionnaireModal from './components/QuestionnaireModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteInitialType, setQuoteInitialType] = useState<string | undefined>(undefined);
  const [quoteInitialPlan, setQuoteInitialPlan] = useState<string | undefined>(undefined);

  const handleOpenQuote = (type?: string, plan?: string) => {
    setQuoteInitialType(type);
    setQuoteInitialPlan(plan);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setQuoteInitialType(undefined);
    setQuoteInitialPlan(undefined);
  };

  const handleViewWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onViewWork={handleViewWork}
        />

        {/* 2. Services Section */}
        <Services
          onSelectService={(serviceTitle) => handleOpenQuote(serviceTitle)}
        />

        {/* 3. Portfolio & Demo Projects */}
        <Portfolio
          onRequestQuote={(websiteType) => handleOpenQuote(websiteType)}
        />

        {/* 4. Process Section */}
        <Process
          onStartProcess={() => handleOpenQuote()}
        />

        {/* 5. Pricing Section (Fixed INR) */}
        <Pricing
          onSelectPlan={(planName) => handleOpenQuote(undefined, planName)}
        />

        {/* 6. Contact Section (Email-only) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* 4-Step Questionnaire Modal: "Create Your Website Plan" */}
      <QuestionnaireModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        initialType={quoteInitialType}
        initialPlan={quoteInitialPlan}
      />
    </div>
  );
}
