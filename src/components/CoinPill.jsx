import React from 'react';

export default function CoinPill({ type, amount, size = 'md' }) {
  const configs = {
    happy: {
      color: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800',
      dot: 'bg-amber-400',
      label: 'Happy',
      symbol: '🟡'
    },
    calm: {
      color: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800',
      dot: 'bg-sky-400',
      label: 'Calm',
      symbol: '🔵'
    },
    growth: {
      color: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800',
      dot: 'bg-purple-400',
      label: 'Growth',
      symbol: '🟣'
    }
  };

  const c = configs[type] || configs.calm;
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center gap-1.5 border rounded-full font-medium transition-all ${c.color} ${
        isSm ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      title={`${amount} ${c.label} Coins`}
    >
      <span className="text-xs">{c.symbol}</span>
      <span className="font-semibold tracking-tight">{amount}</span>
    </div>
  );
}
