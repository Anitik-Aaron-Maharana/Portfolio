import { motion, useReducedMotion } from 'framer-motion'
import { BrainCircuit, Check, GraduationCap } from 'lucide-react'
import { education } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'

export function Education() {
  const reduce = useReducedMotion()
  const { currentSemester: cur, totalSemesters: total } = education
  const semesters = Array.from({ length: total }, (_, i) => i + 1)
  const pct = `${((cur - 0.5) / total) * 100}%` // halfway through the current semester

  return (
    <Section id="education" eyebrow="Education" title="Where the foundation is built.">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-azure/15 bg-gradient-to-br from-royal/25 via-ink-850/70 to-ink-900 p-8">
            <div aria-hidden className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/25 blur-3xl" />
            <GraduationCap size={30} className="relative text-cyan" aria-hidden />
            <p className="relative mt-6 font-mono text-sm text-cyan">Expected graduation · {education.graduation}</p>
            <h3 className="relative mt-2 text-3xl font-semibold leading-tight text-white">{education.school}</h3>
            <p className="relative mt-3 text-mist">{education.degree}</p>
            <p className="relative mt-1 text-slate">{education.branch}</p>
            <div className="relative mt-5 inline-flex items-start gap-2 rounded-2xl bg-royal/20 px-3 py-2 text-sm text-ice ring-1 ring-azure/25">
              <BrainCircuit size={15} className="mt-0.5 shrink-0 text-cyan" aria-hidden /> Specialisation: {education.specialization}
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-azure/15 pt-6 text-center">
              {[
                ['Year', education.yearOfStudy],
                ['Semester', cur],
                ['Class of', education.graduation],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-display text-2xl font-semibold text-white">{v}</p>
                  <p className="text-xs text-muted">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="font-display text-2xl font-semibold text-white">Degree progress</h3>
            <p className="mt-2 text-slate">
              Semester {cur} of {total}, in year {education.yearOfStudy} of the B.Tech programme.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8">
              <div
                className="relative h-2 overflow-hidden rounded-full bg-ink-800"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={cur}
                aria-label={`Semester ${cur} of ${total}`}
              >
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-royal via-electric to-cyan"
                  initial={reduce ? { width: pct } : { width: 0 }}
                  whileInView={{ width: pct }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <ol className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-8">
                {semesters.map((n) => {
                  const done = n < cur
                  const now = n === cur
                  return (
                    <li
                      key={n}
                      className={`flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition ${
                        now ? 'bg-royal/25 ring-1 ring-cyan/60 shadow-[0_0_30px_-8px_rgba(56,189,248,0.8)]' : 'surface'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`grid h-8 w-8 place-items-center rounded-full font-mono text-xs ${
                          done ? 'bg-cyan text-ink-950' : now ? 'bg-ink-950 text-cyan ring-2 ring-cyan' : 'bg-ink-900 text-muted ring-1 ring-azure/20'
                        }`}
                      >
                        {done ? <Check size={14} /> : n}
                      </span>
                      <span aria-hidden className={`font-mono text-[10px] uppercase tracking-wider ${now ? 'text-cyan' : 'text-muted'}`}>
                        {done ? `Sem ${n}` : now ? 'Now' : `Sem ${n}`}
                      </span>
                      <span className="sr-only">
                        Semester {n}: {done ? 'completed' : now ? 'in progress' : 'upcoming'}
                      </span>
                    </li>
                  )
                })}
              </ol>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate">
                <span>Year 1 · Sem 1–2</span>
                <span>Year 2 · Sem 3–4</span>
                <span className="text-cyan">Year 3 · Sem 5–6 (now)</span>
                <span>Year 4 · Sem 7–8 → {education.graduation}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
