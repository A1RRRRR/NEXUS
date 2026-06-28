'use client'

export default function ChartLegend() {
  const items = [
    { color: 'bg-green-500',  label: 'Bullish FVG' },
    { color: 'bg-red-500',    label: 'Bearish FVG' },
    { color: 'bg-blue-400',   label: 'Support / Resistance' },
    { color: 'bg-yellow-400', label: 'Liquidity Zone' },
    { color: 'bg-purple-400', label: 'Liquidity Sweep' },
    { color: 'bg-orange-400', label: 'Fake-out / Be Patient' },
    { color: 'bg-emerald-400',label: 'Long Entry' },
    { color: 'bg-rose-500',   label: 'Short Entry' },
    { color: 'bg-white',      label: 'ATH / ATL' },
  ]

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 bg-terminal-surface border-b border-terminal-border">
      {items.map(({ color, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-sm ${color} opacity-80`} />
          <span className="text-[10px] text-gray-400 font-mono">{label}</span>
        </div>
      ))}
    </div>
  )
}
