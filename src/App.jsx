import { useState, useEffect } from 'react'
import './App.css'

// ── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ggl_entries'

const NAV_ITEMS = [
  { id: 'home',         label: 'Home' },
  { id: 'baseline',     label: 'Baseline' },
  { id: 'reflection',   label: 'Reflection' },
  { id: 'diary',        label: 'Diary' },
  { id: 'visual-notes', label: 'Visual Notes' },
  { id: 'practice',     label: 'Practice' },
]

const SCARF_SCORES  = [
  { label: 'Status',      score: '6.67' },
  { label: 'Certainty',   score: '7' },
  { label: 'Autonomy',    score: '7' },
  { label: 'Relatedness', score: '6' },
  { label: 'Fairness',    score: '5.33' },
]
const VIA_STRENGTHS = ['Spirituality', 'Gratitude', 'Prudence', 'Honesty', 'Fairness']

// ── Weekly Diary entries ──────────────────────────────────────────────────────
//
//  HOW TO UPDATE EACH WEEK
//  ────────────────────────
//  1. Find the entry for the upcoming week (e.g. week: 2).
//  2. Change   status: 'placeholder'   →   status: 'active'
//  3. Update   title   with your theme for that week.
//  4. Fill in  insight, goal, and action  (each is an array of paragraph strings).
//  5. Set      mood  (e.g. 'reflective', 'energized', 'uncertain') and
//              visualKeyword  (e.g. 'listening', 'momentum').
//  6. Change the previous week's status from 'active' → 'done' so its
//     badge updates from "This Week" to "✓ Done".
//
//  STATUS VALUES
//  ─────────────
//  'active'      — current week, shows "This Week" badge
//  'done'        — completed past week, shows "✓ Done" badge
//  'placeholder' — future week, shows placeholder card + "Mon check-in" badge

const weeklyEntries = [

  // ── WEEK 1 ───────────────────────────────────────────────────────────────────
  {
    week:         1,
    title:        'Starting from Self-awareness',
    date:         'Week 1',
    // Change to 'done' when Week 2 is ready
    status:       'active',
    insight: [
      `This week, I realized that leadership does not always have to look loud or dominant. I used to think leadership meant being the person who speaks first, gives direction quickly, or has the most confidence in the room. But after looking at my SCARF, VIA, and Superpower results together, I started to see that my leadership may be quieter and more structured.`,
      `I lead more naturally by noticing what is unclear, helping people feel supported, and creating a sense of direction. I also learned that my need for certainty and autonomy can be both a strength and a challenge. It helps me organize ideas and move things forward, but it can also make me uncomfortable when the situation is vague or changing.`,
    ],
    goal: [
      `My goal for this week is to practice being more comfortable with uncertainty in group work. Instead of waiting until I fully understand everything or have a polished idea, I want to participate earlier and use questions as a way to enter the conversation.`,
    ],
    action: [
      `In the next class or group discussion, I will share one thought or question before I feel completely ready. I will try not to wait until my idea feels perfect. If something is unclear, I will ask a clarifying question instead of quietly trying to figure everything out by myself.`,
    ],
    mood:         'reflective',
    visualKeyword: 'clarity',
  },

  // ── WEEK 2 — paste your content here ─────────────────────────────────────────
  // When ready: change status → 'active', update title, fill insight/goal/action.
  {
    week:         2,
    title:        'Coming soon',
    date:         'Week 2',
    status:       'placeholder',
    insight:      [],
    goal:         [],
    action:       [],
    mood:         '',
    visualKeyword: '',
  },

  // ── WEEK 3 — paste your content here ─────────────────────────────────────────
  {
    week:         3,
    title:        'Coming soon',
    date:         'Week 3',
    status:       'placeholder',
    insight:      [],
    goal:         [],
    action:       [],
    mood:         '',
    visualKeyword: '',
  },

  // ── WEEK 4 — paste your content here ─────────────────────────────────────────
  {
    week:         4,
    title:        'Coming soon',
    date:         'Week 4',
    status:       'placeholder',
    insight:      [],
    goal:         [],
    action:       [],
    mood:         '',
    visualKeyword: '',
  },

  // ── WEEK 5 — paste your content here ─────────────────────────────────────────
  {
    week:         5,
    title:        'Coming soon',
    date:         'Week 5',
    status:       'placeholder',
    insight:      [],
    goal:         [],
    action:       [],
    mood:         '',
    visualKeyword: '',
  },

]
// ── End of weeklyEntries ──────────────────────────────────────────────────────

// ── Card illustrations (small, corner) ───────────────────────────────────────
function ScarfCompassIll() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="card-ill" aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke="#BFD7D9" strokeWidth="1"   opacity="0.3" strokeDasharray="3 5" />
      <circle cx="32" cy="32" r="20" stroke="#BFD7D9" strokeWidth="1.5" opacity="0.55" />
      <circle cx="32" cy="32" r="11" stroke="#BFD7D9" strokeWidth="2"   opacity="0.75" />
      <circle cx="32" cy="32" r="3.5" fill="#BFD7D9"                    opacity="0.9" />
      {/* N pointer */}
      <polygon points="32,5 29,18 35,18" fill="#BFD7D9" opacity="0.8" />
      {/* S pointer */}
      <polygon points="32,59 29,46 35,46" fill="#BFD7D9" opacity="0.32" />
      {/* E pointer */}
      <polygon points="59,32 46,29 46,35" fill="#BFD7D9" opacity="0.38" />
      {/* W pointer */}
      <polygon points="5,32 18,29 18,35" fill="#BFD7D9" opacity="0.38" />
      {/* Diagonal ticks */}
      <line x1="13" y1="13" x2="18" y2="18" stroke="#BFD7D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
      <line x1="51" y1="13" x2="46" y2="18" stroke="#BFD7D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
      <line x1="13" y1="51" x2="18" y2="46" stroke="#BFD7D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
      <line x1="51" y1="51" x2="46" y2="46" stroke="#BFD7D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.28" />
    </svg>
  )
}

function VIAFlowerIll() {
  const angles = [0, 60, 120, 180, 240, 300]
  return (
    <svg viewBox="0 0 64 64" fill="none" className="card-ill" aria-hidden="true">
      {angles.map((a, i) => (
        <g key={i} transform={`rotate(${a}, 32, 32)`}>
          <ellipse cx="32" cy="14" rx="6.5" ry="12" fill="#8FAF9C" opacity="0.38" />
        </g>
      ))}
      <circle cx="32" cy="32" r="10" fill="#8FAF9C" opacity="0.72" />
      <circle cx="32" cy="32" r="5.5" fill="#E4EFE9" opacity="0.95" />
    </svg>
  )
}

function SparkBurstIll() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg viewBox="0 0 64 64" fill="none" className="card-ill" aria-hidden="true">
      {rays.map((angle, i) => {
        const isLong = i % 3 === 0
        const r1  = 9
        const len = isLong ? 21 : 12
        const rad = angle * Math.PI / 180
        const x1  = (32 + r1 * Math.sin(rad)).toFixed(2)
        const y1  = (32 - r1 * Math.cos(rad)).toFixed(2)
        const x2  = (32 + (r1 + len) * Math.sin(rad)).toFixed(2)
        const y2  = (32 - (r1 + len) * Math.cos(rad)).toFixed(2)
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#E8C970"
            strokeWidth={isLong ? '2.5' : '1.5'}
            strokeLinecap="round"
            opacity={isLong ? '0.78' : '0.42'}
          />
        )
      })}
      <circle cx="32" cy="32" r="9"   fill="#E8C970" opacity="0.22" />
      <circle cx="32" cy="32" r="4.5" fill="#E8C970" opacity="0.88" />
    </svg>
  )
}

// ── Visual-notes illustrations (large, art area) ──────────────────────────────
function ClarityIllustration() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="vn-svg" aria-hidden="true">
      <circle cx="70" cy="70" r="64" stroke="#8FAF9C" strokeWidth="1"   opacity="0.18" strokeDasharray="4 7" />
      <circle cx="70" cy="70" r="50" stroke="#8FAF9C" strokeWidth="1.5" opacity="0.32" />
      <circle cx="70" cy="70" r="36" stroke="#8FAF9C" strokeWidth="2"   opacity="0.52" />
      <circle cx="70" cy="70" r="20" stroke="#8FAF9C" strokeWidth="2.5" opacity="0.72" />
      <circle cx="70" cy="70" r="7"  fill="#8FAF9C"                     opacity="0.9" />
      {/* Cardinal spokes */}
      <line x1="70" y1="5"   x2="70" y2="22"  stroke="#8FAF9C" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
      <line x1="70" y1="118" x2="70" y2="135" stroke="#8FAF9C" strokeWidth="2"   strokeLinecap="round" opacity="0.32" />
      <line x1="5"  y1="70"  x2="22" y2="70"  stroke="#8FAF9C" strokeWidth="2"   strokeLinecap="round" opacity="0.32" />
      <line x1="118" y1="70" x2="135" y2="70" stroke="#8FAF9C" strokeWidth="2"   strokeLinecap="round" opacity="0.32" />
      {/* N arrowhead */}
      <polygon points="70,7 66,22 74,22" fill="#8FAF9C" opacity="0.7" />
      {/* Diagonal ticks */}
      <line x1="22" y1="22"  x2="30" y2="30"  stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="118" y1="22" x2="110" y2="30" stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="22" y1="118" x2="30" y2="110" stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <line x1="118" y1="118" x2="110" y2="110" stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  )
}

function ListeningIllustration() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="vn-svg" aria-hidden="true">
      <circle cx="30" cy="70" r="8"  fill="#BFD7D9" opacity="0.9" />
      <circle cx="30" cy="70" r="14" stroke="#BFD7D9" strokeWidth="1.5" opacity="0.38" />
      <path d="M 52 50 Q 90 70 52 90"   stroke="#BFD7D9" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 65 37 Q 112 70 65 103" stroke="#BFD7D9" strokeWidth="2.5" strokeLinecap="round" opacity="0.62" />
      <path d="M 79 26 Q 130 70 79 114" stroke="#BFD7D9" strokeWidth="2"   strokeLinecap="round" opacity="0.38" />
      <path d="M 94 17 Q 138 70 94 123" stroke="#BFD7D9" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
    </svg>
  )
}

function MomentumIllustration() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="vn-svg" aria-hidden="true">
      {/* Ground */}
      <line x1="38" y1="122" x2="102" y2="122" stroke="#8FAF9C" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      {/* Roots */}
      <path d="M70 122 Q56 130 46 126" stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.22" fill="none" />
      <path d="M70 122 Q84 130 94 126" stroke="#8FAF9C" strokeWidth="1.5" strokeLinecap="round" opacity="0.22" fill="none" />
      {/* Stem */}
      <line x1="70" y1="122" x2="70" y2="26" stroke="#8FAF9C" strokeWidth="4" strokeLinecap="round" />
      {/* Lower leaves */}
      <ellipse cx="49" cy="100" rx="20" ry="10" fill="#8FAF9C" opacity="0.44" transform="rotate(-40 49 100)" />
      <ellipse cx="91" cy="88"  rx="20" ry="10" fill="#BFD7D9" opacity="0.5"  transform="rotate(40 91 88)" />
      {/* Upper leaves */}
      <ellipse cx="51" cy="72"  rx="16" ry="8"  fill="#8FAF9C" opacity="0.34" transform="rotate(-35 51 72)" />
      <ellipse cx="89" cy="62"  rx="16" ry="8"  fill="#BFD7D9" opacity="0.4"  transform="rotate(35 89 62)" />
      {/* Bud */}
      <ellipse cx="70" cy="24"  rx="11" ry="17" fill="#8FAF9C" opacity="0.82" />
      <ellipse cx="61" cy="30"  rx="7"  ry="12" fill="#C8DDD4" opacity="0.52" transform="rotate(-22 61 30)" />
      {/* Ground dots */}
      <circle cx="42" cy="115" r="3" fill="#8FAF9C" opacity="0.28" />
      <circle cx="98" cy="115" r="3" fill="#8FAF9C" opacity="0.28" />
    </svg>
  )
}

// ── Expandable Assessment Card ────────────────────────────────────────────────
function AssessmentCard({ tag, tagClass, cardType, title, summary, fullText, chips, reflection, illustration }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`acard acard--${cardType}${open ? ' acard--open' : ''}`}>
      <div className="acard-head">
        <div className="acard-head-row">
          <span className={`acard-tag ${tagClass}`}>{tag}</span>
          {illustration && <div className="acard-ill" aria-hidden="true">{illustration}</div>}
        </div>
        <h3 className="acard-title">{title}</h3>
        <p className="acard-summary">{summary}</p>
        <div className="chip-row">{chips}</div>
      </div>
      {open && (
        <div className="acard-detail">
          <p className="acard-full">{fullText}</p>
          {reflection && (
            <div className="acard-reflection">
              <span className="acard-reflection-bar" aria-hidden="true" />
              <p>{reflection}</p>
            </div>
          )}
        </div>
      )}
      <button
        className="acard-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {open ? 'Close ↑' : 'Read more ↓'}
      </button>
    </div>
  )
}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({ onEnter }) {
  const [phase,   setPhase]   = useState(0)
  const [exiting, setExiting] = useState(false)

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (prefersReduced) {
      setPhase(7)   // show everything at once, skip the sequence
      return
    }
    // Sequential animation schedule (ms from mount)
    const schedule = [
      [500,  1],   // clarity light warms the centre
      [1200, 2],   // growth path begins drawing
      [2800, 3],   // weekly check-in dots light up
      [3800, 4],   // title fades in
      [4700, 5],   // byline fades in
      [5400, 6],   // tagline fades in
      [6100, 7],   // "Begin Reflection" button appears
    ]
    const timers = schedule.map(([delay, p]) => setTimeout(() => setPhase(p), delay))
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleEnter = () => {
    if (exiting) return
    setExiting(true)
    setTimeout(onEnter, prefersReduced ? 80 : 700)
  }

  // Approximate positions along the SVG path  M 50 350 C 200 320 350 260 500 250 C 650 240 800 272 950 265
  const PATH_DOTS = [
    { cx: 148, cy: 338 },
    { cx: 312, cy: 270 },
    { cx: 500, cy: 250 },
    { cx: 688, cy: 262 },
    { cx: 852, cy: 267 },
  ]

  return (
    <div
      className={`intro${exiting ? ' intro--exit' : ''}`}
      role="main"
      aria-label="Introduction to The Gentle Growth Log"
    >
      {/* Paper texture */}
      <div className="intro-paper" aria-hidden="true" />

      {/* Ambient fog blobs — soft colour pools that breathe */}
      <div className="intro-fog" aria-hidden="true" />

      {/* Clarity light — gently warms the centre of the screen */}
      <div className={`intro-light${phase >= 1 ? ' intro-light--on' : ''}`} aria-hidden="true" />

      {/* Growth path + weekly check-in dots */}
      <svg
        className="intro-path-svg"
        viewBox="0 0 1000 600"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Path draws itself left → right */}
        <path
          className={`intro-path-line${phase >= 2 ? ' intro-path-line--draw' : ''}`}
          d="M 50 350 C 200 320 350 260 500 250 C 650 240 800 272 950 265"
          stroke="#8FAF9C"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="960 960"
          strokeDashoffset="960"
        />
        {/* Dots light up one by one after the path */}
        {PATH_DOTS.map((dot, i) => (
          <g key={i}>
            <circle
              className={`intro-dot-ring${phase >= 3 ? ' intro-dot-ring--on' : ''}`}
              style={{ animationDelay: `${i * 0.34}s` }}
              cx={dot.cx} cy={dot.cy} r="9"
              fill="none" stroke="#8FAF9C" strokeWidth="1"
            />
            <circle
              className={`intro-dot-circle${phase >= 3 ? ' intro-dot-circle--on' : ''}`}
              style={{ animationDelay: `${i * 0.34}s` }}
              cx={dot.cx} cy={dot.cy} r="4.5"
              fill="#8FAF9C"
            />
          </g>
        ))}
      </svg>

      {/* Title, byline, tagline, and entry button */}
      <div className="intro-content">
        <span className={`intro-glyph${phase >= 4 ? ' intro-visible' : ''}`} aria-hidden="true">✦</span>
        <h1 className={`intro-title${phase >= 4 ? ' intro-visible' : ''}`}>
          The Gentle Growth Log
        </h1>
        <p className={`intro-byline${phase >= 5 ? ' intro-visible' : ''}`}>
          A Leadership Diary by Yulin Li
        </p>
        <p className={`intro-tagline${phase >= 6 ? ' intro-visible' : ''}`}>
          "From uncertainty to clarity,<br />one reflection at a time."
        </p>
        <button
          className={`intro-btn${phase >= 7 ? ' intro-visible' : ''}`}
          onClick={handleEnter}
          aria-label="Begin reading the diary"
        >
          Begin Reflection →
        </button>
      </div>

      {/* Skip option — bottom-right corner */}
      <button
        className="intro-skip"
        onClick={handleEnter}
        aria-label="Skip introduction"
      >
        Skip intro
      </button>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────
function App() {
  const [showIntro,      setShowIntro]      = useState(true)
  const [entering,       setEntering]       = useState(false)
  const [activeSection,  setActiveSection]  = useState('home')
  const [mobileNavOpen,  setMobileNavOpen]  = useState(false)
  const [reflectionOpen, setReflectionOpen] = useState(false)
  const [modalOpen,      setModalOpen]      = useState(false)
  const [formSaved,      setFormSaved]      = useState(false)
  const [formData,       setFormData]       = useState({ weekTitle: '', insight: '', goal: '', different: '' })
  const [extraEntries,   setExtraEntries]   = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })

  useEffect(() => { document.title = 'The Gentle Growth Log — Leadership Diary by Yulin Li' }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
      let active = 'home'
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= y) active = item.id
      }
      setActiveSection(active)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo   = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileNavOpen(false) }
  const openModal  = () => { setModalOpen(true); setFormSaved(false) }
  const closeModal = () => { setModalOpen(false); setFormData({ weekTitle: '', insight: '', goal: '', different: '' }); setFormSaved(false) }
  const handleField = (k, v) => setFormData(d => ({ ...d, [k]: v }))

  const handleSave = (e) => {
    e.preventDefault()
    if (!formData.weekTitle.trim()) return
    const entry = { ...formData, id: Date.now() }
    const next  = [...extraEntries, entry]
    setExtraEntries(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setFormSaved(true)
    setTimeout(closeModal, 1800)
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
    setEntering(true)
    setTimeout(() => setEntering(false), 900)
  }

  if (showIntro) return <IntroScreen onEnter={handleIntroComplete} />

  return (
    <div className={`app${entering ? ' app--entering' : ''}`}>

      {/* ── Ambient background shapes ── */}
      <div className="deco" aria-hidden="true">
        <span className="deco-blob db1" />
        <span className="deco-blob db2" />
        <span className="deco-blob db3" />
        <span className="deco-dots" />
        <span className="deco-ring dr1" />
        <span className="deco-ring dr2" />
      </div>

      {/* ── Sidebar ── */}
      <nav className="sidebar" aria-label="Site navigation">
        <div className="sb-brand">
          <span className="sb-glyph" aria-hidden="true">✦</span>
          <span className="sb-name">Gentle Growth Log</span>
        </div>
        <ul className="nav-list" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link${activeSection === item.id ? ' nav-link--active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="sb-add-btn" onClick={openModal}>+ New Entry</button>
        <p className="sb-footer">Yulin Li · 2026</p>
      </nav>

      {/* ── Mobile header ── */}
      <header className="mob-header">
        <span className="mob-brand">✦ Gentle Growth Log</span>
        <button
          className="mob-menu-btn"
          onClick={() => setMobileNavOpen(o => !o)}
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`ham${mobileNavOpen ? ' ham--open' : ''}`} />
        </button>
        {mobileNavOpen && (
          <div className="mob-dropdown">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`mob-nav-link${activeSection === item.id ? ' mob-nav-link--active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >{item.label}</button>
            ))}
            <button className="mob-add-link" onClick={() => { setMobileNavOpen(false); openModal() }}>
              + New Entry
            </button>
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="main">

        {/* ════════════ HOME ════════════ */}
        <section id="home" className="section section--home">
          <div className="home-text">
            {/* ── Twinkling sparkles: soft stars near the title area ── */}
            <span className="hero-spark s1" aria-hidden="true">✦</span>
            <span className="hero-spark s2" aria-hidden="true">✦</span>
            <span className="hero-spark s3" aria-hidden="true">✧</span>
            <span className="hero-spark s4" aria-hidden="true">✦</span>

            {/* ── Growth path: soft dotted journey line behind the text ── */}
            <svg className="hero-path" viewBox="0 0 500 440" fill="none" aria-hidden="true">
              <path
                className="hero-path-line"
                d="M -20 420 C 40 360 110 300 190 250 C 270 200 360 140 500 70"
                stroke="#8FAF9C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 13"
              />
            </svg>

            <span className="eyebrow">Personal Leadership Diary</span>
            <h1 className="site-title">The Gentle<br />Growth Log</h1>
            <p className="site-sub">A Leadership Diary by Yulin Li</p>
            <p className="home-intro">
              This diary is a living record of my leadership growth. I use it to return
              to my patterns each week, notice what changes, and practice becoming a more
              intentional collaborator.
            </p>

            {/* Sticky note ─ slightly rotated, lined paper feel */}
            <div className="intention" role="note">
              <div className="intention-tape" aria-hidden="true" />
              <div className="intention-tape intention-tape--right" aria-hidden="true" />
              <div className="intention-head">
                <span className="intention-glyph" aria-hidden="true">✦</span>
                <span className="intention-label">Current Intention</span>
              </div>
              <p className="intention-quote">"Move with clarity, but leave room for others."</p>
              <p className="intention-foot">Updated weekly after each Monday diary check-in.</p>
            </div>

            <div className="home-btns">
              <button className="cta-btn" onClick={() => scrollTo('baseline')}>Start Reading <span className="cta-arrow" aria-hidden="true">↓</span></button>
              <button className="cta-btn cta-btn--warm" onClick={openModal}>+ Add New Entry</button>
            </div>
          </div>

          {/* Diary-cover paper stack */}
          <div className="papers" aria-hidden="true">
            <div className="paper paper--back2" />
            <div className="paper paper--back1" />
            <div className="paper paper--front">
              <div className="paper-margin-line" />
              {[...Array(8)].map((_, i) => <div key={i} className="paper-rule" />)}
              <div className="paper-stamp">
                <span>✦</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ BASELINE ════════════ */}
        <section id="baseline" className="section">
          <div className="sec-head">
            <span className="part-tag">01 / Baseline Map</span>
            <h2 className="sec-title">Baseline Map</h2>
            <p className="sec-lead">Three lenses on how I show up. Click any card to expand.</p>
          </div>

          <div className="acard-stack">
            <AssessmentCard
              tag="SCARF"
              tagClass="tag--scarf"
              cardType="scarf"
              title="SCARF Compass"
              summary="Certainty and Autonomy lead me. I work best when direction is clear and I have room to decide."
              fullText="My SCARF results show that I am strongly motivated by Certainty and Autonomy, both scoring 7. This makes sense to me because I feel more confident when I understand the direction of a project and have enough space to make choices. I also scored high in Status and Relatedness, which tells me that I care about doing meaningful work, being respected, and building real connections with people. Fairness is also important to me, especially when I am working in a group and want everyone's voice and effort to be recognized."
              chips={SCARF_SCORES.map(({ label, score }) => (
                <span key={label} className="chip chip--score">{label} <em>{score}</em></span>
              ))}
              reflection="I work best when expectations are clear, roles are not confusing, and I have room to make decisions. As a leader, I can help a group by creating clarity, but I also need to stay flexible when the process is uncertain."
              illustration={<ScarfCompassIll />}
            />

            <AssessmentCard
              tag="VIA"
              tagClass="tag--via"
              cardType="via"
              title="VIA Inner Strengths"
              summary="Meaning, gratitude, and honesty shape how I work. I need the work to feel real and responsible."
              fullText="My VIA strengths show a strong connection to meaning, care, and thoughtful action. My top strengths include Spirituality, Gratitude, Prudence, Honesty, and Fairness. I see these as connected to the way I approach both design and collaboration."
              chips={VIA_STRENGTHS.map(s => (
                <span key={s} className="chip chip--strength">{s}</span>
              ))}
              reflection="I am not only motivated by finishing tasks. I need the work to feel meaningful and responsible. I want my leadership to feel sincere, not performative."
              illustration={<VIAFlowerIll />}
            />

            <AssessmentCard
              tag="Superpowers"
              tagClass="tag--super"
              cardType="super"
              title="Superpower Card"
              summary="My superpower is Motivation. I help things move forward when a situation feels stuck or unclear."
              fullText="My Superpower result is Motivation, and I also bring Problem Solving. I often want to help things move forward when a situation feels stuck. I like finding a path through messy or unclear moments."
              chips={
                <>
                  <span className="chip chip--super-main">✦ Motivation</span>
                  <span className="chip chip--super-also">+ Problem Solving</span>
                </>
              }
              reflection="My strength is helping people and projects regain movement. My challenge is slowing down enough to make sure the direction is shared, not just efficient."
              illustration={<SparkBurstIll />}
            />
          </div>
        </section>

        {/* ════════════ REFLECTION ════════════ */}
        <section id="reflection" className="section">
          <div className="sec-head">
            <span className="part-tag">↳ Synthesis</span>
            <h2 className="sec-title">Baseline Reflection</h2>
            <p className="sec-lead">A note written after looking at the full picture.</p>
          </div>

          <div className="letter">
            <div className="letter-fold" aria-hidden="true" />
            <div className="letter-head">
              <span className="letter-icon" aria-hidden="true">✉</span>
              <span className="letter-label">An Open Letter to Myself</span>
              <span className="letter-date">Written at the start of the course</span>
            </div>
            <div className="letter-body">
              <p>
                Looking across the SCARF, VIA, and Superpowers results, I noticed that I care a lot
                about having clarity, choice, and a sense of purpose in what I do. My high Certainty
                and Autonomy scores show that I feel more confident when I understand the direction
                of a project and have space to make my own decisions. My VIA strengths also show that
                meaning, gratitude, fairness, and honesty matter to me. My Superpower result,
                Motivation, connects to this because I often want to help a group move forward,
                especially when things feel unclear.
              </p>
              {reflectionOpen && (
                <div className="letter-rest">
                  <p>
                    A common pattern across all three assessments is that I am not only task-driven.
                    I need the work to feel meaningful, fair, and connected to people. This helps
                    explain why I am drawn to design projects about care, community, emotion, and
                    support. What surprised me was how strong my need for certainty and autonomy is.
                    I knew I liked being organized, but I did not realize how much unclear expectations
                    or last-minute changes could affect my confidence.
                  </p>
                  <p>
                    These results help me understand my leadership style as quiet but intentional.
                    I may not always lead by being the loudest person in the room, but I can lead by
                    creating structure, noticing what people need, asking thoughtful questions, and
                    helping the group stay motivated. At the same time, I want to be careful not to
                    move too quickly into solving problems before fully listening. For me, leadership
                    growth means learning how to balance direction with openness: bringing clarity and
                    motivation, while still giving others enough space to think, choose, and contribute.
                  </p>
                </div>
              )}
            </div>
            <button
              className="letter-toggle"
              onClick={() => setReflectionOpen(o => !o)}
              aria-expanded={reflectionOpen}
            >
              {reflectionOpen ? 'Fold the letter ↑' : 'Unfold the full letter ↓'}
            </button>
          </div>
        </section>

        {/* ════════════ DIARY ════════════ */}
        <section id="diary" className="section">
          <div className="sec-head">
            <span className="part-tag">02 / Weekly Diary</span>
            <h2 className="sec-title">Weekly Diary</h2>
            <p className="sec-lead">One week at a time — noticing, reflecting, adjusting.</p>
          </div>

          <div className="timeline">
            <div className="tl-line" aria-hidden="true" />

            {/* Render from weeklyEntries — edit that array at the top of the file */}
            {weeklyEntries.map(entry => {
              const isPlaceholder = entry.status === 'placeholder'
              const isDone        = entry.status === 'done'
              const nodeClass     = isPlaceholder ? 'tl-node--future' : 'tl-node--active'
              const cardClass     = isPlaceholder ? 'diary-card--placeholder' : 'diary-card--active'
              const badge = isPlaceholder
                ? <span className="wk-badge wk-badge--soon">Mon check-in</span>
                : isDone
                  ? <span className="wk-badge wk-badge--soon">✓ Done</span>
                  : <span className="wk-badge wk-badge--live">This Week</span>

              return (
                <div key={entry.week} className="tl-row">
                  <div className={`tl-node ${nodeClass}`} aria-hidden="true">
                    <span className={`tl-w${isPlaceholder ? ' tl-w--future' : ''}`}>W{entry.week}</span>
                  </div>

                  {isPlaceholder ? (
                    <div className={`diary-card ${cardClass}`}>
                      <div className="diary-card-top">
                        <h3 className="diary-title diary-title--placeholder">Week {entry.week} — Coming soon</h3>
                        {badge}
                      </div>
                      <p className="placeholder-note">
                        This entry will be added after the next Monday diary check-in.
                      </p>
                      <button className="diary-add-btn" onClick={openModal}>+ Add entry</button>
                    </div>
                  ) : (
                    <div className={`diary-card ${cardClass}`}>
                      <div className="diary-card-top">
                        <h3 className="diary-title">Week {entry.week} — {entry.title}</h3>
                        {badge}
                      </div>
                      <div className="diary-tags">
                        <span className="dtag dtag--insight">Insight</span>
                        <span className="dtag dtag--goal">Goal</span>
                        <span className="dtag dtag--diff">Do Differently</span>
                      </div>

                      {entry.insight.length > 0 && (
                        <div className="diary-block">
                          <span className="dblock-label">Key Insight / Learning</span>
                          {entry.insight.map((para, i) => <p key={i}>{para}</p>)}
                        </div>
                      )}

                      {entry.goal.length > 0 && (
                        <div className="diary-block">
                          <span className="dblock-label">Goal</span>
                          {entry.goal.map((para, i) => <p key={i}>{para}</p>)}
                        </div>
                      )}

                      {entry.action.length > 0 && (
                        <div className="diary-block">
                          <span className="dblock-label">One Thing I Will Do Differently</span>
                          {entry.action.map((para, i) => <p key={i}>{para}</p>)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Entries added via the modal (stored in localStorage) */}
            {extraEntries.map((entry) => (
              <div key={entry.id} className="tl-row">
                <div className="tl-node tl-node--extra" aria-hidden="true">
                  <span className="tl-w">+</span>
                </div>
                <div className="diary-card diary-card--active">
                  <div className="diary-card-top">
                    <h3 className="diary-title">{entry.weekTitle}</h3>
                    <span className="wk-badge wk-badge--live">Added</span>
                  </div>
                  {entry.insight && (
                    <div className="diary-block">
                      <span className="dblock-label">Key Insight / Learning</span>
                      <p>{entry.insight}</p>
                    </div>
                  )}
                  {entry.goal && (
                    <div className="diary-block">
                      <span className="dblock-label">Goal</span>
                      <p>{entry.goal}</p>
                    </div>
                  )}
                  {entry.different && (
                    <div className="diary-block">
                      <span className="dblock-label">One Thing I Will Do Differently</span>
                      <p>{entry.different}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════ VISUAL NOTES ════════════ */}
        <section id="visual-notes" className="section">
          <div className="sec-head">
            <span className="part-tag">03 / Visual Notes</span>
            <h2 className="sec-title">Ideas as Images</h2>
            <p className="sec-lead">Three themes I keep returning to, drawn in shapes and lines.</p>
          </div>

          <div className="vn-grid">
            <div className="vn-card">
              <div className="vn-art vn-art--sage">
                <ClarityIllustration />
              </div>
              <div className="vn-body">
                <h3 className="vn-title">Clarity</h3>
                <p className="vn-note">
                  Knowing the direction before moving. Creating structure so others can
                  orient themselves too — not control, just a shared compass.
                </p>
              </div>
            </div>

            <div className="vn-card">
              <div className="vn-art vn-art--mist">
                <ListeningIllustration />
              </div>
              <div className="vn-body">
                <h3 className="vn-title">Listening</h3>
                <p className="vn-note">
                  Pausing before responding. Making space for what others are trying to say,
                  even when I already feel the urge to move.
                </p>
              </div>
            </div>

            <div className="vn-card">
              <div className="vn-art vn-art--wheat">
                <MomentumIllustration />
              </div>
              <div className="vn-body">
                <h3 className="vn-title">Gentle Momentum</h3>
                <p className="vn-note">
                  Moving forward without rushing. Growth that feels sustainable, shared,
                  and rooted — not just efficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ PRACTICE ════════════ */}
        <section id="practice" className="section section--practice">
          <div className="sec-head">
            <span className="part-tag">04 / Practice</span>
            <h2 className="sec-title">What I Am Practicing</h2>
            <p className="sec-lead">Three intentions I keep coming back to.</p>
          </div>

          <div className="practice-grid">
            <div className="practice-card">
              <span className="practice-num">01</span>
              <p>Bring clarity without controlling the process.</p>
            </div>
            <div className="practice-card">
              <span className="practice-num">02</span>
              <p>Listen before moving into problem solving.</p>
            </div>
            <div className="practice-card">
              <span className="practice-num">03</span>
              <p>Share earlier, even when the idea is not perfect.</p>
            </div>
          </div>

          <footer className="site-footer">
            The Gentle Growth Log · Leadership Diary by Yulin Li
          </footer>
        </section>

      </main>

      {/* ════════════ MODAL ════════════ */}
      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          role="dialog"
          aria-modal="true"
          aria-label="Add a new diary entry"
        >
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">New Diary Entry</h2>
              <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            {formSaved ? (
              <div className="modal-saved">
                <span className="modal-saved-glyph" aria-hidden="true">✦</span>
                <p>Entry saved to your diary.</p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleSave}>
                <label className="form-label">
                  Week title
                  <input
                    className="form-input"
                    type="text"
                    placeholder="e.g. Week 2 — Finding my voice in groups"
                    value={formData.weekTitle}
                    onChange={(e) => handleField('weekTitle', e.target.value)}
                    required
                  />
                </label>
                <label className="form-label">
                  Key insight / learning
                  <textarea className="form-textarea" placeholder="What did you notice this week?" value={formData.insight}   onChange={(e) => handleField('insight', e.target.value)}   rows={4} />
                </label>
                <label className="form-label">
                  Goal
                  <textarea className="form-textarea" placeholder="What do you want to practice?"  value={formData.goal}      onChange={(e) => handleField('goal', e.target.value)}      rows={3} />
                </label>
                <label className="form-label">
                  One thing I will do differently
                  <textarea className="form-textarea" placeholder="One concrete action for next time." value={formData.different} onChange={(e) => handleField('different', e.target.value)} rows={3} />
                </label>
                <div className="form-actions">
                  <button type="button" className="form-btn form-btn--cancel" onClick={closeModal}>Cancel</button>
                  <button type="submit"  className="form-btn form-btn--save">Save Entry ✦</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
