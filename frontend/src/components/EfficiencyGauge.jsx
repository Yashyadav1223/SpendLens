export function EfficiencyGauge({ score }) {
  const rotation = Math.min(Math.max(score, 0), 100) * 1.8 - 90

  return (
    <div className="relative mx-auto h-44 w-72 max-w-full">
      <div className="absolute inset-x-0 top-0 h-36 overflow-hidden">
        <div className="h-72 rounded-full border-[22px] border-white/10" />
        <div
          className="absolute inset-x-0 top-0 h-72 rounded-full border-[22px] border-transparent border-t-emerald-400 border-r-primary"
          style={{ transform: 'rotate(45deg)' }}
        />
      </div>
      <div
        className="absolute bottom-9 left-1/2 h-1.5 w-28 origin-left rounded-full bg-white shadow-glow"
        style={{ transform: `translateX(-4px) rotate(${rotation}deg)` }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <p className="text-5xl font-bold text-[var(--text-main)]">{score}</p>
        <p className="text-sm text-[var(--text-muted)]">Efficiency score</p>
      </div>
    </div>
  )
}
