/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 *
 * Every entry carries a source:
 *   - 'profile'     → provided directly by Anitik (personal & academic details)
 *   - 'activity'    → only referenced in LinkedIn posts/activity
 *   - 'certificate' → taken from an uploaded certificate document
 *
 * Rules: do not add titles, dates, links, metrics or technologies that are not
 * confirmed. Sections with no data are hidden automatically (see App.tsx),
 * and the navigation only lists sections that exist.
 */

export type Source = 'profile' | 'activity' | 'certificate'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/anitikaaronmaharana/'
export const GITHUB_URL = 'https://github.com/Anitik-Aaron-Maharana'
export const EMAIL = 'anitikamaharana@gmail.com'
export const PHONE = '+91 6295 350 033'
/** Publishing a phone number on a public site invites spam calls. Flip to true to show it in Contact. */
export const SHOW_PHONE = false

export const person = {
  name: 'Anitik Aaron Maharana',
  firstName: 'Anitik',
  initials: 'AM',
  location: 'Siliguri, West Bengal, India',
  statusLine: ['B.Tech CSE · AI & ML', 'Third Year', 'SMIT'],
  rotatingRoles: ['B.Tech CSE student', 'AI & ML specialisation', 'Third-year engineer', 'Class of 2028'],
  intro:
    'I’m a third-year Computer Science and Engineering student at Sikkim Manipal Institute of Technology, specialising in Artificial Intelligence and Machine Learning. Based in Siliguri, I’m in my fifth semester and graduating in 2028.',
  currentAssociation: 'Sikkim Manipal Institute of Technology',
  openToWork: false,
  interests: ['Artificial Intelligence', 'Machine Learning', 'Computer Science & Engineering'],
  learningFocus: ['Specialisation: AI & ML', 'Fifth-semester coursework'],
  /** Drop a square photo at /public/headshot.webp + .jpg; until then the hero shows an "AM" monogram. */
  photo: { webp: '/headshot.webp', jpg: '/headshot.jpg' },
  /** Drop a PDF at /public/resume.pdf; the Resume button activates automatically. */
  resume: '/resume.pdf',
  heroChips: [
    { icon: 'brain', label: 'AI & ML', sub: 'Specialisation' },
    { icon: 'code', label: 'B.Tech CSE', sub: 'SMIT' },
    { icon: 'book', label: 'Semester 5', sub: 'Third year' },
    { icon: 'cap', label: 'Class of 2028', sub: 'Graduating' },
  ] as { icon: 'brain' | 'code' | 'book' | 'cap'; label: string; sub: string }[],
}

export type LinkKind = 'linkedin' | 'github' | 'email' | 'instagram' | 'phone'
export const links: { label: string; href: string; kind: LinkKind; handle: string }[] = [
  { label: 'LinkedIn', href: LINKEDIN_URL, kind: 'linkedin', handle: 'anitikaaronmaharana' },
  { label: 'GitHub', href: GITHUB_URL, kind: 'github', handle: 'Anitik-Aaron-Maharana' },
  { label: 'Email', href: `mailto:${EMAIL}`, kind: 'email', handle: EMAIL },
  ...(SHOW_PHONE ? [{ label: 'Phone', href: `tel:${PHONE.replace(/\s/g, '')}`, kind: 'phone' as const, handle: PHONE }] : []),
]

/** Optional form backend (e.g. a Formspree endpoint). Empty → the form opens a pre-filled email instead. */
export const CONTACT_FORM_ENDPOINT = ''

export type Doc = { title: string; src: string; thumb: string; alt: string; issued?: string }

/* ------------------------------------------------------------------ */
/* Experience: add internships here when confirmed                     */
/* ------------------------------------------------------------------ */

export type Experience = {
  id: string
  org: string
  kind: 'internship' | 'update'
  role?: string
  location?: string
  period: string
  current?: boolean
  summary: string
  highlights?: string[]
  skills?: string[]
  skillIds: string[]
  documents?: Doc[]
  sources: Source[]
  sortKey: number
}

export const experience: Experience[] = []

export type Project = {
  id: string
  title: string
  tagline: string
  context: string
  problem: string
  solution: string
  learned: string[]
  technologies: string[]
  skillIds: string[]
  visual: 'lane' | 'stock'
  source: Source
  repo?: string
  demo?: string
}

export const projects: Project[] = []

export type SkillCategory = 'Programming' | 'AI / ML' | 'Data' | 'DSA' | 'Blockchain' | 'Tools'

export type Skill = {
  id: string
  name: string
  category: SkillCategory
  kind: string
  description: string
  evidence: string
  featured?: boolean
  core?: boolean
}

export const skills: Skill[] = []

export type CertCategory = 'AI/ML' | 'Programming' | 'Data' | 'Blockchain' | 'Participation'

export type Certificate = {
  id: string
  name: string
  issuer: string
  category: CertCategory
  kind: string
  detail?: string
  skills: string[]
  skillIds: string[]
  issued?: string
  sortKey: number
  credentialId?: string
  grade?: string
  document?: Doc
  verifyUrl?: string
  source: Source
}

export const certificates: Certificate[] = []

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = {
  school: 'Sikkim Manipal Institute of Technology',
  degree: 'Bachelor of Technology (B.Tech.)',
  branch: 'Computer Science and Engineering',
  specialization: 'Artificial Intelligence and Machine Learning',
  yearOfStudy: 3,
  currentSemester: 5,
  totalSemesters: 8,
  graduation: 2028,
}

/* ------------------------------------------------------------------ */
/* Achievements, learning & journey: add when confirmed                */
/* ------------------------------------------------------------------ */

export type Activity = { title: string; detail: string; group: 'hackathon' | 'program' | 'community'; source: Source }

export const activities: Activity[] = []

export const learning: { title: string; detail: string; status: string }[] = []

export const journey: { title: string; detail: string; tag: string; date?: string }[] = []

const allNav = [
  { id: 'about', label: 'About', show: true },
  { id: 'experience', label: 'Experience', show: experience.length > 0 },
  { id: 'arsenal', label: 'Arsenal', show: skills.length > 0 },
  { id: 'projects', label: 'Projects', show: projects.length > 0 },
  { id: 'credentials', label: 'Credentials', show: certificates.length > 0 },
  { id: 'education', label: 'Education', show: true },
  { id: 'achievements', label: 'Achievements', show: activities.length > 0 },
  { id: 'learning', label: 'Learning', show: learning.length > 0 || journey.length > 0 },
  { id: 'contact', label: 'Contact', show: true },
]

/** Only sections that have real content. */
export const navItems = allNav.filter((n) => n.show).map(({ id, label }) => ({ id, label }))
export const isVisible = (id: string) => navItems.some((n) => n.id === id)
/** Two-digit section number based on the visible order. */
export const sectionIndex = (id: string) => String(navItems.findIndex((n) => n.id === id) + 1).padStart(2, '0')
