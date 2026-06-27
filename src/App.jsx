import { useState, useEffect } from 'react'
import './App.css'

// ── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ggl_entries'

const TAG_STYLE_MAP = {
  'SCARF':             'dtag--scarf',
  'VIA':               'dtag--via',
  'Superpower':        'dtag--super',
  'Self-awareness':    'dtag--self',
  'Culture Decoder':   'dtag--culture',
  'Systems Thinking':  'dtag--systems',
  'Design Leadership': 'dtag--design',
  'Group Work':        'dtag--group',
  'Field Trip':          'dtag--trip',
  'Design Crit':         'dtag--crit',
  'Product Culture':     'dtag--product',
  'Career Fit':          'dtag--career',
  'Conflict Resolution': 'dtag--conflict',
  'Lateral Leadership':  'dtag--lateral',
  'Scenario Design':     'dtag--scenario',
  'Feedback':            'dtag--feedback',
  'Decision-Making':     'dtag--decision',
  'Team Rituals':        'dtag--ritual',
  'Facilitation':        'dtag--facil',
  'Design Critique':     'dtag--crit',
  'Retrospective':       'dtag--retro',
  'AI Coach':            'dtag--ai-coach',
  'Leadership Practice': 'dtag--practice',
}

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

  // ── WEEK 1 — SKIPPED ─────────────────────────────────────────────────────────
  {
    week:          1,
    title:         'Week 1 — Skipped',
    date:          'Week 1',
    status:        'skipped',
    tags:          [],
    insight:       [],
    goal:          [],
    action:        [],
    mood:          '',
    visualKeyword: '',
  },

  // ── WEEK 2 ───────────────────────────────────────────────────────────────────
  {
    week:          2,
    title:         'Starting from Self-awareness',
    date:          'Week 2',
    status:        'done',
    tags:          ['SCARF', 'VIA', 'Superpower', 'Self-awareness'],
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
    mood:          'reflective',
    visualKeyword: 'clarity',
  },

  // ── WEEK 3 ───────────────────────────────────────────────────────────────────
  {
    week:          3,
    title:         'Reading Culture as a System',
    date:          'Week 3',
    status:        'done',
    theme:         'Leading from the Whole / Organizational Culture & Systems Thinking',
    tags:          ['Culture Decoder', 'Systems Thinking', 'Design Leadership', 'Group Work'],
    groupNote:     'LbD GROUP 2 WORK — Rae, Ayushi, Yulin, Karen',
    appNote:       'Our group built a Culture Decoder App as an interactive culture profile. The assignment asked us to read organizational culture not only by what a company says it values, but by what it actually rewards, tolerates, and punishes.',
    insight: [
      `This week, I learned that organizational culture is not only something written on a company values page. It shows up in repeated behaviors, decision-making patterns, hiring language, employee reviews, and what people feel they need to do in order to succeed. The Culture Decoder App helped me understand culture as a system instead of a surface-level brand story.`,
      `Using Schein's three levels of culture made me slow down and separate visible artifacts, stated values, and deeper tacit assumptions. The Goffee & Jones sociability vs. solidarity grid also helped me see that a company can be warm but not aligned, or highly aligned but emotionally intense. Design maturity became another important lens because it shows whether design is only used for execution or actually has influence in strategy and decision-making.`,
    ],
    goal: [
      `My goal after this week is to become better at reading organizational signals before making quick judgments. Instead of only asking whether a company looks successful or attractive from the outside, I want to ask what kind of behavior the organization rewards, what it quietly tolerates, and whether design has real influence in the system.`,
    ],
    action: [
      `When I evaluate a company, a team, or a future job opportunity, I will look for at least three types of evidence before forming an opinion: what the company says, what employees or job postings reveal, and how design appears to function inside the organization. In group work, I also want to contribute by connecting evidence back to the framework, instead of just collecting information.`,
    ],
    reflection: [
      `Working with Rae, Ayushi, and Karen made this assignment feel more real because culture was not something we could decode from one source. We had to compare signals, discuss what each clue might mean, and decide how to present the analysis in a way that viewers could actually explore. Personally, I noticed that I still like having a clear structure, but culture work is not always clean or certain. Sometimes the useful insight comes from staying with the messy middle for a little longer. This connected back to my own leadership diary because I am learning that leading is not only about solving quickly. It is also about helping a group make sense of complexity together.`,
    ],
    mood:          'curious',
    visualKeyword: 'systems',
  },

  // ── WEEK 4 ───────────────────────────────────────────────────────────────────
  {
    week:          4,
    title:         'Superhuman Field Trip: Feedback, Fit, and Finding My Direction',
    date:          'Week 4',
    status:        'done',
    theme:         'Superhuman Site Visit / Design Leadership in Practice',
    tags:          ['Field Trip', 'Design Crit', 'Product Culture', 'Career Fit', 'Self-awareness'],
    insight: [
      `This week's Superhuman site visit helped me see what design leadership looks like inside a fast-moving product company, not just as a concept we talk about in class. What stood out to me most was not only the product itself, but the way the team talked about work: through critique, quick feedback, clear communication, and constant attention to how small decisions affect the user experience.`,
      `Sitting in on the design critique made me think differently about feedback culture. I noticed that critique is not just about pointing out what is wrong. It is also about how people listen, how they explain their thinking, and how they stay open when others question their work. That part felt important to me because I sometimes hesitate to speak up when I am not fully confident. Watching a real design team discuss work reminded me that contribution does not always have to be a perfect answer. Sometimes it can be a careful question, a small observation, or a different perspective.`,
      `The visit also helped me understand my own sense of fit more clearly. Superhuman gave me a better view of screen-based product design, growth design, content design, and design systems inside a software company. I found those areas useful to learn about, but I also realized that I am still more drawn to design that connects with service, care, physical context, community, or emotional experience. That does not mean product design is not valuable to me; it just helped me see that the kind of design environment I want may need to include more than screens.`,
      `The career conversations were the most useful part for me. One message I took away was that young designers cannot only wait for a role or title to define them. We need to build evidence of what we care about and what we can do. I also kept thinking about the advice around personal strengths: instead of listing everything, I need to become clearer about what I actually want to be known for.`,
    ],
    goal: [
      `My goal after this visit is to become more honest and specific about the kinds of design environments where I can grow. Instead of only asking whether a company is impressive or well-known, I want to ask whether its culture, product direction, and working style match the type of designer I am becoming.`,
      `I also want to practice describing my strengths more clearly. Right now, I can say I am interested in interaction design, service design, research, and emotional experience, but I want to make that sound more focused and confident.`,
    ],
    action: [
      `In the next critique or group discussion, I will try to share at least one observation even if it feels small. I do not need to wait until I have a perfect idea. I can contribute by asking a useful question or noticing something others may not have mentioned.`,
      `For my own career preparation, I will also start paying more attention to "fit" when I look at companies. I will not only look at the brand name or visual style. I will ask: What kind of work is rewarded here? What does the design team actually spend time doing? Would this environment help me grow in the direction I care about?`,
    ],
    reflection: [
      `This field trip made the idea of design leadership feel more real to me. It showed me that leadership is not only about managing people or having a senior title. It can show up in how someone gives feedback, how they receive critique, how they protect their motivation, and how they keep thinking beyond the task they were assigned.`,
      `I left with a clearer understanding that I do not need to force myself to fit every version of "successful designer." I can learn from a company like Superhuman while also noticing what does and does not feel right for me. That feels like an important leadership lesson too: knowing where I fit, what kind of work gives me energy, and how to keep building evidence around that direction.`,
    ],
    photos: [
      { src: '/images/week4/superhuman1.jpg', caption: 'Field trip moment' },
      { src: '/images/week4/superhuman2.jpg', caption: 'Design culture in practice' },
      { src: '/images/week4/superhuman3.jpg', caption: 'Learning from the team' },
    ],
    part2: {
      title:      'Conflict Compass: Practicing Conflict Before It Counts',
      eyebrow:    'Part 2 — Conflict Resolution Scenario App',
      appLink:    'https://yulin-conflict-resolution-app.vercel.app/',
      tags:       ['Conflict Resolution', 'Lateral Leadership', 'Scenario Design', 'Feedback', 'Decision-Making'],
      frameworks: ['Fighter', 'Avoider', 'People Pleaser', 'Diplomat', 'Negotiator', 'SBI', 'AID', 'Radical Candor'],
      insight: [
        `Building the Conflict Resolution Scenario App helped me understand lateral leadership in a more practical way. Before this assignment, I understood conflict mostly as something uncomfortable that happens between people. But while designing the scenarios, I started to see conflict as a system of pressures: deadlines, hierarchy, unclear ownership, team fatigue, stakeholder expectations, and personal communication styles.`,
        `The most useful part was mapping each response to a leadership pattern. A Fighter response can protect the work, but it can also make people defensive. Avoiding the issue may keep the meeting calm, but the real problem usually comes back later. People pleasing can protect the relationship in the short term, but it can quietly sacrifice design quality or user needs. Diplomat and Negotiator approaches helped me see that good conflict resolution is not about being nice all the time. It is about naming the tension clearly, keeping enough trust in the room, and creating a next step that people can actually follow.`,
      ],
      goal: [
        `My goal after this assignment is to become more comfortable naming tension instead of smoothing it over too quickly. I often want conversations to stay calm and organized, but this project reminded me that avoiding conflict does not always protect the team. Sometimes leadership means saying the difficult thing in a way that still keeps the relationship workable.`,
      ],
      action: [
        `In future group work or critique situations, I want to pause before reacting and ask myself what role I am falling into: am I avoiding, pleasing, fighting, or actually helping the group move toward a clearer decision? If there is disagreement, I will try to name the tradeoff directly and suggest a next step instead of only trying to make the conversation feel comfortable.`,
      ],
      reflection: [
        `This project was useful because it made me rehearse situations I would normally feel nervous about. Designing the app forced me to think through not just what I would say, but what might happen after each response. That made conflict feel less like a personal failure and more like a leadership skill that can be practiced.`,
        `It also connected back to my earlier self-awareness results. I know I value clarity, autonomy, and emotional safety, so I naturally want conversations to feel stable. But leadership will not always feel stable. Sometimes the important moment is exactly when things become tense or unclear. Through this assignment, I realized that my growth is not about becoming more aggressive. It is about becoming more honest, more specific, and more willing to stay present when disagreement appears.`,
      ],
    },
    mood:          'clearer',
    visualKeyword: 'compass',
  },

  // ── WEEK 5 ───────────────────────────────────────────────────────────────────
  {
    week:             5,
    title:            'Designing Rituals as Leadership Tools',
    date:             'Week 5',
    status:           'done',
    theme:            'Team Ritual Playbook / Ritual Compass',
    tags:             ['Team Rituals', 'Facilitation', 'Design Critique', 'Retrospective', 'AI Coach', 'Leadership Practice'],
    coverImage:       '/images/week5/ritual-compass-cover.png',
    coverCaption:     'Ritual Compass — Team Ritual Playbook',
    projectLink:      'https://yulin-team-ritual-playbook-mt1i.vercel.app/',
    projectLinkLabel: 'Open Ritual Compass →',
    insight: [
      `This week helped me understand that team rituals are not just meetings on a calendar. A design critique, a retrospective, or even a simple team check-in can shape how people give feedback, build trust, make decisions, and recover from tension. Before this assignment, I usually thought about meetings from the participant side: whether they were useful, boring, stressful, or too long. But while building Ritual Compass, I had to think from the facilitator's side: what is the purpose of this ritual, what kind of energy does the room need, what should happen first, and how do we help people leave with more clarity than they came in with?`,
      `I focused on Design Critique and Retrospective because they represent two different kinds of leadership work. Design critique is about improving the work without making feedback feel personal or scattered. Retrospective is about improving how the team works together, especially after a project, conflict, or repeated pattern. Building both made me realize that good facilitation is not about controlling the room. It is about creating enough structure so that people can speak honestly, listen better, and move toward a useful next step.`,
      `The AI Ritual Coach also made me think about how AI can support leadership practice without replacing human judgment. I did not want the AI feature to feel like a generic chatbot. I wanted it to be grounded in the playbook itself, so the advice connects back to the ritual templates. That helped me understand AI as a support tool for preparation and reflection, not as something that should make decisions for the facilitator.`,
    ],
    goal: [
      `My goal after this week is to become more intentional about how I enter group work. Instead of only thinking about my own tasks, I want to pay more attention to the structure around collaboration: how feedback is invited, how quiet people are included, how decisions are made, and whether the team actually follows up after a discussion.`,
    ],
    action: [
      `In the next group project or critique, I will try to notice the "ritual" behind the meeting. If the conversation feels unclear, I will ask what kind of feedback or decision we are trying to get. If people are quiet, I will suggest a small structure like silent notes or round-robin sharing. I want to practice contributing not only with design ideas, but also with better ways of helping the group work together.`,
    ],
    reflection: [
      `This assignment connected closely to my own leadership style. I tend to value clarity, emotional safety, and structure, so designing rituals felt natural to me. At the same time, I realized that structure should not make a team rigid. The best rituals leave space for real conversation, disagreement, and unexpected insights. That balance feels important for me: I do not want to lead by forcing everything into order, but by creating a space where people can think more clearly together.`,
      `Ritual Compass also made me see facilitation as a design problem. The "user" is not only one person; it is the whole team, the conversation, the tension, and the outcome. A good ritual has flow, timing, prompts, guardrails, and a clear ending. In that sense, designing a meeting is not separate from interaction design. It is another way of shaping experience.`,
    ],
    mood:          'more intentional',
    visualKeyword: 'ritual',
  },

  // ── WEEK 6 ───────────────────────────────────────────────────────────────────
  {
    week:          6,
    title:         'Coming Soon',
    date:          'Week 6',
    status:        'placeholder',
    tags:          [],
    insight:       [],
    goal:          [],
    action:        [],
    mood:          '',
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

// ── System-map illustration (diary card corner, Week 3) ──────────────────────
function SystemMapIll() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="diary-card-deco-svg" aria-hidden="true">
      {/* Center hub */}
      <circle cx="32" cy="32" r="6.5" fill="#8FAF9C" opacity="0.85" />
      <circle cx="32" cy="32" r="11" stroke="#8FAF9C" strokeWidth="1" opacity="0.28" strokeDasharray="2 4" />
      {/* Outer nodes */}
      <circle cx="12" cy="12" r="4" fill="#BFD7D9" opacity="0.72" />
      <circle cx="52" cy="12" r="4" fill="#BFD7D9" opacity="0.72" />
      <circle cx="12" cy="52" r="4" fill="#BFD7D9" opacity="0.72" />
      <circle cx="52" cy="52" r="4" fill="#BFD7D9" opacity="0.72" />
      <circle cx="32" cy="7"  r="3"   fill="#E8C970" opacity="0.68" />
      <circle cx="57" cy="32" r="3"   fill="#E8C970" opacity="0.68" />
      {/* Spoke lines to corners */}
      <line x1="32" y1="32" x2="12" y2="12" stroke="#8FAF9C" strokeWidth="1.5" opacity="0.45" />
      <line x1="32" y1="32" x2="52" y2="12" stroke="#8FAF9C" strokeWidth="1.5" opacity="0.45" />
      <line x1="32" y1="32" x2="12" y2="52" stroke="#8FAF9C" strokeWidth="1.5" opacity="0.45" />
      <line x1="32" y1="32" x2="52" y2="52" stroke="#8FAF9C" strokeWidth="1.5" opacity="0.45" />
      {/* Spoke lines to wheat nodes */}
      <line x1="32" y1="32" x2="32" y2="7"  stroke="#E8C970" strokeWidth="1" opacity="0.5" strokeDasharray="2 3" />
      <line x1="32" y1="32" x2="57" y2="32" stroke="#E8C970" strokeWidth="1" opacity="0.5" strokeDasharray="2 3" />
      {/* Perimeter arcs between corner nodes */}
      <line x1="12" y1="12" x2="52" y2="12" stroke="#BFD7D9" strokeWidth="1" opacity="0.3" strokeDasharray="3 5" />
      <line x1="12" y1="12" x2="12" y2="52" stroke="#BFD7D9" strokeWidth="1" opacity="0.3" strokeDasharray="3 5" />
      <line x1="52" y1="52" x2="12" y2="52" stroke="#BFD7D9" strokeWidth="1" opacity="0.3" strokeDasharray="3 5" />
      <line x1="52" y1="52" x2="52" y2="12" stroke="#BFD7D9" strokeWidth="1" opacity="0.3" strokeDasharray="3 5" />
    </svg>
  )
}

// Compass rose watermark — Week 4 card decoration (career direction / field trip)
function CompassIll() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="diary-card-deco-svg" aria-hidden="true">
      {/* Outer ring */}
      <circle cx="32" cy="32" r="28" stroke="#8FAF9C" strokeWidth="1.2" opacity="0.35" />
      {/* Inner dashed ring */}
      <circle cx="32" cy="32" r="19" stroke="#8FAF9C" strokeWidth="0.9" opacity="0.22" strokeDasharray="2.5 5" />
      {/* Cardinal tick marks */}
      <line x1="32" y1="4"  x2="32" y2="11" stroke="#8FAF9C" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="32" y1="53" x2="32" y2="60" stroke="#8FAF9C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="4"  y1="32" x2="11" y2="32" stroke="#8FAF9C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <line x1="53" y1="32" x2="60" y2="32" stroke="#8FAF9C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Diagonal tick marks */}
      <line x1="11" y1="11" x2="15" y2="15" stroke="#8FAF9C" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
      <line x1="49" y1="11" x2="53" y2="7"  stroke="#8FAF9C" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
      <line x1="11" y1="53" x2="7"  y2="57" stroke="#8FAF9C" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
      <line x1="53" y1="53" x2="57" y2="57" stroke="#8FAF9C" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
      {/* North needle — sage, filled */}
      <path d="M32 8 L35.5 24 L32 27 L28.5 24 Z" fill="#8FAF9C" opacity="0.88" />
      {/* South needle — muted */}
      <path d="M32 56 L35.5 40 L32 37 L28.5 40 Z" fill="#8FAF9C" opacity="0.22" />
      {/* East & West needle stubs */}
      <path d="M40 32 L32 35 L32 29 Z" fill="#8FAF9C" opacity="0.2" />
      <path d="M24 32 L32 35 L32 29 Z" fill="#8FAF9C" opacity="0.2" />
      {/* Gold accent: N tip dot */}
      <circle cx="32" cy="9" r="2" fill="#E8C970" opacity="0.72" />
      {/* Center hub */}
      <circle cx="32" cy="32" r="4.5" fill="#8FAF9C" opacity="0.78" />
      <circle cx="32" cy="32" r="2.2" fill="rgba(244,239,230,0.82)" />
    </svg>
  )
}

// Tension-map watermark — Conflict Compass / Part 2 card decoration
function TensionMapIll() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="diary-card-deco-svg" aria-hidden="true">
      {/* Outer dashed ring */}
      <circle cx="32" cy="32" r="26" stroke="#BF9E80" strokeWidth="1" opacity="0.32" strokeDasharray="2 5" />
      {/* Inner ring */}
      <circle cx="32" cy="32" r="16" stroke="#BF9E80" strokeWidth="0.7" opacity="0.18" />
      {/* N needle — assertive / Fighter direction (clay) */}
      <path d="M32 7 L35 19 L32 22 L29 19 Z" fill="#BF9E80" opacity="0.72" />
      {/* S needle — muted */}
      <path d="M32 57 L35 45 L32 42 L29 45 Z" fill="#BF9E80" opacity="0.22" />
      {/* E needle — sage (collaborative / Negotiator) */}
      <path d="M57 32 L45 29 L42 32 L45 35 Z" fill="#8FAF9C" opacity="0.62" />
      {/* W needle — muted */}
      <path d="M7 32 L19 29 L22 32 L19 35 Z" fill="#BF9E80" opacity="0.22" />
      {/* Spoke lines */}
      <line x1="32" y1="32" x2="32" y2="10"  stroke="#BF9E80" strokeWidth="1.2" opacity="0.38" />
      <line x1="32" y1="32" x2="32" y2="54"  stroke="#BF9E80" strokeWidth="0.8" opacity="0.18" />
      <line x1="32" y1="32" x2="10"  y2="32" stroke="#BF9E80" strokeWidth="0.8" opacity="0.18" />
      <line x1="32" y1="32" x2="54"  y2="32" stroke="#8FAF9C" strokeWidth="1.2" opacity="0.35" />
      {/* Tension diagonals — antique gold */}
      <line x1="14" y1="14" x2="50" y2="50" stroke="#C6A444" strokeWidth="0.8" opacity="0.18" strokeDasharray="3 6" />
      <line x1="50" y1="14" x2="14" y2="50" stroke="#C6A444" strokeWidth="0.8" opacity="0.18" strokeDasharray="3 6" />
      {/* Center hub */}
      <circle cx="32" cy="32" r="5.5" fill="#BF9E80" opacity="0.75" />
      <circle cx="32" cy="32" r="2.5" fill="rgba(244,239,230,0.88)" />
    </svg>
  )
}

// Ritual-map watermark — Week 5 card decoration (facilitation circle / team ritual)
function RitualMapIll() {
  // 6 seat nodes at radius 24 around center (32,32)
  const seats = [
    { cx: 32,   cy: 8    },  // 0°   top
    { cx: 52.8, cy: 20   },  // 60°
    { cx: 52.8, cy: 44   },  // 120°
    { cx: 32,   cy: 56   },  // 180° bottom
    { cx: 11.2, cy: 44   },  // 240°
    { cx: 11.2, cy: 20   },  // 300°
  ]
  return (
    <svg viewBox="0 0 64 64" fill="none" className="diary-card-deco-svg" aria-hidden="true">
      {/* Outer guide ring */}
      <circle cx="32" cy="32" r="26" stroke="#8FAF9C" strokeWidth="0.9" opacity="0.22" strokeDasharray="2 5" />
      {/* Inner table circle */}
      <circle cx="32" cy="32" r="9.5" fill="#8FAF9C" opacity="0.78" />
      <circle cx="32" cy="32" r="5.5" fill="rgba(244,239,230,0.82)" />
      {/* Spokes and seat nodes */}
      {seats.map((s, i) => (
        <g key={i}>
          <line x1="32" y1="32" x2={s.cx} y2={s.cy}
            stroke="#8FAF9C" strokeWidth="1.1" opacity="0.38" />
          <circle cx={s.cx} cy={s.cy} r="4.5" fill="#8FAF9C" opacity={i === 0 ? 0.82 : 0.58} />
          <circle cx={s.cx} cy={s.cy} r="2.2" fill="rgba(244,239,230,0.72)" />
        </g>
      ))}
      {/* Gold accent — facilitator marker at top seat */}
      <circle cx="32" cy="8" r="2.2" fill="#C6A444" opacity="0.72" />
      {/* Perimeter connector ring (dashed) */}
      <circle cx="32" cy="32" r="24" stroke="#8FAF9C" strokeWidth="0.7" opacity="0.18" strokeDasharray="3 6" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   New sticker system — Premium diary decoration layer
   16 unique illustrated elements, each tied to a leadership-diary theme.
   Floating sticker animations driven by CSS classes (float / pulse / rotate).
   All stickers: aria-hidden, pointer-events none, hidden below 860 px.
───────────────────────────────────────────────────────────────────────────── */

function Sticker({ style, className = '', children }) {
  return (
    <div className={`sticker${className ? ' ' + className : ''}`} style={style} aria-hidden="true">
      {children}
    </div>
  )
}

/* ── 1. Clarity Compass ── direction-finding, clarity in uncertainty */
function StickerCompass() {
  return (
    <svg className="sticker-compass" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="23" stroke="#7E9E8A" strokeWidth="1.6" opacity="0.62" />
      <circle cx="27" cy="27" r="17" stroke="#7E9E8A" strokeWidth="0.9" opacity="0.25" strokeDasharray="2.5 5" />
      <line x1="27" y1="4"  x2="27" y2="11" stroke="#7E9E8A" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="27" y1="43" x2="27" y2="50" stroke="#7E9E8A" strokeWidth="1.4" strokeLinecap="round" opacity="0.38" />
      <line x1="4"  y1="27" x2="11" y2="27" stroke="#7E9E8A" strokeWidth="1.4" strokeLinecap="round" opacity="0.38" />
      <line x1="43" y1="27" x2="50" y2="27" stroke="#7E9E8A" strokeWidth="1.4" strokeLinecap="round" opacity="0.38" />
      {/* N needle — bold sage */}
      <path d="M27 7 L30 22 L27 25.5 L24 22 Z" fill="#7E9E8A" />
      {/* S needle — muted */}
      <path d="M27 47 L30 32 L27 28.5 L24 32 Z" fill="#7E9E8A" opacity="0.26" />
      <circle cx="27" cy="27" r="3.8" fill="#7E9E8A" />
      <circle cx="27" cy="27" r="2"   fill="rgba(244,239,230,0.88)" />
    </svg>
  )
}

/* ── 2. Growth Sprout ── weekly leadership growth, gentle progress */
function StickerGrowthSprout() {
  return (
    <svg className="sticker-sprout" width="40" height="60" viewBox="0 0 40 60" fill="none">
      <ellipse cx="20" cy="55" rx="11" ry="4" fill="#C6A444" opacity="0.2" />
      <path d="M20 54 C20 43 20 32 20 20" stroke="#7E9E8A" strokeWidth="2.4" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M20 40 C13 36 6 28 9 19C12.5 19.5 20 30 20 40Z" fill="#7E9E8A" opacity="0.7" />
      {/* Right leaf */}
      <path d="M20 31 C27 27 34 19 31 10C27.5 10.5 20 22 20 31Z" fill="#7E9E8A" opacity="0.88" />
      {/* Bud */}
      <ellipse cx="20" cy="16" rx="6" ry="9" fill="#7E9E8A" opacity="0.82" />
      <ellipse cx="17" cy="14" rx="2.8" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-12 17 14)" />
    </svg>
  )
}

/* ── 3. Listening Cloud ── listening, reflection, openness */
function StickerListeningCloud() {
  return (
    <svg className="sticker-cloud" width="68" height="48" viewBox="0 0 68 48" fill="none">
      <ellipse cx="19" cy="33" rx="15" ry="12" fill="#A4BAB8" opacity="0.7" />
      <ellipse cx="34" cy="26" rx="19" ry="16" fill="#A4BAB8" opacity="0.7" />
      <ellipse cx="51" cy="33" rx="14" ry="12" fill="#A4BAB8" opacity="0.7" />
      <rect x="4" y="33" width="60" height="12" rx="2" fill="#A4BAB8" opacity="0.7" />
      {/* Inner listening dots */}
      <circle cx="22" cy="33" r="2.8" fill="rgba(244,239,230,0.65)" />
      <circle cx="32" cy="30" r="2.8" fill="rgba(244,239,230,0.65)" />
      <circle cx="42" cy="33" r="2.8" fill="rgba(244,239,230,0.65)" />
      {/* Sound waves right */}
      <path d="M62 26 Q69 32 62 38" stroke="#A4BAB8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.52" />
      <path d="M60 21 Q70 32 60 43" stroke="#A4BAB8" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.28" />
    </svg>
  )
}

/* ── 4. Culture Signal ── reading organizational signals, radar */
function StickerCultureSignal() {
  return (
    <svg className="sticker-culture-signal" width="56" height="50" viewBox="0 0 56 50" fill="none">
      <path d="M4 46 Q28 6 52 46"  stroke="#A4BAB8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.28" />
      <path d="M11 46 Q28 16 45 46" stroke="#A4BAB8" strokeWidth="2"   strokeLinecap="round" fill="none" opacity="0.48" />
      <path d="M18 46 Q28 26 38 46" stroke="#A4BAB8" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.72" />
      <circle cx="28" cy="46" r="5"   fill="#A4BAB8" opacity="0.9" />
      <circle cx="28" cy="46" r="2.4" fill="rgba(244,239,230,0.88)" />
      <circle cx="4"  cy="46" r="2.2" fill="#A4BAB8" opacity="0.35" />
      <circle cx="52" cy="46" r="2.2" fill="#A4BAB8" opacity="0.35" />
    </svg>
  )
}

/* ── 5. Systems Map ── systems thinking, interconnected nodes */
function StickerSystemsMap() {
  return (
    <svg className="sticker-system-map" width="58" height="58" viewBox="0 0 58 58" fill="none">
      {/* Center hub */}
      <circle cx="29" cy="29" r="8"   fill="#7E9E8A" opacity="0.82" />
      <circle cx="29" cy="29" r="3.8" fill="rgba(244,239,230,0.88)" />
      {/* Corner nodes */}
      <circle cx="9"  cy="9"  r="5.5" fill="#A4BAB8" opacity="0.72" />
      <circle cx="49" cy="9"  r="5.5" fill="#A4BAB8" opacity="0.72" />
      <circle cx="9"  cy="49" r="5.5" fill="#BF9E80" opacity="0.62" />
      <circle cx="49" cy="49" r="5.5" fill="#BF9E80" opacity="0.62" />
      {/* Accent nodes */}
      <circle cx="29" cy="4"  r="4"   fill="#C6A444" opacity="0.65" />
      <circle cx="54" cy="29" r="4"   fill="#C6A444" opacity="0.65" />
      {/* Spoke lines */}
      <line x1="29" y1="29" x2="9"  y2="9"  stroke="#7E9E8A" strokeWidth="1.5" opacity="0.4" />
      <line x1="29" y1="29" x2="49" y2="9"  stroke="#7E9E8A" strokeWidth="1.5" opacity="0.4" />
      <line x1="29" y1="29" x2="9"  y2="49" stroke="#BF9E80" strokeWidth="1.5" opacity="0.4" />
      <line x1="29" y1="29" x2="49" y2="49" stroke="#BF9E80" strokeWidth="1.5" opacity="0.4" />
      <line x1="29" y1="29" x2="29" y2="4"  stroke="#C6A444" strokeWidth="1" opacity="0.42" strokeDasharray="2 3" />
      <line x1="29" y1="29" x2="54" y2="29" stroke="#C6A444" strokeWidth="1" opacity="0.42" strokeDasharray="2 3" />
      {/* Perimeter */}
      <line x1="9"  y1="9"  x2="49" y2="9"  stroke="#A4BAB8" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 6" />
      <line x1="9"  y1="9"  x2="9"  y2="49" stroke="#A4BAB8" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 6" />
      <line x1="49" y1="49" x2="9"  y2="49" stroke="#A4BAB8" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 6" />
      <line x1="49" y1="49" x2="49" y2="9"  stroke="#A4BAB8" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 6" />
    </svg>
  )
}

/* ── 6. Reflection Moon ── quiet reflection, introspection */
function StickerMoon() {
  return (
    <svg className="sticker-moon" width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path
        d="M37 26.5C36 33.5 30 38.5 23 38.5C15.3 38.5 9 32.2 9 24.5C9 17 14.8 10.8 22 10.2C19.2 13.2 18.4 17 19 20.5C20.2 27 25.8 31.5 32.5 29.8C34.5 29.2 36 27.8 37 26.5Z"
        fill="#A4BAB8" opacity="0.88"
      />
      {/* Accent stars */}
      <circle cx="41" cy="13" r="2.2" fill="#A4BAB8" opacity="0.55" />
      <circle cx="39" cy="7"  r="1.4" fill="#A4BAB8" opacity="0.35" />
      <circle cx="45" cy="20" r="1.2" fill="#C6A444" opacity="0.5" />
      <circle cx="43" cy="8"  r="1.8" fill="#C6A444" opacity="0.4" />
    </svg>
  )
}

/* ── 7. Evidence Tag ── noting evidence, research tags */
function StickerEvidenceTag() {
  return (
    <svg className="sticker-evidence-tag" width="52" height="34" viewBox="0 0 52 34" fill="none">
      {/* String */}
      <path d="M7 8 Q5 17 7 26" stroke="#BF9E80" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.52" />
      {/* Tag body */}
      <path d="M11 3 L47 3 Q51 3 51 7 L51 27 Q51 31 47 31 L11 31 Q7 31 7 27 L7 7 Q7 3 11 3 Z"
        fill="#F0E8C2" stroke="#C6A444" strokeWidth="1.3" />
      {/* Eyelet */}
      <circle cx="10.5" cy="17" r="3.5" fill="rgba(198,164,68,0.22)" stroke="#C6A444" strokeWidth="1.2" />
      {/* Text lines */}
      <rect x="20" y="10" width="22" height="2.2" rx="1.1" fill="#BF9E80" opacity="0.55" />
      <rect x="20" y="15" width="17" height="2"   rx="1"   fill="#BF9E80" opacity="0.38" />
      <rect x="20" y="20" width="20" height="1.8" rx="0.9" fill="#BF9E80" opacity="0.28" />
    </svg>
  )
}

/* ── 8. Weekly Dot Trail ── diary check-in journey, progress path */
function StickerDotTrail() {
  const dots = [
    { cx: 7,  cy: 15, r: 5,   op: 0.85 },
    { cx: 22, cy: 9,  r: 4.2, op: 0.7  },
    { cx: 37, cy: 15, r: 3.5, op: 0.55 },
    { cx: 52, cy: 9,  r: 2.8, op: 0.42 },
    { cx: 67, cy: 15, r: 2.2, op: 0.3  },
  ]
  return (
    <svg className="sticker-dot-trail" width="76" height="24" viewBox="0 0 76 24" fill="none">
      <path d="M7 15 Q14.5 5 22 9 Q29.5 13 37 15 Q44.5 17 52 9 Q59.5 3 67 15"
        stroke="#7E9E8A" strokeWidth="1.3" fill="none" opacity="0.32" strokeDasharray="3 5" />
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.cx} cy={d.cy} r={d.r + 3.5} fill="#7E9E8A" opacity={d.op * 0.13} />
          <circle cx={d.cx} cy={d.cy} r={d.r}       fill="#7E9E8A" opacity={d.op} />
          <circle cx={d.cx} cy={d.cy} r={d.r * 0.45} fill="rgba(244,239,230,0.75)" />
        </g>
      ))}
    </svg>
  )
}

/* ── 9. Gentle Spark ── insight moments, illumination */
function StickerGentleSpark() {
  return (
    <svg className="sticker-spark" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="24" fill="#C6A444" opacity="0.07" />
      <circle cx="28" cy="28" r="16" fill="#C6A444" opacity="0.05" />
      {/* 4-point star */}
      <path d="M28 4L32 22.5L50 28L32 33.5L28 52L24 33.5L6 28L24 22.5Z" fill="#C6A444" opacity="0.85" />
      <circle cx="28" cy="28" r="5.5" fill="rgba(244,239,230,0.62)" />
      {/* Accent dots at tips */}
      <circle cx="28" cy="10" r="1.8" fill="#C6A444" opacity="0.4" />
      <circle cx="46" cy="28" r="1.8" fill="#C6A444" opacity="0.4" />
      <circle cx="28" cy="46" r="1.8" fill="#C6A444" opacity="0.4" />
      <circle cx="10" cy="28" r="1.8" fill="#C6A444" opacity="0.4" />
    </svg>
  )
}

/* ── 10. Question Mark Doodle ── curiosity, inquiry, open questions */
function StickerQuestionMark() {
  return (
    <svg className="sticker-question" width="32" height="52" viewBox="0 0 32 52" fill="none">
      <circle cx="16" cy="26" r="20" fill="#C6A444" opacity="0.055" />
      <path d="M6 15 Q6 5 16 5 Q26 5 26 14 Q26 21 16 25.5 Q16 25.5 16 32"
        stroke="#2A2F2C" strokeWidth="3.2" strokeLinecap="round" fill="none" opacity="0.65" />
      <circle cx="16" cy="42" r="4" fill="#2A2F2C" opacity="0.65" />
    </svg>
  )
}

/* ── 11. Paper Tape ── holding things together, scrapbook accent */
function StickerPaperTape({ w = 78, h = 20, color = 'rgba(198,164,68,0.42)' }) {
  return (
    <svg className="sticker-tape" width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <rect width={w} height={h} rx="3.5" fill={color} />
      <line x1="0" y1={h * 0.32} x2={w} y2={h * 0.32} stroke="rgba(255,255,255,0.44)" strokeWidth="1.4" />
      <line x1="0" y1={h * 0.68} x2={w} y2={h * 0.68} stroke="rgba(255,255,255,0.26)" strokeWidth="0.9" />
      {/* Torn-edge hints */}
      <path d={`M0 0 Q5 ${h / 2} 0 ${h}`}       fill="rgba(0,0,0,0.05)" />
      <path d={`M${w} 0 Q${w - 5} ${h / 2} ${w} ${h}`} fill="rgba(0,0,0,0.05)" />
    </svg>
  )
}

/* ── 12. Mini Note ── diary pages, layered journal papers */
function StickerMiniNote() {
  return (
    <svg className="sticker-mini-note" width="50" height="58" viewBox="0 0 50 58" fill="none">
      {/* Shadow layer */}
      <rect x="7" y="5" width="40" height="50" rx="3.5" fill="#EDE7DC" transform="rotate(5 7 5)" opacity="0.9" />
      {/* Mid layer */}
      <rect x="5" y="4" width="40" height="50" rx="3.5" fill="#F0E8C2" transform="rotate(-3.5 5 4)" opacity="0.9" />
      {/* Front page */}
      <rect x="2" y="2" width="40" height="50" rx="3.5" fill="#F4EFE6" stroke="#CEC9BE" strokeWidth="1.2" />
      {/* Margin line */}
      <line x1="11" y1="8" x2="11" y2="47" stroke="rgba(192,160,134,0.28)" strokeWidth="1" />
      {/* Ruled lines */}
      <line x1="14" y1="16" x2="35" y2="16" stroke="#CEC9BE" strokeWidth="1" opacity="0.65" />
      <line x1="14" y1="22" x2="35" y2="22" stroke="#CEC9BE" strokeWidth="1" opacity="0.65" />
      <line x1="14" y1="28" x2="35" y2="28" stroke="#CEC9BE" strokeWidth="1" opacity="0.65" />
      <line x1="14" y1="34" x2="30" y2="34" stroke="#CEC9BE" strokeWidth="1" opacity="0.45" />
      <line x1="14" y1="40" x2="28" y2="40" stroke="#CEC9BE" strokeWidth="1" opacity="0.35" />
    </svg>
  )
}

/* ── 13. Culture Grid ── 2×2 sociability/solidarity grid */
function StickerCultureGrid() {
  return (
    <svg className="sticker-culture-grid" width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="2" y="2" width="48" height="48" rx="7" stroke="#A4BAB8" strokeWidth="1.6"
        fill="rgba(164,186,184,0.07)" />
      <line x1="26" y1="2"  x2="26" y2="50" stroke="#A4BAB8" strokeWidth="1.3" opacity="0.52" />
      <line x1="2"  y1="26" x2="50" y2="26" stroke="#A4BAB8" strokeWidth="1.3" opacity="0.52" />
      {/* Quadrant tints */}
      <rect x="3"  y="3"  width="22" height="22" rx="5" fill="#A4BAB8" opacity="0.2" />
      <rect x="27" y="3"  width="22" height="22" rx="5" fill="#7E9E8A" opacity="0.26" />
      <rect x="3"  y="27" width="22" height="22" rx="5" fill="#C6A444" opacity="0.18" />
      <rect x="27" y="27" width="22" height="22" rx="5" fill="#BF9E80" opacity="0.22" />
      <circle cx="26" cy="26" r="3.5" fill="#A4BAB8" opacity="0.75" />
    </svg>
  )
}

/* ── 14. Quiet Leadership Star ── soft leadership, quiet presence */
function StickerLeadershipStar() {
  return (
    <svg className="sticker-leadership-star" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="24" fill="#C6A444" opacity="0.07" />
      <circle cx="27" cy="27" r="18" fill="#C6A444" opacity="0.05" />
      {/* 5-pointed star */}
      <path d="M27 5L31.8 19.5L47.5 19.5L35.4 28.8L39.8 43.5L27 34.5L14.2 43.5L18.6 28.8L6.5 19.5L22.2 19.5Z"
        fill="#C6A444" opacity="0.82" />
      {/* Inner highlight */}
      <path d="M27 5L30.2 14L38 14L32.5 20L34.8 29L27 24.5L19.2 29L21.5 20L16 14L23.8 14Z"
        fill="rgba(255,255,255,0.17)" />
      <circle cx="27" cy="27" r="3.8" fill="rgba(244,239,230,0.6)" />
    </svg>
  )
}

/* ── 15. Decision Path Arrow ── from ambiguity to action */
function StickerDecisionArrow() {
  return (
    <svg className="sticker-decision-arrow" width="72" height="38" viewBox="0 0 72 38" fill="none">
      {/* Dotted approach path */}
      <path d="M5 30 C12 30 16 20 24 18 C32 16 38 16 46 16"
        stroke="#7E9E8A" strokeWidth="1.6" strokeLinecap="round" fill="none"
        strokeDasharray="3 5" opacity="0.5" />
      {/* Solid arrow shaft */}
      <line x1="46" y1="16" x2="64" y2="16" stroke="#7E9E8A" strokeWidth="2.6" strokeLinecap="round" opacity="0.88" />
      {/* Arrowhead */}
      <path d="M57 8 L66 16 L57 24" fill="none" stroke="#7E9E8A"
        strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />
      {/* Start dot */}
      <circle cx="5" cy="30" r="4.5" fill="#7E9E8A" opacity="0.52" />
      <circle cx="5" cy="30" r="2.2" fill="rgba(244,239,230,0.88)" />
    </svg>
  )
}

/* ── 16. Group Work ── collaboration, team dynamics */
function StickerGroupWork() {
  return (
    <svg className="sticker-group-work" width="66" height="44" viewBox="0 0 66 44" fill="none">
      {/* Connection lines */}
      <line x1="16" y1="20" x2="33" y2="13" stroke="#7E9E8A" strokeWidth="1.3" opacity="0.36" />
      <line x1="33" y1="13" x2="50" y2="20" stroke="#7E9E8A" strokeWidth="1.3" opacity="0.36" />
      <line x1="16" y1="20" x2="33" y2="30" stroke="#A4BAB8" strokeWidth="1"   opacity="0.28" />
      <line x1="50" y1="20" x2="33" y2="30" stroke="#A4BAB8" strokeWidth="1"   opacity="0.28" />
      <line x1="33" y1="13" x2="33" y2="30" stroke="#BF9E80" strokeWidth="0.8" opacity="0.22" strokeDasharray="2 3" />
      {/* Person 1 — left */}
      <circle cx="16" cy="14" r="6.5"  fill="#A4BAB8" opacity="0.72" />
      <ellipse cx="16" cy="28" rx="8" ry="5.5" fill="#A4BAB8" opacity="0.48" />
      {/* Person 2 — centre (slightly larger = leadership) */}
      <circle cx="33" cy="8"  r="7.5"  fill="#7E9E8A" opacity="0.8" />
      <circle cx="33" cy="8"  r="3.5"  fill="rgba(244,239,230,0.3)" />
      <ellipse cx="33" cy="24" rx="9" ry="6" fill="#7E9E8A" opacity="0.5" />
      {/* Person 3 — right */}
      <circle cx="50" cy="14" r="6.5"  fill="#BF9E80" opacity="0.72" />
      <ellipse cx="50" cy="28" rx="8" ry="5.5" fill="#BF9E80" opacity="0.48" />
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

            {/* ── Stickers: hero section ── */}
            <Sticker className="sticker--float" style={{ top: '28px', right: '18%', transform: 'rotate(12deg)', opacity: 0.68 }}>
              <StickerGentleSpark />
            </Sticker>
            <Sticker style={{ top: '138px', right: '-6px', transform: 'rotate(-14deg)', opacity: 0.55 }}>
              <StickerMoon />
            </Sticker>
            <Sticker className="sticker--rotate" style={{ bottom: '168px', left: '-8px', transform: 'rotate(-6deg)', opacity: 0.5 }}>
              <StickerGrowthSprout />
            </Sticker>
            <Sticker className="sticker--pulse" style={{ bottom: '60px', right: '8px', transform: 'rotate(6deg)', opacity: 0.42 }}>
              <StickerDotTrail />
            </Sticker>

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
              {/* Sticker: leadership star bleeding off bottom-right */}
              <Sticker style={{ bottom: '-16px', right: '22px', transform: 'rotate(10deg)', opacity: 0.72 }}>
                <StickerLeadershipStar />
              </Sticker>
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
          {/* Stickers: baseline section */}
          <Sticker className="sticker--float" style={{ top: '82px', right: '8px', transform: 'rotate(-8deg)', opacity: 0.58 }}>
            <StickerCompass />
          </Sticker>
          <Sticker style={{ top: '148px', right: '54px', transform: 'rotate(14deg)', opacity: 0.44 }}>
            <StickerGentleSpark />
          </Sticker>
          <Sticker className="sticker--pulse" style={{ top: '240px', right: '-4px', transform: 'rotate(5deg)', opacity: 0.38 }}>
            <StickerEvidenceTag />
          </Sticker>

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
            {/* Sticker: paper tape across top-left of letter, bleeding above */}
            <Sticker style={{ top: '-10px', left: '36px', transform: 'rotate(-3.5deg)', opacity: 0.78 }}>
              <StickerPaperTape w={84} h={22} color="rgba(191,158,112,0.46)" />
            </Sticker>
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
          {/* Stickers: diary section */}
          <Sticker className="sticker--float" style={{ top: '84px', left: '-6px', transform: 'rotate(-8deg)', opacity: 0.62 }}>
            <StickerGrowthSprout />
          </Sticker>
          <Sticker style={{ top: '152px', right: '4px', transform: 'rotate(-18deg) scaleX(-1)', opacity: 0.5 }}>
            <StickerDecisionArrow />
          </Sticker>
          <Sticker className="sticker--rotate" style={{ top: '58px', right: '18px', transform: 'rotate(6deg)', opacity: 0.38 }}>
            <StickerQuestionMark />
          </Sticker>

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
              const isSkipped     = entry.status === 'skipped'
              const isDone        = entry.status === 'done'
              const isActive      = entry.status === 'active'

              const nodeClass = (isPlaceholder || isSkipped) ? 'tl-node--future' : 'tl-node--active'
              const cardClass = isSkipped     ? 'diary-card--skipped'
                              : isPlaceholder ? 'diary-card--placeholder'
                              : 'diary-card--active'

              const badge = isSkipped
                ? <span className="wk-badge wk-badge--skipped">Skipped</span>
                : isPlaceholder
                  ? <span className="wk-badge wk-badge--soon">Mon check-in</span>
                  : isDone
                    ? <span className="wk-badge wk-badge--done">✓ Done</span>
                    : <span className="wk-badge wk-badge--live">This Week</span>

              return (
                <div key={entry.week} className="tl-row">
                  <div className={`tl-node ${nodeClass}`} aria-hidden="true">
                    <span className={`tl-w${(isPlaceholder || isSkipped) ? ' tl-w--future' : ''}`}>W{entry.week}</span>
                  </div>

                  {isSkipped ? (
                    <div className={`diary-card ${cardClass}`}>
                      <div className="diary-card-top">
                        <h3 className="diary-title diary-title--skipped">{entry.title}</h3>
                        {badge}
                      </div>
                      <p className="skipped-note">
                        The course skipped the first week, so I am leaving this space as a marker rather than forcing a reflection that did not happen yet.
                      </p>
                    </div>
                  ) : isPlaceholder ? (
                    <div className={`diary-card ${cardClass}`}>
                      <div className="diary-card-top">
                        <h3 className="diary-title diary-title--placeholder">Week {entry.week} — Coming Soon</h3>
                        {badge}
                      </div>
                      <p className="placeholder-note">
                        This entry will be added after the next Monday diary check-in.
                      </p>
                      <button className="diary-add-btn" onClick={openModal}>+ Add entry</button>
                    </div>
                  ) : (
                    <div className={`diary-card ${cardClass}`}>
                      {/* Decorative watermarks — keyed by visualKeyword */}
                      {entry.visualKeyword === 'systems' && (
                        <div className="diary-card-deco" aria-hidden="true">
                          <SystemMapIll />
                        </div>
                      )}
                      {entry.visualKeyword === 'compass' && (
                        <div className="diary-card-deco" aria-hidden="true">
                          <CompassIll />
                        </div>
                      )}
                      {entry.visualKeyword === 'ritual' && (
                        <div className="diary-card-deco" aria-hidden="true">
                          <RitualMapIll />
                        </div>
                      )}

                      {/* Per-week sticker accents */}
                      {entry.week === 2 && (
                        <Sticker style={{ top: '-11px', right: '56px', transform: 'rotate(-4deg)', opacity: 0.78 }}>
                          <StickerEvidenceTag />
                        </Sticker>
                      )}
                      {entry.week === 3 && (
                        <Sticker style={{ top: '-11px', left: '92px', transform: 'rotate(3deg)', opacity: 0.72 }}>
                          <StickerPaperTape w={68} h={20} color="rgba(164,186,184,0.55)" />
                        </Sticker>
                      )}
                      {entry.week === 3 && (
                        <Sticker className="sticker--pulse" style={{ top: '14px', right: '-8px', transform: 'rotate(-6deg)', opacity: 0.45 }}>
                          <StickerGroupWork />
                        </Sticker>
                      )}
                      {entry.week === 4 && (
                        <Sticker style={{ top: '-11px', left: '76px', transform: 'rotate(-3deg)', opacity: 0.74 }}>
                          <StickerPaperTape w={68} h={20} color="rgba(198,164,68,0.42)" />
                        </Sticker>
                      )}
                      {entry.week === 4 && (
                        <Sticker className="sticker--rotate" style={{ top: '10px', right: '-8px', transform: 'rotate(7deg)', opacity: 0.48 }}>
                          <StickerCompass />
                        </Sticker>
                      )}
                      {entry.week === 5 && (
                        <Sticker style={{ top: '-11px', left: '76px', transform: 'rotate(-3deg)', opacity: 0.74 }}>
                          <StickerPaperTape w={68} h={20} color="rgba(143,175,156,0.45)" />
                        </Sticker>
                      )}
                      {entry.week === 5 && (
                        <Sticker className="sticker--float" style={{ top: '10px', right: '-8px', transform: 'rotate(8deg)', opacity: 0.46 }}>
                          <StickerGroupWork />
                        </Sticker>
                      )}

                      <div className="diary-card-top">
                        <h3 className="diary-title">Week {entry.week} — {entry.title}</h3>
                        {badge}
                      </div>

                      {entry.theme && (
                        <p className="diary-theme">{entry.theme}</p>
                      )}

                      {entry.tags && entry.tags.length > 0 && (
                        <div className="diary-tags">
                          {entry.tags.map(tag => (
                            <span key={tag} className={`dtag ${TAG_STYLE_MAP[tag] || 'dtag--insight'}`}>{tag}</span>
                          ))}
                        </div>
                      )}

                      {entry.coverImage && (
                        <div className="diary-cover-wrap">
                          <img
                            src={entry.coverImage}
                            alt={entry.coverCaption || 'Project cover'}
                            className="diary-cover-img"
                            loading="lazy"
                          />
                          {entry.coverCaption && (
                            <p className="diary-cover-caption">{entry.coverCaption}</p>
                          )}
                        </div>
                      )}

                      {entry.photos && entry.photos.length > 0 && (
                        <div className="diary-photos" role="group" aria-label="Field trip photos">
                          {entry.photos.map((photo, i) => (
                            <div key={i} className="diary-photo-item">
                              <div className="diary-photo-frame">
                                <img
                                  src={photo.src}
                                  alt={photo.caption}
                                  className="diary-photo-img"
                                  loading="lazy"
                                />
                              </div>
                              <p className="diary-photo-caption">{photo.caption}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {entry.groupNote && (
                        <div className="diary-group-note">
                          <strong>Group Project</strong>
                          {entry.groupNote}
                        </div>
                      )}

                      {entry.appNote && (
                        <div className="diary-app-note">
                          <span className="diary-app-note-label">Culture Decoder App</span>
                          {entry.appNote}
                        </div>
                      )}

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

                      {entry.reflection && entry.reflection.length > 0 && (
                        <div className="diary-block">
                          <span className="dblock-label">Personal Reflection</span>
                          {entry.reflection.map((para, i) => <p key={i}>{para}</p>)}
                        </div>
                      )}

                      {entry.projectLink && (
                        <div className="diary-app-link-wrap">
                          <a
                            href={entry.projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="diary-app-link-btn diary-app-link-btn--sage"
                          >
                            <span className="diary-app-link-label">Live Project</span>
                            <span className="diary-app-link-name">{entry.projectLinkLabel || 'Open Project →'}</span>
                          </a>
                        </div>
                      )}

                      {entry.part2 && (
                        <div className="diary-part2">
                          {/* ─── Part 2 divider ─── */}
                          <div className="diary-part2-divider" aria-hidden="true">
                            <span className="diary-part2-divider-label">Part 2</span>
                          </div>

                          {/* ─── Part 2 nested card ─── */}
                          <div className="diary-part2-card">
                            {/* Tension-map watermark */}
                            <div className="diary-part2-deco" aria-hidden="true">
                              <TensionMapIll />
                            </div>

                            <span className="diary-part2-eyebrow">{entry.part2.eyebrow}</span>
                            <h4 className="diary-part2-title">{entry.part2.title}</h4>

                            {entry.part2.tags && entry.part2.tags.length > 0 && (
                              <div className="diary-tags diary-tags--part2">
                                {entry.part2.tags.map(tag => (
                                  <span key={tag} className={`dtag ${TAG_STYLE_MAP[tag] || 'dtag--insight'}`}>{tag}</span>
                                ))}
                              </div>
                            )}

                            {entry.part2.frameworks && entry.part2.frameworks.length > 0 && (
                              <div className="diary-frameworks">
                                <span className="diary-frameworks-label">Frameworks</span>
                                {entry.part2.frameworks.map(fw => (
                                  <span key={fw} className="fw-chip">{fw}</span>
                                ))}
                              </div>
                            )}

                            {entry.part2.insight && entry.part2.insight.length > 0 && (
                              <div className="diary-block">
                                <span className="dblock-label">Key Insight / Learning</span>
                                {entry.part2.insight.map((para, i) => <p key={i}>{para}</p>)}
                              </div>
                            )}

                            {entry.part2.goal && entry.part2.goal.length > 0 && (
                              <div className="diary-block">
                                <span className="dblock-label">Goal</span>
                                {entry.part2.goal.map((para, i) => <p key={i}>{para}</p>)}
                              </div>
                            )}

                            {entry.part2.action && entry.part2.action.length > 0 && (
                              <div className="diary-block">
                                <span className="dblock-label">One Thing I Will Do Differently</span>
                                {entry.part2.action.map((para, i) => <p key={i}>{para}</p>)}
                              </div>
                            )}

                            {entry.part2.reflection && entry.part2.reflection.length > 0 && (
                              <div className="diary-block">
                                <span className="dblock-label">Personal Reflection</span>
                                {entry.part2.reflection.map((para, i) => <p key={i}>{para}</p>)}
                              </div>
                            )}

                            {entry.part2.appLink && (
                              <div className="diary-app-link-wrap">
                                <a
                                  href={entry.part2.appLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="diary-app-link-btn"
                                >
                                  <span className="diary-app-link-label">Deployed App</span>
                                  <span className="diary-app-link-name">Conflict Compass →</span>
                                </a>
                              </div>
                            )}
                          </div>
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
          {/* Stickers: visual notes section */}
          <Sticker className="sticker--float" style={{ top: '76px', right: '12px', transform: 'rotate(8deg)', opacity: 0.62 }}>
            <StickerCultureSignal />
          </Sticker>
          <Sticker style={{ top: '128px', left: '38%', transform: 'rotate(-5deg)', opacity: 0.46 }}>
            <StickerListeningCloud />
          </Sticker>
          <Sticker className="sticker--pulse" style={{ top: '70px', right: '68px', transform: 'rotate(-10deg)', opacity: 0.5 }}>
            <StickerSystemsMap />
          </Sticker>

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
          {/* Stickers: practice section */}
          <Sticker className="sticker--float" style={{ top: '76px', right: '12px', transform: 'rotate(-7deg)', opacity: 0.55 }}>
            <StickerGentleSpark />
          </Sticker>
          <Sticker style={{ bottom: '182px', right: '6px', transform: 'rotate(-4deg)', opacity: 0.4 }}>
            <StickerMiniNote />
          </Sticker>
          <Sticker className="sticker--rotate" style={{ top: '38px', left: '-4px', transform: 'rotate(12deg)', opacity: 0.36 }}>
            <StickerCultureGrid />
          </Sticker>

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
