import React from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import AuditSection from './components/AuditSection';
import ChartsSection from './components/ChartsSection';
import SolarSection from './components/SolarSection';
import ScaleImpactSection from './components/ScaleImpactSection';
import SettingsSection from './components/SettingsSection';
import Footer from './components/Footer';
import ReportModal from './components/ReportModal';
import PitchGuideModal from './components/PitchGuideModal';

function CampusWattDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroStats />
        <AuditSection />
        <ChartsSection />
        <SolarSection />
        <ScaleImpactSection />
        <SettingsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Printable Report Modal */}
      <ReportModal />

      {/* 2-Minute Video Pitch Teleprompter */}
      <PitchGuideModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CampusWattDashboard />
    </AppProvider>
  );
}
