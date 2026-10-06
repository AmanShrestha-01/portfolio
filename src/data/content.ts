export const profile = {
  name: 'Aman Shrestha',
  role: 'Software Engineer',
  tagline: 'Backend Systems · Machine Learning',
  headline: ['Aman', 'Shrestha'],
  coords: '39.34° N, 76.58° W',
  heroLine:
    'Software engineer building backends that hold up in production — and bringing the same rigor to machine learning: a baseline first, a leakage audit, and numbers I can defend.',
  location: 'Baltimore, MD',
  email: 'amanshrestha3003@gmail.com',
  github: 'https://github.com/AmanShrestha-01',
  githubHandle: 'AmanShrestha-01',
  linkedin: 'https://www.linkedin.com/in/aman-shrestha-94388326a/',
  instagram: 'https://www.instagram.com/aman.shrestha_003/',
  eduLine: 'B.S. Computer Science — Morgan State University, Class of 2028',
  pitch:
    "I build production backends in Python — real auth, real databases, deployed and running. I now build and serve machine learning models with the same standards: a baseline before a model, a leakage audit before a result, and metrics that survive contact with an imbalanced dataset.",
  manifesto:
    'I care about software that holds up — clear architecture, tested edge cases, and results I can explain line by line.',
  bio: [
    "I'm a computer science student at Morgan State University and a software engineer by practice. Over the past year I've designed, tested and deployed backends from scratch: REST APIs with authentication and payments, a real-time messaging service, and the data layers behind them.",
    "I hold every project to the same standard — hashed passwords, token-based auth, validated input, tests for the edge cases, and a working deployment at the end. The aim is always software that someone else could run, read and trust.",
    "Machine learning is where I'm investing now. I've trained and evaluated two models end to end — a credit card fraud detector and a chess outcome predictor — and the lessons that stayed with me were about rigor: set a baseline before trusting a score, and audit for leakage before believing a good one. At HopHacks 2026 I was part of the four-person team behind EmerFlow, a multi-agent system for hospital surge response. PyTorch and deep learning are next.",
    "Off the clock I'm just as serious about the chessboard, the pickleball court, and the gym — I'm chasing a specific physique the same way I chase a specific system design: deliberately, one step at a time. I sing and play guitar for the soul, think about philosophy and psychology more than is probably useful for a CS degree, and still show up for soccer whenever I can.",
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
  status: 'Open to SWE, ML & backend internships — Summer / Fall',
}

export const offClock = [
  { src: '/images/singing.webp', label: 'Melody', caption: 'Songs for the soul, not the stage.', alt: 'Aman playing acoustic guitar under a warm backlight' },
  { src: '/images/gym.webp', label: 'Gym', caption: 'Discipline, one rep at a time.', alt: 'Aman in the gym between sets' },
  { src: '/images/pickleball.webp', label: 'Pickleball', caption: 'Competitive by default.', alt: 'Aman walking up to the net on a pickleball court' },
  { src: '/images/chess.webp', label: 'Chess', caption: 'Thinking three moves ahead.', alt: 'A chessboard mid-game beside an open book of chess studies' },
  { src: '/images/soccer.webp', label: 'Soccer', caption: 'The one I never stopped playing.', alt: 'A ball on an open pitch at sunset, boots in the foreground' },
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
    { k: 'Now', v: 'scikit-learn, pandas, model evaluation' },
    { k: 'Next', v: 'PyTorch and deep learning' },
    { k: 'Built', v: 'Two models trained end to end' },
  ],
}

export type SkillCategory = {
  label: string
  items: string[]
}

export const skills: SkillCategory[] = [
  { label: 'Languages', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'SQL'] },
  { label: 'Foundations', items: ['Data Structures & Algorithms', 'Object-Oriented Design'] },
  { label: 'Frameworks', items: ['Flask', 'Flask-SocketIO', 'SQLAlchemy', 'Pytest', 'Next.js', 'React'] },
  {
    label: 'Machine Learning',
    items: ['scikit-learn', 'pandas & NumPy', 'Feature Engineering', 'Model Evaluation', 'Imbalanced Data'],
  },
  {
    label: 'LLM / AI',
    items: ['Claude API Integration', 'Prompt Design', 'Rate Limiting & Cost Control'],
  },
  { label: 'Databases', items: ['PostgreSQL', 'Redis', 'SQLite'] },
  { label: 'Infrastructure', items: ['Docker', 'Docker Compose', 'Render', 'GitHub Actions CI/CD'] },
  {
    label: 'Tools',
    items: ['Git', 'REST APIs', 'JWT Auth', 'Bcrypt', 'Stripe API', 'WebSockets', 'Swagger / OpenAPI'],
  },
]

export const learning = ['PyTorch', 'Deep Learning', 'Linear Algebra', 'Probability & Statistics', 'Model Serving']

export type ProjectArtKind = 'agents' | 'commerce' | 'model' | 'realtime' | 'board' | 'llm' | 'macros' | 'web' | 'api'

export type Project = {
  slug: string
  name: string
  year: string
  status: 'Live' | 'Deployed' | 'Hackathon' | 'Open source'
  tag?: 'AI' | 'ML' | 'Agents'
  art: ProjectArtKind
  summary: string
  details: { k: string; v: string }[]
  stack: string[]
  githubUrl: string
  liveUrl?: string
  liveLabel?: string
}

export const projects: Project[] = [
  {
    slug: 'emerflow',
    art: 'agents',
    name: 'EmerFlow',
    year: '2026',
    status: 'Hackathon',
    summary: 'A multi-agent system that decides where every patient goes when a hospital is overwhelmed.',
    details: [
      { k: 'Design', v: 'Ten department agents and a coordinator negotiate each placement. The model only proposes — code re-validates every move against live bed counts, nurse ratios and blood supply.' },
      { k: 'Result', v: 'On a seeded 25-patient surge, average time-to-bed fell from 18 minutes to 1, and all 11 planted record conflicts were caught with no false alarms.' },
      { k: 'Team', v: 'Built by four at HopHacks 2026, Johns Hopkins. One Cloud Run service, backed by 93 offline tests.' },
    ],
    stack: ['Python', 'FastAPI', 'Gemini · Vertex AI', 'Next.js', 'three.js', 'Cloud Run'],
    githubUrl: 'https://github.com/RobertxPearce/emerflow',
    liveUrl: 'https://devpost.com/software/emerflow-dpfzj4',
    liveLabel: 'Devpost',
    tag: 'Agents',
  },
  {
    slug: 'e-commerce-platform',
    art: 'commerce',
    name: 'E-Commerce Platform',
    year: '2025',
    status: 'Deployed',
    summary: 'A complete purchase backend — catalog, cart, orders and real Stripe payments.',
    details: [
      { k: 'Scope', v: 'More than 20 REST endpoints covering the whole flow, from browsing the catalog to a paid order.' },
      { k: 'Access', v: 'JWT authentication with role-based access control separating customers from admins.' },
      { k: 'Testing', v: 'A Pytest suite covering authentication, input validation and Stripe edge cases.' },
    ],
    stack: ['Flask', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Stripe', 'Pytest', 'Swagger', 'Render'],
    githubUrl: 'https://github.com/AmanShrestha-01/E-Commerce-API',
  },
  {
    slug: 'real-time-chat-service',
    art: 'realtime',
    name: 'Real-Time Chat Service',
    year: '2025',
    status: 'Deployed',
    summary: 'A WebSocket chat server designed to run as more than one instance.',
    details: [
      { k: 'Features', v: 'Multiple concurrent rooms, live presence tracking, and message history persisted in PostgreSQL.' },
      { k: 'Scaling', v: 'Redis Pub/Sub broadcasts every message across server instances, so scaling out never strands a user on the wrong server.' },
    ],
    stack: ['Flask', 'Flask-SocketIO', 'Redis Pub/Sub', 'PostgreSQL', 'Docker Compose'],
    githubUrl: 'https://github.com/AmanShrestha-01/Real-Time-Chat-Service',
  },
  {
    slug: 'credit-card-fraud-detection',
    art: 'model',
    name: 'Credit Card Fraud Detection',
    year: '2026',
    summary: 'Finding 492 fraudulent transactions among 284,807 — and serving the model that does it.',
    details: [
      { k: 'Pipeline', v: 'Stratified splitting, feature scaling, and a persisted scaler so inference matches training exactly.' },
      { k: 'Result', v: 'Random Forest with balanced class weights: 0.96 precision and 0.76 recall on fraud, against a logistic regression baseline at 0.83 / 0.64.' },
      { k: 'Serving', v: 'A FastAPI /predict endpoint returning a prediction and its probability.' },
    ],
    stack: ['scikit-learn', 'PyTorch', 'FastAPI', 'pandas', 'NumPy', 'joblib'],
    githubUrl: 'https://github.com/AmanShrestha-01/CreditCardFraudDetection_ML',
    status: 'Open source',
    tag: 'ML',
  },
  {
    slug: 'chess-winner-predictor',
    art: 'board',
    name: 'Chess Winner Predictor',
    year: '2026',
    summary: 'Predicts the winner of a chess game before the first move is played.',
    details: [
      { k: 'Result', v: '62.6% accuracy on 20,000 Lichess games using pre-game features alone, against a 49.9% baseline.' },
      { k: 'Rigor', v: 'A column-by-column leakage audit removed four post-game fields that would have inflated accuracy to 71.8% — and made the model useless on an unplayed game.' },
      { k: 'Shipped', v: 'A Gradio app with a documented notebook and plain-language reference notes.' },
    ],
    stack: ['scikit-learn', 'pandas', 'matplotlib', 'Gradio', 'Jupyter'],
    githubUrl: 'https://github.com/AmanShrestha-01/Chess_Winner_Predictor',
    status: 'Open source',
    tag: 'ML',
  },
  {
    slug: 'ai-study-assistant-api',
    art: 'llm',
    name: 'AI Study Assistant API',
    year: '2025',
    status: 'Deployed',
    summary: 'Turns lecture notes into summaries, quizzes and study guides.',
    details: [
      { k: 'Flow', v: 'Uploaded notes are processed and passed to Claude, which returns summaries, quiz questions and study guides behind JWT-authenticated endpoints.' },
      { k: 'Operations', v: 'Per-user rate limiting keeps inference costs bounded — the part of running an LLM in production that a demo skips.' },
    ],
    stack: ['Flask', 'SQLAlchemy', 'Claude API', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/AI-Powered-Study-Assistant-API',
    tag: 'AI',
  },
  {
    slug: 'ai-nutriplan',
    art: 'macros',
    name: 'AI-NutriPlan',
    year: '2025',
    status: 'Deployed',
    summary: 'A nutrition API that turns macro goals into a personalised meal plan.',
    details: [
      { k: 'Flow', v: 'Users set macro targets and log daily intake; Claude generates meal plans tailored to those targets.' },
      { k: 'API', v: 'JWT-protected endpoints, documented with Swagger.' },
    ],
    stack: ['Flask', 'SQLAlchemy', 'SQLite', 'Claude AI', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/NutriPlan-AI',
    tag: 'AI',
  },
  {
    slug: 'newari-ghar',
    art: 'web',
    name: 'Newari-Ghar',
    year: '2026',
    status: 'Deployed',
    summary: 'A full-stack restaurant site for Nepali and Indian cuisine.',
    details: [
      { k: 'Frontend', v: 'Built in Next.js — menu browsing, responsive layout and page routing.' },
      { k: 'Backend', v: 'An Express API serving structured menu and restaurant data.' },
    ],
    stack: ['Next.js', 'React', 'Express', 'Node.js'],
    githubUrl: 'https://github.com/AmanShrestha-01/Newari-Ghar',
  },
  {
    slug: 'bookmarks-rest-api',
    art: 'api',
    name: 'Bookmarks REST API',
    year: '2025',
    status: 'Live',
    summary: 'A compact CRUD API built to get authentication and data isolation right.',
    details: [
      { k: 'Auth', v: 'Signup with Bcrypt-hashed passwords and JWT authentication.' },
      { k: 'Isolation', v: "Bookmarks are filtered per user at the query level, so one account can never read another's data." },
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
      'Architected, tested and deployed eight projects end to end through a structured 24-week program — production REST APIs, a horizontally-scalable WebSocket service, and two machine learning models served behind API endpoints',
      'Work spans the full path from request to prediction: auth, databases and payments on one side; feature engineering, leakage audits and model evaluation on the other',
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
