import { useState } from 'react'
import { GrowingTree } from './GrowingTree'
import { translations, languages, type Language } from './i18n'

const stageStyles = [
  {
    level: 1,
    gradient: 'from-amber-700 via-amber-800 to-stone-700',
    bgGradient: 'bg-gradient-to-br from-amber-950/30 to-stone-950/40',
    icon: '🌱',
  },
  {
    level: 2,
    gradient: 'from-lime-600 via-green-600 to-emerald-700',
    bgGradient: 'bg-gradient-to-br from-lime-950/30 to-green-950/40',
    icon: '🌿',
  },
  {
    level: 3,
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    bgGradient: 'bg-gradient-to-br from-emerald-950/30 to-teal-950/40',
    icon: '🌳',
  },
  {
    level: 4,
    gradient: 'from-green-500 via-emerald-400 to-teal-400',
    bgGradient: 'bg-gradient-to-br from-green-950/30 to-emerald-950/40',
    icon: '🍎',
  },
]

function App() {
  const [sliderValue, setSliderValue] = useState(0)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const [notes, setNotes] = useState('')
  const [lang, setLang] = useState<Language>('en')
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)

  const t = translations[lang]
  const stages = stageStyles.map((style, i) => ({
    ...style,
    name: t.stages[i].name,
    title: t.stages[i].title,
    description: t.stages[i].description,
  }))

  // Map slider (0-12) to stage (null, 1, 2, 3, 4)
  const selected = sliderValue === 0 ? null : Math.ceil(sliderValue / 3)
  const progress = (sliderValue / 12) * 100

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

      <div className="relative z-10 py-4 px-4 md:py-6">
        {/* Language Dropdown - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/80 transition-colors backdrop-blur-sm"
            >
              <span>{languages.find(l => l.code === lang)?.flag}</span>
              <span className="hidden sm:inline">{languages.find(l => l.code === lang)?.name}</span>
              <svg className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-800 border border-slate-700/50 shadow-xl overflow-hidden backdrop-blur-sm">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code)
                      setLangDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-slate-700/50 transition-colors ${
                      lang === language.code ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Header - Compact */}
        <div className="max-w-6xl mx-auto mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            {t.orgName}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 tracking-tight">
            {t.title} <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">{t.subtitle}</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">{t.questionLabel}</span>
            <span className="text-emerald-400 font-medium">
              {selected ? `${t.level} ${selected} · ${stages[selected-1].name}` : t.selectStage}
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
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-slate-700/50 shadow-2xl shadow-black/20">
            
            {/* Question Header - Single Row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
                📋
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">{t.questionTitle}</h2>
              <span className="text-slate-500 hidden sm:inline">—</span>
              <p className="text-slate-400 text-sm hidden sm:block">{t.questionDesc}</p>
            </div>
            
            {/* Stage Cards + Tree */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
              {stages.map((stage) => (
                <div
                  key={stage.level}
                  onClick={() => setSliderValue(stage.level * 3)}
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
              
              {/* Tree Card */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-2 border-slate-700/50 flex flex-col items-center justify-center md:col-span-2 xl:col-span-1">
                <GrowingTree value={sliderValue} maxValue={12} />
                
                {/* Slider */}
                <div className="w-full mt-2 px-2">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between mt-1 text-[10px] font-medium text-slate-500">
                    {stages.map((stage) => (
                      <span 
                        key={stage.level}
                        className={`transition-colors ${selected === stage.level ? 'text-emerald-400' : ''}`}
                      >
                        {stage.icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Section - appears after selection */}
            {selected && (
              <div className="mt-8 animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {t.notesLabel} <span className="text-emerald-400">{stages[selected-1].name}</span>? (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                  {t.notesHelper}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700/50">
              <button className="px-6 py-3 rounded-xl bg-slate-800/80 text-slate-400 font-medium hover:bg-slate-700 hover:text-slate-200 transition-all border border-slate-700/50">
                {t.previous}
              </button>
              
              <div className="text-slate-500 text-sm">
                {selected && (
                  <span className="text-emerald-400">✓ {stages[selected-1].name} {t.stageSelected}</span>
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
                {t.continue}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-4 text-center">
          <p className="text-slate-600 text-sm">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
