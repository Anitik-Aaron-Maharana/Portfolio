import { animate, useInView, useReducedMotion } from 'framer-motion'
import { BookOpen, BrainCircuit, GraduationCap, MapPin, School } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { education, person } from '../data/profile'
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

// Every stat comes straight from the academic details — nothing is estimated.
const stats = [
  { value: education.yearOfStudy, label: 'Year of study' },
  { value: education.currentSemester, label: 'Current semester' },
  { value: education.totalSemesters - education.currentSemester, label: 'Semesters to go' },
  { value: education.graduation, label: 'Expected graduation' },
]

export function About() {
  const facts = [
    { icon: GraduationCap, label: 'Degree', value: `${education.degree}, ${education.branch}` },
    { icon: BrainCircuit, label: 'Specialisation', value: education.specialization },
    { icon: School, label: 'Institution', value: education.school },
    { icon: BookOpen, label: 'Currently', value: `Year ${education.yearOfStudy} · Semester ${education.currentSemester}`, sub: `Graduating ${education.graduation}` },
    { icon: MapPin, label: 'Based in', value: person.location },
  ]

  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineering, with a focus on <span className="text-gradient">intelligence.</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-[1.8] text-slate">
          <Reveal>
            <p>
              I’m <span className="text-mist">{person.name}</span>, a third-year{' '}
              <span className="text-mist">B.Tech student in {education.branch}</span> at{' '}
              <span className="text-mist">{education.school}</span>.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              My specialisation is <span className="text-mist">{education.specialization}</span>, the part of computer science that teaches
              machines to learn from data. I’m currently in my <span className="text-mist">fifth semester</span>, building the foundations
              that the specialisation stands on.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              I’m based in <span className="text-mist">Siliguri, West Bengal</span>, and I’m on track to graduate in{' '}
              <span className="text-mist">{education.graduation}</span>. Projects, experience and certifications will appear here as I add
              them.
            </p>
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
