import { useState } from 'react'
import { GrowingTree } from './GrowingTree'
import { translations, languages, type Language } from './i18n'

// Category with multiple subcategory questions
const categoryData = {
  name: 'Strategic Planning & Execution',
  icon: '📋',
  questions: [
    {
      id: 1,
      title: 'Strategic Plan',
      desc: 'Long-term planning and goal setting',
      plantIcon: '🌳',
      stages: [
        { name: 'Planting', title: 'Seeds of Potential', description: ['No long-range goals', 'Reactive to funding', 'Staff wait for direction'] },
        { name: 'Seedling', title: 'Taking Root', description: ['Vague goals exist', 'Plans are activity lists', 'Limited coordination'] },
        { name: 'Growing', title: 'Branching Out', description: ['Clear strategy forming', 'Management articulates goals', 'Individual plans exist'] },
        { name: 'Harvesting', title: 'Full Bloom', description: ['2-3 year roadmap', 'Mission-aligned goals', 'Team-wide clarity'] },
      ],
    },
    {
      id: 2,
      title: 'Implementation',
      desc: 'Turning plans into action',
      plantIcon: '🌿',
      stages: [
        { name: 'Planting', title: 'Getting Started', description: ['No implementation process', 'Ad-hoc execution', 'No accountability'] },
        { name: 'Seedling', title: 'Building Habits', description: ['Basic processes exist', 'Some follow-through', 'Inconsistent results'] },
        { name: 'Growing', title: 'Gaining Momentum', description: ['Regular check-ins', 'Measurable progress', 'Adjustments made'] },
        { name: 'Harvesting', title: 'Excellence', description: ['Systematic execution', 'Strong accountability', 'Continuous improvement'] },
      ],
    },
    {
      id: 3,
      title: 'Monitoring & Evaluation',
      desc: 'Tracking progress and measuring impact',
      plantIcon: '🌴',
      stages: [
        { name: 'Planting', title: 'No Visibility', description: ['No tracking systems', 'Anecdotal evidence only', 'No data collection'] },
        { name: 'Seedling', title: 'Basic Tracking', description: ['Some metrics exist', 'Irregular reporting', 'Limited analysis'] },
        { name: 'Growing', title: 'Data-Informed', description: ['Regular monitoring', 'Key indicators tracked', 'Reports shared'] },
        { name: 'Harvesting', title: 'Impact-Driven', description: ['Comprehensive M&E', 'Real-time dashboards', 'Evidence-based decisions'] },
      ],
    },
    {
      id: 4,
      title: 'Adaptive Management',
      desc: 'Learning and adjusting strategies',
      plantIcon: '🎋',
      stages: [
        { name: 'Planting', title: 'Rigid', description: ['No flexibility', 'Stick to original plan', 'Change is resisted'] },
        { name: 'Seedling', title: 'Reactive', description: ['Change when forced', 'Slow to adapt', 'Limited learning'] },
        { name: 'Growing', title: 'Responsive', description: ['Regular reviews', 'Willing to pivot', 'Learning culture'] },
        { name: 'Harvesting', title: 'Agile', description: ['Continuous adaptation', 'Proactive changes', 'Innovation embraced'] },
      ],
    },
  ],
}

const stageStyles = [
  { gradient: 'from-amber-700 via-amber-800 to-stone-700', bgGradient: 'bg-gradient-to-br from-amber-950/30 to-stone-950/40' },
  { gradient: 'from-lime-600 via-green-600 to-emerald-700', bgGradient: 'bg-gradient-to-br from-lime-950/30 to-green-950/40' },
  { gradient: 'from-emerald-500 via-green-500 to-teal-600', bgGradient: 'bg-gradient-to-br from-emerald-950/30 to-teal-950/40' },
  { gradient: 'from-green-500 via-emerald-400 to-teal-400', bgGradient: 'bg-gradient-to-br from-green-950/30 to-emerald-950/40' },
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [lang, setLang] = useState<Language>('en')
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [notes, setNotes] = useState<Record<number, string>>({})

  const t = translations[lang]
  const totalQuestions = categoryData.questions.length
  const question = categoryData.questions[currentQuestion]
  const currentAnswer = answers[question?.id] || 0
  
  const progress = showSummary ? 100 : ((currentQuestion + (currentAnswer > 0 ? 1 : 0)) / totalQuestions) * 100
  const overallScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const maxScore = totalQuestions * 4
  const scorePercent = Math.round((overallScore / maxScore) * 100)

  const handleSelect = (level: number) => {
    setAnswers({ ...answers, [question.id]: level })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowSummary(true)
    }
  }

  const handlePrev = () => {
    if (showSummary) {
      setShowSummary(false)
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowSummary(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      <div className="relative z-10 py-4 px-4 md:py-6">
        {/* Language Dropdown */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/80 transition-colors backdrop-blur-sm"
            >
              <span>{languages.find(l => l.code === lang)?.flag}</span>
              <svg className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 max-h-64 overflow-y-auto rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => { setLang(language.code); setLangDropdownOpen(false) }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors ${lang === language.code ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300'}`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-2">
            <span>{categoryData.icon}</span>
            {categoryData.name}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t.title} <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">{t.subtitle}</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500">{showSummary ? 'Summary' : `Question ${currentQuestion + 1} of ${totalQuestions}`}</span>
            <span className="text-emerald-400">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
            <div className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" style={{ width: `${progress}%` }}></div>
          </div>
          {/* Question dots */}
          <div className="flex justify-center gap-2 mt-2">
            {categoryData.questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => { setShowSummary(false); setCurrentQuestion(i) }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  showSummary || i === currentQuestion 
                    ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                    : answers[q.id] 
                      ? 'bg-emerald-500/40 border border-emerald-500/50' 
                      : 'bg-slate-800 border border-slate-700'
                } ${!showSummary && i === currentQuestion ? 'scale-110' : ''}`}
              >
                {q.plantIcon}
              </button>
            ))}
            <button
              onClick={() => Object.keys(answers).length === totalQuestions && setShowSummary(true)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                showSummary 
                  ? 'bg-emerald-500/20 border-2 border-emerald-500 scale-110' 
                  : Object.keys(answers).length === totalQuestions
                    ? 'bg-amber-500/40 border border-amber-500/50'
                    : 'bg-slate-800 border border-slate-700 opacity-50'
              }`}
            >
              🏡
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {showSummary ? (
            /* Summary View - The Orchard */
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">🏡 Your Strategic Planning Orchard</h2>
                <p className="text-slate-400 text-sm">Here's how your organization's strategic planning garden looks</p>
              </div>
              
              {/* Orchard visualization */}
              <div className="bg-gradient-to-b from-slate-800/40 to-emerald-950/20 rounded-2xl p-6 mb-6 border border-slate-700/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryData.questions.map((q) => (
                    <div key={q.id} className="text-center">
                      <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                        <GrowingTree value={(answers[q.id] || 0) * 3} maxValue={12} />
                      </div>
                      <div className="mt-2">
                        <span className="text-lg">{q.plantIcon}</span>
                        <p className="text-xs text-slate-400 mt-1">{q.title}</p>
                        <p className="text-emerald-400 text-sm font-medium">
                          Level {answers[q.id] || 0}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Score */}
              <div className="bg-slate-800/40 rounded-xl p-6 text-center border border-slate-700/30">
                <div className="text-5xl font-bold text-white mb-2">{scorePercent}%</div>
                <div className="text-slate-400 text-sm mb-4">Overall Category Score</div>
                <div className="flex justify-center gap-2 mb-4">
                  {[1,2,3,4].map(level => {
                    const count = Object.values(answers).filter(a => a === level).length
                    return (
                      <div key={level} className="text-center px-4">
                        <div className="text-2xl font-bold text-white">{count}</div>
                        <div className="text-xs text-slate-500">Level {level}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="h-3 rounded-full bg-slate-700 overflow-hidden max-w-md mx-auto">
                  <div 
                    className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500"
                    style={{ width: `${scorePercent}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button onClick={handlePrev} className="px-6 py-3 rounded-xl bg-slate-800/80 text-slate-400 font-medium hover:bg-slate-700 transition-all border border-slate-700/50">
                  ← Back to Questions
                </button>
                <button onClick={handleReset} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-emerald-500/25">
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            /* Question View */
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-slate-700/50 shadow-2xl">
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg shadow-lg">
                  {question.plantIcon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{question.title}</h2>
                  <p className="text-slate-400 text-sm">{question.desc}</p>
                </div>
              </div>

              {/* Stage Cards + Tree */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                {question.stages.map((stage, idx) => {
                  const level = idx + 1
                  const style = stageStyles[idx]
                  const isSelected = currentAnswer === level
                  return (
                    <div
                      key={level}
                      onClick={() => handleSelect(level)}
                      className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-300 ${style.bgGradient} border-2 ${isSelected ? 'border-yellow-400 shadow-lg shadow-yellow-500/20 scale-[1.02]' : 'border-slate-700/50 hover:border-slate-600'}`}
                    >
                      {isSelected && <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent pointer-events-none"></div>}
                      <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${isSelected ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800/80 text-slate-400'} transition-colors`}>
                        {level}
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl mb-3 shadow-lg transition-transform ${isSelected ? 'scale-110' : ''}`}>
                        {['🌱', '🌿', '🌳', '🍎'][idx]}
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{stage.name}</h3>
                      <p className="text-slate-400 text-xs mb-2">{stage.title}</p>
                      <ul className="space-y-1">
                        {stage.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-slate-300 text-xs">
                            <span className="mt-1 w-1 h-1 rounded-full bg-slate-500 flex-shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {isSelected && (
                        <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                })}
                
                {/* Tree Card */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-slate-700/50 flex flex-col items-center justify-center md:col-span-2 xl:col-span-1">
                  <GrowingTree value={currentAnswer * 3} maxValue={12} />
                  <div className="text-center mt-2">
                    <p className="text-xs text-slate-500">Your {question.title}</p>
                    {currentAnswer > 0 && (
                      <p className="text-emerald-400 text-sm font-medium">Level {currentAnswer}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes text box */}
              {currentAnswer > 0 && (
                <div className="mt-4 animate-fade-in">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Why did you select <span className="text-emerald-400">Level {currentAnswer}</span> for {question.title}? (optional)
                  </label>
                  <textarea
                    value={notes[question.id] || ''}
                    onChange={(e) => setNotes({ ...notes, [question.id]: e.target.value })}
                    placeholder="Add any context or notes about your selection..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none text-sm"
                  />
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700/50">
                <button 
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all border border-slate-700/50 ${currentQuestion === 0 ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
                >
                  ← Previous
                </button>
                <div className="text-slate-500 text-sm">
                  {currentAnswer > 0 && <span className="text-emerald-400">✓ Level {currentAnswer} selected</span>}
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${currentAnswer ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-105' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700/50'}`}
                >
                  {currentQuestion === totalQuestions - 1 ? 'View Summary →' : 'Next Question →'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-4 text-center">
          <p className="text-slate-600 text-sm">{t.footer}</p>
        </div>
      </div>
    </div>
  )
}

export default App
