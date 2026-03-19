interface GrowingTreeProps {
  value: number
  maxValue: number
}

export function GrowingTree({ value, maxValue }: GrowingTreeProps) {
  const t = value / maxValue
  const stage = Math.ceil((value / maxValue) * 4)
  
  // Trunk height grows with progress
  const trunkHeight = 10 + t * 70
  const trunkWidth = 3 + t * 3
  
  return (
    <div className="relative w-full h-36 flex items-end justify-center">
      <svg 
        viewBox="0 0 200 120" 
        className="w-full h-full max-w-[280px]"
      >
        {/* Ground line */}
        <line x1="40" y1="115" x2="160" y2="115" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        
        {/* Soil/pot area */}
        <ellipse cx="100" cy="115" rx="25" ry="5" fill="#1e293b" />

        {value === 0 ? (
          /* Empty state - seed */
          <g>
            <ellipse cx="100" cy="110" rx="6" ry="4" fill="#78716c" />
            <text x="100" y="70" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="500">
              Drag to grow
            </text>
          </g>
        ) : (
          <g>
            {/* Main trunk */}
            <line 
              x1="100" 
              y1="115" 
              x2="100" 
              y2={115 - trunkHeight}
              stroke="#15803d" 
              strokeWidth={trunkWidth}
              strokeLinecap="round"
              className="transition-all duration-300"
            />

            {/* Stage 1: First branches with small leaves */}
            {stage >= 1 && (
              <g className="transition-all duration-300" style={{ opacity: Math.min(1, t * 4) }}>
                {/* Left branch */}
                <line x1="100" y1="100" x2="75" y2="92" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="70" cy="90" rx="8" ry="5" fill="#22c55e" transform="rotate(-20 70 90)" />
                
                {/* Right branch */}
                <line x1="100" y1="100" x2="125" y2="92" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="130" cy="90" rx="8" ry="5" fill="#22c55e" transform="rotate(20 130 90)" />
              </g>
            )}

            {/* Stage 2: More branches, fuller */}
            {stage >= 2 && (
              <g className="transition-all duration-300" style={{ opacity: Math.min(1, (t - 0.25) * 4) }}>
                {/* Middle branches */}
                <line x1="100" y1="85" x2="68" y2="75" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="62" cy="72" rx="10" ry="6" fill="#16a34a" transform="rotate(-25 62 72)" />
                <ellipse cx="72" cy="78" rx="7" ry="4" fill="#22c55e" transform="rotate(-15 72 78)" />
                
                <line x1="100" y1="85" x2="132" y2="75" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="138" cy="72" rx="10" ry="6" fill="#16a34a" transform="rotate(25 138 72)" />
                <ellipse cx="128" cy="78" rx="7" ry="4" fill="#22c55e" transform="rotate(15 128 78)" />
              </g>
            )}

            {/* Stage 3: Upper canopy */}
            {stage >= 3 && (
              <g className="transition-all duration-300" style={{ opacity: Math.min(1, (t - 0.5) * 4) }}>
                {/* Upper branches */}
                <line x1="100" y1="65" x2="72" y2="52" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="65" cy="48" rx="12" ry="7" fill="#16a34a" transform="rotate(-30 65 48)" />
                
                <line x1="100" y1="65" x2="128" y2="52" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="135" cy="48" rx="12" ry="7" fill="#16a34a" transform="rotate(30 135 48)" />
                
                {/* Top */}
                <line x1="100" y1="55" x2="100" y2="38" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="100" cy="32" rx="14" ry="8" fill="#22c55e" />
                <ellipse cx="90" cy="38" rx="8" ry="5" fill="#16a34a" transform="rotate(-10 90 38)" />
                <ellipse cx="110" cy="38" rx="8" ry="5" fill="#16a34a" transform="rotate(10 110 38)" />
              </g>
            )}

            {/* Stage 4: Coffee cherries! */}
            {stage >= 4 && (
              <g className="transition-all duration-300" style={{ opacity: Math.min(1, (t - 0.75) * 4) }}>
                {/* Cherries on branches - red coffee berries */}
                <circle cx="66" cy="95" r="4" fill="#dc2626" />
                <circle cx="72" cy="92" r="3" fill="#ef4444" />
                <circle cx="62" cy="90" r="3" fill="#dc2626" />
                
                <circle cx="134" cy="95" r="4" fill="#dc2626" />
                <circle cx="128" cy="92" r="3" fill="#ef4444" />
                <circle cx="138" cy="90" r="3" fill="#dc2626" />
                
                <circle cx="58" cy="76" r="4" fill="#dc2626" />
                <circle cx="64" cy="73" r="3" fill="#ef4444" />
                
                <circle cx="142" cy="76" r="4" fill="#dc2626" />
                <circle cx="136" cy="73" r="3" fill="#ef4444" />
                
                <circle cx="60" cy="52" r="4" fill="#dc2626" />
                <circle cx="140" cy="52" r="4" fill="#dc2626" />
                
                <circle cx="95" cy="28" r="3" fill="#ef4444" />
                <circle cx="105" cy="28" r="3" fill="#ef4444" />
                <circle cx="100" cy="25" r="4" fill="#dc2626" />
                
                {/* Highlights on cherries */}
                <circle cx="65" cy="94" r="1.5" fill="#fca5a5" opacity="0.6" />
                <circle cx="133" cy="94" r="1.5" fill="#fca5a5" opacity="0.6" />
                <circle cx="99" cy="24" r="1.5" fill="#fca5a5" opacity="0.6" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  )
}
