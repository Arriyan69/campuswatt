/**
 * CampusWatt Constants & Presets
 * Campus Energy Audit and Solar Planning Tool for Pakistan
 * Prepared for IRENA Youth Program
 */

export const APPLIANCE_PRESETS = [
  { id: 'tube_light', name: 'Tube Light (T8/T12 Fluorescent)', defaultWatts: 40, category: 'Lighting', icon: 'Lightbulb' },
  { id: 'led_bulb', name: 'LED Bulb (Energy Saver)', defaultWatts: 12, category: 'Lighting', icon: 'Sparkles' },
  { id: 'ceiling_fan', name: 'Ceiling Fan (Standard AC Induction)', defaultWatts: 75, category: 'Ventilation', icon: 'Fan' },
  { id: 'ac_1_5_ton', name: '1.5-Ton Split AC (Non-Inverter)', defaultWatts: 1500, category: 'Cooling', icon: 'Snowflake' },
  { id: 'ac_1_ton', name: '1.0-Ton Split AC (Non-Inverter)', defaultWatts: 1000, category: 'Cooling', icon: 'Snowflake' },
  { id: 'projector', name: 'Classroom Multimedia Projector', defaultWatts: 250, category: 'Electronics', icon: 'Tv' },
  { id: 'desktop_pc', name: 'Desktop PC & Monitor', defaultWatts: 200, category: 'IT', icon: 'Monitor' },
  { id: 'water_dispenser', name: 'Electric Water Dispenser (Hot/Cold)', defaultWatts: 500, category: 'Appliances', icon: 'Coffee' },
  { id: 'custom', name: 'Custom Appliance', defaultWatts: 100, category: 'Custom', icon: 'Cpu' }
];

export const DEFAULT_SETTINGS = {
  electricityTariff: 50,          // PKR / kWh (NEPRA institutional blended tariff)
  peakSunHours: 5.5,             // Hours / day (Average GHI in Pakistan)
  systemEfficiency: 0.80,        // 80% Performance Ratio (inverter, temperature, dust & cabling losses)
  solarCostPerKw: 150000,        // PKR / kW (Turnkey commercial EPC cost in Pakistan)
  gridEmissionFactor: 0.45,      // kg CO2 / kWh (National grid baseline emission factor)
  universitiesInPakistan: 250,   // HEC recognized universities & degree awarding institutions
  wasteReductionPercent: 50      // Default target percentage for national waste reduction campaign
};

export const SDG_INFO = {
  sdg7: {
    number: 7,
    title: 'Affordable and Clean Energy',
    color: '#FCC30B',
    bgColor: 'rgba(252, 195, 11, 0.15)',
    borderColor: '#FCC30B',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy for all through solar rooftop migration and energy waste minimization.'
  },
  sdg13: {
    number: 13,
    title: 'Climate Action',
    color: '#3F7E44',
    bgColor: 'rgba(63, 126, 68, 0.15)',
    borderColor: '#3F7E44',
    description: 'Take urgent action to combat climate change and its impacts by abating carbon emissions from fossil fuel-dominated grid generation.'
  }
};
