export const profile = {
  name: 'Aman Shrestha',
  role: 'Software Engineer',
  tagline: 'Backend Systems · Machine Learning',
  headline: ['Aman', 'Shrestha'],
  coords: '39.34° N, 76.58° W',
  heroLine:
    "Software engineer. I build backends that hold up in production, and I bring the same discipline to machine learning — baselines, leakage audits, and honest numbers.",
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
    "I build production backends in Python — real auth, real databases, deployed and running. I now build and serve machine learning models with the same standards: a baseline before a model, a leakage audit before a result, and metrics that survive contact with an imbalanced dataset.",
  manifesto:
    'Clean architecture, solid backends, real users on the other end of the request — and now a model in the middle that I can explain line by line.',
  bio: [
    "I'm a software engineer first. Over the past year I've designed, tested and shipped production backends from scratch — REST APIs with real authentication, payments, real-time messaging, and databases built to hold up under real use.",
    "Every project follows the same discipline: hashed passwords, token-based auth, input validation that actually holds up, tests for the edge cases, and a working deployment at the end. If it's on my GitHub, it runs.",
    "Right now I'm learning machine learning — and learning it properly. I've trained my first models end to end, a chess outcome predictor and a credit card fraud detector, and learned to set a baseline before trusting a score and to catch data leakage before it flatters one. At HopHacks 2026 I helped build EmerFlow, a multi-agent AI system for hospitals. PyTorch and deep learning are next.",
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

export type ProjectArtKind = 'agents' | 'model' | 'realtime' | 'board' | 'llm' | 'web' | 'api'

export type Project = {
  slug: string
  name: string
  year: string
  status: 'Live' | 'Deployed' | 'Hackathon' | 'Open source'
  tag?: 'AI' | 'ML' | 'Agents'
  art: ProjectArtKind
  summary: string
  bullets: string[]
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
    summary:
      'Built at HopHacks 2026: when a mass-casualty surge hits, eleven AI agents negotiate where every patient goes — code enforces every hard rule, and a human signs off on the big moves.',
    bullets: [
      'Ten Gemini department agents and a coordinator negotiate patient placement each round, answering in structured JSON behind per-call timeouts and a circuit breaker',
      'The model proposes and never writes: every move is re-validated in code against live bed counts, nurse ratios and blood supply, so a hallucinated bed becomes a rejected move — not a misplaced patient',
      'On a seeded 25-patient surge, coordination cut average time-to-bed from 18 minutes to 1, and the records check flagged 11 of 11 planted conflicts with no false alarms',
      'Four-person team build — FastAPI, Next.js, a live EMS capacity map, one Cloud Run service, and 93 offline tests',
    ],
    stack: ['Python', 'FastAPI', 'Gemini · Vertex AI', 'Next.js', 'three.js', 'Cloud Run'],
    githubUrl: 'https://github.com/RobertxPearce/emerflow',
    liveUrl: 'https://devpost.com/software/emerflow-dpfzj4',
    liveLabel: 'Devpost',
    tag: 'Agents',
  },
  {
    slug: 'e-commerce-platform',
    art: 'api',
    name: 'E-Commerce Platform',
    year: '2025',
    status: 'Deployed',
    summary:
      'The full purchase flow behind 20+ endpoints — catalog, cart, orders and real Stripe payments, with the test suite to prove the edge cases hold.',
    bullets: [
      'Designed a 20+ endpoint REST API covering the full purchase flow: product catalog, cart management, order processing, and Stripe payments',
      'Role-based access control (customer vs. admin) with JWT auth; full Pytest suite covering auth, Stripe edge cases, and input validation',
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
    summary:
      'A chat server that survives being run twice — Redis Pub/Sub fans messages across instances, so scaling out never strands a user on the wrong server.',
    bullets: [
      'Built a WebSocket chat server supporting multiple concurrent rooms, live presence tracking, and persistent message history in PostgreSQL',
      'Used Redis Pub/Sub to broadcast across server instances, so the service scales horizontally without pinning users to one server',
    ],
    stack: ['Flask', 'Flask-SocketIO', 'Redis Pub/Sub', 'PostgreSQL', 'Docker Compose'],
    githubUrl: 'https://github.com/AmanShrestha-01/Real-Time-Chat-Service',
  },
  {
    slug: 'credit-card-fraud-detection',
    art: 'model',
    name: 'Credit Card Fraud Detection',
    year: '2026',
    summary:
      'Finding 492 fraudulent transactions hidden in 284,807 — then putting the model behind a FastAPI endpoint that scores new ones.',
    bullets: [
      'Built an end-to-end pipeline on 284,807 transactions with a 0.17% fraud rate: stratified splitting, feature scaling, and a persisted scaler so inference matches training',
      'Random Forest with balanced class weights reached 0.96 precision and 0.76 recall on the fraud class, against a logistic regression baseline at 0.83 / 0.64 — reported per-class, since accuracy is meaningless at this imbalance',
      'Served the trained model through a FastAPI POST /predict endpoint returning a prediction and probability',
      'Compared Random Forest against a 3-layer PyTorch network on a second dataset to test where each approach actually wins',
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
    summary:
      'Calls the winner before a single move is played. 62.6% against a 49.9% baseline — and the leakage audit that got there is the real work.',
    bullets: [
      'Trained a random forest on 20k Lichess games using only pre-game features (ratings, rating difference, time control), reaching 62.6% accuracy against a 49.9% always-guess-white baseline',
      'Audited every column for data leakage and excluded four post-game fields; including them inflates accuracy to 71.8% while making the model useless on an unplayed game',
      'Swept tree depth to demonstrate overfitting directly — an unlimited tree hit 99% on training data and 57.4% on held-out games',
      'Shipped as a Gradio app with a documented notebook and plain-language reference notes',
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
    summary:
      'Turns a pile of lecture notes into summaries, quizzes and study guides — with per-user rate limits keeping the inference bill from being the interesting part.',
    bullets: [
      'Processes uploaded notes and uses Claude to generate summaries, quiz questions, and study guides behind JWT auth',
      'Per-user rate limiting to keep inference costs bounded — the operational side of putting an LLM in production, not just calling one',
    ],
    stack: ['Flask', 'SQLAlchemy', 'Claude API', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/AI-Powered-Study-Assistant-API',
    tag: 'AI',
  },
  {
    slug: 'ai-nutriplan',
    art: 'llm',
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
    art: 'web',
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
    art: 'api',
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
