import React from 'react';
import { useApp } from '../context/AppContext';
import StatCard from './StatCard';
import { Zap, AlertTriangle, CloudSun, Leaf, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function HeroStats() {
  const { summary, solar, rooms, loadSampleData, setIsReportModalOpen } = useApp();

  return (
    <section id="dashboard" className="pt-24 pb-12">
      {/* IRENA Youth Program Context Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-500/20 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                IRENA Youth Innovation Showcase
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Clean Energy Transition • Pakistan
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              Turning Institutional Energy Waste into Rooftop Solar Solutions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {rooms.length === 0 && (
            <button
              onClick={loadSampleData}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all"
            >
              <Building2 className="h-4 w-4" />
              Load Demo Campus
            </button>
          )}
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md transition-all ml-auto md:ml-0"
          >
            Generate Report
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Campus <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Energy Audit</span> & Solar Sizing
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Quantify phantom electricity loss in idle university rooms, eliminate waste with smart controls, and right-size rooftop solar arrays.
        </p>
      </div>

      {/* 4 Big Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Units Wasted / Month */}
        <StatCard
          title="Units Wasted / Month"
          value={summary.totalMonthlyKwh}
          unit="kWh"
          icon={Zap}
          subtext={`Daily: ~${Math.round(summary.totalDailyKwh).toLocaleString()} kWh/day`}
          trend={`${summary.totalAppliancesCount} Audited Loads`}
          colorScheme="amber"
          decimals={0}
        />

        {/* Card 2: Financial Loss / Month */}
        <StatCard
          title="Financial Loss / Month"
          value={summary.totalMonthlyCost}
          prefix="Rs "
          icon={AlertTriangle}
          subtext={`Yearly loss: Rs ${(summary.totalYearlyCost / 1000000).toFixed(2)}M`}
          trend="@ Rs 50/kWh"
          colorScheme="violet"
          decimals={0}
        />

        {/* Card 3: Carbon Footprint / Year */}
        <StatCard
          title="Carbon Footprint / Year"
          value={summary.totalYearlyCo2Tonnes}
          unit="Tonnes CO₂"
          icon={Leaf}
          subtext={`~${Math.round(summary.totalYearlyCo2Kg).toLocaleString()} kg CO₂/yr`}
          trend="Grid 0.45 kg/kWh"
          colorScheme="emerald"
          decimals={1}
        />

        {/* Card 4: Recommended Solar Size */}
        <StatCard
          title="Solar Capacity Needed"
          value={solar.requiredSystemSizeKw}
          unit="kWp"
          icon={CloudSun}
          subtext={`Est. Capex: Rs ${(solar.estimatedInstallCostRs / 1000000).toFixed(2)}M`}
          trend={`${solar.paybackPeriodYears} yr Payback`}
          colorScheme="cyan"
          decimals={1}
        />
      </div>

      {/* Quick Summary Highlights bar */}
      <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>
            Campus Audit Status:{' '}
            <strong className="text-slate-900 dark:text-white">
              {summary.totalRoomsCount} Rooms
            </strong>{' '}
            audited ({summary.totalAppliancesCount} appliances logged)
          </span>
        </div>

        {summary.topRooms[0] && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">#1 Room Waster:</span>
            <span className="font-bold text-amber-500 dark:text-amber-400">
              {summary.topRooms[0].roomName}
            </span>
            <span className="text-slate-400">
              ({Math.round(summary.topRooms[0].kwhPerMonth).toLocaleString()} kWh/mo)
            </span>
          </div>
        )}

        {summary.topApplianceTypes[0] && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">#1 Appliance Waster:</span>
            <span className="font-bold text-cyan-500 dark:text-cyan-400">
              {summary.topApplianceTypes[0].name}
            </span>
            <span className="text-slate-400">
              ({Math.round(summary.topApplianceTypes[0].kwhPerMonth).toLocaleString()} kWh/mo)
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
