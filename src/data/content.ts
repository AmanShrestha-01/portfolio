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
    'I like problems with a database underneath, a real user on the other end of the request, and a model in the middle that I can defend line by line.',
  bio: [
    "That's why I've spent the past year on backend architecture and, more recently, on machine learning — production APIs and trained models, all shipped from scratch and self-directed.",
    "Every one of them follows the same discipline: hashed passwords, token-based auth, input validation that actually holds up, a clean commit history, and a live deployment at the end — not a tutorial abandoned at 80%. If it's on my GitHub, it runs.",
    "Putting an LLM behind real auth, rate limits, and cost controls pulled me underneath the API call — so I went and learned what was under it. I've since built two models end to end: a fraud detector on 284,807 transactions where fraud is 0.17% of the data, served through a FastAPI endpoint, and a chess outcome predictor where the interesting work was the leakage audit, not the accuracy. What I took from both is that the hard part isn't fitting a model, it's knowing whether the number in front of you means anything. Next is PyTorch and the deep learning stack — the goal is to engineer the systems that train and serve models, not just call them.",
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
  { value: '8', label: 'Projects shipped' },
  { value: '6', label: 'Production APIs' },
  { value: '2', label: 'ML models served' },
  { value: '284k', label: 'Rows in one pipeline' },
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

export type Project = {
  slug: string
  name: string
  year: string
  status: 'Live' | 'Deployed'
  tag?: 'AI' | 'ML'
  summary: string
  bullets: string[]
  stack: string[]
  githubUrl: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'e-commerce-platform',
    name: 'E-Commerce Platform',
    year: '2025',
    status: 'Deployed',
    summary:
      'A 20+ endpoint REST API covering the full purchase flow — catalog, cart, orders, and live Stripe payments.',
    bullets: [
      'Designed a 20+ endpoint REST API covering the full purchase flow: product catalog, cart management, order processing, and Stripe payments',
      'Role-based access control (customer vs. admin) with JWT auth; full Pytest suite covering auth, Stripe edge cases, and input validation',
    ],
    stack: ['Flask', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Stripe', 'Pytest', 'Swagger', 'Render'],
    githubUrl: 'https://github.com/AmanShrestha-01/E-Commerce-API',
  },
  {
    slug: 'real-time-chat-service',
    name: 'Real-Time Chat Service',
    year: '2025',
    status: 'Deployed',
    summary:
      'A WebSocket chat server built to scale horizontally — Redis Pub/Sub fans messages out across instances.',
    bullets: [
      'Built a WebSocket chat server supporting multiple concurrent rooms, live presence tracking, and persistent message history in PostgreSQL',
      'Used Redis Pub/Sub to broadcast across server instances, so the service scales horizontally without pinning users to one server',
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
      'Turns uploaded notes into summaries, quizzes, and study guides — with per-user rate limits holding the AI spend down.',
    bullets: [
      'Processes uploaded notes and uses Claude to generate summaries, quiz questions, and study guides behind JWT auth',
      'Per-user rate limiting to keep inference costs bounded — the operational side of putting an LLM in production, not just calling one',
    ],
    stack: ['Flask', 'SQLAlchemy', 'Claude API', 'JWT', 'Swagger'],
    githubUrl: 'https://github.com/AmanShrestha-01/AI-Powered-Study-Assistant-API',
    tag: 'AI',
  },
  {
    slug: 'chess-winner-predictor',
    name: 'Chess Winner Predictor',
    year: '2026',
    status: 'Deployed',
    summary:
      'Predicts white/black/draw from pre-game information alone. 62.6% accuracy against a 49.9% baseline — and the leakage audit is the point.',
    bullets: [
      'Trained a random forest on 20k Lichess games using only pre-game features (ratings, rating difference, time control), reaching 62.6% accuracy against a 49.9% always-guess-white baseline',
      'Audited every column for data leakage and excluded four post-game fields; including them inflates accuracy to 71.8% while making the model useless on an unplayed game',
      'Swept tree depth to demonstrate overfitting directly — an unlimited tree hit 99% on training data and 57.4% on held-out games',
      'Shipped as a Gradio app with a documented notebook and plain-language reference notes',
    ],
    stack: ['scikit-learn', 'pandas', 'matplotlib', 'Gradio', 'Jupyter'],
    githubUrl: 'https://github.com/AmanShrestha-01/Chess_Winner_Predictor',
    tag: 'ML',
  },
  {
    slug: 'credit-card-fraud-detection',
    name: 'Credit Card Fraud Detection',
    year: '2026',
    status: 'Deployed',
    summary:
      'Catching fraud in 284k transactions where only 0.17% are positive — then serving the model behind a FastAPI endpoint.',
    bullets: [
      'Built an end-to-end pipeline on 284,807 transactions with a 0.17% fraud rate: stratified splitting, feature scaling, and a persisted scaler so inference matches training',
      'Random Forest with balanced class weights reached 0.96 precision and 0.76 recall on the fraud class, against a logistic regression baseline at 0.83 / 0.64 — reported per-class, since accuracy is meaningless at this imbalance',
      'Served the trained model through a FastAPI POST /predict endpoint returning a prediction and probability',
      'Compared Random Forest against a 3-layer PyTorch network on a second dataset to test where each approach actually wins',
    ],
    stack: ['scikit-learn', 'PyTorch', 'FastAPI', 'pandas', 'NumPy', 'joblib'],
    githubUrl: 'https://github.com/AmanShrestha-01/CreditCardFraudDetection_ML',
    tag: 'ML',
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
