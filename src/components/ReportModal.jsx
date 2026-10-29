import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPKR, formatNumber } from '../utils/calculations';
import { Printer, X, Download, ShieldCheck, Sun, Zap, Leaf, Award, Building, Sparkles } from 'lucide-react';

export default function ReportModal() {
  const { isReportModalOpen, setIsReportModalOpen, summary, solar, wasteFix, scaleImpact, settings, rooms } = useApp();

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10 my-4 text-slate-800 dark:text-slate-200 print:max-h-none print:shadow-none print:border-none print:p-0 print:m-0">
        {/* Modal Top Bar (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 no-print">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Executive Summary Report
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Demo-ready A4 Printable View</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all"
            >
              <Printer className="h-4 w-4" />
              Print / Save PDF
            </button>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Header */}
        <div className="border-b-2 border-emerald-500/40 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                  CW
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white print:text-black">
                  CampusWatt <span className="text-emerald-600 font-semibold text-xl">Audit Report</span>
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium print:text-slate-600">
                Institutional Energy Waste Audit & Clean Solar Transition Blueprint
              </p>
            </div>

            <div className="sm:text-right text-xs text-slate-500 dark:text-slate-400 print:text-slate-700">
              <p><strong className="text-slate-800 dark:text-slate-200 print:text-black">Prepared for:</strong> IRENA Youth Program Showcase</p>
              <p><strong className="text-slate-800 dark:text-slate-200 print:text-black">Author:</strong> Soban, COMSATS University Islamabad</p>
              <p><strong className="text-slate-800 dark:text-slate-200 print:text-black">Date Generated:</strong> {currentDate}</p>
            </div>
          </div>
        </div>

        {/* Report Section 1: Executive Audit Summary */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-500" />
            1. Audited Campus Energy Waste Profile
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:gap-2">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 print:bg-white print:border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Waste</span>
              <span className="text-lg font-black text-amber-500 font-mono">
                {Math.round(summary.totalMonthlyKwh).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">kWh / month</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 print:bg-white print:border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Monthly Financial Loss</span>
              <span className="text-lg font-black text-rose-500 font-mono">
                {formatPKR(summary.totalMonthlyCost)}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">@ Rs {settings.electricityTariff}/kWh</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 print:bg-white print:border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Carbon Footprint</span>
              <span className="text-lg font-black text-emerald-500 font-mono">
                {summary.totalYearlyCo2Tonnes}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">Tonnes CO₂ / year</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 print:bg-white print:border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Audited Scope</span>
              <span className="text-lg font-black text-slate-900 dark:text-white print:text-black font-mono">
                {summary.totalRoomsCount} Rooms
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">{summary.totalAppliancesCount} appliances</span>
            </div>
          </div>
        </div>

        {/* Report Section 2: Top Wasters */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Building className="h-4 w-4 text-cyan-500" />
            2. High-Priority Energy Waste Hotspots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 print:bg-white">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                Top 3 Wasteful Rooms
              </h3>
              <ul className="space-y-1.5 text-xs">
                {summary.topRooms.map((r, i) => (
                  <li key={r.roomId} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                      #{i + 1} {r.roomName}
                    </span>
                    <span className="font-mono text-amber-500 font-bold">
                      {Math.round(r.kwhPerMonth).toLocaleString()} kWh/mo ({formatPKR(r.costPerMonth)})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 print:bg-white">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">
                Top 3 Wasteful Appliance Types
              </h3>
              <ul className="space-y-1.5 text-xs">
                {summary.topApplianceTypes.map((a, i) => (
                  <li key={a.name} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 print:text-black">
                      #{i + 1} {a.name}
                    </span>
                    <span className="font-mono text-cyan-500 font-bold">
                      {Math.round(a.kwhPerMonth).toLocaleString()} kWh/mo ({a.totalQty} units)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Report Section 3: Solar PV Sizing & Financial ROI */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-emerald-500" />
            3. Solar PV Technical Sizing & ROI Metrics
          </h2>
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 print:border-emerald-700 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended Sizing</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white print:text-black font-mono">
                  {solar.requiredSystemSizeKw} kWp
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Turnkey Capex</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white print:text-black font-mono">
                  {formatPKR(solar.estimatedInstallCostRs)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Annual Bill Savings</span>
                <span className="text-base font-extrabold text-emerald-600 font-mono">
                  {formatPKR(solar.annualSavingsRs)} / yr
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Simple Payback Period</span>
                <span className="text-base font-extrabold text-cyan-600 font-mono">
                  {solar.paybackPeriodYears} Years
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap justify-between items-center text-[11px] text-slate-600 dark:text-slate-400 print:text-slate-700">
              <span><strong>25-Year Cumulative Net Profit:</strong> {formatPKR(solar.netSavings25YearsRs)}</span>
              <span><strong>Lifetime Carbon Abated:</strong> ~{Number((solar.co2AvoidedPerYearTonnes * 25).toFixed(1))} Tonnes CO₂</span>
            </div>
          </div>
        </div>

        {/* Report Section 4: The IRENA Negawatt Strategy */}
        <div className="mb-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 print:bg-white text-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            4. IRENA Principle: First Negawatt, Then Megawatt
          </h2>
          <p className="text-slate-600 dark:text-slate-300 print:text-slate-800 leading-relaxed">
            By deploying occupancy sensors and behavioral guidelines at an estimated cost of{' '}
            <strong>{formatPKR(wasteFix.totalFixCost)}</strong> (payback in{' '}
            <strong className="text-emerald-600">{wasteFix.fixPaybackMonths} months</strong>), the university eliminates 85% of idle waste and avoids spending{' '}
            <strong>{formatPKR(wasteFix.capexSavedOnSolar)}</strong> on unnecessary solar PV hardware.
          </p>
        </div>

        {/* Report Section 5: Pakistan Scale-Up & SDGs */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-amber-500" />
            5. Nationwide Impact ({settings.universitiesInPakistan} Campuses @ {settings.wasteReductionPercent}% Reduction)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Annual National Savings</span>
              <span className="font-extrabold text-emerald-600 text-sm font-mono">
                Rs {formatNumber(scaleImpact.nationalSavingsMillionRs, 1)} Million
              </span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Annual Clean Energy</span>
              <span className="font-extrabold text-cyan-600 text-sm font-mono">
                {scaleImpact.nationalGwhSaved} GWh
              </span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">CO₂ Avoided</span>
              <span className="font-extrabold text-teal-600 text-sm font-mono">
                {formatNumber(scaleImpact.nationalCo2TonnesAvoided, 0)} Tonnes
              </span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block font-bold">Tree Equivalence</span>
              <span className="font-extrabold text-emerald-500 text-sm font-mono">
                {scaleImpact.equivalentTrees.toLocaleString()} Trees
              </span>
            </div>
          </div>
          <div className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400 print:text-slate-600 font-medium">
            Directly supporting UN SDG 7 (Affordable and Clean Energy) & SDG 13 (Climate Action).
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
          <p>CampusWatt Platform • Built by Soban, COMSATS University Islamabad.</p>
          <p className="font-mono">Verification Hash: CW-PK-{Date.now().toString(36).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
