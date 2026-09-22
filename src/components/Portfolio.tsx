import { useState } from 'react';
import { DEMO_PROJECTS } from '../data';
import { DemoProject } from '../types';
import { ArrowRight, Check, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal';
import ProjectCardImage from './ProjectCardImage';

interface PortfolioProps {
  onRequestQuote: (websiteType?: string) => void;
}

export default function Portfolio({ onRequestQuote }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<DemoProject | null>(null);

  const categories = [
    'All',
    'Business Website',
    'Restaurant Website',
    'Dental Clinic Website',
    'E-commerce Website',
    'Service Business Website',
    'Modern Landing Page',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? DEMO_PROJECTS
    : DEMO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-24 bg-slate-50/70 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold tracking-wider uppercase mb-4">
            Recent Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Featured Portfolio & Demo Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore our curated showcase of sample projects across various industries. Every project is crafted with modern design standards, fast load speeds, and clean responsiveness.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* 1. Large Professional Project Image at the top */}
              <div className="relative overflow-hidden bg-slate-900">
                <ProjectCardImage
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  title={project.title}
                  category={project.category}
                  accentColor={project.accentColor}
                  priority={idx < 2}
                />
                {/* Floating Demo Project Badge */}
                <div className="absolute top-9 left-3 z-20">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider shadow-sm">
                    {project.badge}
                  </span>
                </div>
              </div>

              {/* 2. Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category Tag */}
                  <div className="mb-2">
                    <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Performance Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[10px] text-slate-500">{h.label}</div>
                        <div className="text-xs font-bold text-slate-900">{h.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Key Features List */}
                  <div className="space-y-1.5 mb-5">
                    {project.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions: View Project & Inquire */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group-hover:underline"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestQuote(project.category)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-slate-100"
                  >
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Authenticity */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          All showcase items are authentic demonstration designs engineered by Website Creation Agency. We do not display fabricated customer testimonials or unauthorized company logos.
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onRequestSimilar={(category) => {
            setActiveProject(null);
            onRequestQuote(category);
          }}
        />
      )}
    </section>
  );
}
