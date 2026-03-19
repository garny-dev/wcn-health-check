interface GrowingTreeProps {
  stage: number | null
}

export function GrowingTree({ stage }: GrowingTreeProps) {
  const s = stage || 0
  
  return (
    <div className="relative w-full h-40 flex items-end justify-center">
      <svg 
        viewBox="0 0 200 140" 
        className="w-full h-full max-w-xs"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
      >
        {/* Ground */}
        <ellipse 
          cx="100" 
          cy="130" 
          rx="80" 
          ry="10" 
          className="fill-amber-900/60 transition-all duration-500"
        />
        
        {/* Soil mound */}
        <ellipse 
          cx="100" 
          cy="125" 
          rx="40" 
          ry="8" 
          className="fill-amber-800/80 transition-all duration-500"
        />

        {/* Main trunk - grows with stages */}
        <rect
          x="97"
          y={125 - (s * 20)}
          width="6"
          height={s * 20}
          rx="3"
          className="fill-green-700 transition-all duration-500 ease-out"
          style={{ transformOrigin: '100px 125px' }}
        />

        {/* Stage 1+: Small leaves */}
        <g 
          className="transition-all duration-500"
          style={{ 
            opacity: s >= 1 ? 1 : 0,
            transform: `scale(${s >= 1 ? 1 : 0})`,
            transformOrigin: '100px 115px'
          }}
        >
          <ellipse cx="90" cy="112" rx="8" ry="5" className="fill-green-500" transform="rotate(-35 90 112)" />
          <ellipse cx="110" cy="112" rx="8" ry="5" className="fill-green-500" transform="rotate(35 110 112)" />
        </g>

        {/* Stage 2+: More leaves */}
        <g 
          className="transition-all duration-500"
          style={{ 
            opacity: s >= 2 ? 1 : 0,
            transform: `scale(${s >= 2 ? 1 : 0})`,
            transformOrigin: '100px 95px'
          }}
        >
          <ellipse cx="85" cy="95" rx="12" ry="6" className="fill-lime-500" transform="rotate(-40 85 95)" />
          <ellipse cx="115" cy="95" rx="12" ry="6" className="fill-lime-500" transform="rotate(40 115 95)" />
          <ellipse cx="92" cy="85" rx="10" ry="5" className="fill-green-400" transform="rotate(-25 92 85)" />
          <ellipse cx="108" cy="85" rx="10" ry="5" className="fill-green-400" transform="rotate(25 108 85)" />
        </g>

        {/* Stage 3+: Full canopy */}
        <g 
          className="transition-all duration-500"
          style={{ 
            opacity: s >= 3 ? 1 : 0,
            transform: `scale(${s >= 3 ? 1 : 0})`,
            transformOrigin: '100px 60px'
          }}
        >
          {/* Branches */}
          <path d="M100 70 L75 50" className="stroke-green-600" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M100 70 L125 50" className="stroke-green-600" strokeWidth="4" strokeLinecap="round" fill="none" />
          
          {/* Canopy */}
          <circle cx="75" cy="45" r="15" className="fill-emerald-500" />
          <circle cx="125" cy="45" r="15" className="fill-emerald-500" />
          <circle cx="100" cy="40" r="18" className="fill-emerald-400" />
          <circle cx="85" cy="55" r="12" className="fill-green-400" />
          <circle cx="115" cy="55" r="12" className="fill-green-400" />
        </g>

        {/* Stage 4: Fruits */}
        <g 
          className="transition-all duration-700"
          style={{ 
            opacity: s >= 4 ? 1 : 0,
            transform: `scale(${s >= 4 ? 1 : 0})`,
            transformOrigin: '100px 50px'
          }}
        >
          <circle cx="70" cy="52" r="7" className="fill-red-500" />
          <circle cx="68" cy="50" r="2" className="fill-red-300/60" />
          
          <circle cx="130" cy="52" r="7" className="fill-red-500" />
          <circle cx="128" cy="50" r="2" className="fill-red-300/60" />
          
          <circle cx="90" cy="38" r="6" className="fill-red-400" />
          <circle cx="88" cy="36" r="2" className="fill-red-300/60" />
          
          <circle cx="110" cy="38" r="6" className="fill-red-400" />
          <circle cx="108" cy="36" r="2" className="fill-red-300/60" />
          
          <circle cx="100" cy="28" r="7" className="fill-red-500" />
          <circle cx="98" cy="26" r="2" className="fill-red-300/60" />
        </g>

        {/* Prompt text when empty */}
        {s === 0 && (
          <text x="100" y="70" textAnchor="middle" className="fill-slate-500 text-[10px] font-medium">
            Drag slider to grow
          </text>
        )}
      </svg>
    </div>
  )
}
