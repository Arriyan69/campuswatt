/**
 * Realistic Sample Campus Energy Audit Data for Pakistani Universities
 * Modeled for COMSATS University Islamabad campus facilities.
 */

export const SAMPLE_ROOMS = [
  {
    id: 'room-1',
    name: 'CS Computer Lab 3 (Block A)',
    building: 'Department of Computer Science',
    appliances: [
      {
        id: 'app-1-1',
        presetId: 'desktop_pc',
        name: 'Desktop PC & Monitor',
        category: 'IT',
        watts: 200,
        quantity: 35,
        hoursWastedPerDay: 3.5,
        daysPerMonth: 26
      },
      {
        id: 'app-1-2',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 2,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 26
      },
      {
        id: 'app-1-3',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 12,
        hoursWastedPerDay: 4.5,
        daysPerMonth: 26
      },
      {
        id: 'app-1-4',
        presetId: 'projector',
        name: 'Classroom Multimedia Projector',
        category: 'Electronics',
        watts: 250,
        quantity: 1,
        hoursWastedPerDay: 2.0,
        daysPerMonth: 26
      }
    ]
  },
  {
    id: 'room-2',
    name: 'Lecture Hall 101 (Main Block)',
    building: 'Academic Complex',
    appliances: [
      {
        id: 'app-2-1',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 4,
        hoursWastedPerDay: 3.5,
        daysPerMonth: 26
      },
      {
        id: 'app-2-2',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 8,
        hoursWastedPerDay: 5.0,
        daysPerMonth: 26
      },
      {
        id: 'app-2-3',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 18,
        hoursWastedPerDay: 5.5,
        daysPerMonth: 26
      },
      {
        id: 'app-2-4',
        presetId: 'projector',
        name: 'Classroom Multimedia Projector',
        category: 'Electronics',
        watts: 250,
        quantity: 1,
        hoursWastedPerDay: 2.5,
        daysPerMonth: 26
      }
    ]
  },
  {
    id: 'room-3',
    name: 'Faculty Offices (Block B)',
    building: 'Faculty Wing',
    appliances: [
      {
        id: 'app-3-1',
        presetId: 'ac_1_ton',
        name: '1.0-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1000,
        quantity: 6,
        hoursWastedPerDay: 3.0,
        daysPerMonth: 26
      },
      {
        id: 'app-3-2',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 6,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 26
      },
      {
        id: 'app-3-3',
        presetId: 'led_bulb',
        name: 'LED Bulb (Energy Saver)',
        category: 'Lighting',
        watts: 12,
        quantity: 12,
        hoursWastedPerDay: 4.5,
        daysPerMonth: 26
      },
      {
        id: 'app-3-4',
        presetId: 'water_dispenser',
        name: 'Electric Water Dispenser (Hot/Cold)',
        category: 'Appliances',
        watts: 500,
        quantity: 1,
        hoursWastedPerDay: 6.0,
        daysPerMonth: 30
      }
    ]
  },
  {
    id: 'room-4',
    name: 'Central Library Main Hall',
    building: 'Library & Information Resource',
    appliances: [
      {
        id: 'app-4-1',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 4,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 28
      },
      {
        id: 'app-4-2',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 28,
        hoursWastedPerDay: 6.0,
        daysPerMonth: 28
      },
      {
        id: 'app-4-3',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 12,
        hoursWastedPerDay: 5.0,
        daysPerMonth: 28
      },
      {
        id: 'app-4-4',
        presetId: 'desktop_pc',
        name: 'Desktop PC & Monitor',
        category: 'IT',
        watts: 200,
        quantity: 10,
        hoursWastedPerDay: 4.5,
        daysPerMonth: 28
      }
    ]
  },
  {
    id: 'room-5',
    name: 'Main Auditorium Hall A',
    building: 'Convention Center',
    appliances: [
      {
        id: 'app-5-1',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 6,
        hoursWastedPerDay: 3.0,
        daysPerMonth: 20
      },
      {
        id: 'app-5-2',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 32,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 20
      },
      {
        id: 'app-5-3',
        presetId: 'projector',
        name: 'Classroom Multimedia Projector',
        category: 'Electronics',
        watts: 250,
        quantity: 2,
        hoursWastedPerDay: 3.0,
        daysPerMonth: 20
      },
      {
        id: 'app-5-4',
        presetId: 'water_dispenser',
        name: 'Electric Water Dispenser (Hot/Cold)',
        category: 'Appliances',
        watts: 500,
        quantity: 1,
        hoursWastedPerDay: 8.0,
        daysPerMonth: 26
      }
    ]
  },
  {
    id: 'room-6',
    name: 'EE Electronics & Circuits Lab',
    building: 'Department of Electrical Engineering',
    appliances: [
      {
        id: 'app-6-1',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 2,
        hoursWastedPerDay: 3.5,
        daysPerMonth: 26
      },
      {
        id: 'app-6-2',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 6,
        hoursWastedPerDay: 4.5,
        daysPerMonth: 26
      },
      {
        id: 'app-6-3',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 16,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 26
      },
      {
        id: 'app-6-4',
        presetId: 'desktop_pc',
        name: 'Desktop PC & Monitor',
        category: 'IT',
        watts: 200,
        quantity: 18,
        hoursWastedPerDay: 3.0,
        daysPerMonth: 26
      }
    ]
  },
  {
    id: 'room-7',
    name: 'Admin & Accounts Wing',
    building: 'Administration Secretariat',
    appliances: [
      {
        id: 'app-7-1',
        presetId: 'ac_1_ton',
        name: '1.0-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1000,
        quantity: 4,
        hoursWastedPerDay: 3.5,
        daysPerMonth: 26
      },
      {
        id: 'app-7-2',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 8,
        hoursWastedPerDay: 4.0,
        daysPerMonth: 26
      },
      {
        id: 'app-7-3',
        presetId: 'led_bulb',
        name: 'LED Bulb (Energy Saver)',
        category: 'Lighting',
        watts: 12,
        quantity: 16,
        hoursWastedPerDay: 5.0,
        daysPerMonth: 26
      },
      {
        id: 'app-7-4',
        presetId: 'water_dispenser',
        name: 'Electric Water Dispenser (Hot/Cold)',
        category: 'Appliances',
        watts: 500,
        quantity: 2,
        hoursWastedPerDay: 7.0,
        daysPerMonth: 30
      }
    ]
  },
  {
    id: 'room-8',
    name: 'Student Cafeteria & Lounge',
    building: 'Student Services Center',
    appliances: [
      {
        id: 'app-8-1',
        presetId: 'ac_1_5_ton',
        name: '1.5-Ton Split AC (Non-Inverter)',
        category: 'Cooling',
        watts: 1500,
        quantity: 3,
        hoursWastedPerDay: 3.0,
        daysPerMonth: 26
      },
      {
        id: 'app-8-2',
        presetId: 'ceiling_fan',
        name: 'Ceiling Fan (Standard AC Induction)',
        category: 'Ventilation',
        watts: 75,
        quantity: 10,
        hoursWastedPerDay: 6.0,
        daysPerMonth: 26
      },
      {
        id: 'app-8-3',
        presetId: 'tube_light',
        name: 'Tube Light (T8/T12 Fluorescent)',
        category: 'Lighting',
        watts: 40,
        quantity: 20,
        hoursWastedPerDay: 5.0,
        daysPerMonth: 26
      },
      {
        id: 'app-8-4',
        presetId: 'water_dispenser',
        name: 'Electric Water Dispenser (Hot/Cold)',
        category: 'Appliances',
        watts: 500,
        quantity: 2,
        hoursWastedPerDay: 8.0,
        daysPerMonth: 30
      }
    ]
  }
];
