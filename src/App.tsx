import { useState } from 'react'

interface Stage {
  level: number
  name: string
  color: string
  icon: string
  title: string
  description: string[]
}

const stages: Stage[] = [
  {
    level: 1,
    name: 'Planting',
    color: 'from-amber-700 to-amber-800',
    icon: '🌱',
    title: 'Seeds of Potential',
    description: [
      'Organization has no long-range program goals',
      'Project activities are determined by funding opportunities and donor preferences',
      'Staff wait to be told what to do by the Leader',
      'Staff do not know what they or others are to do each day',
    ],
  },
  {
    level: 2,
    name: 'Seedling',
    color: 'from-orange-500 to-orange-600',
    icon: '🌿',
    title: 'Taking Root',
    description: [
      'Organization has program goals but these are vague or unrealistic',
      'Goals are simply a list of planned projects/activities',
      'Staff know their duties but are unable to plan work in advance',
      'Little coordination between projects and staff',
    ],
  },
  {
    level: 3,
    name: 'Growing',
    color: 'from-amber-500 to-orange-500',
    icon: '🌳',
    title: 'Branching Out',
    description: [
      'Organization has reasonably clear program goals and strategy',
      'Only management can clearly articulate the goals',
      'Staff prepare individual work plans',
      'Responsibility for tasks often confused due to limited coordination',
    ],
  },
  {
    level: 4,
    name: 'Harvesting',
    color: 'from-yellow-500 to-amber-500',
    icon: '🌾',
    title: 'Full Bloom',
    description: [
      'Clear, specific program goals and strategy for 2-3 years',
      'Goals are consistent with vision and mission, revised annually',
      'All staff prepare cohesive individual plans across departments',
      'Staff coordinate with others and can articulate organizational goals',
    ],
  },
]

function App() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSelect = (level: number) => {
    setSelected(level)
    if (level === 4) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }

  const progress = selected ? (selected / 4) * 100 : 0

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Wildlife Conservation Network
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Organizational Health Check
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Assess your organization's maturity across key dimensions. 
          Select the stage that best describes where you are today.
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question 1 of 12</span>
          <span>{selected ? `Stage ${selected} selected` : 'Select a stage'}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 md:p-12 border border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">📋</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Strategic Plan</h2>
          </div>

          {/* Stage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.level}
                onClick={() => handleSelect(stage.level)}
                className={`stage-card bg-gradient-to-br ${stage.color} ${
                  selected === stage.level ? 'selected' : ''
                }`}
              >
                {/* Level Badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white font-bold">
                  {stage.level}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{stage.icon}</div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-1">{stage.name}</h3>
                <p className="text-white/70 text-sm mb-4">{stage.title}</p>

                {/* Description */}
                <ul className="space-y-2">
                  {stage.description.map((item, i) => (
                    <li key={i} className="text-white/80 text-xs flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Selected indicator */}
                {selected === stage.level && (
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <button className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 font-medium hover:bg-slate-600 transition-colors">
              ← Previous
            </button>
            <button 
              disabled={!selected}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                selected 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105' 
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center text-slate-500 text-sm">
        <p>Built with 💚 for conservation</p>
      </div>
    </div>
  )
}

export default App
