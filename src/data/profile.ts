/**
 * SINGLE SOURCE OF TRUTH for all portfolio content.
 *
 * Every entry carries a source:
 *   - 'profile'     → listed on LinkedIn (about, education, skills, certifications) or given directly by Anitik
 *   - 'activity'    → only referenced in LinkedIn posts/activity
 *   - 'certificate' → taken from an uploaded certificate document
 *   - 'github'      → read from his public GitHub repositories
 *
 * Projects come from github.com/anitikaaronmaharana (read from the repos' code).
 * Rules: do not add titles, dates, links, metrics or technologies that are not
 * confirmed. Sections with no data are hidden automatically, and the navigation
 * only lists sections that exist.
 */

export type Source = 'profile' | 'activity' | 'certificate' | 'github'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/anitikaaronmaharana/'
export const GITHUB_USER = 'anitikaaronmaharana'
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`
export const YOUTUBE_URL = 'https://youtube.com/AnitikAaronMaharana'
export const EMAIL = 'anitikamaharana@gmail.com'
export const PHONE = '+91 6295 350 033'
/** Publishing a phone number on a public site invites spam calls. Flip to true to show it in Contact. */
export const SHOW_PHONE = false

const pages = (repo: string) => `https://${GITHUB_USER}.github.io/${repo}/`
const repoUrl = (repo: string) => `${GITHUB_URL}/${repo}`

export const person = {
  name: 'Anitik Aaron Maharana',
  firstName: 'Anitik',
  initials: 'AM',
  location: 'Siliguri, West Bengal, India',
  statusLine: ['Coder', 'Multi-Instrumentalist', 'B.Tech CSE · AI & ML'],
  rotatingRoles: ['B.Tech CSE (AI & ML) student', 'Game developer', 'AI intern', 'Multi-instrumentalist'],
  tagline: 'Code, games and music, now specialising in AI & ML.',
  intro:
    'I’m a third-year Computer Science and Engineering student at Sikkim Manipal Institute of Technology, specialising in Artificial Intelligence and Machine Learning. I’ve been building JavaScript games since 2020, completed my first AI internship in 2025, and play eleven instruments on the side.',
  currentAssociation: 'Sikkim Manipal Institute of Technology',
  openToWork: false,
  interests: ['Artificial Intelligence & Machine Learning', 'Game development', 'Python & JavaScript', 'Music performance'],
  learningFocus: ['AI & ML specialisation', 'Python for AI', 'Trinity final level (keyboard)'],
  languages: [
    { name: 'English', level: 'Full professional' },
    { name: 'Hindi', level: 'Professional working' },
    { name: 'Bengali', level: 'Elementary' },
    { name: 'Nepali', level: 'Elementary' },
    { name: 'Oriya', level: 'Elementary' },
  ],
  instruments: [
    'Electronic Keyboard', 'Piano', 'Melodica / Pianica', 'Recorder Flute', 'Soprano Flute', 'Concert Flute',
    'Mouth Organ / Harmonica', 'Keytar', 'Clarinet', 'Saxophone', 'Kalimba / Thumb Piano',
  ],
  quote: 'Music in the soul can be heard by the universe.',
  photo: { webp: '/headshot.webp', jpg: '/headshot.jpg' },
  /** Drop a PDF at /public/resume.pdf; the Resume button activates automatically. */
  resume: '/resume.pdf',
  heroChips: [
    { icon: 'brain', label: 'AI & ML', sub: 'SmartED intern' },
    { icon: 'code', label: 'Code', sub: 'JavaScript · Python' },
    { icon: 'game', label: 'Game Dev', sub: 'p5.js · Firebase' },
    { icon: 'music', label: 'Music', sub: 'Trinity Distinction' },
  ] as { icon: 'brain' | 'code' | 'game' | 'music' | 'book' | 'cap'; label: string; sub: string }[],
}

export type LinkKind = 'linkedin' | 'github' | 'email' | 'instagram' | 'phone' | 'youtube'
export const links: { label: string; href: string; kind: LinkKind; handle: string }[] = [
  { label: 'LinkedIn', href: LINKEDIN_URL, kind: 'linkedin', handle: 'anitikaaronmaharana' },
  { label: 'GitHub', href: GITHUB_URL, kind: 'github', handle: GITHUB_USER },
  { label: 'Email', href: `mailto:${EMAIL}`, kind: 'email', handle: EMAIL },
  { label: 'YouTube', href: YOUTUBE_URL, kind: 'youtube', handle: 'AnitikAaronMaharana' },
  ...(SHOW_PHONE ? [{ label: 'Phone', href: `tel:${PHONE.replace(/\s/g, '')}`, kind: 'phone' as const, handle: PHONE }] : []),
]

/** Optional form backend (e.g. a Formspree endpoint). Empty → the form opens a pre-filled email instead. */
export const CONTACT_FORM_ENDPOINT = ''

/* ------------------------------------------------------------------ */
/* Documents (certificate images)                                      */
/* ------------------------------------------------------------------ */

export type Doc = { title: string; src: string; thumb: string; alt: string; issued?: string }

const doc = (slug: string, title: string, alt: string, issued?: string): Doc => ({
  title,
  src: `/certificates/${slug}.webp`,
  thumb: `/certificates/${slug}-thumb.webp`,
  alt,
  issued,
})

/* ------------------------------------------------------------------ */
/* Experience                                                          */
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

export const experience: Experience[] = [
  {
    id: 'smarted',
    org: 'SmartED Innovations',
    kind: 'internship',
    role: 'Artificial Intelligence Intern',
    period: 'Summer 2025',
    summary:
      'His first internship, completed during the summer break: training followed by an internship in Artificial Intelligence with SmartED Innovations.',
    highlights: [
      'Completed training plus an internship in Artificial Intelligence (certificate dated 01 Aug 2025)',
      'Noted for “exceptional enthusiasm, dedication, and a strong willingness to learn and contribute”',
    ],
    skills: ['Artificial Intelligence'],
    skillIds: ['ai', 'python'],
    documents: [
      doc('smarted-ai-internship', 'Certificate of Internship Completion — Artificial Intelligence', 'SmartED Innovations certificate of internship completion in Artificial Intelligence awarded to Anitik Aaron Maharana, dated 01 Aug 2025', '01 Aug 2025'),
    ],
    sources: ['certificate', 'activity'],
    sortKey: 202508,
  },
]

/* ------------------------------------------------------------------ */
/* Projects — from github.com/anitikaaronmaharana                      */
/* ------------------------------------------------------------------ */

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
  visual?: 'lane' | 'stock'
  image?: string
  imageAlt?: string
  source: Source
  repo?: string
  demo?: string
}

const shot = (slug: string) => `/projects/${slug}.webp`

export const projects: Project[] = [
  {
    id: 'kill-the-monster',
    title: 'Kill the Monster',
    tagline: 'Physics-driven: fly Superman through the towers to reach Bowser.',
    context: 'Physics game · WhiteHat Jr programme',
    problem: 'Make collisions feel real: stacked boxes should tumble when a hero smashes through them.',
    solution:
      'Built on the Matter.js physics engine. Dragging the mouse moves Superman’s physics body; stacked boxes react with realistic collisions as you clear a path to Bowser.',
    learned: ['Rigid bodies, worlds and engines in Matter.js', 'Driving a physics body from mouse input', 'Composing a scene from small classes (Box, Hero, Monster, Ground)'],
    technologies: ['JavaScript', 'p5.js', 'Matter.js'],
    skillIds: ['javascript', 'p5', 'matter', 'gamedev'],
    image: shot('kill-the-monster'),
    imageAlt: 'Kill the Monster: Superman flying towards red box towers and Bowser',
    source: 'github',
    repo: repoUrl('Kill-The-Monster'),
    demo: pages('Kill-The-Monster'),
  },
  {
    id: 'treasure-hunt-2',
    title: 'Treasure Hunt 2',
    tagline: 'Unscramble the code words to open Aladdin’s cave.',
    context: 'Puzzle game · WhiteHat Jr programme',
    problem: 'Turn programming vocabulary into a puzzle that teaches while you play.',
    solution:
      'Three scrambled programming terms, each with a hint (“Always changing, not constant!”). Typing each answer and pressing Check scores a point; three correct answers unlock the treasure.',
    learned: ['Mixing DOM inputs and buttons with a p5 canvas', 'Validating answers and tracking score', 'Writing hints that teach a concept'],
    technologies: ['JavaScript', 'p5.js', 'HTML/CSS'],
    skillIds: ['javascript', 'p5', 'web', 'gamedev'],
    image: shot('treasure-hunt-2'),
    imageAlt: 'Treasure Hunt 2: scrambled words with hint boxes in front of a cave',
    source: 'github',
    repo: repoUrl('Treasure-Hunt-2'),
    demo: pages('Treasure-Hunt-2'),
  },
  {
    id: 'fruit-collector-2',
    title: 'Fruit Collector 2',
    tagline: 'A real-time two-player game, synced through the cloud.',
    context: 'Multiplayer browser game · WhiteHat Jr programme',
    problem: 'Two players on different machines need to see the same game state (positions, falling fruit and scores) at the same moment.',
    solution:
      'Players join through a form, and the game state, player count and each basket’s position live in Firebase Realtime Database. Arrow keys move your basket; catching fruit raises your score, which both screens see live.',
    learned: ['Syncing shared game state through a realtime database', 'Turn-based states: waiting, playing, finished', 'Splitting code into Game, Player and Form classes'],
    technologies: ['JavaScript', 'p5.js', 'p5.play', 'Firebase'],
    skillIds: ['javascript', 'p5', 'firebase', 'gamedev'],
    image: shot('fruit-collector-2'),
    imageAlt: 'Fruit Collector 2 game screen showing the jungle background',
    source: 'github',
    repo: repoUrl('Fruit-Collector-2'),
    demo: pages('Fruit-Collector-2'),
  },
  {
    id: 'hot-air-balloon',
    title: 'Air Balloon Ride',
    tagline: 'Steer a hot-air balloon whose position lives in the cloud.',
    context: 'Browser game · WhiteHat Jr programme',
    problem: 'Remember where the balloon is, even after the page reloads.',
    solution: 'Arrow keys steer the balloon over a city skyline. Its position is read from and written to Firebase Realtime Database, so it picks up where it left off.',
    learned: ['Reading and writing values in Firebase', 'Keyboard-driven movement', 'Persisting state outside the browser'],
    technologies: ['JavaScript', 'p5.js', 'Firebase'],
    skillIds: ['javascript', 'p5', 'firebase', 'gamedev'],
    image: shot('hot-air-balloon'),
    imageAlt: 'Air Balloon Ride: a striped hot-air balloon over a city skyline',
    source: 'github',
    repo: repoUrl('Hot-Air-Balloon'),
    demo: pages('Hot-Air-Balloon'),
  },
  {
    id: 'kangaroo-game-2',
    title: 'Kangaroo in the Jungle 2',
    tagline: 'An endless runner with a following camera.',
    context: 'Endless runner · WhiteHat Jr programme',
    problem: 'Keep a runner game moving forever without the player leaving the screen.',
    solution:
      'The camera follows the kangaroo through a scrolling jungle. Space makes it jump against gravity over stones and shrubs; hitting one plays a collision sound and ends the run, with a restart button.',
    learned: ['Camera-relative positioning', 'Jump physics with velocity and gravity', 'Spawning and recycling obstacle groups'],
    technologies: ['JavaScript', 'p5.js', 'p5.play'],
    skillIds: ['javascript', 'p5', 'gamedev'],
    image: shot('kangaroo-game-2'),
    imageAlt: 'Kangaroo in the Jungle 2: a kangaroo running through a forest',
    source: 'github',
    repo: repoUrl('Kangaroo-Game-2'),
    demo: pages('Kangaroo-Game-2'),
  },
  {
    id: 'zombie-shoot-ii',
    title: 'Zombie Shoot II',
    tagline: 'Survive the night: dodge, shoot and rack up kills.',
    context: 'Arcade shooter · personal project',
    problem: 'Make a survival shooter with several enemy types that stays readable and fair as the pressure builds.',
    solution:
      'Arrow keys (or touch) move the shooter while villains, zombies and squids spawn in waves. A survival score climbs every second alongside a separate kill counter, with gunshot, explosion and game-over sounds and a restart button.',
    learned: ['Sprite groups and collision checks per enemy type', 'Game-state machine (play → end → restart)', 'Adding touch controls next to the keyboard'],
    technologies: ['JavaScript', 'p5.js', 'p5.play', 'p5.sound'],
    skillIds: ['javascript', 'p5', 'gamedev'],
    image: shot('zombie-shoot-ii'),
    imageAlt: 'Zombie Shoot II: a shooter in front of a haunted castle under a full moon',
    source: 'github',
    repo: repoUrl('Zombie-Shoot-II'),
    demo: pages('Zombie-Shoot-II'),
  },
]

/** The full game & app archive on GitHub (44 public repos), newest first. */
export const archive: { name: string; repo: string; live?: string; year: number; note?: string }[] = [
  ['Night-Survival-I', 2026, false, 'Source archive'],
  ['Zombie-Shoot-II', 2022], ['Zombie-Shoot-I', 2022], ['Space-Dog', 2022, false], ['Zombie-Shooting-Game', 2022],
  ['Zombie-Shooter-Incomplete', 2022], ['Make-Your-Own-Game', 2022], ['Treasure-Hunt-2', 2021], ['Treasure-Hunt', 2021],
  ['Shooting-Range', 2021], ['Fruit-Collector-2', 2021], ['Fruit-Collector', 2021], ['Tom-Jerry', 2021], ['Kangaroo-Game-2', 2021],
  ['Kangaroo-Game', 2021], ['Quiz-Game-2', 2021], ['Quiz-Game', 2021], ['Hot-Air-Balloon', 2021], ['Synchronizing-Ball-Movement', 2021],
  ['Mario-Game-III', 2021], ['Mario-Game-II', 2021], ['Monkey-Go-Happy', 2021], ['Dog-in-Space', 2021], ['Mario-Game-I', 2021],
  ['T-Rex-Game', 2021], ['Ghost-Runner', 2021], ['Kill-The-Monster', 2021], ['Wrecking-Ball', 2021], ['Snow-Animation', 2021],
  ['Sunrise-and-Sunset', 2021], ['Plinko-Game', 2021], ['Tower-Seige-2', 2021], ['Fairy-And-Star', 2021], ['Newton-s-Cradle', 2021],
  ['Red-Velvet-Cake', 2021], ['Geologist', 2021], ['Tower-Siege-1', 2021], ['Jumping-Boxes', 2021], ['Crumpled-Balls', 2021],
  ['Plucking-Mangoes', 2021], ['Angry-Birds-Stage-2.5', 2021, false], ['Supply-Mission', 2021], ['Fruit-Ninja', 2021], ['T-Rex', 2021],
].map(([repo, year, live = true, note]) => ({
  name: String(repo).replace(/-/g, ' ').replace('Newton s', 'Newton’s'),
  repo: repoUrl(String(repo)),
  live: live ? pages(String(repo)) : undefined,
  year: Number(year),
  note: note as string | undefined,
}))

/* ------------------------------------------------------------------ */
/* Skills — backed by LinkedIn, certificates or repo code              */
/* ------------------------------------------------------------------ */

export type SkillCategory = 'Programming' | 'AI / ML' | 'Game Dev' | 'Web & Cloud' | 'Tools' | 'Music & Media'

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

export const skills: Skill[] = [
  { id: 'javascript', name: 'JavaScript', category: 'Programming', kind: 'Programming Language', description: 'The language behind the 40+ projects on his GitHub.', evidence: 'WhiteHat Jr Certified Mobile App Developer · 44 GitHub repos · LinkedIn skill', featured: true, core: true },
  { id: 'python', name: 'Python', category: 'Programming', kind: 'Programming Language', description: 'Learned in school, now used for AI work.', evidence: 'LinkedIn skill (Sri Sri Academy) · SmartED AI internship', featured: true, core: true },
  { id: 'ai', name: 'Artificial Intelligence', category: 'AI / ML', kind: 'Domain', description: 'His B.Tech specialisation, plus a completed AI internship.', evidence: 'SmartED Innovations AI internship · B.Tech CSE (AI & ML)', featured: true, core: true },
  { id: 'ml', name: 'Machine Learning', category: 'AI / ML', kind: 'Domain', description: 'Studied through his specialisation and the Encoders AIML programme.', evidence: 'Encoders AIML Phase 2 · B.Tech CSE (AI & ML)', featured: true, core: true },
  { id: 'gamedev', name: 'Game Development', category: 'Game Dev', kind: 'Discipline', description: 'Arcade, physics, puzzle and multiplayer browser games.', evidence: 'WhiteHat Jr Certified Game Developer · Code of Honour', featured: true, core: true },
  { id: 'appdev', name: 'Mobile App Development', category: 'Game Dev', kind: 'Discipline', description: 'Certified in core programming, design thinking and app development.', evidence: 'WhiteHat Jr Certified Mobile App Developer' },
  { id: 'p5', name: 'p5.js & p5.play', category: 'Game Dev', kind: 'Library', description: 'Canvas drawing, sprites, animation and collisions.', evidence: 'Used across his GitHub game repos', featured: true, core: true },
  { id: 'matter', name: 'Matter.js', category: 'Game Dev', kind: 'Physics Engine', description: 'Rigid-body physics for collisions, slings and towers.', evidence: 'Kill the Monster · Snow Animation · Plinko · Tower Siege' },
  { id: 'firebase', name: 'Firebase Realtime Database', category: 'Web & Cloud', kind: 'Cloud Database', description: 'Syncs multiplayer state and saves game data online.', evidence: 'Fruit Collector 2 · Quiz Game 2 · Air Balloon Ride', featured: true, core: true },
  { id: 'web', name: 'HTML & CSS', category: 'Web & Cloud', kind: 'Web', description: 'The page structure and styling around each game.', evidence: 'Every GitHub Pages game repo' },
  { id: 'vs', name: 'Visual Studio', category: 'Tools', kind: 'IDE', description: 'His main coding environment.', evidence: 'LinkedIn skill · WhiteHat Jr Certified Game Developer' },
  { id: 'github', name: 'GitHub & GitHub Pages', category: 'Tools', kind: 'Platform', description: 'Hosts his code and publishes playable demos.', evidence: `github.com/${GITHUB_USER}` },
  { id: 'keyboard', name: 'Electronic Keyboard', category: 'Music & Media', kind: 'Instrument', description: 'Trinity College London Grades 3 and 5, both with Distinction.', evidence: 'Trinity Level 1 & Level 2 certificates', featured: true },
  { id: 'music', name: 'Music Performance', category: 'Music & Media', kind: 'Performance', description: 'Plays 11 instruments; named school Music Maestro.', evidence: 'Music Maestro, Sri Sri Academy · Chromatix Music Club' },
  { id: 'av', name: 'Audio Recording & Video Editing', category: 'Music & Media', kind: 'Media', description: 'Records and edits his own music content.', evidence: 'LinkedIn skills · YouTube channel' },
  { id: 'english', name: 'Communication in English', category: 'Tools', kind: 'Soft Skill', description: 'Full professional proficiency; first place in essay writing.', evidence: 'LinkedIn skill · Sri Sri Academy essay award' },
]

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */

export type CertCategory = 'AI/ML' | 'Programming' | 'Game Dev' | 'Music' | 'Awards' | 'Participation'

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

export const certificates: Certificate[] = [
  {
    id: 'encoders-aiml',
    name: 'AIML Phase 2',
    issuer: 'Encoders SMIT · ACCESS',
    category: 'AI/ML',
    kind: 'Certificate of Completion',
    detail: 'For achievements and participation in AIML Phase 2, held at Sikkim Manipal Institute of Technology.',
    skills: ['Artificial Intelligence', 'Machine Learning'],
    skillIds: ['ai', 'ml'],
    issued: '4–6 Mar 2025',
    sortKey: 20250304,
    document: doc('encoders-aiml-phase-2', 'AIML Phase 2 — Encoders', 'Encoders certificate of completion for AIML Phase 2, March 4 to 6, 2025, at Sikkim Manipal Institute of Technology, presented to Anitik'),
    source: 'certificate',
  },
  {
    id: 'sigil',
    name: 'Industry Academia Series 2025',
    issuer: 'SIGIL (Special Interest Group and Industry Liaison) · ACCESS',
    category: 'Participation',
    kind: 'Certificate of Participation',
    detail: 'Took part in the first Industry Academia Series of the Special Interest Group and Industry Liaison.',
    skills: ['Industry exposure'],
    skillIds: [],
    issued: '1 Mar 2025',
    sortKey: 20250301,
    document: doc('sigil-industry-academia-2025', 'Industry Academia Series — SIGIL', 'SIGIL certificate of participation awarded to Anitik Maharana for the first Industry Academia Series, 1st March 2025'),
    source: 'certificate',
  },
  {
    id: 'trinity-grade-5',
    name: 'Grade 5 Electronic Keyboard — Distinction',
    issuer: 'Trinity College London',
    category: 'Music',
    kind: 'Level 2 Certificate in Graded Examination in Music Performance',
    detail: 'Ofqual-regulated qualification, taken at the Darjeeling centre.',
    skills: ['Electronic Keyboard', 'Music Performance'],
    skillIds: ['keyboard', 'music'],
    issued: 'Aug 2024',
    grade: 'Distinction',
    credentialId: '501/2045/1',
    sortKey: 20240808,
    document: doc('trinity-grade-5-keyboard', 'Grade 5 Electronic Keyboard — Trinity College London', 'Trinity College London Grade 5 Electronic Keyboard Level 2 certificate with Distinction, July 2024, awarded to Anitik Aaron Maharana'),
    source: 'profile',
  },
  {
    id: 'whitehat-code-of-honour',
    name: 'Code of Honour — Game Masters League',
    issuer: 'WhiteHat Jr (BYJU’S FutureSchool)',
    category: 'Awards',
    kind: 'Recognition',
    detail: 'For developing an original app and being among the Top Independent Game Developers.',
    skills: ['Mobile App & Game'],
    skillIds: ['gamedev', 'appdev'],
    issued: 'Jan 2022',
    sortKey: 20220115,
    document: doc('whitehat-code-of-honour', 'Code of Honour — WhiteHat Jr', 'WhiteHat Jr Game Masters League Code of Honour certificate presented to Anitik Aaron Maharana in 2022'),
    source: 'profile',
  },
  {
    id: 'trinity-grade-3',
    name: 'Grade 3 Electronic Keyboard — Distinction',
    issuer: 'Trinity College London',
    category: 'Music',
    kind: 'Level 1 Award in Graded Examination in Music Performance',
    detail: 'Ofqual-regulated qualification, taken at the Darjeeling centre.',
    skills: ['Electronic Keyboard', 'Music Performance'],
    skillIds: ['keyboard', 'music'],
    issued: 'Jan 2022',
    grade: 'Distinction',
    credentialId: '501/2043/8',
    sortKey: 20220124,
    document: doc('trinity-grade-3-keyboard', 'Grade 3 Electronic Keyboard — Trinity College London', 'Trinity College London Grade 3 Electronic Keyboard Level 1 award with Distinction, January 2022, awarded to Anitik Aaron Maharana'),
    source: 'profile',
  },
  {
    id: 'whitehat-app-developer',
    name: 'Certified Mobile App Developer',
    issuer: 'WhiteHat Jr',
    category: 'Programming',
    kind: 'Certificate of Completion',
    detail: 'For exceptional skills and outcomes in Core Programming, Design Thinking and Advanced Application Development.',
    skills: ['JavaScript', 'App Development'],
    skillIds: ['javascript', 'appdev'],
    issued: 'Aug 2021',
    sortKey: 20210815,
    document: doc('whitehat-mobile-app-developer', 'Certified Mobile App Developer — WhiteHat Jr', 'WhiteHat Jr certificate of completion, Certified Mobile App Developer, 2021, presented to Anitik Aaron Maharana'),
    source: 'profile',
  },
  {
    id: 'whitehat-game-developer',
    name: 'Certified Game Developer',
    issuer: 'WhiteHat Jr',
    category: 'Game Dev',
    kind: 'Certification',
    detail: 'For exceptional skills and outcomes in Game Development with a deep UI/UX interface.',
    skills: ['Game Development', 'Visual Studio'],
    skillIds: ['gamedev', 'vs'],
    issued: 'Nov 2020',
    sortKey: 20201115,
    document: doc('whitehat-game-developer', 'Certified Game Developer — WhiteHat Jr', 'WhiteHat Jr Certified Game Developer certificate, 2020, presented to Anitik Aaron Maharana'),
    source: 'profile',
  },
  {
    id: 'sri-sri-music-maestro',
    name: 'Music Maestro',
    issuer: 'Sri Sri Academy, Siliguri',
    category: 'Awards',
    kind: 'Certificate of Appreciation',
    detail: 'Named the school’s Music Maestro in Class XI.',
    skills: ['Music Performance'],
    skillIds: ['music'],
    issued: 'Session 2022–23',
    sortKey: 20221001,
    document: doc('sri-sri-music-maestro', 'Music Maestro — Sri Sri Academy', 'Sri Sri Academy certificate of appreciation awarded to Anitik Aaron Maharana of class XI for being the Music Maestro, session 2022-23'),
    source: 'profile',
  },
  {
    id: 'sri-sri-essay',
    name: 'First Place — Essay Writing',
    issuer: 'Sri Sri Academy, Siliguri',
    category: 'Awards',
    kind: 'Certificate of Achievement',
    detail: 'First place in the Class IX essay-writing competition (12 Dec 2020), part of the Stay Fit Campaign.',
    skills: ['Communication in English'],
    skillIds: ['english'],
    issued: '12 Jan 2021',
    sortKey: 20210112,
    document: doc('sri-sri-essay-writing-first', 'First Place in Essay Writing — Sri Sri Academy', 'Sri Sri Academy certificate of achievement: Anitik Aaron Maharana, Class IX, first place in essay writing, 12/12/2020'),
    source: 'profile',
  },
]

/* ------------------------------------------------------------------ */
/* Education — mirrors the LinkedIn entries, with their attached media  */
/* ------------------------------------------------------------------ */

const certDoc = (id: string) => certificates.find((c) => c.id === id)!.document!
const chromatixDoc = doc('chromatix-music-club-2024-25', 'Chromatix Music Club Member', 'Chromatix Music Club 2024-25 recruitment results announcing Anitik Aaron Maharana as a new member')

export const education = {
  school: 'Sikkim Manipal Institute of Technology',
  degree: 'Bachelor of Technology (B.Tech.)',
  linkedinDegree: 'Bachelor of Technology - BTech, Computer Science',
  branch: 'Computer Science and Engineering',
  specialization: 'Artificial Intelligence and Machine Learning',
  period: 'Jul 2024 – Jun 2028',
  yearOfStudy: 3,
  currentSemester: 5,
  totalSemesters: 8,
  graduation: 2028,
  activities: ['Chromatix Music Club', 'Encoders SMIT'],
  activitiesNote: 'Member of Chromatix Music Club and Encoders SMIT',
  docs: [
    { ...certDoc('sigil'), title: 'Certificate of Participation' },
    { ...certDoc('encoders-aiml'), title: 'Encoders SMIT Certification' },
    chromatixDoc,
  ],
  earlier: [
    {
      school: 'Sri Sri Academy, Siliguri',
      level: 'Standard XII, CBSE',
      period: 'Apr 2019 – Mar 2024',
      detail: 'Won first place in essay writing (Class IX) and was named the school’s Music Maestro (Class XI).',
      skills: ['Communication in English', 'Python (Programming Language)', 'Music Performance'],
      docs: [
        { ...certDoc('sri-sri-essay'), title: 'First position in Essay Writing' },
        { ...certDoc('sri-sri-music-maestro'), title: 'Music Maestro of School' },
      ],
    },
    {
      school: 'WhiteHat Jr',
      level: 'Certification in Game & App Development',
      period: 'Jan 2020 – Dec 2021',
      detail: 'Debugged and built games such as Fruit Collector, Treasure Hunt, Kill the Monster, Air Balloon Ride and Kangaroo in the Jungle 2, plus apps like Shooting Range and Snowfall Animation.',
      skills: ['JavaScript', 'Visual Studio', 'Coding'],
      docs: [
        { ...certDoc('whitehat-code-of-honour'), title: 'Code of Honour in Game Development' },
        { ...certDoc('whitehat-app-developer'), title: 'Certified Mobile App Developer' },
        { ...certDoc('whitehat-game-developer'), title: 'Certified Game Developer' },
      ],
    },
    {
      school: 'Trinity College London',
      level: 'Music · Electronic Keyboard',
      period: 'Jan 2020 – Jun 2024',
      detail: 'Level 1 (Grade 3, Jan 2020 – Dec 2021) and Level 2 (Grade 5, Jul 2022 – Jun 2024), both with Distinction. The final-level certification is in preparation.',
      skills: ['Electronic Keyboard'],
      docs: [
        { ...certDoc('trinity-grade-3'), title: 'Level 1 with Distinction' },
        { ...certDoc('trinity-grade-5'), title: 'Level 2 with Distinction' },
      ],
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Achievements & activities                                           */
/* ------------------------------------------------------------------ */

export type Activity = { title: string; detail: string; group: 'hackathon' | 'program' | 'community'; source: Source }

export const activities: Activity[] = [
  { title: 'AIML Phase 2 · Encoders', detail: 'Three-day AI/ML programme at SMIT, 4–6 Mar 2025.', group: 'hackathon', source: 'certificate' },
  { title: 'Industry Academia Series · SIGIL', detail: 'The first edition, 1 Mar 2025.', group: 'hackathon', source: 'certificate' },
  { title: 'Code of Honour · WhiteHat Jr', detail: 'Among the Top Independent Game Developers (2022).', group: 'program', source: 'profile' },
  { title: 'Trinity College London · Distinction ×2', detail: 'Electronic Keyboard Grade 3 (2022) and Grade 5 (2024).', group: 'program', source: 'profile' },
  { title: 'Music Maestro · Sri Sri Academy', detail: 'Session 2022–23.', group: 'program', source: 'profile' },
  { title: 'First place · Essay Writing', detail: 'Sri Sri Academy, Class IX (2020).', group: 'program', source: 'profile' },
  { title: 'Chromatix Music Club', detail: 'Selected in the 2024–25 recruitment.', group: 'community', source: 'certificate' },
  { title: 'Encoders SMIT', detail: 'Member of the campus coding club.', group: 'community', source: 'profile' },
  { title: 'YouTube channel', detail: 'Shares his music and recordings.', group: 'community', source: 'profile' },
]

/** Membership announcement shown alongside the activities. */
export const memberships: Doc[] = [chromatixDoc]

/* ------------------------------------------------------------------ */
/* Currently learning & recent journey                                 */
/* ------------------------------------------------------------------ */

export const learning = [
  { title: 'AI & ML specialisation', detail: 'Fifth semester of B.Tech CSE (AI & ML) at SMIT.', status: 'In progress' },
  { title: 'Python for AI', detail: 'Applied during the SmartED AI internship.', status: 'Applying' },
  { title: 'Machine Learning', detail: 'Completed Encoders’ AIML Phase 2 (Mar 2025).', status: 'Milestone reached' },
  { title: 'Game development', detail: 'Certified in game & app development, with 44 repos on GitHub.', status: 'Foundation built' },
  { title: 'Electronic Keyboard', detail: 'Trinity College London final-level certification.', status: 'In preparation' },
  { title: 'Multi-instrumental music', detail: '11 instruments, from piano to saxophone.', status: 'Ongoing' },
]

export const journey: { title: string; detail: string; tag: string; date?: string }[] = [
  { title: 'First internship: AI at SmartED', detail: 'Completed training and an AI internship during the summer break.', tag: 'Internship', date: 'Summer 2025' },
  { title: 'AIML Phase 2 · Encoders', detail: 'Certificate of completion at SMIT.', tag: 'AI / ML', date: 'Mar 2025' },
  { title: 'Industry Academia Series', detail: 'Took part in SIGIL’s first edition.', tag: 'Event', date: 'Mar 2025' },
  { title: 'Joined Chromatix Music Club', detail: 'Selected in the 2024–25 recruitment.', tag: 'Community', date: '2024–25' },
  { title: 'Grade 5 Keyboard · Distinction', detail: 'Trinity College London, Level 2.', tag: 'Music', date: 'Aug 2024' },
  { title: 'Started B.Tech CSE (AI & ML)', detail: 'Sikkim Manipal Institute of Technology.', tag: 'Education', date: 'Jul 2024' },
  { title: 'Music Maestro', detail: 'Sri Sri Academy, Class XI.', tag: 'Recognition', date: '2022–23' },
  { title: 'Code of Honour', detail: 'WhiteHat Jr Top Independent Game Developers.', tag: 'Recognition', date: 'Jan 2022' },
  { title: 'Grade 3 Keyboard · Distinction', detail: 'Trinity College London, Level 1.', tag: 'Music', date: 'Jan 2022' },
  { title: 'Certified Mobile App Developer', detail: 'WhiteHat Jr.', tag: 'Certificate', date: 'Aug 2021' },
  { title: 'Certified Game Developer', detail: 'WhiteHat Jr.', tag: 'Certificate', date: 'Nov 2020' },
  { title: 'First place · Essay Writing', detail: 'Sri Sri Academy, Class IX.', tag: 'Award', date: 'Dec 2020' },
]

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
