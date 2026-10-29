import React, { useState, useEffect } from 'react';
import { APPLIANCE_PRESETS } from '../utils/constants';
import { useApp } from '../context/AppContext';
import { calculateApplianceWaste, formatPKR } from '../utils/calculations';
import { X, Plus, Save, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function ApplianceForm({
  isOpen,
  onClose,
  roomId,
  applianceToEdit = null
}) {
  const { settings, addAppliance, updateAppliance } = useApp();

  const [presetId, setPresetId] = useState('tube_light');
  const [name, setName] = useState('Tube Light (T8/T12 Fluorescent)');
  const [category, setCategory] = useState('Lighting');
  const [watts, setWatts] = useState(40);
  const [quantity, setQuantity] = useState(10);
  const [hoursWastedPerDay, setHoursWastedPerDay] = useState(4);
  const [daysPerMonth, setDaysPerMonth] = useState(26);
  const [error, setError] = useState('');

  // Populate form when editing or resetting
  useEffect(() => {
    if (applianceToEdit) {
      setPresetId(applianceToEdit.presetId || 'custom');
      setName(applianceToEdit.name || '');
      setCategory(applianceToEdit.category || 'General');
      setWatts(applianceToEdit.watts || 100);
      setQuantity(applianceToEdit.quantity || 1);
      setHoursWastedPerDay(applianceToEdit.hoursWastedPerDay || 2);
      setDaysPerMonth(applianceToEdit.daysPerMonth || 26);
    } else {
      // Default to first preset
      const defaultPreset = APPLIANCE_PRESETS[0];
      setPresetId(defaultPreset.id);
      setName(defaultPreset.name);
      setCategory(defaultPreset.category);
      setWatts(defaultPreset.defaultWatts);
      setQuantity(10);
      setHoursWastedPerDay(4);
      setDaysPerMonth(26);
    }
    setError('');
  }, [applianceToEdit, isOpen]);

  // Handle Preset Selection
  const handlePresetChange = (selectedId) => {
    setPresetId(selectedId);
    const preset = APPLIANCE_PRESETS.find((p) => p.id === selectedId);
    if (preset) {
      if (selectedId === 'custom') {
        setName('Custom Device');
        setCategory('Custom');
        setWatts(100);
      } else {
        setName(preset.name);
        setCategory(preset.category);
        setWatts(preset.defaultWatts);
      }
    }
  };

  // Live preview calculation for this entry
  const previewMetrics = calculateApplianceWaste(
    { watts, quantity, hoursWastedPerDay, daysPerMonth },
    settings
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide an appliance name.');
      return;
    }
    if (watts <= 0) {
      setError('Wattage must be greater than 0.');
      return;
    }
    if (quantity <= 0) {
      setError('Quantity must be at least 1.');
      return;
    }
    if (hoursWastedPerDay < 0 || hoursWastedPerDay > 24) {
      setError('Hours wasted per day must be between 0 and 24.');
      return;
    }
    if (daysPerMonth <= 0 || daysPerMonth > 31) {
      setError('Days per month must be between 1 and 31.');
      return;
    }

    const payload = {
      presetId,
      name: name.trim(),
      category,
      watts: Number(watts),
      quantity: Number(quantity),
      hoursWastedPerDay: Number(hoursWastedPerDay),
      daysPerMonth: Number(daysPerMonth)
    };

    if (applianceToEdit) {
      updateAppliance(roomId, applianceToEdit.id, payload);
    } else {
      addAppliance(roomId, payload);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {applianceToEdit ? 'Edit Appliance' : 'Add Appliance to Room'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Preset Select */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Select Preset or Custom
            </label>
            <select
              value={presetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {APPLIANCE_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.defaultWatts}W)
                </option>
              ))}
            </select>
          </div>

          {/* Name & Watts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Appliance Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ceiling Fan"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Watts (W)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={watts}
                onChange={(e) => setWatts(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          {/* Quantity, Hours Wasted, Days/Month */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Wasted Hrs/Day
              </label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={hoursWastedPerDay}
                onChange={(e) => setHoursWastedPerDay(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <span className="text-[10px] text-slate-400">Idle / empty room</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Days/Month
              </label>
              <input
                type="number"
                min="1"
                max="31"
                step="1"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <span className="text-[10px] text-slate-400">Default: 26 days</span>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              <span>Estimated Entry Waste:</span>
              <span className="text-emerald-500 font-semibold">Live Preview</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center pt-1">
              <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Daily Loss</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {previewMetrics.kwhPerDay.toFixed(2)} kWh
                </p>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Monthly Loss</p>
                <p className="text-sm font-bold text-amber-500">
                  {previewMetrics.kwhPerMonth.toFixed(1)} kWh
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1 rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Monthly Cost</p>
                <p className="text-sm font-bold text-emerald-500">
                  {formatPKR(previewMetrics.costPerMonth)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
            >
              {applianceToEdit ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {applianceToEdit ? 'Save Changes' : 'Add Appliance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
