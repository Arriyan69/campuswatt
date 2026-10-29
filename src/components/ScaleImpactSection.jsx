import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPKR, formatNumber } from '../utils/calculations';
import { SDG_INFO } from '../utils/constants';
import confetti from 'canvas-confetti';
import {
  Globe,
  Sliders,
  DollarSign,
  Zap,
  Leaf,
  Trees,
  Home,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

export default function ScaleImpactSection() {
  const { scaleImpact, settings, updateSettings } = useApp();

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="impact" className="py-12 border-t border-slate-200/80 dark:border-slate-800">
      {/* Section Header */}
      <div className="mb-8">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Step 4: Macro Policy & SDG Impact
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
          Pakistan Nationwide Scale-Up
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          What happens when every Higher Education Commission (HEC) accredited university in Pakistan replicates this energy conservation and solar planning model?
        </p>
      </div>

      {/* Interactive Controls Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Sliders className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            National Simulation Sliders
          </h3>
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
            Drag to adjust macro projections in real time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slider 1: Number of Universities */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Accredited Universities in Pakistan:
              </label>
              <div className="flex items-center gap-1 font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={settings.universitiesInPakistan}
                  onChange={(e) =>
                    updateSettings({ universitiesInPakistan: Math.max(1, Number(e.target.value) || 1) })
                  }
                  className="w-16 bg-transparent text-right focus:outline-none"
                />
                <span>Campuses</span>
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="10"
              value={settings.universitiesInPakistan}
              onChange={(e) =>
                updateSettings({ universitiesInPakistan: Number(e.target.value) })
              }
              className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>20 (Pilot Top Tier)</span>
              <span>250 (National HEC Baseline)</span>
              <span>400 (All Sub-campuses)</span>
            </div>
          </div>

          {/* Slider 2: % of Waste Reduced */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Campus Energy Waste Reduction Target:
              </label>
              <div className="flex items-center gap-1 font-mono font-bold text-cyan-500 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={settings.wasteReductionPercent}
                  onChange={(e) =>
                    updateSettings({ wasteReductionPercent: Math.min(100, Math.max(5, Number(e.target.value) || 5)) })
                  }
                  className="w-12 bg-transparent text-right focus:outline-none"
                />
                <span>%</span>
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={settings.wasteReductionPercent}
              onChange={(e) => {
                const val = Number(e.target.value);
                updateSettings({ wasteReductionPercent: val });
                if (val >= 75) handleConfetti();
              }}
              className="w-full accent-cyan-500 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>10% (Behavioral reminders)</span>
              <span>50% (Standard Smart Controls)</span>
              <span>100% (Zero Phantom Load)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Big Impact Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {/* Metric 1: National Financial Savings */}
        <div className="rounded-2xl border border-emerald-500/30 bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">National Cost Savings</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                Rs {formatNumber(scaleImpact.nationalSavingsMillionRs, 1)}M
              </span>
              <span className="text-xs font-semibold text-slate-400">/ yr</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Over Rs {scaleImpact.nationalSavingsBillionRs} Billion saved per year across {scaleImpact.unisCount} Pakistani universities at {scaleImpact.reductionPercent}% waste cut.
            </p>
          </div>
        </div>

        {/* Metric 2: GWh Saved */}
        <div className="rounded-2xl border border-cyan-500/30 bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Energy Conserved</span>
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                {scaleImpact.nationalGwhSaved}
              </span>
              <span className="text-sm font-bold text-slate-400">GWh / yr</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Relieving acute stress on Pakistan&apos;s national electricity grid (NTDC) and reducing fuel import bills.
            </p>
          </div>
        </div>

        {/* Metric 3: CO2 Emissions Avoided */}
        <div className="rounded-2xl border border-teal-500/30 bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Carbon Abated</span>
            <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <Leaf className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                {formatNumber(scaleImpact.nationalCo2TonnesAvoided, 0)}
              </span>
              <span className="text-xs font-semibold text-slate-400">Tonnes / yr</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Direct greenhouse gas avoidance directly tracked against Pakistan&apos;s Nationally Determined Contributions (NDCs).
            </p>
          </div>
        </div>

        {/* Metric 4: Trees Planted Equivalent */}
        <div className="rounded-2xl border border-emerald-500/30 bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Nature Equivalent</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Trees className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-emerald-500 font-mono">
                {scaleImpact.equivalentTrees.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-slate-400">Trees</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Carbon sequestration equivalent to an urban forest planted across university grounds (or powering {scaleImpact.equivalentHomesPowered.toLocaleString()} homes).
            </p>
          </div>
        </div>
      </div>

      {/* UN Sustainable Development Goals (SDG 7 & SDG 13) Badges */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              UN Sustainable Development Goals Alignment
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">IRENA Strategic Mission</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SDG 7 Badge Card */}
          <div className="rounded-2xl border border-[#FCC30B]/40 bg-[#FCC30B]/5 p-5 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-black text-2xl text-slate-900 shadow-md"
                style={{ backgroundColor: SDG_INFO.sdg7.color }}
              >
                7
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FCC30B] block">
                  United Nations Goal
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  SDG 7: {SDG_INFO.sdg7.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {SDG_INFO.sdg7.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-amber-500">
                  <span>Target 7.2: Substantially increase the share of renewable energy in campus energy mixes.</span>
                </div>
              </div>
            </div>
          </div>

          {/* SDG 13 Badge Card */}
          <div className="rounded-2xl border border-[#3F7E44]/40 bg-[#3F7E44]/5 p-5 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-black text-2xl text-white shadow-md"
                style={{ backgroundColor: SDG_INFO.sdg13.color }}
              >
                13
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3F7E44] block">
                  United Nations Goal
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  SDG 13: {SDG_INFO.sdg13.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {SDG_INFO.sdg13.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-500">
                  <span>Target 13.3: Improve education, awareness-raising and human capacity on climate change mitigation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
