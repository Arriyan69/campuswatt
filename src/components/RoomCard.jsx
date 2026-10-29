import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateApplianceWaste, formatPKR } from '../utils/calculations';
import ApplianceForm from './ApplianceForm';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Edit2,
  Zap,
  Building,
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  Fan,
  Snowflake,
  Monitor,
  Coffee,
  Tv,
  Cpu
} from 'lucide-react';

export default function RoomCard({ room }) {
  const { settings, deleteRoom, updateRoom, deleteAppliance } = useApp();

  const [isExpanded, setIsExpanded] = useState(true);
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false);
  const [applianceToEdit, setApplianceToEdit] = useState(null);

  // Inline room editing state
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [roomNameInput, setRoomNameInput] = useState(room.name);
  const [roomBuildingInput, setRoomBuildingInput] = useState(room.building || '');

  // Calculate room-level aggregates
  const appliances = room.appliances || [];
  let roomDailyKwh = 0;
  let roomMonthlyKwh = 0;
  let roomMonthlyCost = 0;
  let totalAppliancesCount = 0;

  const applianceMetrics = appliances.map((app) => {
    const metrics = calculateApplianceWaste(app, settings);
    roomDailyKwh += metrics.kwhPerDay;
    roomMonthlyKwh += metrics.kwhPerMonth;
    roomMonthlyCost += metrics.costPerMonth;
    totalAppliancesCount += Number(app.quantity) || 0;
    return { ...app, metrics };
  });

  const handleSaveRoomName = (e) => {
    e.preventDefault();
    if (roomNameInput.trim()) {
      updateRoom(room.id, {
        name: roomNameInput.trim(),
        building: roomBuildingInput.trim() || 'Campus Facility'
      });
      setIsEditingRoom(false);
    }
  };

  const handleEditAppliance = (app) => {
    setApplianceToEdit(app);
    setIsApplianceModalOpen(true);
  };

  const handleAddNewAppliance = () => {
    setApplianceToEdit(null);
    setIsApplianceModalOpen(true);
  };

  // Helper icon by category/preset
  const getApplianceIcon = (presetId, category) => {
    if (presetId?.includes('ac')) return <Snowflake className="h-4 w-4 text-cyan-400" />;
    if (presetId?.includes('fan')) return <Fan className="h-4 w-4 text-emerald-400" />;
    if (presetId?.includes('light') || presetId?.includes('bulb')) return <Lightbulb className="h-4 w-4 text-amber-400" />;
    if (presetId?.includes('pc')) return <Monitor className="h-4 w-4 text-blue-400" />;
    if (presetId?.includes('water')) return <Coffee className="h-4 w-4 text-teal-400" />;
    if (presetId?.includes('projector')) return <Tv className="h-4 w-4 text-purple-400" />;
    return <Cpu className="h-4 w-4 text-slate-400" />;
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden">
      {/* Room Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Room Title / Inline Edit */}
          {isEditingRoom ? (
            <form onSubmit={handleSaveRoomName} className="flex flex-wrap items-center gap-2 flex-1">
              <input
                type="text"
                value={roomNameInput}
                onChange={(e) => setRoomNameInput(e.target.value)}
                placeholder="Room Name"
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              <input
                type="text"
                value={roomBuildingInput}
                onChange={(e) => setRoomBuildingInput(e.target.value)}
                placeholder="Building / Dept"
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500"
                title="Save"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditingRoom(false)}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {room.name}
                  </h4>
                  <button
                    onClick={() => setIsEditingRoom(true)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded"
                    title="Edit Room Name"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {room.building || 'Campus Facility'} •{' '}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {totalAppliancesCount} units
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Quick Metrics & Controls */}
          <div className="flex items-center flex-wrap gap-2.5 sm:ml-auto">
            <div className="text-right pr-2 hidden sm:block">
              <div className="text-xs text-slate-400 uppercase font-semibold">Monthly Waste</div>
              <div className="text-base font-extrabold text-amber-500 dark:text-amber-400">
                {Math.round(roomMonthlyKwh).toLocaleString()} kWh{' '}
                <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 ml-1">
                  ({formatPKR(roomMonthlyCost)})
                </span>
              </div>
            </div>

            <button
              onClick={handleAddNewAppliance}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Appliance
            </button>

            <button
              onClick={() => deleteRoom(room.id)}
              className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
              title="Delete Room"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile metrics strip */}
        <div className="sm:hidden mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">Monthly Waste:</span>
          <span className="font-bold text-amber-500">
            {Math.round(roomMonthlyKwh).toLocaleString()} kWh ({formatPKR(roomMonthlyCost)})
          </span>
        </div>
      </div>

      {/* Appliances List Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5">
          {appliances.length === 0 ? (
            <div className="text-center py-8 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
              <Zap className="h-8 w-8 mx-auto text-slate-400 mb-2 opacity-60" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No appliances logged in this room
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-3">
                Audit idle lights, fans, ACs or electronics left running here.
              </p>
              <button
                onClick={handleAddNewAppliance}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                Add First Appliance
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-2.5 px-3">Appliance</th>
                    <th className="py-2.5 px-2 text-center">Watts</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-2 text-center">Wasted Hrs/d</th>
                    <th className="py-2.5 px-2 text-center">Days/mo</th>
                    <th className="py-2.5 px-3 text-right">Monthly Loss</th>
                    <th className="py-2.5 px-3 text-right">Cost (PKR)</th>
                    <th className="py-2.5 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {applianceMetrics.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800">
                            {getApplianceIcon(item.presetId, item.category)}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {item.category || 'General'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-medium">
                        {item.watts}W
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800 dark:text-slate-200">
                        {item.quantity}×
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {item.hoursWastedPerDay}h / day
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">
                        {item.daysPerMonth}d
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                        {item.metrics.kwhPerMonth.toFixed(1)} kWh
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formatPKR(item.metrics.costPerMonth)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleEditAppliance(item)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Appliance"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteAppliance(room.id, item.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                            title="Delete Appliance"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Appliance Form Modal */}
      {isApplianceModalOpen && (
        <ApplianceForm
          isOpen={isApplianceModalOpen}
          onClose={() => {
            setIsApplianceModalOpen(false);
            setApplianceToEdit(null);
          }}
          roomId={room.id}
          applianceToEdit={applianceToEdit}
        />
      )}
    </div>
  );
}
