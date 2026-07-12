import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from './assets/images/hero.jpg'
import processConsultationImage from './assets/images/process-consultation.jpg'
import processPlanImage from './assets/images/process-plan.jpg'
import processBuildImage from './assets/images/process-build.jpg'
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Clock,
  Hammer,
  Wind,
  TrendingUp,
  Settings2,
  Flame,
  Menu,
  X,
  Upload,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Brand logo — hexagonal speed-lines emblem
---------------------------------------------------------------- */
function RevvLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <polygon points="18,1 33,9.5 33,26.5 18,35 3,26.5 3,9.5" fill="#F59E0B" />
      <polygon points="18,4.5 30,11.5 30,24.5 18,31.5 6,24.5 6,11.5" fill="#0F0F14" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="10" y1="18" x2="23" y2="18" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="10" y1="22" x2="28" y2="22" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_FULL = [
  {
    icon: Hammer,
    title: 'Engine Builds & Rebuilds',
    tag: 'Engine',
    text: 'Hand-built from the ground up — street sleepers to full competition-spec engines. Every assembly is run on our in-house dyno before the car leaves our lift.',
  },
  {
    icon: Wind,
    title: 'Turbo & Supercharger Installs',
    tag: 'Forced Induction',
    text: 'Kit selection, custom fab, intercooler plumbing, and a proper tune under one roof. No referrals, no guesswork — forced induction done right, start to finish.',
  },
  {
    icon: TrendingUp,
    title: 'ECU & Dyno Tuning',
    tag: 'Calibration',
    text: 'Custom maps built for your exact hardware on our chassis dyno. Full power run, AFR review, and a data sheet you can actually read — every time.',
  },
  {
    icon: Settings2,
    title: 'Suspension & Alignment',
    tag: 'Chassis',
    text: 'Coilovers, corner weighting, and full geometry alignment. Dialed for street comfort or track precision — we set it up for how you actually drive.',
  },
  {
    icon: Flame,
    title: 'Exhaust Fabrication',
    tag: 'Fabrication',
    text: 'Header-back stainless systems built in-house. Headers, downpipes, mid-pipes, cat-backs — bent, welded, and fitted to your exact setup.',
  },
  {
    icon: ShieldCheck,
    title: 'Brake Upgrades',
    tag: 'Safety',
    text: 'Big brake kits, upgraded pads and rotors, fluid service, and caliper refinishing. Stop with the same confidence you put your foot down.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 group">
            <RevvLogo className="h-9 w-9 drop-shadow-sm" />
            <span className={`font-display font-bold tracking-tight text-lg transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}>
              Revv Dynamics
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover transition-colors ${
                  scrolled ? 'text-ink/70 hover:text-primary-dark' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Get a Quote
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2.5">
              <RevvLogo className="h-8 w-8" />
              <span className="font-display font-bold text-xl text-ink">Revv Dynamics</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-deep px-6 py-4 rounded-full font-semibold w-full"
          >
            Get a Quote
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8, stagger: 0.12 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="High-performance sports car ready for modification"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/92 via-deep/60 to-primary-dark/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/25 to-transparent" />
      </div>

      {/* Floating amber particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-primary/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[38%] right-[28%] h-1 w-1 rounded-full bg-primary-light/60 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[35%] h-1 w-1 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-5xl">
          <p className="hero-meta font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
            Est. in your community · Performance shop
          </p>
          <h1 className="font-display font-extrabold text-white tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="hero-line-1 block leading-[1]">Performance built</span>
            <span
              className="hero-line-2 block font-serif italic font-light text-primary mt-1"
              style={{ lineHeight: '0.9' }}
            >
              for the road ahead.
            </span>
          </h1>
          <p className="hero-meta mx-auto max-w-xl text-white/70 text-base sm:text-lg mt-8 leading-relaxed">
            Revv Dynamics is your local performance shop for engine builds, turbo installs, and dyno-verified tunes.
            <span className="text-white"> Built right, every time.</span>
          </p>
          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/40"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+15555550100"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full"
            >
              <Phone className="h-4 w-4" />
              (555) 555-0100
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Helper — SVG arc (angles from 12 o'clock, clockwise positive)
---------------------------------------------------------------- */
function describeArc(cx, cy, r, startDeg, endDeg) {
  const toRad = (d) => (d - 90) * Math.PI / 180
  const x1 = (cx + r * Math.cos(toRad(startDeg))).toFixed(2)
  const y1 = (cy + r * Math.sin(toRad(startDeg))).toFixed(2)
  const x2 = (cx + r * Math.cos(toRad(endDeg))).toFixed(2)
  const y2 = (cy + r * Math.sin(toRad(endDeg))).toFixed(2)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

/* ----------------------------------------------------------------
   Feature Card 1 — RPM Gauge
---------------------------------------------------------------- */
function RPMGauge() {
  const MAX = 8000
  const [rpm, setRpm] = useState(900)
  const animRef = useRef(null)

  useEffect(() => {
    const seq = [
      { to: 900,  ms: 1000 },
      { to: 7200, ms: 2800 },
      { to: 7350, ms: 400  },
      { to: 4800, ms: 300  },
      { to: 7100, ms: 2000 },
      { to: 7300, ms: 300  },
      { to: 900,  ms: 1600 },
    ]
    let idx = 0, from = 900, t0 = null
    const tick = (now) => {
      if (!t0) t0 = now
      const p = Math.min((now - t0) / seq[idx].ms, 1)
      const e = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      setRpm(Math.round(from + (seq[idx].to - from) * e))
      if (p >= 1) { from = seq[idx].to; idx = (idx + 1) % seq.length; if (!idx) from = 900; t0 = now }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const angle = -135 + (rpm / MAX) * 270
  const toRad = (d) => (d - 90) * Math.PI / 180
  const nx = (100 + 45 * Math.cos(toRad(angle))).toFixed(2)
  const ny = (72  + 45 * Math.sin(toRad(angle))).toFixed(2)
  const isRed = rpm >= 6500
  const col = isRed ? '#ef4444' : rpm >= 3000 ? '#F59E0B' : '#22c55e'
  const lbl = isRed ? '⚠ Redline' : rpm >= 3000 ? '◉ Power band' : '◎ Idle'

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden" style={{ background: '#0F0F14' }}>
      <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Track */}
        <path d={describeArc(100, 72, 52, -135, 135)} fill="none" stroke="#ffffff07" strokeWidth="9" strokeLinecap="round" />
        {/* Zones */}
        <path d={describeArc(100, 72, 52, -135, -34)} fill="none" stroke="#22c55e" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
        <path d={describeArc(100, 72, 52, -34,   84)} fill="none" stroke="#F59E0B" strokeWidth="9" strokeLinecap="round" opacity="0.7"  />
        <path d={describeArc(100, 72, 52, 84,   135)} fill="none" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        {/* Tick marks */}
        {Array.from({ length: 9 }, (_, i) => {
          const a = -135 + (i / 8) * 270
          const r = (a - 90) * Math.PI / 180
          const major = i % 4 === 0
          return (
            <line key={i}
              x1={(100 + (major ? 37 : 40) * Math.cos(r)).toFixed(2)}
              y1={(72  + (major ? 37 : 40) * Math.sin(r)).toFixed(2)}
              x2={(100 + 49 * Math.cos(r)).toFixed(2)}
              y2={(72  + 49 * Math.sin(r)).toFixed(2)}
              stroke="white" strokeOpacity={major ? 0.4 : 0.15} strokeWidth={major ? 1.5 : 1}
            />
          )
        })}
        {/* Needle */}
        <line x1="100" y1="72" x2={nx} y2={ny} stroke={col} strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="72" r="5" fill="white" />
        <circle cx="100" cy="72" r="2.5" fill="#0F0F14" />
        {/* RPM readout */}
        <text x="100" y="122" textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize="20" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="-1">
          {rpm.toLocaleString()}
        </text>
        <text x="100" y="135" textAnchor="middle" dominantBaseline="middle"
          fill="#374151" fontSize="6" fontFamily="'JetBrains Mono', monospace" letterSpacing="3">
          RPM
        </text>
        <text x="100" y="150" textAnchor="middle" dominantBaseline="middle"
          fill={col} fontSize="7" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">
          {lbl}
        </text>
      </svg>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Dyno Power Curve
---------------------------------------------------------------- */
function DynoCurve() {
  const [progress, setProgress] = useState(0)
  const animRef = useRef(null)

  useEffect(() => {
    const DRAW = 2400, HOLD = 900
    let phase = 'draw', t0 = null
    const tick = (now) => {
      if (!t0) t0 = now
      const elapsed = now - t0
      if (phase === 'draw') {
        const p = Math.min(elapsed / DRAW, 1)
        setProgress(1 - Math.pow(1 - p, 2))
        if (p >= 1) { phase = 'hold'; t0 = now }
      } else {
        if (elapsed >= HOLD) { phase = 'draw'; t0 = now; setProgress(0) }
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const DASH = 700
  const offset = DASH * (1 - progress)
  const peakOpacity = progress > 0.87 ? Math.min((progress - 0.87) / 0.13, 1) : 0

  return (
    <div className="relative h-44 w-full rounded-3xl overflow-hidden flex flex-col p-4" style={{ background: '#0F0F14' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Dyno sheet</span>
        <span className="font-mono text-[10px] font-semibold" style={{ color: '#F59E0B' }}>487 WHP · 392 WTQ</span>
      </div>

      {/* Chart */}
      <svg viewBox="0 0 280 72" className="flex-1 w-full" preserveAspectRatio="none">
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="0" y1={i * 18 + 9} x2="280" y2={i * 18 + 9}
            stroke="white" strokeOpacity="0.04" strokeWidth="1" />
        ))}
        {/* TQ curve */}
        <path
          d="M 0 68 C 30 52, 60 28, 90 18 S 150 14, 190 16 S 230 24, 260 42 S 275 56, 280 66"
          fill="none" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round"
          strokeDasharray={DASH} strokeDashoffset={offset}
        />
        {/* HP curve */}
        <path
          d="M 0 71 C 30 70, 65 64, 100 52 S 158 30, 200 14 S 232 8, 248 8 S 268 14, 280 32"
          fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round"
          strokeDasharray={DASH} strokeDashoffset={offset}
        />
        {/* Peak marker */}
        <circle cx="248" cy="8" r="3" fill="#F59E0B" opacity={peakOpacity} />
        <line x1="248" y1="8" x2="248" y2="72" stroke="#F59E0B" strokeOpacity={peakOpacity * 0.2}
          strokeWidth="1" strokeDasharray="3 3" />
        <text x="252" y="8" fill="#F59E0B" fontSize="6.5" fontFamily="'JetBrains Mono', monospace"
          dominantBaseline="middle" opacity={peakOpacity}>
          Peak
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="block h-0.5 w-5 rounded-full" style={{ background: '#F59E0B' }} />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">HP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-0.5 w-5 rounded-full" style={{ background: '#B45309' }} />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Torque</span>
        </div>
        <span className="font-mono text-[9px] text-white/25 ml-auto uppercase tracking-widest">1.5k — 8k RPM</span>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Build Checklist
---------------------------------------------------------------- */
function BuildChecklist() {
  const items = [
    { label: 'Cold air intake',       tag: 'Intake'      },
    { label: 'Forged pistons & rods', tag: 'Engine'      },
    { label: 'Turbocharger kit',      tag: 'Boost'       },
    { label: 'Intercooler & piping',  tag: 'Cooling'     },
    { label: 'Custom ECU tune',       tag: 'Calibration' },
  ]
  const [checked, setChecked] = useState(0)

  useEffect(() => {
    if (checked >= items.length) {
      const t = setTimeout(() => setChecked(0), 1400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setChecked((c) => c + 1), 750)
    return () => clearTimeout(t)
  }, [checked])

  return (
    <div className="relative h-44 w-full bg-surface border border-divider rounded-3xl p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] text-primary-dark uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
          Build spec
        </span>
        <span className="font-mono text-[10px] text-muted tabular-nums">{checked}/{items.length}</span>
      </div>

      {/* List */}
      <div className="space-y-[7px]">
        {items.map((item, i) => {
          const done = i < checked
          return (
            <div key={i} className={`flex items-center gap-2.5 transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-25'}`}>
              <span
                className={`h-4 w-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                  done ? 'bg-primary' : 'border border-divider bg-transparent'
                }`}
              >
                {done && (
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none">
                    <path d="M2 5.5L4 7.5L8 3" stroke="#0F0F14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="font-mono text-[10px] text-ink truncate flex-1">{item.label}</span>
              {done && (
                <span className="font-mono text-[9px] text-muted flex-shrink-0">{item.tag}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Power',
      heading: 'Engine Output',
      sub: 'Every RPM tracked live',
      text: "We run every build on the dyno from idle to redline. Power is logged across the full RPM range so you know exactly what your engine is making — and where.",
      Component: RPMGauge,
    },
    {
      eyebrow: '02 / Results',
      heading: 'Dyno Sheet',
      sub: 'HP & torque on paper',
      text: 'Every tune and engine build walks out with a full dyno sheet. Horsepower, torque, and AFR — verified at the wheel, not estimated.',
      Component: DynoCurve,
    },
    {
      eyebrow: '03 / Spec',
      heading: 'Build Planning',
      sub: 'Every part accounted for',
      text: 'We map out the full build list before a bolt is turned — intake to tune. You approve every component and we build it exactly to spec, no surprises.',
      Component: BuildChecklist,
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ What we do best</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Three pillars.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">One standard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </div>
              <card.Component />
              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01', title: 'Experience', target: 10, suffix: '+',
      label: 'years in performance',
      desc: 'A decade of building, tuning, and pushing limits in the shop. Every car we touch gets the full treatment it deserves.',
    },
    {
      n: '02', title: 'Builds', target: 500, suffix: '+',
      label: 'builds completed',
      desc: 'From mild street upgrades to full race builds — five hundred cars have rolled out of our shop with proven power numbers.',
    },
    {
      n: '03', title: 'Verified', target: 100, suffix: '%',
      label: 'dyno verified',
      desc: 'Every engine build and tune walks out with a real power number on paper. No guessing, no assumptions.',
    },
  ]

  return (
    <section id="numbers" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">╱ The numbers</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              The track record
              <span className="block font-serif italic font-medium text-primary-dark">behind the build.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three numbers that define how we work. Not marketing — just what we deliver every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stack
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Consultation',
      tagline: 'We listen before we wrench.',
      text: "Bring your car in and walk us through your goals, your budget, and how you drive it. We'll be straight about what's realistic, what the timeline looks like, and what to prioritize first.",
      details: ['Free of charge', 'No commitment required', 'Bring the car or call us'],
      badge: '◎ Free consult',
      stat: { value: '45', unit: 'min', sub: 'avg. session' },
      image: processConsultationImage,
      alt: 'Mechanic explaining and pointing out details on a car to a customer',
      meta: 'Step 1 / Listen',
    },
    {
      num: '02',
      title: 'Plan & Price',
      tagline: 'Numbers before bolts.',
      text: "We build the full spec sheet — every part, every labor line, locked price. You see the brands, quantities, and costs before we pick up a wrench. No scope creep, no renegotiating mid-build.",
      details: ['Line-item parts list', 'Written fixed-price quote', 'Quote within 24 hrs'],
      badge: '◉ Zero surprises',
      stat: { value: '24', unit: 'hr', sub: 'quote turnaround' },
      image: processPlanImage,
      alt: 'Mechanic inspecting open engine bay reviewing what work needs doing',
      meta: 'Step 2 / Plan',
    },
    {
      num: '03',
      title: 'Build & Tune',
      tagline: 'Keys and a power sheet.',
      text: "We build to the approved spec, pull the car on the dyno at every key stage, and hand you back the keys with a printed data sheet showing exactly what changed. You leave knowing your numbers.",
      details: ['Chassis dyno included', 'Full AFR & power log', 'Data sheet with every car'],
      badge: '⚡ Dyno verified',
      stat: { value: '487', unit: 'WHP', sub: 'last build' },
      image: processBuildImage,
      alt: 'Mechanic hands-on working on car engine in garage with tools',
      meta: 'Step 3 / Build',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ How we work</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">Zero surprises.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-white border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-ink/8"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[62vh] lg:min-h-[72vh]">

              {/* Text column */}
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Revv Protocol
                  </span>
                </div>

                <div className="my-10 sm:my-12">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/10 -mb-6 block select-none">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>

                <div className="space-y-6">
                  <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((d, j) => (
                      <span key={j} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink/70 bg-ink/[0.05] border border-ink/10 px-3 py-1.5 rounded-full">
                        <span className="h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image column */}
              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/25 to-transparent" />

                {/* Step badge — top left */}
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{step.badge}</span>
                </div>

                {/* Stat block — bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-deep/65 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
                    <div className="flex items-end gap-2 mb-1">
                      <span className="font-display font-extrabold text-4xl text-white leading-none tabular-nums">
                        {step.stat.value}
                      </span>
                      <div className="flex flex-col pb-1">
                        <span className="font-mono text-[11px] text-primary uppercase tracking-widest leading-none">{step.stat.unit}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[9px] text-white/45 uppercase tracking-widest">{step.stat.sub}</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services Grid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        y: 36, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.07,
      })
      gsap.from('.svc-header > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
        y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      {/* Ambient glows */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <div className="svc-header flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary">╱ Full service menu</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              Built in-house.
              <span className="block font-serif italic font-medium text-primary mt-1">Done right.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-white/70 text-base leading-relaxed">
              Every service is handled by our own certified techs — no outsourcing, no referrals, no compromises on quality or accountability.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:text-white transition-colors duration-300 group w-fit"
            >
              Get a quote
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.12] rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className="svc-tile group relative bg-deep p-7 sm:p-9 hover:bg-[#141418] transition-colors duration-500 overflow-hidden cursor-default"
              >
                {/* Amber sweep on hover */}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                <div className="flex items-start justify-between mb-7">
                  {/* Icon container */}
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.07] border border-white/[0.14] flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-105 transition-all duration-400 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep transition-colors duration-300" strokeWidth={2} />
                  </div>
                  {/* Number + tag */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-[10px] text-primary/60 group-hover:text-primary transition-colors duration-300 tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{svc.tag}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl sm:text-[1.35rem] text-white mb-3 leading-snug">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-white/65 text-sm leading-relaxed">{svc.text}</p>

              </div>
            )
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-white/[0.1] pt-10">
          <div>
            <p className="text-white/80 font-display font-semibold text-lg">Not sure where to start?</p>
            <p className="text-white/45 text-sm mt-1">Tell us your car and your goals — we'll scope the build and price it out.</p>
          </div>
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-deep font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 group flex-shrink-0"
          >
            Book a consultation
            <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={2.5} />
          </a>
        </div>

      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: ShieldCheck,
      title: 'ASE Certified Mechanics',
      text: "Our technicians are fully certified and continue training on the latest performance tech and OEM platforms — so your build is always in capable hands.",
    },
    {
      Icon: Award,
      title: 'SEMA Industry Member',
      text: "Proud members of the performance automotive community. We stay connected to the industry's best suppliers, tools, and knowledge.",
    },
    {
      Icon: Clock,
      title: '10+ Years in the Game',
      text: "A decade of builds, dyno runs, and happy customers behind us. We're not new to this — and it shows in every car we touch.",
    },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Why trust us</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            More than a quote.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/[0.04] border border-white/[0.10] rounded-2xl px-4 py-3.5 text-white placeholder-white/20 focus:border-primary/70 focus:ring-4 focus:ring-primary/10 outline-none transition font-body"
      />
    </div>
  )
}

// ponytail: 2.5MB total raw attachment cap — base64 + JSON overhead must stay under Vercel's 4.5MB function body limit.
// Upgrade path if bigger photos are needed: upload straight to Vercel Blob from the client, send only the URLs here.
const MAX_ATTACHMENTS_BYTES = 2.5 * 1024 * 1024

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result.split(',')[1])
  reader.onerror = reject
  reader.readAsDataURL(file)
})

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicle: '', message: '', website: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const dropRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    if (files.reduce((sum, f) => sum + f.size, 0) > MAX_ATTACHMENTS_BYTES) {
      setErrorMsg('Attached photos are too large (max 2.5MB total) — remove one and try again.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({ filename: f.name, content: await fileToBase64(f) }))
      )
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, attachments }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        const { error } = await res.json().catch(() => ({}))
        setErrorMsg(error === 'Attachments too large' ? 'Attached photos are too large — remove one and try again.' : '')
        setStatus('error')
      }
    } catch {
      setErrorMsg('')
      setStatus('error')
    }
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-deep overflow-hidden">
      {/* Ambient glow + grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.08]" />
      <div className="absolute top-0 right-0 h-[700px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — contact info */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Contact</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mt-4 leading-[1.05] tracking-tight">
              {"Let's talk about"}
              <span className="block font-serif italic font-light text-primary">your build.</span>
            </h2>
            <p className="text-white/55 text-lg mt-6 leading-relaxed max-w-md">
              {"Tell us about your car, your goals, and your budget. We'll get back to you fast with honest answers."}
            </p>

            <div className="mt-10 space-y-3">
              <a href="tel:+15555550100" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition duration-300">
                  <Phone className="h-5 w-5 text-primary group-hover:text-deep transition" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/35">Call direct</span>
                  <span className="font-display font-semibold text-white text-lg">(555) 555-0100</span>
                </span>
              </a>

              <a href="mailto:info@revvdynamics.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition duration-300">
                  <Mail className="h-5 w-5 text-primary group-hover:text-deep transition" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/35">Email us</span>
                  <span className="font-display font-semibold text-white text-lg">info@revvdynamics.com</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/35">Location</span>
                  <span className="font-display font-semibold text-white text-lg">Your City, USA</span>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/35 mb-2">Hours</span>
                  <table className="text-sm w-full">
                    <tbody>
                      <tr><td className="pr-5 py-0.5 text-white/60 font-mono text-[11px] uppercase tracking-wide">Mon–Fri</td><td className="text-white font-display font-medium">8 am – 6 pm</td></tr>
                      <tr><td className="pr-5 py-0.5 text-white/60 font-mono text-[11px] uppercase tracking-wide">Saturday</td><td className="text-white font-display font-medium">9 am – 3 pm</td></tr>
                      <tr><td className="pr-5 py-0.5 text-white/60 font-mono text-[11px] uppercase tracking-wide">Sunday</td><td className="text-white/30 font-display font-medium">Closed</td></tr>
                    </tbody>
                  </table>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-white/[0.04] border border-white/[0.08]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary/70 mb-2">Privacy</p>
              <p className="text-sm text-white/45 leading-relaxed">
                Your info stays with us. We only use it to respond to your inquiry — no third-party marketing, ever.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.09] rounded-5xl p-7 sm:p-10 backdrop-blur-sm shadow-2xl shadow-black/40">

              {/* Honeypot — hidden from real users, bots fill every field */}
              <div style={{ position: 'absolute', left: '-9999px', top: 0 }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>

              {/* Form header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.08]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary/70 mb-1">Build inquiry</p>
                  <p className="text-white/40 text-sm">Reach us — we respond in under 24 hrs</p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  Open for inquiries
                </span>
              </div>

              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your full name" />
                    <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />
                    <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(555) 000-0000" />
                    <Field label="Vehicle" value={form.vehicle} onChange={(v) => setForm({ ...form, vehicle: v })} placeholder="Year / Make / Model" />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 block">
                      Your goals <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Tell us about your build goals, what you're working with, and your timeline..."
                      className="w-full bg-white/[0.04] border border-white/[0.10] rounded-2xl px-4 py-3.5 text-white placeholder-white/20 focus:border-primary/70 focus:ring-4 focus:ring-primary/10 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-primary/60', '!bg-primary/5') }}
                    onDragLeave={() => dropRef.current?.classList.remove('!border-primary/60', '!bg-primary/5')}
                    onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-primary/60', '!bg-primary/5'); handleFiles(e.dataTransfer.files) }}
                    className="mt-5 border-2 border-dashed border-white/10 rounded-3xl p-6 text-center hover:border-primary/40 hover:bg-primary/[0.03] transition-colors cursor-pointer"
                  >
                    <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary/70 mb-2" />
                      <p className="font-display font-semibold text-white/70 text-sm">Attach photos of your build</p>
                      <p className="text-xs text-white/30 mt-1">Click or drag files here · max 5 images</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-white/30">
                      {status === 'error'
                        ? <span className="text-red-400">{errorMsg || 'Something went wrong — please try again.'}</span>
                        : <>Fields marked <span className="text-primary">*</span> are required.</>}
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 hover:bg-primary-dark transition disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send inquiry'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">{"Thanks — we'll be in touch."}</h3>
                  <p className="text-white/45 max-w-md mx-auto">
                    We got your inquiry and will reach out soon to talk through your build goals.
                  </p>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function getShopStatus() {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon … 6=Sat
  const h = now.getHours() + now.getMinutes() / 60
  if (day === 0) return { open: false, label: 'Closed today · Opens Mon 8 am' }
  if (day >= 1 && day <= 5) {
    if (h >= 8 && h < 18) return { open: true, label: 'Open Now · Closes 6 pm' }
    if (h < 8) return { open: false, label: 'Opens today at 8 am' }
    // After closing — Friday → Saturday, otherwise → next weekday
    return { open: false, label: day === 5 ? 'Closed · Opens Sat 9 am' : 'Closed · Opens tomorrow 8 am' }
  }
  // Saturday
  if (h >= 9 && h < 15) return { open: true, label: 'Open Now · Closes 3 pm' }
  if (h < 9) return { open: false, label: 'Opens today at 9 am' }
  return { open: false, label: 'Closed · Opens Mon 8 am' }
}

function Footer() {
  const [shopStatus, setShopStatus] = useState(getShopStatus)
  useEffect(() => {
    const id = setInterval(() => setShopStatus(getShopStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Performance built
            <span className="font-serif italic font-medium text-primary block">right, every time.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Revv Dynamics — your local performance shop for engine builds, turbo installs, and dyno-verified tunes.
            </p>
            <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Get a Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <RevvLogo className="h-9 w-9" />
              <span className="font-display font-bold text-lg">Revv Dynamics</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              ASE-certified performance shop with over a decade of builds, tunes, and proven horsepower.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-5">
              info@revvdynamics.com
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center font-mono text-[9px] uppercase tracking-widest text-white/35 border border-white/10 rounded-full px-2.5 py-1">
                ASE Certified
              </span>
              <span className="inline-flex items-center font-mono text-[9px] uppercase tracking-widest text-white/35 border border-white/10 rounded-full px-2.5 py-1">
                10+ Yrs Experience
              </span>
              <span className="inline-flex items-center font-mono text-[9px] uppercase tracking-widest text-white/35 border border-white/10 rounded-full px-2.5 py-1">
                Dyno Verified
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 4).map((s, i) => (
                <li key={i}><a href="#services" className="text-white/65 hover:text-primary transition text-sm">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><a href="#numbers" className="text-white/65 hover:text-primary transition text-sm">Our Numbers</a></li>
              <li><a href="#process" className="text-white/65 hover:text-primary transition text-sm">Process</a></li>
              <li><a href="#contact" className="text-white/65 hover:text-primary transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li><a href="tel:+15555550100" className="text-white/65 hover:text-primary transition text-sm">(555) 555-0100</a></li>
              <li><a href="mailto:info@revvdynamics.com" className="text-white/65 hover:text-primary transition text-sm">info@revvdynamics.com</a></li>
              <li className="text-white/65 text-sm">Your City, USA</li>
            </ul>
            <div className="mt-5 pt-4 border-t border-white/[0.07]">
              <p className="font-mono text-[9px] uppercase tracking-widest text-primary/60 mb-2.5">Hours</p>
              <table className="w-full">
                <tbody>
                  <tr><td className="pr-4 py-0.5 font-mono text-[10px] text-white/35 uppercase tracking-wide">Mon–Fri</td><td className="text-white/65 text-sm">8 am – 6 pm</td></tr>
                  <tr><td className="pr-4 py-0.5 font-mono text-[10px] text-white/35 uppercase tracking-wide">Sat</td><td className="text-white/65 text-sm">9 am – 3 pm</td></tr>
                  <tr><td className="pr-4 py-0.5 font-mono text-[10px] text-white/35 uppercase tracking-wide">Sun</td><td className="text-white/30 text-sm">Closed</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              {shopStatus.open && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
              <span className={`relative h-2 w-2 rounded-full ${shopStatus.open ? 'bg-emerald-400' : 'bg-white/30'}`} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              {shopStatus.label}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
            <span>© 2026 Revv Dynamics</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
