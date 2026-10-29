import React, { useState, useEffect } from 'react';

export default function StatCard({
  title,
  value,
  unit = '',
  prefix = '',
  suffix = '',
  subtext,
  icon: Icon,
  trend,
  colorScheme = 'emerald', // 'emerald', 'amber', 'cyan', 'violet'
  decimals = 0
}) {
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth number count-up animation
  useEffect(() => {
    const target = Number(value) || 0;
    const duration = 800; // ms
    const startTime = performance.now();
    const startValue = displayValue;

    let frameId;
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(target);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  const colorStyles = {
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      glow: 'from-emerald-500/10 via-transparent to-transparent',
      text: 'text-emerald-400'
    },
    amber: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-400',
      glow: 'from-amber-500/10 via-transparent to-transparent',
      text: 'text-amber-400'
    },
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      iconBg: 'bg-cyan-500/15 text-cyan-400',
      glow: 'from-cyan-500/10 via-transparent to-transparent',
      text: 'text-cyan-400'
    },
    violet: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-400',
      glow: 'from-purple-500/10 via-transparent to-transparent',
      text: 'text-purple-400'
    }
  };

  const scheme = colorStyles[colorScheme] || colorStyles.emerald;

  const formattedNumber = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md ${scheme.border}`}
    >
      {/* Background ambient glow */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${scheme.glow} blur-2xl pointer-events-none`} />

      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
          {title}
        </p>
        {Icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${scheme.iconBg}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        {prefix && (
          <span className="text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-200">
            {prefix}
          </span>
        )}
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
          {formattedNumber}
        </h3>
        {unit && (
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {unit}
          </span>
        )}
        {suffix && (
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {subtext}
          </span>
          {trend && (
            <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${scheme.badge}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
