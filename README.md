# ⚡ CampusWatt — Campus Energy Audit & Solar Planning Tool

> **Demo-ready web application built for the IRENA Youth Program**  
> **Author:** Soban, COMSATS University Islamabad  
> **Mission:** Quantifying institutional energy waste in Pakistan, proving the *Negawatt* efficiency rule, and right-sizing rooftop solar PV for nationwide decarbonization.  
> **SDG Alignment:** Supporting **UN SDG 7** (Affordable & Clean Energy) and **UN SDG 13** (Climate Action).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1-Click Launch (Windows)
Simply double-click the **`run.bat`** file in the project folder. It will:
1. Verify Node.js installation.
2. Automatically run `npm install` if dependencies are not yet installed.
3. Start the Vite development server and open your default browser to `http://localhost:5173/`.

### Manual Installation & Run
```bash
# 1. Clone or navigate to the project directory
cd SobyWeb

# 2. Install dependencies
npm install

# 3. Launch the development server
npm run dev
```

Then open your browser at **`http://localhost:5173/`**.

To test the production build locally:
```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to GitHub & Vercel

### Step 1: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (name it e.g. `campuswatt`).
2. Run the following commands in this directory:
```bash
git remote add origin https://github.com/YOUR_USERNAME/campuswatt.git
git push -u origin main
```

### Step 2: Deploy to Vercel (1-Click)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"** -> **"Project"**.
2. Select your newly pushed `campuswatt` GitHub repository and click **"Import"**.
3. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
4. Click **"Deploy"**! Your application will be live worldwide with free SSL in under 60 seconds.

*(Note: The included `vercel.json` already configures proper Single Page Application routing rewrites so all paths resolve cleanly without 404 errors).*

---

## 🛠️ Tech Stack
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Visualizations:** [Recharts](https://recharts.org/) (Bar charts, Donut category breakdown, 10-Year cumulative solar break-even cash flow line chart)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Micro-Animations:** Canvas-Confetti, smooth CSS transitions, and animated count-up stat numbers
- **State Management & Persistence:** React Context + `localStorage` (100% client-side, zero backend required)
- **Exporting:** Print-friendly executive summary modal with `window.print()` CSS

---

## 🎯 Core Features

### 1. Campus Room & Appliance Audit Entry
- **Room Management:** Add, edit, and delete campus facilities (e.g. *Computer Systems Lab 3*, *Lecture Hall 101*, *Central Library*).
- **Preset Appliances:**
  - Tube Light (T8/T12 Fluorescent, 40W)
  - LED Bulb (Energy Saver, 12W)
  - Ceiling Fan (Standard AC Induction, 75W)
  - 1.5-Ton Split AC (Non-Inverter, 1500W)
  - 1.0-Ton Split AC (Non-Inverter, 1000W)
  - Classroom Multimedia Projector (250W)
  - Desktop PC & Monitor (200W)
  - Electric Water Dispenser (500W)
  - Custom Appliance (User-defined name and wattage)
- **Parameters per Appliance:** Quantity, hours wasted per day (running in empty/unoccupied rooms), and operating days per month (default 26 days).
- **One-Click Demo Button:** `Load Sample Data` button that populates **8 realistic Pakistani university campus rooms** with over 300 audited electrical loads.

### 2. Live Automatic Waste Calculator
- Automatically aggregates daily kWh, monthly kWh, monthly cost in PKR, annual cost in PKR, and annual CO2 footprint (in kg and metric tonnes).
- **Top 3 Wasters:** Automatically ranks the top 3 worst-offending rooms and top 3 appliance types across campus with visual share percentages.

### 3. Solar PV Recommendation & The "Negawatt" Strategy
- Calculates required rooftop solar DC capacity (kWp) needed to offset campus waste.
- Computes estimated turnkey installation Capex (PKR), annual generation (kWh), annual electricity bill savings (PKR), simple payback period (years), and 25-year cumulative net profit.
- **Waste Fix vs. Solar Comparison:** Side-by-side comparison demonstrating why investing in smart PIR occupancy sensors (~Rs 3,200/room with payback in mere weeks) is vastly more cost-effective than overbuilding oversized solar PV hardware.

### 4. Pakistan Nationwide Scale-Up Simulation
- Interactive sliders for:
  - **HEC Recognized Universities in Pakistan** (default 250 campuses).
  - **Target Campus Waste Reduction** (default 50%).
- Real-time macro outputs:
  - National savings in Million & Billion PKR per year.
  - Energy conserved in GWh per year (relieving Pakistan's national grid stress).
  - Carbon emissions abated (metric tonnes CO2/yr).
  - Equivalent mature trees planted and household power equivalents.
  - Official badges for **UN SDG 7** and **UN SDG 13**.

### 5. Live Assumptions Panel
All engineering constants can be tuned live in the UI with immediate recalculation:
- **Electricity Tariff:** Default Rs 50 / kWh (NEPRA institutional blended rate).
- **Peak Sun Hours (PSH):** Default 5.5 hours/day (Pakistan average solar irradiance).
- **System Efficiency (Performance Ratio):** Default 0.80 (80%).
- **Solar Cost per kW:** Default Rs 150,000 / kW (Turnkey EPC commercial cost).
- **Grid Emission Factor:** Default 0.45 kg CO2 / kWh (NTDC / IGES baseline).
- **Universities in Pakistan:** Default 250 HEC degree-awarding institutions.
- Includes a **Reset to Defaults** button.

### 6. Demo Video & Report Tools
- **2-Minute Video Pitch Guide:** Built-in teleprompter modal with 30-second timestamped segments tailored for Soban's video submission.
- **Generate Report Modal:** Clean printable executive summary view ready for PDF export or A4 printing.

---

## 📐 Formulas & Calculation Engine (`src/utils/calculations.js`)

All platform calculations are centralized in [src/utils/calculations.js](file:///d:/SobyWeb/src/utils/calculations.js):

### 1. Appliance Energy Waste Formulas
$$\text{Daily kWh Wasted} = \frac{\text{Rated Watts} \times \text{Quantity} \times \text{Wasted Hours in Empty Room}}{1000}$$

$$\text{Monthly kWh Wasted} = \text{Daily kWh} \times \text{Operating Days per Month}$$

$$\text{Monthly Financial Loss (PKR)} = \text{Monthly kWh} \times \text{Electricity Tariff (PKR/kWh)}$$

$$\text{Annual Financial Loss (PKR)} = \text{Monthly Financial Loss} \times 12$$

$$\text{Annual } \text{CO}_2 \text{ (kg)} = (\text{Monthly kWh} \times 12) \times \text{Grid Emission Factor (kg }\text{CO}_2\text{/kWh)}$$

$$\text{Annual } \text{CO}_2 \text{ (Tonnes)} = \frac{\text{Annual } \text{CO}_2 \text{ (kg)}}{1000}$$

---

### 2. Solar PV Sizing & Financial ROI Formulas
$$\text{Required PV Size (kWp)} = \frac{\text{Total Daily kWh}}{\text{Peak Sun Hours} \times \text{System Efficiency (PR)}}$$

$$\text{Estimated Installation Cost (PKR)} = \text{Required PV Size (kWp)} \times \text{Solar Cost per kW (PKR/kW)}$$

$$\text{Annual Solar Generation (kWh/yr)} = \text{Required PV Size (kWp)} \times \text{Peak Sun Hours} \times 365 \times \text{System Efficiency}$$

$$\text{Annual Financial Savings (PKR/yr)} = \text{Annual Solar Generation (kWh)} \times \text{Electricity Tariff (PKR/kWh)}$$

$$\text{Simple Payback Period (Years)} = \frac{\text{Estimated Installation Cost (PKR)}}{\text{Annual Financial Savings (PKR)}}$$

$$\text{25-Year Net Savings (PKR)} = (\text{Annual Financial Savings} \times 25) - \text{Estimated Installation Cost}$$

$$\text{Annual Solar } \text{CO}_2 \text{ Avoided (Tonnes)} = \frac{\text{Annual Generation (kWh)} \times \text{Grid Emission Factor}}{1000}$$

---

### 3. Waste Fix vs. Solar ("Negawatt Strategy")
$$\text{Occupancy Sensor Capex (PKR)} = \text{Number of Audited Rooms} \times \text{PKR } 4,000$$

$$\text{Monthly Avoided Loss (PKR)} = \text{Campus Monthly Waste Cost} \times 85\%$$

$$\text{Sensor Payback Period (Months)} = \frac{\text{Sensor Capex}}{\text{Monthly Avoided Loss}}$$

$$\text{Solar Capex Avoided (PKR)} = \text{Total Solar Capex} \times 85\%$$

---

### 4. Nationwide Scale-Up Formulas
$$\text{National Annual Savings (PKR)} = \text{Single Campus Yearly Cost} \times \text{Universities Count} \times \left(\frac{\text{Reduction \%}}{100}\right)$$

$$\text{National Energy Conserved (GWh/yr)} = \frac{\text{Single Campus Yearly kWh} \times \text{Universities Count} \times \left(\frac{\text{Reduction \%}}{100}\right)}{1,000,000}$$

$$\text{National } \text{CO}_2 \text{ Avoided (Tonnes/yr)} = \frac{\text{Single Campus Yearly } \text{CO}_2 \text{ (kg)} \times \text{Universities Count} \times \left(\frac{\text{Reduction \%}}{100}\right)}{1000}$$

$$\text{Equivalent Mature Trees Planted} = \text{National Tonnes } \text{CO}_2 \times 45.93$$
*(Based on the international standard of 1 mature tree sequestering ~21.77 kg $\text{CO}_2$ per year).*

---

## 🎙️ 2-Minute Video Pitch Script Blueprint

| Timestamp | Presentation Phase | Key Talking Points |
|---|---|---|
| **0:00 – 0:30** | **The Problem** | *“Hello IRENA! I'm Soban from COMSATS University Islamabad. In Pakistan, commercial tariffs exceed Rs 50/kWh, yet air conditioners, fans, and lights run for hours in empty campus halls. Meet CampusWatt.”* |
| **0:30 – 1:00** | **Campus Audit** | *“We log rooms and appliances with presets like 1.5-ton ACs and lab computers. Our live calculation engine proves that an 8-room demo loses over Rs 200,000 every single month in phantom power.”* |
| **1:00 – 1:30** | **Negawatts & Solar** | *“IRENA's cardinal rule: First Negawatt, then Megawatt! Occupancy sensors cost just Rs 3,200/room and pay back in weeks, preventing oversized solar hardware. Then, rooftop solar provides clean power with a 3-year payback.”* |
| **1:30 – 2:00** | **Scale & Close** | *“Scaled across Pakistan's 250 HEC universities, this saves billions of Rupees, conserves tens of GWh, and avoids thousands of tonnes of CO2 — advancing UN SDG 7 and SDG 13!”* |

---

## 🏛️ Attribution & Credits
**Built by Soban, COMSATS University Islamabad. Supporting SDG 7 and SDG 13.**  
Prepared for submission to the **IRENA Youth Innovation Program**.
