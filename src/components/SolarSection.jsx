import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../utils/calculations';
import {
  Sun,
  Zap,
  TrendingUp,
  DollarSign,
  Calendar,
  Leaf,
  ShieldAlert,
  ArrowRight,
  Layers,
  Cpu,
  CheckCircle2,
  Award,
  Sparkles
} from 'lucide-react';

export default function SolarSection() {
  const { summary, solar, wasteFix, settings } = useApp();

  return (
    <section id="solar" className="py-12 border-t border-slate-200/80 dark:border-slate-800">
      {/* Section Header */}
      <div className="mb-8">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
          Step 3: Clean Energy Sizing & The Negawatt Rule
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
          Rooftop Solar Recommendation
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Engineered solar PV system designed to offset audited campus electricity demand, paired with an energy efficiency comparison.
        </p>
      </div>

      {/* Solar System Core Sizing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {/* Card 1: System Sizing */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Required PV Sizing</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sun className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {solar.requiredSystemSizeKw}
              </span>
              <span className="text-sm font-bold text-slate-400">kWp DC Capacity</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Based on {Math.round(summary.totalDailyKwh).toLocaleString()} daily wasted kWh, {settings.peakSunHours} peak sun hours & {Math.round(settings.systemEfficiency * 100)}% system PR.
            </p>
          </div>
        </div>

        {/* Card 2: Estimated Installation Cost */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Estimated Capex</span>
            <div className="h-9 w-9 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
                {formatPKR(solar.estimatedInstallCostRs, true)}
              </span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                ({formatPKR(solar.estimatedInstallCostRs)})
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Turnkey EPC commercial rate in Pakistan (@ Rs {settings.solarCostPerKw.toLocaleString()}/kW with Tier-1 bifacial panels & on-grid inverters).
            </p>
          </div>
        </div>

        {/* Card 3: Annual Generation & Financial Savings */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Annual Solar Savings</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {formatPKR(solar.annualSavingsRs, true)}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ year</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Generates ~{Math.round(solar.annualSolarGenerationKwh).toLocaleString()} kWh/yr, eliminating expensive utility grid tariff bills.
            </p>
          </div>
        </div>

        {/* Card 4: Simple Payback Period */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Payback Period</span>
            <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                {solar.paybackPeriodYears}
              </span>
              <span className="text-sm font-bold text-slate-400">Years</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Fast payback driven by high commercial grid tariffs (Rs {settings.electricityTariff}/kWh) and strong Pakistani solar irradiance.
            </p>
          </div>
        </div>

        {/* Card 5: 25-Year Net Cumulative Savings */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">25-Year Net Profit</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-500 font-mono">
                {formatPKR(solar.netSavings25YearsRs, true)}
              </span>
              <span className="text-xs font-bold text-slate-400">Net Life Profit</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              After recovering full capital outlay, over 22 years of near-zero marginal cost electricity generated for the campus.
            </p>
          </div>
        </div>

        {/* Card 6: CO2 Abated */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">Clean Climate Action</span>
            <div className="h-9 w-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <Leaf className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-teal-500 font-mono">
                {solar.co2AvoidedPerYearTonnes}
              </span>
              <span className="text-sm font-bold text-slate-400">Tonnes CO₂ / yr</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Displacing fossil fuels from thermal generation (oil & coal) in Pakistan&apos;s National Transmission & Dispatch Company (NTDC) grid.
            </p>
          </div>
        </div>
      </div>

      {/* "Waste Fix vs Solar" Comparison Panel (The IRENA Core Pitch) */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-slate-900/40 to-slate-900/80 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Key Strategic Insight
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Waste Elimination vs. Solar Generation Comparison
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              IRENA Best Practice Principle: <strong className="text-emerald-400">&ldquo;First Negawatt, then Megawatt&rdquo;</strong> — Why university administration must eliminate energy waste before sizing solar PV.
            </p>
          </div>
        </div>

        {/* Side by Side Comparative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Option A: Waste Elimination (Sensors + Behavior) */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-white dark:bg-slate-900/90 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Immediate Winner (Lowest Capex)
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Strategy 1: Smart Sensors & Habit Change
                </h4>
                <p className="text-xs text-slate-400">
                  PIR Occupancy sensors, smart timers & student eco-ambassadors
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Total Upfront Fix Cost:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPKR(wasteFix.totalFixCost)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Monthly Savings (85% waste cut):</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPKR(wasteFix.monthlyWasteCostSaved)} / mo
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Simple Payback Period:</span>
                <span className="font-mono font-extrabold text-emerald-500 text-base">
                  {wasteFix.fixPaybackMonths} Months! (~{Math.round(wasteFix.fixPaybackMonths * 30)} days)
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 dark:text-slate-400">Implementation Complexity:</span>
                <span className="font-semibold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Rapid deployment (1-2 weeks)
                </span>
              </div>
            </div>
          </div>

          {/* Option B: Direct Solar Installation */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Strategy 2: Solar PV Generation Only
                </h4>
                <p className="text-xs text-slate-400">
                  Installing solar to supply power while keeping appliances idling
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Required Solar Capex:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {formatPKR(wasteFix.solarCapex)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Annual Solar Savings:</span>
                <span className="font-mono font-bold text-cyan-500 text-sm">
                  {formatPKR(solar.annualSavingsRs)} / yr
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Simple Payback Period:</span>
                <span className="font-mono font-bold text-cyan-500 text-base">
                  {solar.paybackPeriodYears} Years
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500 dark:text-slate-400">Implementation Complexity:</span>
                <span className="font-semibold text-slate-400">
                  Engineering, Net Metering & HEC Procurement (3-6 mo)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion Banner */}
        <div className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 sm:p-5 flex items-start sm:items-center gap-3">
          <Award className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-emerald-500 font-bold block sm:inline mr-1">
              The Hybrid Synergy:
            </strong>
            Fixing the waste first for only {formatPKR(wasteFix.totalFixCost)} saves{' '}
            <strong className="text-slate-900 dark:text-white font-bold">
              {formatPKR(wasteFix.capexSavedOnSolar)}
            </strong>{' '}
            in oversized solar hardware. The university can then install a perfectly right-sized solar system for active academic loads!
          </div>
        </div>
      </div>
    </section>
  );
}
