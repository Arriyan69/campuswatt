import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RoomCard from './RoomCard';
import { Plus, Search, Building2, RefreshCw, Trash2, X, Sparkles, AlertCircle } from 'lucide-react';

export default function AuditSection() {
  const { rooms, addRoom, loadSampleData, clearAllData } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomBuilding, setNewRoomBuilding] = useState('');
  const [error, setError] = useState('');

  const filteredRooms = rooms.filter((r) => {
    const term = searchTerm.toLowerCase();
    return (
      r.name.toLowerCase().includes(term) ||
      (r.building && r.building.toLowerCase().includes(term))
    );
  });

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!newRoomName.trim()) {
      setError('Please provide a room name.');
      return;
    }
    addRoom(newRoomName.trim(), newRoomBuilding.trim() || 'Academic Block');
    setNewRoomName('');
    setNewRoomBuilding('');
    setError('');
    setIsAddRoomModalOpen(false);
  };

  return (
    <section id="audit" className="py-12 border-t border-slate-200/80 dark:border-slate-800">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Step 1: Inventory & Waste
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Room Audit
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Audit appliances in classrooms, laboratories, auditoriums, and administrative offices. Log hours wasted running in empty rooms.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setIsAddRoomModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Room
          </button>

          <button
            onClick={loadSampleData}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
            title="Reload 8 realistic demo rooms"
          >
            <RefreshCw className="h-3.5 w-3.5 text-emerald-500" />
            Load Sample Data
          </button>

          {rooms.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all rooms? You can reload sample data anytime.')) {
                  clearAllData();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 text-xs font-medium transition-colors"
              title="Clear all rooms"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter / Search Bar if multiple rooms */}
      {rooms.length > 1 && (
        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audited rooms or buildings..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Rooms List */}
      {rooms.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No Campus Rooms Logged Yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            Start by adding rooms manually, or click below to populate 8 realistic Pakistani university campus rooms with ACs, fans, lights, and computers.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={loadSampleData}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Load Sample Campus (8 Rooms)
            </button>
            <button
              onClick={() => setIsAddRoomModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Custom Room
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}

          {filteredRooms.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No rooms match your search query &ldquo;{searchTerm}&rdquo;.
            </div>
          )}
        </div>
      )}

      {/* Add Room Modal */}
      {isAddRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-500" />
                Add New Campus Room
              </h3>
              <button
                onClick={() => {
                  setIsAddRoomModalOpen(false);
                  setError('');
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Room or Facility Name *
                </label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g. Physics Lab 2, Hall C, Seminar Room"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Building / Department (Optional)
                </label>
                <input
                  type="text"
                  value={newRoomBuilding}
                  onChange={(e) => setNewRoomBuilding(e.target.value)}
                  placeholder="e.g. Science Block, CS Department"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddRoomModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
