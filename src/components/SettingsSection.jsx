import React from 'react';
import { useApp } from '../context/AppContext';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { Settings2, RotateCcw, Info, Check, Zap, Sun, ShieldAlert, Cpu } from 'lucide-react';

export default function SettingsSection() {
  const { settings, updateSettings, resetSettings } = useApp();

  const handleFieldChange = (field, value) => {
    updateSettings({
      [field]: Number(value)
    });
  };

  return (
    <section id="settings" className="py-12 border-t border-slate-200/80 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            Step 5: Live Engineering Parameters
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
            Audit & Financial Assumptions
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Fine-tune tariff rates, solar irradiance, equipment costs, and emissions factors. All calculations across the entire app update instantaneously.
          </p>
        </div>

        <button
          onClick={resetSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5 text-violet-500" />
          Reset to Defaults
        </button>
      </div>

      {/* Assumptions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Assumption 1: Electricity Tariff */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Electricity Tariff (PKR/kWh)
            </label>
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              Live Rate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-400">Rs</span>
            <input
              type="number"
              min="10"
              max="150"
              step="1"
              value={settings.electricityTariff}
              onChange={(e) => handleFieldChange('electricityTariff', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: Rs 50/kWh. Reflects NEPRA commercial institutional tariff inclusive of fuel price adjustments & taxes in Pakistan.</span>
          </p>
        </div>

        {/* Assumption 2: Peak Sun Hours */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Peak Sun Hours (PSH / day)
            </label>
            <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
              Solar Resource
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="2"
              max="8"
              step="0.1"
              value={settings.peakSunHours}
              onChange={(e) => handleFieldChange('peakSunHours', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm font-bold text-slate-400">hrs/day</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: 5.5 hours. High Global Horizontal Irradiance (GHI) across Islamabad, Punjab, Sindh & Balochistan.</span>
          </p>
        </div>

        {/* Assumption 3: System Efficiency */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              System Efficiency PR (Ratio)
            </label>
            <span className="text-[10px] font-semibold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded">
              Performance
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.5"
              max="0.95"
              step="0.01"
              value={settings.systemEfficiency}
              onChange={(e) => handleFieldChange('systemEfficiency', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm font-bold text-slate-400">
              ({Math.round(settings.systemEfficiency * 100)}%)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: 0.80 (80%). Standard performance ratio accounting for inverter conversion, high ambient temperatures, soiling & cabling.</span>
          </p>
        </div>

        {/* Assumption 4: Solar Cost per kW */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Turnkey Solar Cost (PKR/kW)
            </label>
            <span className="text-[10px] font-semibold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded">
              Capex Rate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-400">Rs</span>
            <input
              type="number"
              min="70000"
              max="300000"
              step="5000"
              value={settings.solarCostPerKw}
              onChange={(e) => handleFieldChange('solarCostPerKw', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: Rs 150,000/kW. Standard commercial EPC pricing in Pakistan including Tier-1 solar modules, structure, and grid integration.</span>
          </p>
        </div>

        {/* Assumption 5: Grid Emission Factor */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Grid Emission Factor (kg CO2/kWh)
            </label>
            <span className="text-[10px] font-semibold text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded">
              Emissions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              max="1.2"
              step="0.01"
              value={settings.gridEmissionFactor}
              onChange={(e) => handleFieldChange('gridEmissionFactor', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm font-bold text-slate-400">kg/kWh</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: 0.45 kg CO2/kWh. Pakistan grid average emission intensity according to IGES / UNFCCC CDM grid baseline studies.</span>
          </p>
        </div>

        {/* Assumption 6: Universities in Pakistan */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              Universities in Pakistan (HEC)
            </label>
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              Macro Scale
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="10"
              max="500"
              step="5"
              value={settings.universitiesInPakistan}
              onChange={(e) => handleFieldChange('universitiesInPakistan', e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2 text-base font-extrabold text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-sm font-bold text-slate-400">Campuses</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
            <span>Default: 250 institutions recognized by Higher Education Commission (HEC) across public and private sectors in Pakistan.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
