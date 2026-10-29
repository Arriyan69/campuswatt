import React from 'react';
import { useApp } from '../context/AppContext';
import { Video, X, Clock, CheckCircle2, Sparkles, Award } from 'lucide-react';

export default function PitchGuideModal() {
  const { isPitchModalOpen, setIsPitchModalOpen } = useApp();

  if (!isPitchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2-Minute IRENA Video Pitch Blueprint
              </h3>
              <p className="text-xs text-slate-400">
                Recommended teleprompter flow for Soban&apos;s presentation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Segment 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-amber-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 0:00 – 0:30: The Problem in Pakistan
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                Hook & Context
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;Hello IRENA! I&apos;m Soban from COMSATS University Islamabad. Pakistan faces acute energy shortages and sky-high institutional electricity tariffs exceeding Rs 50/kWh. Yet on university campuses, air conditioners, fans, and lights run for hours in completely empty lecture halls and labs. Meet <strong>CampusWatt</strong> — our data-driven solution.&rdquo;
            </p>
          </div>

          {/* Segment 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-cyan-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 0:30 – 1:00: Campus Waste Audit
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                Live Demo
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;Using CampusWatt, students and facilities managers can log campus rooms and appliances with presets like 1.5-ton ACs, fans, and desktop PCs. Our calculation engine instantly quantifies the damage: in our 8-room demo audit alone, we uncover thousands of wasted kWh and hundreds of thousands of Rupees lost every single month.&rdquo;
            </p>
          </div>

          {/* Segment 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-emerald-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 1:00 – 1:30: The Negawatt Rule & Solar Sizing
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Core Innovation
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;Instead of rushing to install expensive solar to power wasted energy, CampusWatt champions the IRENA principle: <em>First Negawatt, then Megawatt</em>. Motion sensors pay back in just weeks! Then, our solar recommendation sizes the rooftop PV system with a clean 3-year payback and 25 years of clean, free power.&rdquo;
            </p>
          </div>

          {/* Segment 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between font-bold text-purple-500 mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 1:30 – 2:00: National Scale-Up & SDGs
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                Vision & Close
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              &ldquo;Scaled across Pakistan&apos;s 250 HEC universities, this model saves hundreds of millions of Rupees, relieves national grid stress by tens of GWh, and avoids thousands of tonnes of CO2 — directly advancing UN SDG 7 and SDG 13. With IRENA&apos;s youth support, CampusWatt can transform Pakistan&apos;s higher education into a green energy lighthouse!&rdquo;
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={() => setIsPitchModalOpen(false)}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
          >
            Got it, Let&apos;s Present!
          </button>
        </div>
      </div>
    </div>
  );
}
