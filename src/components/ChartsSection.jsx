import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPKR } from '../utils/calculations';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';
import { Flame, Trophy, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';

const DONUT_COLORS = [
  '#10B981', // emerald
  '#06B6D4', // cyan
  '#F59E0B', // amber
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#3B82F6', // blue
  '#14B8A6', // teal
  '#F97316'  // orange
];

// Custom Tooltip for Recharts
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md text-xs text-white">
        <p className="font-bold text-slate-200">{label}</p>
        <p className="text-amber-400 font-semibold mt-1">
          Monthly Waste: {Math.round(data.kwhPerMonth).toLocaleString()} kWh
        </p>
        <p className="text-emerald-400 font-semibold">
          Financial Loss: {formatPKR(data.costPerMonth)}
        </p>
        <p className="text-slate-400 text-[11px] mt-0.5">
          {data.appliancesCount} appliances logged
        </p>
      </div>
    );
  }
  return null;
};

const CustomDonutTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md text-xs text-white">
        <p className="font-bold text-slate-200">{data.name}</p>
        <p className="text-cyan-400 font-semibold mt-1">
          {Math.round(data.kwhPerMonth).toLocaleString()} kWh / month
        </p>
        <p className="text-emerald-400 font-semibold">
          {formatPKR(data.costPerMonth)} / month
        </p>
        <p className="text-slate-400 text-[11px] mt-0.5">
          {data.totalQty} total units across campus
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const net = payload.find((p) => p.dataKey === 'cumulativeNetSavings');
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md text-xs text-white">
        <p className="font-bold text-slate-200">{label}</p>
        {net && (
          <p
            className={`font-bold mt-1 ${
              net.value >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            Net Cash Flow: {formatPKR(net.value)}
          </p>
        )}
        <p className="text-slate-400 text-[11px] mt-0.5">
          {net?.value >= 0 ? 'Profitable / Net Positive' : 'Payback Period in Progress'}
        </p>
      </div>
    );
  }
  return null;
};

export default function ChartsSection() {
  const { summary, solar, isDarkMode } = useApp();

  // Top 3 wasters
  const topRooms = summary.topRooms || [];
  const topApplianceTypes = summary.topApplianceTypes || [];

  // Bar chart data: truncate long room names for label aesthetics
  const roomBarData = (summary.roomBreakdowns || []).map((r) => ({
    ...r,
    displayName: r.roomName.length > 16 ? `${r.roomName.substring(0, 14)}...` : r.roomName
  }));

  // Donut chart data
  const donutData = (summary.applianceTypes || []).filter((a) => a.kwhPerMonth > 0);

  // Line chart data
  const lineData = solar.cashFlowTimeline || [];

  const textColor = isDarkMode ? '#94A3B8' : '#64748B';
  const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(226, 232, 240, 0.8)';

  return (
    <section className="py-12 border-t border-slate-200/80 dark:border-slate-800">
      <div className="mb-8">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          Step 2: Analytics & Waste Drivers
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
          Energy Loss Diagnostics
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Visualizing where phantom energy escapes across campus and proving the financial ROI of solar deployment.
        </p>
      </div>

      {/* Top 3 Biggest Wasters Callout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Top 3 Rooms */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Flame className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Top 3 Wasters: By Campus Room
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Ranked by Monthly kWh</span>
          </div>

          {topRooms.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No room data recorded</p>
          ) : (
            <div className="space-y-3">
              {topRooms.map((room, idx) => {
                const percentOfTotal = summary.totalMonthlyKwh > 0
                  ? (room.kwhPerMonth / summary.totalMonthlyKwh) * 100
                  : 0;

                const medals = ['🥇', '🥈', '🥉'];

                return (
                  <div key={room.roomId} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{medals[idx] || `#${idx + 1}`}</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                          {room.roomName}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-amber-500 dark:text-amber-400 font-mono">
                          {Math.round(room.kwhPerMonth).toLocaleString()} kWh
                        </span>
                        <span className="text-slate-400 text-[10px] ml-1">
                          ({formatPKR(room.costPerMonth)})
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(5, percentOfTotal))}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                      <span>{room.appliancesCount} appliances logged</span>
                      <span>{percentOfTotal.toFixed(1)}% of campus total</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top 3 Appliance Types */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <Trophy className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Top 3 Wasters: By Appliance Type
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Ranked by Monthly kWh</span>
          </div>

          {topApplianceTypes.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No appliance data recorded</p>
          ) : (
            <div className="space-y-3">
              {topApplianceTypes.map((app, idx) => {
                const percentOfTotal = summary.totalMonthlyKwh > 0
                  ? (app.kwhPerMonth / summary.totalMonthlyKwh) * 100
                  : 0;

                const medals = ['🥇', '🥈', '🥉'];

                return (
                  <div key={app.name} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{medals[idx] || `#${idx + 1}`}</span>
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                          {app.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-cyan-500 dark:text-cyan-400 font-mono">
                          {Math.round(app.kwhPerMonth).toLocaleString()} kWh
                        </span>
                        <span className="text-slate-400 text-[10px] ml-1">
                          ({formatPKR(app.costPerMonth)})
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.max(5, percentOfTotal))}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                      <span>{app.totalQty} units across campus</span>
                      <span>{percentOfTotal.toFixed(1)}% of total waste</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Main Charts: Room Bar Chart & Appliance Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart 1: Bar Chart of Waste by Room */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Waste by Room
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly electricity waste (kWh) across audited campus facilities
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-500">kWh/month</span>
          </div>

          <div className="h-72 w-full">
            {roomBarData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                No room data to display
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomBarData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis
                    dataKey="displayName"
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar
                    dataKey="kwhPerMonth"
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: Donut Chart of Waste by Appliance Type */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Waste Breakdown by Appliance
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribution of idle energy loss by equipment category
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500">Categories</span>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            {donutData.length === 0 ? (
              <div className="text-slate-400 text-xs">No appliance data to display</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomDonutTooltip />} />
                  <Pie
                    data={donutData}
                    dataKey="kwhPerMonth"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {donutData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Chart 3: 10-Year Cumulative Solar Savings vs Initial Cost (Break-Even Curve) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                10-Year Cumulative Solar Cash Flow & Break-Even Curve
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracking upfront capital outlay vs cumulative electricity savings. The line crosses zero at the break-even point.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              Break-Even: Year {solar.paybackPeriodYears}
            </span>
            <span className="font-mono text-slate-400">
              Annual Savings: {formatPKR(solar.annualSavingsRs)}
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 15, right: 20, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="year" stroke={textColor} fontSize={11} tickLine={false} />
              <YAxis
                stroke={textColor}
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `Rs ${(val / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomLineTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
              {/* Break-even zero line */}
              <ReferenceLine y={0} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Break-Even (PKR 0)', fill: '#EF4444', fontSize: 10, position: 'right' }} />
              <Line
                type="monotone"
                dataKey="cumulativeNetSavings"
                name="Cumulative Net Cash Flow (PKR)"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 4, fill: '#10B981' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="cumulativeGrossSavings"
                name="Gross Solar Generation Savings"
                stroke="#06B6D4"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
