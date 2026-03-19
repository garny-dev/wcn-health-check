import { useState } from 'react'
import { GrowingTree } from './GrowingTree'
import { translations, languages, type Language } from './i18n'

const stageStyles = [
  {
    level: 1,
    gradient: 'from-amber-600 via-amber-700 to-stone-600',
    bgGradient: 'bg-gradient-to-br from-amber-100 to-stone-100',
    icon: '🌱',
  },
  {
    level: 2,
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    bgGradient: 'bg-gradient-to-br from-lime-100 to-green-100',
    icon: '🌿',
  },
  {
    level: 3,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    bgGradient: 'bg-gradient-to-br from-emerald-100 to-teal-100',
    icon: '🌳',
  },
  {
    level: 4,
    gradient: 'from-green-500 via-emerald-400 to-teal-400',
    bgGradient: 'bg-gradient-to-br from-green-100 to-emerald-100',
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
    <div className="min-h-screen relative" style={{ backgroundColor: '#FFFDF1' }}>
      <div className="relative z-10 py-8 px-4 md:py-12">
        {/* Language Dropdown - Top Right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-[#162521]/10 text-[#162521] text-sm font-medium hover:bg-white transition-colors backdrop-blur-sm shadow-sm"
            >
              <span>{languages.find(l => l.code === lang)?.flag}</span>
              <span className="hidden sm:inline">{languages.find(l => l.code === lang)?.name}</span>
              <svg className={`w-4 h-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white border border-[#162521]/10 shadow-xl overflow-hidden">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code)
                      setLangDropdownOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#85CFB9]/20 transition-colors ${
                      lang === language.code ? 'bg-[#85CFB9]/30 text-[#3B6D61]' : 'text-[#162521]'
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

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3B6D61]/10 border border-[#3B6D61]/20 text-[#3B6D61] text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B6D61] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B6D61]"></span>
            </span>
            {t.orgName}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#162521] mb-4 tracking-tight">
            {t.title}
            <span className="block text-[#3B6D61]">
              {t.subtitle}
            </span>
          </h1>
          <p className="text-[#162521]/60 text-lg max-w-xl mx-auto leading-relaxed">
            {lang === 'en' && 'Assess your organization\'s maturity and unlock your path to greater impact.'}
            {lang === 'es' && 'Evalúe la madurez de su organización y desbloquee su camino hacia un mayor impacto.'}
            {lang === 'fr' && 'Évaluez la maturité de votre organisation et débloquez votre chemin vers un plus grand impact.'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-[#162521]/50 font-medium">{t.questionLabel}</span>
            <span className="text-[#3B6D61] font-medium">
              {selected ? `${t.level} ${selected} · ${stages[selected-1].name}` : t.selectStage}
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#162521]/10 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #F49C55, #3B6D61, #85CFB9)' }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {[1,2,3,4].map(n => (
              <div key={n} className={`text-xs font-medium transition-colors ${selected && selected >= n ? 'text-[#3B6D61]' : 'text-[#162521]/40'}`}>
                {stages[n-1].name}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#162521]/10 shadow-xl shadow-[#162521]/5">
            
            {/* Question Header - Single Row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F49C55] to-[#FDD07C] flex items-center justify-center text-lg shadow-lg shadow-[#F49C55]/20">
                📋
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#162521]">{t.questionTitle}</h2>
              <span className="text-[#162521]/30 hidden sm:inline">—</span>
              <p className="text-[#162521]/60 text-sm hidden sm:block">{t.questionDesc}</p>
            </div>
            
            {/* Growing Tree + Slider */}
            <div className="bg-gradient-to-br from-[#85CFB9]/20 to-[#3B6D61]/10 rounded-2xl p-6 border border-[#3B6D61]/10 mb-6">
              <GrowingTree value={sliderValue} maxValue={12} />
              
              {/* Slider */}
              <div className="mt-6 px-4">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#162521]/10 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between mt-2 text-xs font-medium">
                  <span className="text-[#162521]/40">{t.start}</span>
                  {stages.map((stage) => (
                    <span 
                      key={stage.level}
                      className={`transition-colors ${selected === stage.level ? 'text-[#3B6D61]' : 'text-[#162521]/40'}`}
                    >
                      {stage.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
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
                      ? 'border-[#F49C55] shadow-lg shadow-[#F49C55]/20 scale-[1.02]' 
                      : 'border-[#162521]/10 hover:border-[#3B6D61]/30'}
                    ${hoveredStage === stage.level && selected !== stage.level ? 'scale-[1.02]' : ''}
                  `}
                >
                  {/* Glow effect on selection */}
                  {selected === stage.level && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F49C55]/10 to-transparent pointer-events-none"></div>
                  )}

                  {/* Level indicator */}
                  <div className={`
                    absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${selected === stage.level 
                      ? 'bg-[#F49C55] text-white' 
                      : 'bg-white/80 text-[#162521]/60 group-hover:bg-white'}
                    transition-colors shadow-sm
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
                  <h3 className="text-lg font-bold text-[#162521] mb-1">{stage.name}</h3>
                  <p className="text-[#162521]/50 text-xs mb-4 font-medium">{stage.title}</p>

                  {/* Description */}
                  <ul className="space-y-2">
                    {stage.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#162521]/70 text-xs leading-relaxed">
                        <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 bg-gradient-to-r ${stage.gradient}`}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selected checkmark */}
                  {selected === stage.level && (
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#F49C55] flex items-center justify-center shadow-lg animate-bounce-once">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Notes Section - appears after selection */}
            {selected && (
              <div className="mt-8 animate-fade-in">
                <label className="block text-sm font-medium text-[#162521]/80 mb-2">
                  {t.notesLabel} <span className="text-[#3B6D61]">{stages[selected-1].name}</span>? (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFDF1] border border-[#162521]/10 text-[#162521] placeholder-[#162521]/40 focus:outline-none focus:ring-2 focus:ring-[#3B6D61]/30 focus:border-[#3B6D61]/30 transition-all resize-none"
                />
                <p className="text-xs text-[#162521]/50 mt-2">
                  {t.notesHelper}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#162521]/10">
              <button className="px-6 py-3 rounded-xl bg-[#FFFDF1] text-[#162521]/60 font-medium hover:bg-[#162521]/5 hover:text-[#162521] transition-all border border-[#162521]/10">
                {t.previous}
              </button>
              
              <div className="text-[#162521]/50 text-sm">
                {selected && (
                  <span className="text-[#3B6D61]">✓ {stages[selected-1].name} {t.stageSelected}</span>
                )}
              </div>

              <button 
                disabled={!selected}
                className={`
                  px-8 py-3 rounded-xl font-semibold transition-all
                  ${selected 
                    ? 'bg-gradient-to-r from-[#F49C55] to-[#FDD07C] text-white shadow-lg shadow-[#F49C55]/25 hover:shadow-[#F49C55]/40 hover:scale-105 active:scale-100' 
                    : 'bg-[#162521]/10 text-[#162521]/40 cursor-not-allowed'}
                `}
              >
                {t.continue}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-6xl mx-auto mt-10 text-center">
          <p className="text-[#162521]/40 text-sm">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
