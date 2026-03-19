import { useState } from 'react'

interface Stage {
  level: number
  name: string
  gradient: string
  bgGradient: string
  icon: string
  title: string
  description: string[]
}

const stages: Stage[] = [
  {
    level: 1,
    name: 'Planting',
    gradient: 'from-amber-600 via-amber-700 to-amber-800',
    bgGradient: 'bg-gradient-to-br from-amber-900/20 to-amber-950/40',
    icon: '🌱',
    title: 'Seeds of Potential',
    description: [
      'No long-range program goals',
      'Activities driven by funding & donors',
      'Staff wait to be told what to do',
      'Daily tasks unclear',
    ],
  },
  {
    level: 2,
    name: 'Seedling',
    gradient: 'from-orange-500 via-orange-600 to-amber-700',
    bgGradient: 'bg-gradient-to-br from-orange-900/20 to-orange-950/40',
    icon: '🌿',
    title: 'Taking Root',
    description: [
      'Goals exist but are vague',
      'Plans are just activity lists',
      'Staff know duties, can\'t plan ahead',
      'Limited coordination',
    ],
  },
  {
    level: 3,
    name: 'Growing',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    bgGradient: 'bg-gradient-to-br from-emerald-900/20 to-teal-950/40',
    icon: '🌳',
    title: 'Branching Out',
    description: [
      'Reasonably clear strategy',
      'Only management articulates goals',
      'Individual work plans exist',
      'Some coordination gaps',
    ],
  },
  {
    level: 4,
    name: 'Harvesting',
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-yellow-900/20 to-amber-950/40',
    icon: '🌾',
    title: 'Full Bloom',
    description: [
      'Clear 2-3 year strategy',
      'Goals align with mission',
      'Cohesive team planning',
      'Everyone articulates goals',
    ],
  },
]

function App() {
  const [selected, setSelected] = useState<number | null>(null)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)

  const progress = selected ? (selected / 4) * 100 : 0

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 py-8 px-4 md:py-12">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Wildlife Conservation Network
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Organizational
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Health Check
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Assess your organization's maturity and unlock your path to greater impact.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-slate-500 font-medium">Question 1 of 12</span>
            <span className="text-emerald-400 font-medium">
              {selected ? `Level ${selected} · ${stages[selected-1].name}` : 'Select your stage'}
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden backdrop-blur-sm border border-slate-700/50">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {[1,2,3,4].map(n => (
              <div key={n} className={`text-xs font-medium transition-colors ${selected && selected >= n ? 'text-emerald-400' : 'text-slate-600'}`}>
                {stages[n-1].name}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-slate-700/50 shadow-2xl shadow-black/20">
            
            {/* Question Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
                📋
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Strategic Plan</h2>
                <p className="text-slate-400 text-sm mt-1">How well does your organization plan for the future?</p>
              </div>
            </div>

            {/* Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {stages.map((stage) => (
                <div
                  key={stage.level}
                  onClick={() => setSelected(stage.level)}
                  onMouseEnter={() => setHoveredStage(stage.level)}
                  onMouseLeave={() => setHoveredStage(null)}
                  className={`
                    relative group cursor-pointer rounded-2xl p-5 transition-all duration-300
                    ${stage.bgGradient}
                    border-2 ${selected === stage.level 
                      ? 'border-yellow-400 shadow-lg shadow-yellow-500/20 scale-[1.02]' 
                      : 'border-slate-700/50 hover:border-slate-600'}
                    ${hoveredStage === stage.level && selected !== stage.level ? 'scale-[1.02]' : ''}
                  `}
                >
                  {/* Glow effect on selection */}
                  {selected === stage.level && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent pointer-events-none"></div>
                  )}

                  {/* Level indicator */}
                  <div className={`
                    absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${selected === stage.level 
                      ? 'bg-yellow-400 text-slate-900' 
                      : 'bg-slate-800/80 text-slate-400 group-hover:bg-slate-700'}
                    transition-colors
                  `}>
                    {stage.level}
                  </div>

                  {/* Icon with gradient background */}
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.gradient} 
                    flex items-center justify-center text-3xl mb-4
                    shadow-lg transition-transform duration-300
                    ${hoveredStage === stage.level || selected === stage.level ? 'scale-110' : ''}
                  `}>
                    {stage.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-1">{stage.name}</h3>
                  <p className="text-slate-400 text-xs mb-4 font-medium">{stage.title}</p>

                  {/* Description */}
                  <ul className="space-y-2">
                    {stage.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-xs leading-relaxed">
                        <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${stage.gradient}`}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selected checkmark */}
                  {selected === stage.level && (
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg animate-bounce-once">
                      <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700/50">
              <button className="px-6 py-3 rounded-xl bg-slate-800/80 text-slate-400 font-medium hover:bg-slate-700 hover:text-slate-200 transition-all border border-slate-700/50">
                ← Previous
              </button>
              
              <div className="text-slate-500 text-sm">
                {selected && (
                  <span className="text-emerald-400">✓ Stage {selected} selected</span>
                )}
              </div>

              <button 
                disabled={!selected}
                className={`
                  px-8 py-3 rounded-xl font-semibold transition-all
                  ${selected 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-100' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700/50'}
                `}
              >
                Continue →
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-10 text-center">
          <p className="text-slate-600 text-sm">
            Built with 💚 for conservation
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
