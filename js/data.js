// Single source of truth for every portfolio direction. Facts come from the project repos and
// from what Aditya provided; nothing here is invented.
const DATA = {
  person: {
    name: "Aditya Singhal",
    first: "Aditya",
    last: "Singhal",
    role: "AI & ML undergraduate, builder",
    tagline: "Learning and building AI/ML-based projects to contribute to society.",
    school: "PES University",
    degree: "B.Tech, Artificial Intelligence & Machine Learning",
    years: "2024 – 2028",
    cgpa: "7.40 / 10 (through semester 4)",
    email: "adityasinghal.aditya33@gmail.com",
    linkedin: "https://www.linkedin.com/in/aditya-singhal-57aa87312",
    linkedinLabel: "linkedin.com/in/aditya-singhal-57aa87312",
    github: "https://github.com/Its-Aditya-Singhal",
    githubLabel: "github.com/Its-Aditya-Singhal",
    about: [
      "I'm a B.Tech student in Artificial Intelligence and Machine Learning at PES University, graduating in 2028. I learn by building, and I like problems where security, machine learning and everyday usability meet.",
      "My projects range from a post-quantum file exchange format that is deployed publicly, to a voice assistant that only answers to its owner, a privacy layer for AI chatbots, and a tool that explains how an unfamiliar codebase came to be. I've placed in the top 10 at four hackathons."
    ],
    focus: ["Applied machine learning", "Security and cryptography", "AI tooling and agents", "Full-stack products"]
  },

  stats: [
    { value: "7", label: "featured projects" },
    { value: "4×", label: "top-10 hackathon finishes" },
    { value: "3", label: "certifications" },
    { value: "2028", label: "graduating class" }
  ],

  projects: [
    {
      id: "svx",
      blurb: "An open, managed format for sending sensitive files between organisations. Files stay encrypted at rest and in transit, and open only after the recipient's own identity provider signs them in and the sender's policy allows it.",
      highlights: ["Post-quantum hybrid cryptography (ML-KEM-1024 with P-384, Ed25519 with ML-DSA-87) with no custom crypto", "Split-key design: neither the server nor the recipient can decrypt alone", "Tamper-evident: a single changed byte makes a file fail verification; expiry and revocation are enforced", "Rust core with a CLI, managed service, key agent, Tauri desktop app, and Python and Node.js SDKs"],
      name: "SVX",
      full: "Secure Verified Exchange",
      kicker: "Post-quantum encrypted file exchange",
      theme: { bg: "#16171B", panel: "#1F2127", fg: "#F3F1EC", muted: "#A9A59C", accent: "#FF6A3D" },
      context: "Personal project · Solo",
      status: "Deployed publicly at getsvx.me",
      links: [
        { label: "Live site", href: "https://getsvx.me" },
        { label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/secure-verified-exchange" }
      ],
      stack: ["Rust", "Tauri 2", "TypeScript", "PostgreSQL", "OIDC", "Docker", "Python SDK (PyO3)", "Node.js SDK (napi-rs)"],
      thesis: "An intercepted or unauthorized .svx file is cryptographically useless for revealing what it protects.",
      summary: [
        "SVX is an open, managed format for sending sensitive files between organisations: incident evidence, forensic artifacts, vulnerability reports and similar material.",
        "A .svx file is a passive, signed and encrypted container. Its contents stay encrypted while stored and while moving. The key to open it is released only after the recipient organisation's own identity provider signs the user in and the sender's policy allows it."
      ],
      steps: [
        { t: "Pack", d: "The sender packs a file with a policy, an expiry and a classification such as TLP:AMBER. It is signed with Ed25519 and ML-DSA-87 together." },
        { t: "Split the key", d: "The payload key comes from two shares. One is sealed to the managed service and one to the recipient organisation's key agent, using ML-KEM-1024 with P-384. Neither party can decrypt alone." },
        { t: "Sign in", d: "The recipient signs in through their own organisation's identity provider. The service checks policy, expiry and revocation, then issues a signed grant." },
        { t: "Release and open", d: "The key agent releases its share only with the service grant and the user's own identity token. Decryption happens locally, and every step lands in the audit trail." }
      ],
      features: [
        "Post-quantum at NIST's highest security category, with no custom cryptography: ChaCha20-Poly1305 STREAM, HPKE (RFC 9180), HKDF-SHA512",
        "Integrity before plaintext: a single flipped bit anywhere makes the file fail verification",
        "Private metadata: file names, sizes and classification live in an encrypted manifest",
        "Streaming with constant memory, so multi-gigabyte forensic images work",
        "No bypass: the CLI has no local unpack path, and expired or revoked files are refused",
        "Threat model covering threats T1 to T22, fuzz targets for the parser, and a scripted demo where an interceptor fails and an unauthorized user is denied"
      ],
      built: "A Rust workspace with a strict format parser, the crypto suite, a client library and CLI, the managed service, the key agent and OIDC validation, plus a Tauri 2 desktop app for macOS, Windows and Linux and SDKs for Python and Node.js.",
      code: "svx pack evidence.zip --sign-key acme.sign.key \\\n  --recipient example-corp --policy incident-response \\\n  --expires 2026-10-10T18:00:00Z\n\nsvx open evidence.svx   # sign in, get authorized, decrypt locally"
    },
    {
      id: "jarvis",
      blurb: "A voice-only Mac assistant in English, Hindi and Hinglish. It controls the Mac, Gmail, Google Drive and Google Calendar, and checks every request against the owner's voiceprint before acting.",
      highlights: ["Speaker verification with an ECAPA voiceprint from a 24-phrase enrolment", "Common commands handled by a pattern matcher in under a millisecond; everything else goes to the Gemini API", "On-device Whisper speech recognition and Kokoro voice", "Mail is read back and sent only after a verified \"yes\""],
      name: "Jarvis",
      full: "Voice assistant for the Mac",
      kicker: "A voice-only assistant that answers only to you",
      theme: { bg: "#06102A", panel: "#0C1A3D", fg: "#EAF1FF", muted: "#9DB0D6", accent: "#4C8DFF" },
      context: "Personal project · Solo",
      status: "macOS app for Apple Silicon",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/Jarvis" }],
      stack: ["Python", "Tauri (Rust)", "TypeScript", "Gemini API", "Whisper", "Kokoro TTS", "ECAPA voiceprint", "Silero VAD", "Google APIs"],
      thesis: "Every request is checked against your voiceprint before it reads anything or does anything.",
      summary: [
        "Jarvis listens for its name (you choose it: JARVIS, FRIDAY, anything) and does things by voice in English, Hindi or Hinglish: everyday Mac control, Gmail, Google Drive and Google Calendar, and anything else you ask in your own words.",
        "Its brain is Google's Gemini API on the free tier, so nothing heavy runs on the Mac and it can stay on all day."
      ],
      steps: [
        { t: "Wake", d: "Speech that doesn't start with the assistant's name is thrown away unheard. Whisper transcribes on the Mac." },
        { t: "Verify", d: "An ECAPA voiceprint judges every utterance. Reading data or acting needs your verified voice; a doubtful voice only gets harmless commands like \"louder\"; another voice gets nothing." },
        { t: "Route", d: "Common phrasings are matched by a pattern matcher in under a millisecond with no AI request. Anything else goes to Gemini with the full tool catalogue." },
        { t: "Act and reply", d: "It runs the tool, answers in the Kokoro voice, and keeps listening for a minute so follow-ups work without the wake word." }
      ],
      features: [
        "Voice enrollment of 24 phrases: normal, soft, loud and from a step back",
        "\"Summarize my last 10 emails\", \"what's on my calendar tomorrow?\", \"find the budget sheet in my Drive\"",
        "A mail is always read back and sent only after a \"yes\" in your verified voice, or a click",
        "Writes an AppleScript for Mac apps no tool covers, and shows it before it changes anything",
        "Keys and tokens sealed with a Keychain key; an offline mode lets only chosen services through",
        "Light by design: no local language model by default, no camera, optional local brain through Ollama"
      ],
      built: "A Python backend with a test suite and evaluation scripts for command routing and voice false accepts and rejects, a Tauri app with a TypeScript UI, and a .dmg build that GitHub Actions drafts on every version tag.",
      code: "\"Jarvis, what did Rahul mail me?\"\n→ wake word heard · voice verified · Gmail tool\n→ reads the mail back in the Kokoro voice"
    },
    {
      id: "tessera",
      blurb: "A local-first Chrome extension for ChatGPT, Claude and Gemini. It improves prompts, removes private data before it reaches a model, and moves a conversation from one assistant to another.",
      highlights: ["Prompt optimiser with clarifying questions and a word-by-word diff of the rewrite", "Detects API keys, emails, phone numbers, Aadhaar, PAN and UPI IDs and replaces them with placeholders", "Four model tiers, from rules only to an on-device model or a local Ollama server", "Chat handoff with a redacted summary and every code block kept verbatim"],
      name: "Tessera",
      full: "Local-first layer for AI chatbots",
      kicker: "Sharper prompts, scrubbed secrets, portable context",
      theme: { bg: "#120E22", panel: "#1B1631", fg: "#F1EDFF", muted: "#ABA2CC", accent: "#A98BFF" },
      context: "Personal project · Solo",
      status: "First release candidate (0.1)",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/Tessera" }],
      stack: ["TypeScript", "Chrome extension", "WebLLM (WebGPU)", "Chrome Prompt API", "Ollama", "pnpm"],
      thesis: "Rules handle everyday work; an on-device model wakes up only when it is worth it.",
      summary: [
        "Tessera is a Chrome extension that sits on ChatGPT, Claude and Gemini. It sharpens prompts, removes secrets before anything reaches a model, and carries a conversation from one assistant to another, all on your own device."
      ],
      steps: [
        { t: "Optimize", d: "It checks your prompt as you type and flags it when it looks underspecified. You get hints, one or two clarifying questions, or a rewrite with a word-by-word diff that you can import, edit or undo." },
        { t: "Protect", d: "It finds API keys, tokens, passwords, cards, emails, phone numbers, Aadhaar, PAN, UPI IDs, IFSC codes and IP addresses, and swaps them for placeholders like [EMAIL_1]." },
        { t: "Hand off", d: "It captures a chat as a summary of the goal, facts and decisions, the recent messages and every code block verbatim, redacted first. You review it and press send yourself." }
      ],
      features: [
        "Four model tiers: rules only (about 15 µs per prompt), Chrome's built-in model, WebLLM in the browser, or a local server such as Ollama",
        "The model loads only when needed and unloads after a 4-minute grace period",
        "Warns when you paste a secret into a chatbox and scrubs it in one click",
        "Site adapters for chatgpt.com, claude.ai and gemini.google.com, with a diagnostics panel that names any selector that broke",
        "Keyboard first: Alt+Shift+O opens the panel, Ctrl+Enter optimizes"
      ],
      built: "A TypeScript monorepo with the extension, a shared core of detectors and rules, and an evaluation package whose scripts produce every benchmark number.",
      code: "You type:        email the report to ravi@example.com\nThe model sees:  email the report to [EMAIL_1]"
    },
    {
      id: "archaeologist",
      blurb: "A tool that explains an unfamiliar codebase: what the code does, why it exists and how it changed over time, with every answer citing its sources.",
      highlights: ["Syntax-aware chunking with tree-sitter and hybrid retrieval (vectors, keywords and symbols)", "Links commits, pull requests and issues to the code they changed", "Knowledge graph across 10+ languages, with impact analysis and an architecture map", "FastAPI and PostgreSQL with pgvector behind a Next.js interface"],
      name: "Codebase Archaeologist",
      full: "Investigation tool for software repositories",
      kicker: "What code does, why it exists, and how it evolved",
      theme: { bg: "#17130B", panel: "#221C11", fg: "#F6EFDF", muted: "#BDAF92", accent: "#E2B04A" },
      context: "Personal project · Solo",
      status: "Phases 1–4 complete · MIT licence",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/codebase-archaeologist" }],
      stack: ["Python 3.13", "FastAPI", "Next.js 16", "React 19", "TypeScript", "PostgreSQL 17 + pgvector", "tree-sitter", "fastembed", "RAG"],
      thesis: "Every answer comes from evidence retrieved from the repository, and every source is cited.",
      summary: [
        "Codebase Archaeologist helps a developer understand an unfamiliar repository. Ask about a function and it explains what it does, who changed it, when and why, with citations you can click through to the code, commit, pull request or issue."
      ],
      steps: [
        { t: "Index", d: "Point it at a public GitHub repo, a private one with a token, or a local checkout. Only new or changed code is re-embedded on later runs." },
        { t: "Chunk", d: "tree-sitter splits code into real functions, classes and doc sections with exact line ranges, embedded locally with bge-small-en-v1.5." },
        { t: "Retrieve", d: "Hybrid retrieval combines semantic vectors, identifier-aware keyword search and symbol matching, plus commits, pull requests and issues linked together." },
        { t: "Answer", d: "A writer streams the answer with inline [S#] citations: Gemini, a no-model evidence briefing, a local model through Ollama, or Claude." }
      ],
      features: [
        "Knowledge graph of files, functions, classes, packages, commits, pull requests, issues and authors, with calls, imports and inheritance extracted from 10+ languages",
        "Impact analysis: everything that reaches the code within three hops, the tests that exercise it, files that change with it, and a change-risk verdict",
        "Evolution view to step through a function's versions with the commit, PR and issues behind each change",
        "Architecture map as a pan-and-zoom graph, sized by lines and lit by churn",
        "Agent mode that gathers evidence over several tool-using steps, shown live",
        "Saved case files with follow-up questions, and per-user accounts"
      ],
      built: "A FastAPI service in Python for ingestion, parsing and retrieval, PostgreSQL with pgvector and full-text search for both vectors and the graph, and a Next.js workspace UI.",
      code: null
    },
    {
      id: "olympics",
      blurb: "A replication and extension of a Stanford CS229 study that predicts Summer Olympic medal counts from economic data, tested against the real Tokyo 2020 results.",
      highlights: ["Dataset of 1,734 country-Games rows from Kaggle, the World Bank API and Wikipedia", "Two-stage models with rolling-origin validation", "Random Forest reached RMSE 3.07 on Tokyo 2020, against 3.68 for the naive baseline", "Showed the original paper's 2016 result does not reproduce; interactive Streamlit demo"],
      name: "Olympic Medal Prediction",
      full: "Summer Olympics medal forecasting",
      kicker: "Replicating and extending a Stanford CS229 study",
      theme: { bg: "#0A1912", panel: "#10241A", fg: "#E9F7EF", muted: "#9CC2AE", accent: "#3DD68C" },
      context: "Machine Learning course · Team of two",
      status: "Validated against the real Tokyo 2020 medal table",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/olympic-medal-prediction" }],
      stack: ["Python", "pandas", "NumPy", "scikit-learn", "SciPy", "matplotlib", "Plotly", "Streamlit", "BeautifulSoup"],
      thesis: "Given a country's GDP, population, team size and last-Games medals, how many medals will it win?",
      summary: [
        "We replicated the Stanford CS229 report \"2020 Summer Olympics Predictions Using Machine Learning\" and extended it. The paper could only test on Rio 2016 because Tokyo 2020 had not happened yet, so we also predicted Tokyo 2020 and scored the predictions against the real medal table."
      ],
      steps: [
        { t: "Build the data", d: "One row per country per Games from 1988 to 2020: 1,734 rows, 1,650 with every indicator. Sources: Kaggle athlete results, the World Bank WDI API, and Tokyo 2020 tables from Wikipedia." },
        { t: "Clean it", d: "Team events count as one medal. NOC codes map to ISO3, including historical teams such as URS and FRG, and colliding codes like BRN are mapped by hand." },
        { t: "Model", d: "A two-stage approach: a classifier predicts medal or no medal (about 60% of rows are zero), then a regressor trained on medal winners predicts the count." },
        { t: "Validate", d: "Rolling-origin validation across 2004, 2008 and 2012 instead of a single year, then a held-out test on Tokyo 2020." }
      ],
      results: {
        title: "Tokyo 2020 RMSE (medals per country, lower is better)",
        rows: [
          { label: "Same as last Games", value: 3.68 },
          { label: "Linear regression", value: 3.43 },
          { label: "Paper's protocol", value: 3.40 },
          { label: "Our Random Forest", value: 3.07, best: true }
        ]
      },
      features: [
        "Our model gets the USA within 3 medals (110 predicted vs 113) and host Japan within 8 (66 vs 58)",
        "Found that the paper's 2016 result does not reproduce: its \"actual 2016\" counts are the 2012 counts, so the reported error most likely came from training data",
        "Showed the two-stage idea helps only some regressors, such as Poisson and SVR",
        "Interactive Streamlit demo and a written report"
      ],
      built: "A reproducible Python pipeline with separate dataset, model, experiment and audit scripts, saved models, figures and a one-command run script.",
      code: null
    },
    {
      id: "scms",
      blurb: "A web application for scheduling satellite ground-station passes, leasing transponder bandwidth without conflicts, billing clients and monitoring satellite health.",
      highlights: ["BCNF MySQL schema with 14 tables, 13 triggers, 6 stored procedures and role-based access", "Row locks in a booking procedure prevent double-booking", "MongoDB time-series telemetry with anomaly detection and alert rules", "Express REST API and a React dashboard with charts"],
      name: "Satellite Communication Management System",
      full: "SCMS",
      kicker: "Ground-station passes, bandwidth leases and satellite health",
      theme: { bg: "#051820", panel: "#0A2530", fg: "#E6F8FC", muted: "#94BDC8", accent: "#2FD4EE" },
      context: "DBMS course · Team of two",
      status: "Course project",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/satellite-communication-management-system" }],
      stack: ["MySQL 8", "MongoDB", "Node.js", "Express", "React", "Vite", "Recharts"],
      thesis: "MySQL is the system of record; MongoDB holds the telemetry.",
      summary: [
        "A web application for scheduling ground-station passes, leasing transponder bandwidth without conflicts, billing clients, and monitoring satellite health in real time, with separate views for admins, operators and clients."
      ],
      steps: [
        { t: "Model the domain", d: "Satellites, orbits, ground stations, frequency bands, transponders, contracts, bookings and invoices in a BCNF schema." },
        { t: "Enforce rules in the database", d: "13 triggers, 6 stored procedures, 4 functions, a scheduled event and role-based grants. A booking procedure takes row locks so two operators can't double-book a window." },
        { t: "Stream telemetry", d: "A time-series collection in MongoDB with anomaly detection, alert rules, an event log and hourly roll-ups. A simulator injects random faults." },
        { t: "Show it", d: "An Express REST API with hand-written SQL and no ORM feeds a React dashboard with Recharts charts." }
      ],
      features: [
        "Polyglot persistence: relational data where integrity matters, documents where the schema varies per satellite",
        "14 tables, all in BCNF, with documented functional dependencies and an ER diagram",
        "A concurrency demo that shows the race with app-side checks versus row locks",
        "A demo-queries script that exercises every advanced SQL feature, including the intended rejections"
      ],
      built: "SQL scripts for schema, functions, procedures, triggers, views, events, roles and seed data; a Node.js server with scripts to build both databases and simulate telemetry; and a Vite React client.",
      code: null
    },
    {
      id: "impactecho",
      blurb: "A donation platform that makes charitable giving transparent. Donors get a verifiable record of every donation, and NGOs are vetted by an admin before they can raise money.",
      highlights: ["Automatic donor wallets, so no crypto knowledge is needed", "Donations recorded on a custom Python blockchain with verification", "NGO registration, admin approval and cause requests", "Flask backend with a Solidity crowdfunding contract built in Foundry"],
      name: "ImpactEcho",
      full: "Blockchain-backed donation platform",
      kicker: "Donations you can verify, end to end",
      theme: { bg: "#1D0A12", panel: "#2A101B", fg: "#FFEEF3", muted: "#D6A3B4", accent: "#FF5C8A" },
      context: "HackOween hackathon · Top 4 · Team of two",
      status: "Hackathon build",
      links: [{ label: "GitHub", href: "https://github.com/Its-Aditya-Singhal/ImpactEcho" }],
      stack: ["Python", "Flask", "Custom Python blockchain", "Solidity", "Foundry", "HTML", "CSS", "JavaScript"],
      thesis: "Donors should be able to see where their money went.",
      summary: [
        "ImpactEcho tackles the lack of transparency in charitable giving. Donors give to NGO causes and get a verifiable record of every transaction, NGOs are vetted before they can raise money, and an admin keeps the system honest."
      ],
      steps: [
        { t: "Donate", d: "Donors register with an email and password and get a wallet created automatically, so they need no crypto knowledge. They donate in INR and get receipts." },
        { t: "Record", d: "Every donation is written to a custom Python blockchain with wallets, mining, a block explorer and chain verification." },
        { t: "Onboard NGOs", d: "NGOs register, an admin approves them, they create credentials, then request funding for causes and receive notifications." },
        { t: "Oversee", d: "Admins approve NGOs and causes, handle deletion requests and track blockchain activity." }
      ],
      features: [
        "57 Flask routes across donor, NGO and admin flows",
        "Foundry project with a Solidity crowdfunding contract and price conversion",
        "In-page chatbot for donors",
        "Runtime data and keys kept out of the repository"
      ],
      built: "A Flask backend with the ledger and wallet modules, HTML, CSS and JavaScript templates, and a separate Foundry workspace for the smart contract.",
      code: null
    }
  ],

  more: [
    { name: "PES-VCS", d: "A version control system built from scratch in C for an operating systems lab: content-addressed objects, an index, trees and commits.", tag: "C · OS course", href: "https://github.com/Its-Aditya-Singhal/PES1UG24AM420-pes-vcs" },
    { name: "Fruit Catcher", d: "A Pygame catch-and-dodge game: found and fixed a deliberate bug and added new features.", tag: "Python · Pygame", href: "https://github.com/Its-Aditya-Singhal/64_fruit_catcher" },
    { name: "Model API", d: "A small Flask service that applies a fitted feature scaler to input data, deployed on Render.", tag: "Python · Flask", href: "https://github.com/Its-Aditya-Singhal/model-api" },
    { name: "Distance measuring system", d: "Ultrasonic distance measurement on an Arduino UNO.", tag: "Arduino", href: null },
    { name: "LED control system", d: "Programmable LED patterns driven from an Arduino.", tag: "Arduino", href: null },
    { name: "Ticket management system", d: "A working ticket booking and management system in Python.", tag: "Python", href: null },
    { name: "Tic Tac Toe", d: "A two-player game in Python.", tag: "Python", href: null }
  ],

  skills: [
    { group: "Languages", items: ["C", "Python", "Java", "JavaScript", "TypeScript", "Rust", "SQL", "HTML", "CSS"] },
    { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Express", "Flask", "FastAPI", "Flutter", "Tailwind CSS", "Tauri", "Streamlit"] },
    { group: "AI and data", items: ["scikit-learn", "pandas", "NumPy", "RAG", "pgvector", "Gemini API", "Whisper"] },
    { group: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL"] },
    { group: "Tools", items: ["Git", "GitHub", "Docker", "Linux", "Render"] },
    { group: "Hardware", items: ["Arduino", "ESP8266 (NodeMCU)"] }
  ],

  achievements: [
    { t: "Top 10 in four hackathons", d: "Placed in the top 10 at four separate hackathons." },
    { t: "HackOween · Top 4", d: "Built ImpactEcho, a blockchain-backed donation platform." },
    { t: "Code of Honor · Top 10", d: "Hackathon finish in the top 10." }
  ],

  certifications: [
    { t: "Quantum Computing", by: "PES University", y: "2025" },
    { t: "Ethical Hacking", by: "GUVI", y: "2022" },
    { t: "Dark Web", by: "GUVI", y: "2022" }
  ],

  courses: ["Data Structures and Algorithms", "Design and Analysis of Algorithms", "Operating Systems", "Database Management Systems", "Machine Learning", "Software Engineering", "System Design", "Microprocessor and Computer Architecture", "Digital Design and Computer Organization", "Web Technologies", "Agent Ops", "Prompt Engineering"],

  clubs: [
    { t: "Samarpana Club", d: "Media domain as video editor, Operations domain and Event Management domain" },
    { t: "TAMS event", d: "Core team, Event Management (EVM)" },
    { t: "Ninada Music Club", d: "Logistics domain" },
    { t: "Alcoding Club", d: "Technical domain" }
  ],

  soft: ["Problem-solving", "Creativity", "Teamwork", "Time management", "Active listening"]
};
