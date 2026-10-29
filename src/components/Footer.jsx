import React from 'react';
import { Zap, Heart, Award, ArrowUp, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-slate-600 dark:text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <Zap className="h-5 w-5 fill-white text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                Campus<span className="text-emerald-500">Watt</span>
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pakistan Campus Energy Audit & Solar Planning Tool
              </p>
            </div>
          </div>

          {/* Mandatory Attribution Line */}
          <div className="text-center md:text-center max-w-xl">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Built by Soban, COMSATS University Islamabad. Supporting SDG 7 and SDG 13.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Developed for the IRENA Youth Program • Empowering next-generation clean energy leaders in Pakistan.
            </p>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 dark:text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} CampusWatt. All calculations based on NEPRA, HEC & IRENA standards.</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" /> Client-side LocalStorage
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-cyan-500" /> Pakistan Energy Transition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
