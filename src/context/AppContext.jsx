import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { SAMPLE_ROOMS } from '../utils/sampleData';
import {
  calculateCampusSummary,
  calculateSolarRecommendation,
  calculateWasteFixVsSolar,
  calculateScaleUpImpact
} from '../utils/calculations';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  ROOMS: 'campuswatt_rooms_v1',
  SETTINGS: 'campuswatt_settings_v1',
  THEME: 'campuswatt_theme_v1'
};

export function AppProvider({ children }) {
  // Theme state: dark mode default for sleek energy tech look
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      if (savedTheme !== null) return savedTheme === 'dark';
    } catch {
      // fallback
    }
    return true; // default dark mode
  });

  // Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  // Rooms & appliances state (defaults to SAMPLE_ROOMS so it's instantly demo-ready!)
  const [rooms, setRooms] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return SAMPLE_ROOMS;
  });

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  // Sync theme with HTML root class
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync settings with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Sync rooms with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    } catch {
      // ignore
    }
  }, [rooms]);

  // Toggle Theme
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Load sample demo data
  const loadSampleData = () => {
    setRooms(SAMPLE_ROOMS);
    setSettings(DEFAULT_SETTINGS);
  };

  // Clear all data (empty state)
  const clearAllData = () => {
    setRooms([]);
  };

  // Add Room
  const addRoom = (name, building = 'Campus Facility') => {
    const trimmedName = (name || '').trim();
    if (!trimmedName) return;
    const newRoom = {
      id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: trimmedName,
      building: (building || 'Campus Facility').trim(),
      appliances: []
    };
    setRooms((prev) => [newRoom, ...prev]);
  };

  // Update Room
  const updateRoom = (roomId, updatedFields) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, ...updatedFields } : r))
    );
  };

  // Delete Room
  const deleteRoom = (roomId) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  // Add Appliance to Room
  const addAppliance = (roomId, applianceData) => {
    const newApp = {
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      presetId: applianceData.presetId || 'custom',
      name: applianceData.name || 'Appliance',
      category: applianceData.category || 'General',
      watts: Math.max(1, Number(applianceData.watts) || 100),
      quantity: Math.max(1, Number(applianceData.quantity) || 1),
      hoursWastedPerDay: Math.max(0, Math.min(24, Number(applianceData.hoursWastedPerDay) || 0)),
      daysPerMonth: Math.max(1, Math.min(31, Number(applianceData.daysPerMonth) || 26))
    };

    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          appliances: [...(room.appliances || []), newApp]
        };
      })
    );
  };

  // Update Appliance in Room
  const updateAppliance = (roomId, applianceId, updatedFields) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          appliances: (room.appliances || []).map((app) =>
            app.id === applianceId
              ? {
                  ...app,
                  ...updatedFields,
                  watts: Math.max(1, Number(updatedFields.watts ?? app.watts)),
                  quantity: Math.max(1, Number(updatedFields.quantity ?? app.quantity)),
                  hoursWastedPerDay: Math.max(
                    0,
                    Math.min(24, Number(updatedFields.hoursWastedPerDay ?? app.hoursWastedPerDay))
                  ),
                  daysPerMonth: Math.max(
                    1,
                    Math.min(31, Number(updatedFields.daysPerMonth ?? app.daysPerMonth))
                  )
                }
              : app
          )
        };
      })
    );
  };

  // Delete Appliance from Room
  const deleteAppliance = (roomId, applianceId) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          appliances: (room.appliances || []).filter((app) => app.id !== applianceId)
        };
      })
    );
  };

  // Update Settings
  const updateSettings = (fields) => {
    setSettings((prev) => ({
      ...prev,
      ...fields
    }));
  };

  // Reset Settings to Defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Reactive Live Calculations (Memoized for top performance)
  const summary = useMemo(() => {
    return calculateCampusSummary(rooms, settings);
  }, [rooms, settings]);

  const solar = useMemo(() => {
    return calculateSolarRecommendation(summary.totalDailyKwh, settings);
  }, [summary.totalDailyKwh, settings]);

  const wasteFix = useMemo(() => {
    return calculateWasteFixVsSolar(summary, solar);
  }, [summary, solar]);

  const scaleImpact = useMemo(() => {
    return calculateScaleUpImpact(summary, settings);
  }, [summary, settings]);

  const value = {
    isDarkMode,
    toggleTheme,
    settings,
    updateSettings,
    resetSettings,
    rooms,
    loadSampleData,
    clearAllData,
    addRoom,
    updateRoom,
    deleteRoom,
    addAppliance,
    updateAppliance,
    deleteAppliance,
    summary,
    solar,
    wasteFix,
    scaleImpact,
    isReportModalOpen,
    setIsReportModalOpen,
    isPitchModalOpen,
    setIsPitchModalOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
