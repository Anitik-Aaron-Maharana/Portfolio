import { animate, useInView, useReducedMotion } from 'framer-motion'
import { BrainCircuit, GraduationCap, Languages, MapPin, Music, Quote } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { archive, certificates, education, experience, person } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return <span ref={ref}>{val}</span>
}

// Every stat is counted from the data file.
const stats = [
  { value: archive.length, label: 'Games & apps on GitHub' },
  { value: certificates.length, label: 'Credentials' },
  { value: experience.filter((e) => e.kind === 'internship').length, label: 'Internship' },
  { value: person.instruments.length, label: 'Instruments played' },
]

export function About() {
  const facts = [
    { icon: GraduationCap, label: 'Education', value: `${education.degree}, ${education.branch}`, sub: `${education.school} · ${education.period}` },
    { icon: BrainCircuit, label: 'Specialisation', value: education.specialization, sub: `Year ${education.yearOfStudy} · Semester ${education.currentSemester}` },
    { icon: MapPin, label: 'Based in', value: person.location },
    { icon: Languages, label: 'Languages', value: person.languages.map((l) => l.name).join(' · '), sub: 'English full professional · Hindi professional working' },
    { icon: Music, label: 'Instruments', value: person.instruments.join(' · ') },
  ]

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A coder who also <span className="text-gradient">plays by ear.</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-[1.8] text-slate">
          <Reveal>
            <p>
              I’m <span className="text-mist">{person.name}</span>, a third-year B.Tech student in{' '}
              <span className="text-mist">{education.branch}</span> at {education.school}, specialising in{' '}
              <span className="text-mist">{education.specialization}</span>.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              I started coding in 2020 with WhiteHat Jr, where I became a <span className="text-mist">certified game and mobile-app developer</span>.
              Since then I’ve published <span className="text-mist">{archive.length} games and apps</span> on GitHub, from physics puzzles built on
              Matter.js to multiplayer games synced through Firebase. In 2025 I completed my{' '}
              <span className="text-mist">first internship, in Artificial Intelligence</span>, with SmartED Innovations.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Outside the editor I’m a <span className="text-mist">multi-instrumentalist</span>. I hold Trinity College London Distinctions in
              Electronic Keyboard, was named Music Maestro at school, and I’m a member of the Chromatix Music Club and Encoders SMIT.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <blockquote className="flex gap-3 border-l-2 border-cyan/60 pl-4 font-display text-xl italic text-ice">
              <Quote size={18} className="mt-1 shrink-0 text-cyan" aria-hidden />
              {person.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl hairline bg-azure/10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink-900/90 p-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl font-semibold text-white">
                    <Counter to={s.value} />
                  </dd>
                  <p aria-hidden className="mt-1 text-xs leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <aside aria-label="Quick facts" className="surface relative overflow-hidden rounded-3xl p-2">
            <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />
            <ul className="relative divide-y divide-azure/10">
              {facts.map((f) => (
                <li key={f.label} className="flex gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal/15 text-cyan ring-1 ring-azure/20">
                    <f.icon size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{f.label}</p>
                    <p className="mt-1 text-[15px] leading-snug text-mist">{f.value}</p>
                    {f.sub && <p className="mt-0.5 text-sm text-slate">{f.sub}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
