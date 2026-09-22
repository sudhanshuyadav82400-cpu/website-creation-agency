import { DemoProject } from '../types';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import ProjectCardImage from './ProjectCardImage';

interface ProjectModalProps {
  project: DemoProject | null;
  onClose: () => void;
  onRequestSimilar: (category: string) => void;
}

export default function ProjectModal({ project, onClose, onRequestSimilar }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 rounded-full">
              {project.badge}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {project.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Summary */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              {project.title}
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <ProjectCardImage
              src={project.imageUrl}
              alt={project.imageAlt}
              title={project.title}
              category={project.category}
              accentColor={project.accentColor}
            />

            {/* Spec Sheet & Architectural Breakdown */}
            <div className="bg-slate-900 p-6 text-white border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
                    {project.category} Design Specification
                  </div>
                  <div className="text-lg font-bold text-white">
                    {project.title}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="px-2.5 py-1 bg-slate-800/90 rounded-lg text-center border border-slate-700">
                      <div className="text-[10px] text-slate-400">{h.label}</div>
                      <div className="text-xs font-bold text-blue-300">{h.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Visual Layout Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-xs font-semibold text-slate-300 mb-2">Key Highlights</div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-300 mb-2">Technology Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span>Performance: Fast Load</span>
                    <span className="text-emerald-400 font-semibold">99/100 Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              * This is an authentic demo prototype created to illustrate design quality and user experience standards.
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestSimilar(project.category);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Build a Website Like This</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
