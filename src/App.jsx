import { useState, useEffect } from 'react'
import './App.css'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'baseline', label: 'Baseline Map' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'diary', label: 'Weekly Diary' },
  { id: 'growth', label: 'Growth Pattern' },
]

const SCARF_SCORES = [
  { label: 'Status', score: '6.67' },
  { label: 'Certainty', score: '7' },
  { label: 'Autonomy', score: '7' },
  { label: 'Relatedness', score: '6' },
  { label: 'Fairness', score: '5.33' },
]

const VIA_STRENGTHS = ['Spirituality', 'Gratitude', 'Prudence', 'Honesty', 'Fairness']

const PLACEHOLDER_WEEKS = [2, 3, 4, 5]

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    document.title = 'Growing in Gentle Systems — Leadership Diary by Yulin Li'
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140
      let current = 'home'
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollY) {
          current = item.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileNavOpen(false)
  }

  return (
    <div className="app">

      {/* Background decorative shapes */}
      <div className="deco" aria-hidden="true">
        <span className="deco-circle deco-c1" />
        <span className="deco-circle deco-c2" />
        <span className="deco-circle deco-c3" />
        <span className="deco-circle deco-c4" />
        <span className="deco-dot-grid" />
      </div>

      {/* ── Sidebar navigation (desktop) ── */}
      <nav className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand">
          <span className="brand-glyph">✦</span>
          <span className="brand-name">Gentle Systems</span>
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
        <p className="sidebar-footer">Leadership Diary<br />Yulin Li · 2025</p>
      </nav>

      {/* ── Mobile header ── */}
      <header className="mobile-header">
        <span className="mobile-brand">✦ Gentle Systems</span>
        <button
          className="hamburger-btn"
          onClick={() => setMobileNavOpen(o => !o)}
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
        >
          <span className={`hamburger-icon${mobileNavOpen ? ' hamburger-icon--open' : ''}`} />
        </button>
        {mobileNavOpen && (
          <div className="mobile-dropdown">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`mobile-nav-link${activeSection === item.id ? ' mobile-nav-link--active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Main content ── */}
      <main className="main">

        {/* ═══ Section 1: Home ═══ */}
        <section id="home" className="section section--home">
          <div className="home-inner">
            <span className="eyebrow">Leadership Diary</span>
            <h1 className="site-title">Growing in<br />Gentle Systems</h1>
            <p className="site-subtitle">A Leadership Diary by Yulin Li</p>
            <p className="home-intro">
              This diary is a living record of my leadership growth throughout the course.
              Instead of treating self-awareness as a one-time result, I want to use this
              space to return to my patterns every week, notice what changes, and practice
              becoming a more intentional collaborator.
            </p>

            {/* Sticky-note intention card */}
            <div className="intention-card">
              <div className="intention-tape" aria-hidden="true" />
              <div className="intention-header">
                <span className="intention-glyph">✦</span>
                <span className="intention-label">Current Intention</span>
              </div>
              <p className="intention-quote">
                "Move with clarity, but leave room for others."
              </p>
              <p className="intention-note">Updated weekly after each Monday diary check-in.</p>
            </div>

            <button className="cta-btn" onClick={() => scrollTo('baseline')}>
              Start Reading ↓
            </button>
          </div>
        </section>

        {/* ═══ Section 2: Baseline Map ═══ */}
        <section id="baseline" className="section">
          <div className="section-header">
            <span className="part-tag">Part 1</span>
            <h2 className="section-title">Baseline Map</h2>
            <p className="section-lead">
              Three lenses on how I show up — SCARF, VIA, and Superpowers.
            </p>
          </div>

          <div className="assessment-cards">

            {/* SCARF */}
            <div className="acard">
              <span className="acard-tag acard-tag--scarf">SCARF</span>
              <h3 className="acard-title">SCARF Snapshot</h3>
              <p className="acard-body">
                My SCARF results show that I am strongly motivated by Certainty and Autonomy,
                both scoring 7. This makes sense to me because I feel more confident when I
                understand the direction of a project and have enough space to make choices.
                I also scored high in Status and Relatedness, which tells me that I care about
                doing meaningful work, being respected, and building real connections with people.
                Fairness is also important to me, especially when I am working in a group and want
                everyone's voice and effort to be recognized.
              </p>
              <div className="chip-row">
                {SCARF_SCORES.map(({ label, score }) => (
                  <span key={label} className="chip chip--score">
                    {label} <em>{score}</em>
                  </span>
                ))}
              </div>
              <div className="mini-reflection">
                <span className="mini-reflection-bar" aria-hidden="true" />
                <p>
                  I work best when expectations are clear, roles are not confusing, and I have room
                  to make decisions. As a leader, I can help a group by creating clarity, but I also
                  need to stay flexible when the process is uncertain.
                </p>
              </div>
            </div>

            {/* VIA */}
            <div className="acard">
              <span className="acard-tag acard-tag--via">VIA</span>
              <h3 className="acard-title">VIA Strengths Snapshot</h3>
              <p className="acard-body">
                My VIA strengths show a strong connection to meaning, care, and thoughtful action.
                My top strengths include Spirituality, Gratitude, Prudence, Honesty, and Fairness.
                I see these as connected to the way I approach both design and collaboration.
              </p>
              <div className="chip-row">
                {VIA_STRENGTHS.map(s => (
                  <span key={s} className="chip chip--strength">{s}</span>
                ))}
              </div>
              <div className="mini-reflection">
                <span className="mini-reflection-bar" aria-hidden="true" />
                <p>
                  I am not only motivated by finishing tasks. I need the work to feel meaningful
                  and responsible. I want my leadership to feel sincere, not performative.
                </p>
              </div>
            </div>

            {/* Superpowers */}
            <div className="acard">
              <span className="acard-tag acard-tag--super">Superpowers</span>
              <h3 className="acard-title">Superpower Snapshot</h3>
              <p className="acard-body">
                My Superpower result is Motivation, and I also bring Problem Solving. I often want
                to help things move forward when a situation feels stuck. I like finding a path
                through messy or unclear moments.
              </p>
              <div className="superpower-row">
                <div className="superpower-cell superpower-cell--main">
                  <span className="superpower-sublabel">Main Superpower</span>
                  <span className="superpower-name">Motivation</span>
                </div>
                <div className="superpower-cell superpower-cell--also">
                  <span className="superpower-sublabel">Also Brings</span>
                  <span className="superpower-name superpower-name--secondary">Problem Solving</span>
                </div>
              </div>
              <div className="mini-reflection">
                <span className="mini-reflection-bar" aria-hidden="true" />
                <p>
                  My strength is helping people and projects regain movement. My challenge is
                  slowing down enough to make sure the direction is shared, not just efficient.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ Section 3: Baseline Reflection ═══ */}
        <section id="reflection" className="section">
          <div className="section-header">
            <span className="part-tag">Synthesis</span>
            <h2 className="section-title">Baseline Reflection</h2>
          </div>
          <div className="reflection-card">
            <p>
              Looking across the SCARF, VIA, and Superpowers results, I noticed that I care a lot
              about having clarity, choice, and a sense of purpose in what I do. My high Certainty
              and Autonomy scores show that I feel more confident when I understand the direction
              of a project and have space to make my own decisions. My VIA strengths also show that
              meaning, gratitude, fairness, and honesty matter to me. My Superpower result,
              Motivation, connects to this because I often want to help a group move forward,
              especially when things feel unclear.
            </p>
            <p>
              A common pattern across all three assessments is that I am not only task-driven. I
              need the work to feel meaningful, fair, and connected to people. This helps explain
              why I am drawn to design projects about care, community, emotion, and support. What
              surprised me was how strong my need for certainty and autonomy is. I knew I liked
              being organized, but I did not realize how much unclear expectations or last-minute
              changes could affect my confidence.
            </p>
            <p>
              These results help me understand my leadership style as quiet but intentional. I may
              not always lead by being the loudest person in the room, but I can lead by creating
              structure, noticing what people need, asking thoughtful questions, and helping the
              group stay motivated. At the same time, I want to be careful not to move too quickly
              into solving problems before fully listening. For me, leadership growth means learning
              how to balance direction with openness: bringing clarity and motivation, while still
              giving others enough space to think, choose, and contribute.
            </p>
          </div>
        </section>

        {/* ═══ Section 4: Weekly Diary ═══ */}
        <section id="diary" className="section">
          <div className="section-header">
            <span className="part-tag">Part 2</span>
            <h2 className="section-title">Weekly Leadership Diary</h2>
            <p className="section-lead">One week at a time — noticing, reflecting, adjusting.</p>
          </div>

          <div className="timeline">

            {/* Week 1 — active */}
            <div className="tl-item">
              <div className="tl-marker">
                <span className="week-badge">W1</span>
              </div>
              <div className="diary-card diary-card--active">
                <h3 className="diary-card-title">Week 1 — Starting from Self-awareness</h3>

                <div className="diary-block">
                  <span className="diary-tag diary-tag--insight">Insight</span>
                  <p>
                    This week, I realized that leadership does not always have to look loud or
                    dominant. I used to think leadership meant being the person who speaks first,
                    gives direction quickly, or has the most confidence in the room. But after
                    looking at my SCARF, VIA, and Superpower results together, I started to see
                    that my leadership may be quieter and more structured.
                  </p>
                  <p>
                    I lead more naturally by noticing what is unclear, helping people feel
                    supported, and creating a sense of direction. I also learned that my need for
                    certainty and autonomy can be both a strength and a challenge. It helps me
                    organize ideas and move things forward, but it can also make me uncomfortable
                    when the situation is vague or changing.
                  </p>
                </div>

                <div className="diary-block">
                  <span className="diary-tag diary-tag--goal">Goal</span>
                  <p>
                    My goal for this week is to practice being more comfortable with uncertainty
                    in group work. Instead of waiting until I fully understand everything or have
                    a polished idea, I want to participate earlier and use questions as a way to
                    enter the conversation.
                  </p>
                </div>

                <div className="diary-block">
                  <span className="diary-tag diary-tag--differently">Do Differently</span>
                  <p>
                    In the next class or group discussion, I will share one thought or question
                    before I feel completely ready. I will try not to wait until my idea feels
                    perfect. If something is unclear, I will ask a clarifying question instead
                    of quietly trying to figure everything out by myself.
                  </p>
                </div>
              </div>
            </div>

            {/* Future weeks */}
            {PLACEHOLDER_WEEKS.map(week => (
              <div key={week} className="tl-item">
                <div className="tl-marker">
                  <span className="week-badge week-badge--future">W{week}</span>
                </div>
                <div className="diary-card diary-card--placeholder">
                  <h3 className="diary-card-title diary-card-title--placeholder">
                    Week {week} — Coming soon
                  </h3>
                  <p className="placeholder-text">
                    This entry will be added after the next Monday diary check-in.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Section 5: Growth Pattern ═══ */}
        <section id="growth" className="section section--growth">
          <div className="section-header">
            <span className="part-tag">Closing</span>
            <h2 className="section-title">What I Am Practicing</h2>
            <p className="section-lead">Three intentions I keep coming back to.</p>
          </div>

          <div className="growth-grid">
            <div className="growth-card">
              <span className="growth-num">01</span>
              <p>Bring clarity without controlling the process.</p>
            </div>
            <div className="growth-card">
              <span className="growth-num">02</span>
              <p>Listen before moving into problem solving.</p>
            </div>
            <div className="growth-card">
              <span className="growth-num">03</span>
              <p>Share earlier, even when the idea is not perfect.</p>
            </div>
          </div>

          <p className="site-footer">
            Growing in Gentle Systems · Leadership Diary by Yulin Li
          </p>
        </section>

      </main>
    </div>
  )
}

export default App
