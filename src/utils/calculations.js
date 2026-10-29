/**
 * CampusWatt Energy & Solar Calculation Engine
 * Contains all mathematical formulas used throughout the platform.
 * Tailored for Pakistani university campus energy audits and IRENA Youth Program.
 */

/**
 * Calculate waste metrics for a single appliance entry.
 *
 * FORMULAS:
 * 1. Daily Wasted Energy (kWh/day) = (Rated Watts * Quantity * Hours Wasted in Empty Room) / 1000
 * 2. Monthly Wasted Energy (kWh/month) = Daily kWh * Days Active per Month
 * 3. Monthly Financial Waste (PKR) = Monthly kWh * Electricity Tariff (PKR/kWh)
 * 4. Annual Financial Waste (PKR) = Monthly PKR * 12
 * 5. Annual CO2 Footprint (kg) = (Monthly kWh * 12) * Grid Emission Factor (kg CO2/kWh)
 *
 * @param {Object} appliance - Appliance object { watts, quantity, hoursWastedPerDay, daysPerMonth }
 * @param {Object} settings - Settings object { electricityTariff, gridEmissionFactor }
 * @returns {Object} Calculated metrics for the appliance
 */
export function calculateApplianceWaste(appliance, settings) {
  const watts = Math.max(0, Number(appliance.watts) || 0);
  const qty = Math.max(0, Number(appliance.quantity) || 0);
  const hours = Math.max(0, Number(appliance.hoursWastedPerDay) || 0);
  const daysPerMonth = Math.max(0, Number(appliance.daysPerMonth) || 26);
  const tariff = Math.max(0, Number(settings.electricityTariff) || 50);
  const emissionFactor = Math.max(0, Number(settings.gridEmissionFactor) || 0.45);

  // Daily energy wasted in kWh
  const kwhPerDay = (watts * qty * hours) / 1000;

  // Monthly energy wasted in kWh
  const kwhPerMonth = kwhPerDay * daysPerMonth;

  // Yearly energy wasted in kWh
  const kwhPerYear = kwhPerMonth * 12;

  // Monthly & Yearly cost in PKR
  const costPerMonth = kwhPerMonth * tariff;
  const costPerYear = costPerMonth * 12;

  // Annual CO2 footprint in kg and metric tonnes
  const co2KgPerYear = kwhPerYear * emissionFactor;
  const co2TonnesPerYear = co2KgPerYear / 1000;

  return {
    kwhPerDay,
    kwhPerMonth,
    kwhPerYear,
    costPerMonth,
    costPerYear,
    co2KgPerYear,
    co2TonnesPerYear
  };
}

/**
 * Calculate total campus audit summary across all rooms and appliances.
 *
 * @param {Array} rooms - Array of room objects with appliances
 * @param {Object} settings - Current assumptions and settings
 * @returns {Object} Comprehensive audit summary
 */
export function calculateCampusSummary(rooms = [], settings) {
  let totalDailyKwh = 0;
  let totalMonthlyKwh = 0;
  let totalYearlyKwh = 0;
  let totalMonthlyCost = 0;
  let totalYearlyCost = 0;
  let totalYearlyCo2Kg = 0;
  let totalYearlyCo2Tonnes = 0;
  let totalAppliancesCount = 0;

  const roomBreakdowns = [];
  const applianceTypeMap = {};

  rooms.forEach((room) => {
    let roomDailyKwh = 0;
    let roomMonthlyKwh = 0;
    let roomMonthlyCost = 0;
    let roomYearlyCost = 0;
    let roomAppliancesCount = 0;

    (room.appliances || []).forEach((app) => {
      const metrics = calculateApplianceWaste(app, settings);

      roomDailyKwh += metrics.kwhPerDay;
      roomMonthlyKwh += metrics.kwhPerMonth;
      roomMonthlyCost += metrics.costPerMonth;
      roomYearlyCost += metrics.costPerYear;
      roomAppliancesCount += Number(app.quantity) || 0;

      // Group by appliance type for donut chart and top wasters
      const appName = app.name || 'Other';
      if (!applianceTypeMap[appName]) {
        applianceTypeMap[appName] = {
          name: appName,
          category: app.category || 'General',
          kwhPerMonth: 0,
          costPerMonth: 0,
          totalQty: 0
        };
      }
      applianceTypeMap[appName].kwhPerMonth += metrics.kwhPerMonth;
      applianceTypeMap[appName].costPerMonth += metrics.costPerMonth;
      applianceTypeMap[appName].totalQty += Number(app.quantity) || 0;
    });

    totalDailyKwh += roomDailyKwh;
    totalMonthlyKwh += roomMonthlyKwh;
    totalYearlyKwh += roomMonthlyKwh * 12;
    totalMonthlyCost += roomMonthlyCost;
    totalYearlyCost += roomYearlyCost;
    totalAppliancesCount += roomAppliancesCount;

    roomBreakdowns.push({
      roomId: room.id,
      roomName: room.name,
      appliancesCount: roomAppliancesCount,
      kwhPerDay: roomDailyKwh,
      kwhPerMonth: roomMonthlyKwh,
      costPerMonth: roomMonthlyCost,
      costPerYear: roomYearlyCost
    });
  });

  const emissionFactor = Math.max(0, Number(settings.gridEmissionFactor) || 0.45);
  totalYearlyCo2Kg = totalYearlyKwh * emissionFactor;
  totalYearlyCo2Tonnes = totalYearlyCo2Kg / 1000;

  // Sort rooms to find top wasters
  const sortedRooms = [...roomBreakdowns].sort((a, b) => b.kwhPerMonth - a.kwhPerMonth);
  const topRooms = sortedRooms.slice(0, 3);

  // Sort appliance types to find top wasters
  const sortedApplianceTypes = Object.values(applianceTypeMap).sort((a, b) => b.kwhPerMonth - a.kwhPerMonth);
  const topApplianceTypes = sortedApplianceTypes.slice(0, 3);

  return {
    totalDailyKwh,
    totalMonthlyKwh,
    totalYearlyKwh,
    totalMonthlyCost,
    totalYearlyCost,
    totalYearlyCo2Kg,
    totalYearlyCo2Tonnes,
    totalAppliancesCount,
    totalRoomsCount: rooms.length,
    roomBreakdowns,
    applianceTypes: sortedApplianceTypes,
    topRooms,
    topApplianceTypes
  };
}

/**
 * Calculate Solar PV Recommendation to offset campus energy waste.
 *
 * FORMULAS:
 * 1. Required System Size (kWp) = Daily kWh / (Peak Sun Hours * System Efficiency PR)
 * 2. Estimated Installation Capital Cost (PKR) = Required System Size (kW) * Solar Cost per kW (PKR/kW)
 * 3. Annual Solar Generation (kWh/yr) = Required System Size (kW) * Peak Sun Hours * 365 days * System Efficiency
 * 4. Annual Solar Financial Savings (PKR/yr) = Annual Generation (kWh) * Electricity Tariff (PKR/kWh)
 * 5. Simple Payback Period (Years) = Estimated Capex (PKR) / Annual Savings (PKR)
 * 6. 25-Year Cumulative Net Savings (PKR) = (Annual Savings * 25) - Estimated Capex
 * 7. Annual CO2 Avoided (Metric Tonnes) = (Annual Solar Generation * Grid Emission Factor) / 1000
 *
 * @param {number} dailyKwh - Total daily kWh wasted/needed to be offset
 * @param {Object} settings - Assumptions
 * @returns {Object} Solar sizing, financial ROI, and 10-year cash flow projections
 */
export function calculateSolarRecommendation(dailyKwh, settings) {
  const peakSunHours = Math.max(0.1, Number(settings.peakSunHours) || 5.5);
  const efficiency = Math.max(0.1, Math.min(1.0, Number(settings.systemEfficiency) || 0.8));
  const costPerKw = Math.max(0, Number(settings.solarCostPerKw) || 150000);
  const tariff = Math.max(0, Number(settings.electricityTariff) || 50);
  const emissionFactor = Math.max(0, Number(settings.gridEmissionFactor) || 0.45);

  // 1. Required PV System Capacity in kW (rounded to 1 decimal place)
  const rawSizeKw = dailyKwh / (peakSunHours * efficiency);
  const requiredSystemSizeKw = Number(rawSizeKw.toFixed(2));

  // 2. Capital Cost
  const estimatedInstallCostRs = Math.round(requiredSystemSizeKw * costPerKw);

  // 3. Annual Generation
  const annualSolarGenerationKwh = Math.round(requiredSystemSizeKw * peakSunHours * 365 * efficiency);

  // 4. Annual Financial Savings
  const annualSavingsRs = Math.round(annualSolarGenerationKwh * tariff);

  // 5. Payback Period
  const paybackPeriodYears = annualSavingsRs > 0 ? Number((estimatedInstallCostRs / annualSavingsRs).toFixed(1)) : 0;

  // 6. 25-Year Net Savings
  const netSavings25YearsRs = (annualSavingsRs * 25) - estimatedInstallCostRs;

  // 7. CO2 avoided per year (tonnes)
  const co2AvoidedPerYearTonnes = Number(((annualSolarGenerationKwh * emissionFactor) / 1000).toFixed(2));

  // 10-Year Cumulative Cash Flow Projection for Break-Even Recharts graph
  const cashFlowTimeline = [];
  for (let year = 0; year <= 10; year++) {
    // Year 0 represents upfront investment cost (negative)
    // Year 1-10 represents cumulative savings minus initial Capex
    const cumulativeSolarNet = (annualSavingsRs * year) - estimatedInstallCostRs;
    const businessAsUsualExpense = annualSavingsRs * year; // What university would have lost paying utility bills

    cashFlowTimeline.push({
      year: `Year ${year}`,
      yearNumber: year,
      cumulativeNetSavings: cumulativeSolarNet,
      withoutSolarLoss: -businessAsUsualExpense,
      solarInvestment: -estimatedInstallCostRs,
      cumulativeGrossSavings: annualSavingsRs * year
    });
  }

  return {
    requiredSystemSizeKw,
    estimatedInstallCostRs,
    annualSolarGenerationKwh,
    annualSavingsRs,
    paybackPeriodYears,
    netSavings25YearsRs,
    co2AvoidedPerYearTonnes,
    cashFlowTimeline
  };
}

/**
 * Compare Waste Elimination ("Negawatts") vs Solar Generation ("Megawatts").
 * Demonstrates the IRENA principle: "The greenest energy is the energy not wasted."
 *
 * Behavior change + PIR motion sensors cost ~PKR 3,000 per room.
 * Payback for waste elimination is typically weeks, compared to years for solar.
 *
 * @param {Object} summary - Campus summary data
 * @param {Object} solar - Solar recommendation data
 * @returns {Object} Comparison metrics
 */
export function calculateWasteFixVsSolar(summary, solar) {
  const roomsCount = Math.max(1, summary.totalRoomsCount || 1);
  const sensorCostPerRoom = 3200; // Estimated cost for smart PIR motion sensor + automated cutoff switch in Pakistan
  const behaviorCostPerRoom = 800; // Signage, student eco-ambassador campaign, stickers
  const totalFixCost = roomsCount * (sensorCostPerRoom + behaviorCostPerRoom);

  // Assuming sensors & behavior eradicate 85% of empty-room idle waste
  const expectedWasteReductionFactor = 0.85;
  const annualWasteCostSaved = summary.totalYearlyCost * expectedWasteReductionFactor;
  const monthlyWasteCostSaved = summary.totalMonthlyCost * expectedWasteReductionFactor;

  // Payback in months
  const fixPaybackMonths = monthlyWasteCostSaved > 0
    ? Number((totalFixCost / monthlyWasteCostSaved).toFixed(1))
    : 0;

  // Solar system size if waste is already reduced by 85%
  const rightSizedDailyKwh = summary.totalDailyKwh * (1 - expectedWasteReductionFactor);
  const solarSavingsCapex = solar.estimatedInstallCostRs * expectedWasteReductionFactor;

  return {
    totalFixCost,
    annualWasteCostSaved,
    monthlyWasteCostSaved,
    fixPaybackMonths,
    solarCapex: solar.estimatedInstallCostRs,
    solarPaybackYears: solar.paybackPeriodYears,
    capexSavedOnSolar: Math.round(solarSavingsCapex),
    recommendationMessage: `By investing only Rs ${totalFixCost.toLocaleString()} in occupancy sensors and behavioral awareness (payback in ${fixPaybackMonths} months), the campus avoids needing Rs ${Math.round(solarSavingsCapex).toLocaleString()} worth of oversized solar panels!`
  };
}

/**
 * Calculate Nationwide Scale-Up Impact across Pakistani Universities.
 *
 * FORMULAS:
 * 1. National Annual Financial Savings (PKR) = Single Campus Yearly Waste Cost * Universities Count * (% Reduction / 100)
 * 2. National Annual Energy Saved (GWh) = (Single Campus Yearly kWh * Universities Count * (% Reduction / 100)) / 1,000,000
 * 3. National Annual CO2 Avoided (Metric Tonnes) = (Single Campus Yearly CO2 kg * Universities Count * (% Reduction / 100)) / 1,000
 * 4. Equivalent Trees Planted = Tonnes CO2 Avoided * 45.9 (1 mature tree sequesters ~21.77 kg CO2/year)
 *
 * @param {Object} summary - Campus summary data
 * @param {Object} settings - Settings with universitiesInPakistan and wasteReductionPercent
 * @returns {Object} National macro impact
 */
export function calculateScaleUpImpact(summary, settings) {
  const unisCount = Math.max(1, Number(settings.universitiesInPakistan) || 250);
  const reductionPercent = Math.max(1, Math.min(100, Number(settings.wasteReductionPercent) || 50));
  const reductionFactor = reductionPercent / 100;

  // Single campus baseline
  const singleCampusYearlyCost = summary.totalYearlyCost;
  const singleCampusYearlyKwh = summary.totalYearlyKwh;
  const singleCampusYearlyCo2Kg = summary.totalYearlyCo2Kg;

  // Macro scale
  const nationalSavingsRs = singleCampusYearlyCost * unisCount * reductionFactor;
  const nationalSavingsMillionRs = Number((nationalSavingsRs / 1000000).toFixed(2));
  const nationalSavingsBillionRs = Number((nationalSavingsRs / 1000000000).toFixed(3));

  const nationalGwhSaved = Number(((singleCampusYearlyKwh * unisCount * reductionFactor) / 1000000).toFixed(2));
  const nationalCo2TonnesAvoided = Number(((singleCampusYearlyCo2Kg * unisCount * reductionFactor) / 1000).toFixed(1));

  // 1 tree absorbs ~21.77 kg CO2 / year => 1000 kg / 21.77 kg = 45.93 trees per metric tonne of CO2
  const equivalentTrees = Math.round(nationalCo2TonnesAvoided * 45.93);

  // Homes powered equivalent (avg Pakistani household consumes ~250 kWh/month = 3,000 kWh/year)
  const equivalentHomesPowered = Math.round((nationalGwhSaved * 1000000) / 3000);

  return {
    unisCount,
    reductionPercent,
    nationalSavingsRs,
    nationalSavingsMillionRs,
    nationalSavingsBillionRs,
    nationalGwhSaved,
    nationalCo2TonnesAvoided,
    equivalentTrees,
    equivalentHomesPowered
  };
}

/**
 * Format currency in Pakistani Rupees (PKR) with compact abbreviations for large numbers.
 */
export function formatPKR(val, compact = false) {
  const num = Number(val) || 0;
  if (!compact) {
    return `Rs ${Math.round(num).toLocaleString('en-PK')}`;
  }
  if (Math.abs(num) >= 1000000000) {
    return `Rs ${(num / 1000000000).toFixed(2)}B`;
  }
  if (Math.abs(num) >= 1000000) {
    return `Rs ${(num / 1000000).toFixed(2)}M`;
  }
  if (Math.abs(num) >= 1000) {
    return `Rs ${(num / 1000).toFixed(1)}k`;
  }
  return `Rs ${Math.round(num)}`;
}

/**
 * Format numbers with unit abbreviations (k, M, G).
 */
export function formatNumber(val, decimals = 1) {
  const num = Number(val) || 0;
  return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
}
