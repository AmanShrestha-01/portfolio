export const profile = {
  name: 'Aman Shrestha',
  role: 'Software Engineer',
  tagline: 'Backend Systems · Machine Learning',
  headline: ['Aman', 'Shrestha'],
  coords: '39.34° N, 76.58° W',
  heroLine:
    "Software engineer. I build backends that hold up in production — and I'm taking that same discipline into machine learning.",
  location: 'Baltimore, MD',
  email: 'amanshrestha3003@gmail.com',
  github: 'https://github.com/AmanShrestha-01',
  githubHandle: 'AmanShrestha-01',
  linkedin: 'https://www.linkedin.com/in/aman-shrestha-94388326a/',
  instagram: 'https://www.instagram.com/aman.shrestha_003/',
  resumeUrl: '/resume.pdf',
  resumeFileName: "Aman's Professional Resume.pdf",
  eduLine: 'B.S. Computer Science — Morgan State University, Class of 2028',
  pitch:
    "I build production backends in Python — real auth, real databases, deployed and running. Now I'm going deep on machine learning: the math underneath models, and the systems that serve them.",
  manifesto:
    'I like problems with a database underneath, a real user on the other end of the request — and, more and more, a model in the middle.',
  bio: [
    "That's why I've spent the past year focused on backend: architecture decisions, edge cases, and five production APIs shipped from scratch, all self-directed.",
    "Every one of them follows the same discipline: hashed passwords, token-based auth, input validation that actually holds up, a clean commit history, and a live deployment at the end — not a tutorial abandoned at 80%. If it's on my GitHub, it runs.",
    "Where I'm heading is machine learning. Two of my APIs already put an LLM behind real auth, per-user rate limits, and cost controls — and building them pulled me underneath the API call. I'm now working through the math (linear algebra, probability, optimization) and learning to build models with NumPy, scikit-learn, and PyTorch. The goal: engineer the systems that train and serve models, not just call them.",
    "Off the clock I'm just as serious about the chessboard, the pickleball court, and the weight room — I'm chasing a specific physique the same way I chase a specific system design: with a plan, not vibes. I sing and play guitar for the soul, think about philosophy and psychology more than is probably useful for a CS degree, and still show up for soccer whenever I can.",
  ],
  interests: [
    'Chess',
    'Weight Training',
    'Soccer',
    'Pickleball',
    'Singing',
    'Guitar',
    'Philosophy',
    'Psychology',
    'Systems Design',
  ],
  status: 'Open to SWE & ML internships / co-ops — Summer / Fall',
}

export const offClock = [
  { src: '/images/singing.webp', label: 'Melody', caption: 'Songs for the soul, not the stage.', alt: 'Aman playing acoustic guitar under a warm backlight' },
  { src: '/images/gym.webp', label: 'Gym', caption: 'Discipline, one rep at a time.', alt: 'Aman in the gym between sets' },
  { src: '/images/pickleball.webp', label: 'Pickleball', caption: 'Competitive by default.', alt: 'Aman walking up to the net on a pickleball court' },
  { src: '/images/chess.webp', label: 'Chess', caption: 'Thinking three moves ahead.', alt: 'A chessboard mid-game beside an open book of chess studies' },
]

export const quotes = {
  drive: 'If not me, then who?',
  memento: 'Memento mori. Memento vivere.',
  noPlanB: "I don't have a Plan B — I'll make this happen.",
  heroCaption: 'Written to be read by a compiler and a recruiter.',
}

export const focus = {
  title: 'Machine Learning',
  points: [
    { k: 'Math', v: 'Linear algebra, probability, optimization' },
    { k: 'Modeling', v: 'NumPy → scikit-learn → PyTorch' },
    { k: 'Systems', v: 'Serving models behind production APIs' },
  ],
}

export const stats = [
  { value: '6', label: 'Projects shipped' },
  { value: '5', label: 'Production APIs' },
  { value: '2', label: 'LLM-powered services' },
  { value: '20+', label: 'Endpoints in one API' },
]

export type SkillCategory = {
  label: string
  items: string[]
}

export const skills: SkillCategory[] = [
  { label: 'Languages', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'SQL'] },
  { label: 'Foundations', items: ['Data Structures & Algorithms', 'Object-Oriented Design'] },
  { label: 'Frameworks', items: ['Flask', 'Flask-SocketIO', 'SQLAlchemy', 'Pytest', 'Next.js', 'React'] },
  {
    label: 'ML / AI',
    items: ['LLM Integration (Claude API)', 'Prompt Design', 'AI Rate Limiting & Cost Control'],
  },
  { label: 'Databases', items: ['PostgreSQL', 'Redis', 'SQLite'] },
  { label: 'Infrastructure', items: ['Docker', 'Docker Compose', 'Render', 'GitHub Actions CI/CD'] },
  {
    label: 'Tools',
    items: ['Git', 'REST APIs', 'JWT Auth', 'Bcrypt', 'Stripe API', 'WebSockets', 'Swagger / OpenAPI'],
  },
]

export const learning = ['PyTorch', 'scikit-learn', 'NumPy & pandas', 'Linear Algebra', 'Probability & Statistics']

export type Project = {
  slug: string
  name: string
  year: string
  status: 'Live' | 'Deployed'
  tag?: 'AI'
  summary: string
  bullets: string[]
  stack: string[]
  githubUrl: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'real-time-chat-service',
    name: 'Real-Time Chat Service',
    year: '2025',
    status: 'Deployed',
    summary:
      'A WebSocket chat server supporting multiple concurrent rooms, live presence tracking, and persistent message history.',
    bullets: [
      'Built a WebSocket chat server supporting multiple concurrent rooms, live presence tracking, and persistent message history in PostgreSQL',
      'Used Redis Pub/Sub to broadcast messages across server instances — enables horizontal scaling without pinning users to one server',
    ],
    stack: ['Flask', 'Flask-SocketIO', 'Redis Pub/Sub', 'PostgreSQL', 'Docker Compose'],
    githubUrl: 'https://github.com/AmanShrestha-01/Real-Time-Chat-Service',
  },
  {
    slug: 'ai-study-assistant-api',
    name: 'AI Study Assistant API',
    year: '2025',
    status: 'Deployed',
    summary:
      'Processes uploaded notes and uses Claude to generate summaries, quiz questions, and study guides.',
    bullets: [
      'Processes uploaded notes and uses Claude to generate summaries, quiz questions, and study guides; per-user rate limits to manage AI costs',
    ],
    stack: ['Flask', 'SQLAlchemy', 'Claude AI', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/AI-Powered-Study-Assistant-API',
    tag: 'AI',
  },
  {
    slug: 'e-commerce-platform',
    name: 'E-Commerce Platform',
    year: '2025',
    status: 'Deployed',
    summary:
      'A 20+ endpoint REST API covering the full purchase flow: catalog, cart, order processing, and Stripe payments.',
    bullets: [
      'Designed a 20+ endpoint REST API covering the full purchase flow: product catalog, cart management, order processing, and Stripe payments',
      'Role-based access control (customer vs. admin) with JWT auth; full Pytest suite covering auth, Stripe edge cases, and input validation',
    ],
    stack: ['Flask', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Stripe', 'Swagger', 'Pytest', 'Render'],
    githubUrl: 'https://github.com/AmanShrestha-01/E-Commerce-API',
  },
  {
    slug: 'ai-nutriplan',
    name: 'AI-NutriPlan',
    year: '2025',
    status: 'Deployed',
    summary:
      'A nutrition-tracking API where users set macro goals, log intake, and receive AI-generated meal plans via Claude.',
    bullets: [
      'Meal-tracking API where users set macro goals, log daily intake, and receive AI-generated meal plans personalized to their targets via Claude',
    ],
    stack: ['Flask', 'SQLAlchemy', 'SQLite', 'Claude AI', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/NutriPlan-AI',
    tag: 'AI',
  },
  {
    slug: 'newari-ghar',
    name: 'Newari-Ghar',
    year: '2026',
    status: 'Deployed',
    summary:
      'A full-stack restaurant site for Nepali & Indian cuisine, with a Next.js frontend and an Express backend.',
    bullets: [
      'Built the customer-facing frontend in Next.js — menu browsing, responsive layout, page routing',
      'Paired it with an Express backend serving structured menu and restaurant data',
    ],
    stack: ['Next.js', 'React', 'Express', 'Node.js'],
    githubUrl: 'https://github.com/AmanShrestha-01/Newari-Ghar',
  },
  {
    slug: 'bookmarks-rest-api',
    name: 'Bookmarks REST API',
    year: '2025',
    status: 'Live',
    summary:
      'A CRUD API with signup, Bcrypt hashing, and JWT auth — bookmarks isolated at the query level per user.',
    bullets: [
      'CRUD API with signup, Bcrypt hashing, and JWT auth — bookmarks isolated at the query level so users can only access their own data',
    ],
    stack: ['Flask', 'SQLAlchemy', 'JWT', 'Bcrypt', 'Render'],
    githubUrl: 'https://github.com/AmanShrestha-01/Bookmarks_REST_API',
    liveUrl: 'https://kaizen-bookmarks-api.onrender.com',
  },
]

export type ExperienceItem = {
  title: string
  org: string
  location: string
  period: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: 'Software Engineer',
    org: 'Self-Directed',
    location: 'Remote',
    period: 'Jan 2026 — Present',
    bullets: [
      'Building production-grade software through a structured 24-week engineering program — five backend-heavy projects architected, tested, and deployed to production',
    ],
  },
  {
    title: 'Web & Tech Support Intern',
    org: "Valentino's Restaurant",
    location: 'Baltimore, MD',
    period: 'Jun 2025 — Aug 2025',
    bullets: [
      'Maintained restaurant web systems and managed backend content via CMS',
      'Diagnosed and resolved technical issues to improve site reliability',
    ],
  },
  {
    title: 'Restaurant Tech & Web Assistant',
    org: 'Venetian Italian Eatery',
    location: 'Edgewood, MD',
    period: 'Dec 2024 — Feb 2025',
    bullets: [
      'Managed website content and structured menu/pricing data via CMS',
      'Configured Toast POS systems for order processing and payments',
    ],
  },
]

export const education = {
  school: 'Morgan State University',
  location: 'Baltimore, MD',
  degree: 'Bachelor of Science in Computer Science',
  graduation: 'May 2028',
  coursework: [
    'Data Structures & Algorithms',
    'Systems Programming (C/C++)',
    'Database Systems',
    'Computer Architecture',
    'OOP',
  ],
}
