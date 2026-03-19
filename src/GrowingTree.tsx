interface GrowingTreeProps {
  stage: number | null
}

export function GrowingTree({ stage }: GrowingTreeProps) {
  const s = stage || 0
  
  return (
    <div className="relative w-full h-48 flex items-end justify-center">
      <svg 
        viewBox="0 0 200 160" 
        className="w-full h-full max-w-xs"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
      >
        {/* Ground */}
        <ellipse 
          cx="100" 
          cy="150" 
          rx="80" 
          ry="10" 
          className="fill-amber-900/60"
        />
        
        {/* Soil mound */}
        <ellipse 
          cx="100" 
          cy="145" 
          rx="40" 
          ry="8" 
          className="fill-amber-800/80"
        />

        {/* Stage 1: Seed/Sprout */}
        {s >= 1 && (
          <g className="animate-grow-up" style={{ transformOrigin: '100px 140px' }}>
            {/* Stem */}
            <path
              d="M100 140 L100 125"
              className="stroke-green-600"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Small leaves */}
            <ellipse cx="95" cy="128" rx="6" ry="4" className="fill-green-500" transform="rotate(-30 95 128)" />
            <ellipse cx="105" cy="128" rx="6" ry="4" className="fill-green-500" transform="rotate(30 105 128)" />
          </g>
        )}

        {/* Stage 2: Seedling - taller with more leaves */}
        {s >= 2 && (
          <g className="animate-grow-up" style={{ transformOrigin: '100px 125px', animationDelay: '0.2s' }}>
            {/* Extended stem */}
            <path
              d="M100 125 L100 100"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* More leaves */}
            <ellipse cx="90" cy="115" rx="10" ry="5" className="fill-green-400" transform="rotate(-40 90 115)" />
            <ellipse cx="110" cy="115" rx="10" ry="5" className="fill-green-400" transform="rotate(40 110 115)" />
            <ellipse cx="92" cy="105" rx="8" ry="4" className="fill-lime-400" transform="rotate(-25 92 105)" />
            <ellipse cx="108" cy="105" rx="8" ry="4" className="fill-lime-400" transform="rotate(25 108 105)" />
          </g>
        )}

        {/* Stage 3: Growing - branches forming */}
        {s >= 3 && (
          <g className="animate-grow-up" style={{ transformOrigin: '100px 100px', animationDelay: '0.4s' }}>
            {/* Main trunk */}
            <path
              d="M100 100 L100 65"
              className="stroke-green-700"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Branches */}
            <path
              d="M100 85 L75 65"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100 85 L125 65"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100 75 L85 55"
              className="stroke-green-600"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100 75 L115 55"
              className="stroke-green-600"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Canopy leaves */}
            <circle cx="75" cy="60" r="12" className="fill-emerald-500" />
            <circle cx="125" cy="60" r="12" className="fill-emerald-500" />
            <circle cx="85" cy="50" r="10" className="fill-green-400" />
            <circle cx="115" cy="50" r="10" className="fill-green-400" />
            <circle cx="100" cy="55" r="14" className="fill-emerald-400" />
          </g>
        )}

        {/* Stage 4: Harvesting - full tree with fruit */}
        {s >= 4 && (
          <g className="animate-grow-up" style={{ transformOrigin: '100px 60px', animationDelay: '0.6s' }}>
            {/* Fuller canopy */}
            <circle cx="65" cy="55" r="10" className="fill-green-500" />
            <circle cx="135" cy="55" r="10" className="fill-green-500" />
            <circle cx="100" cy="40" r="16" className="fill-emerald-400" />
            <circle cx="75" cy="45" r="12" className="fill-teal-400" />
            <circle cx="125" cy="45" r="12" className="fill-teal-400" />
            
            {/* Fruits! */}
            <circle cx="70" cy="62" r="6" className="fill-red-500 animate-bounce-fruit" style={{animationDelay: '0.8s'}} />
            <circle cx="130" cy="62" r="6" className="fill-red-500 animate-bounce-fruit" style={{animationDelay: '1s'}} />
            <circle cx="90" cy="48" r="5" className="fill-red-400 animate-bounce-fruit" style={{animationDelay: '1.2s'}} />
            <circle cx="110" cy="48" r="5" className="fill-red-400 animate-bounce-fruit" style={{animationDelay: '1.4s'}} />
            <circle cx="100" cy="35" r="6" className="fill-red-500 animate-bounce-fruit" style={{animationDelay: '1.6s'}} />
            
            {/* Fruit highlights */}
            <circle cx="68" cy="60" r="2" className="fill-red-300/60" />
            <circle cx="128" cy="60" r="2" className="fill-red-300/60" />
            <circle cx="98" cy="33" r="2" className="fill-red-300/60" />
          </g>
        )}

        {/* Stage labels */}
        {s === 0 && (
          <text x="100" y="90" textAnchor="middle" className="fill-slate-500 text-xs font-medium">
            Select a stage to grow
          </text>
        )}
      </svg>
      
      {/* Stage indicator */}
      {s > 0 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-center">
          <div className="text-xs font-medium text-slate-400">Growth Stage</div>
          <div className="flex gap-1 mt-1 justify-center">
            {[1,2,3,4].map(n => (
              <div 
                key={n} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  n <= s ? 'bg-emerald-500 scale-100' : 'bg-slate-700 scale-75'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
