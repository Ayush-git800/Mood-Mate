# 🌿 MoodMate: Complete Project Guide & Interview Cheat Sheet
> **For Developers Transitioning from Basic HTML & CSS to Modern React**
> *Read this guide before your hackathon presentation or project viva. It explains every piece of the project in simple, clear concepts.*

---

## 🌟 1. Project Overview in 30 Seconds

- **Project Name**: MoodMate — Your Everyday Happiness & Mental Reset Hub
- **Team**: **Version Controllers** ([Ayush Chauhan](https://github.com/Ayush-git800) & [Rishav Ranjan](https://github.com/rishavgiri1106-dotcom))
- **Theme**: "Building for Human Happiness & Connection"
- **What it does**: A mental wellness and emotional companion web app where users can track daily feelings (8 distinct moods), reflect with tailored micro-tasks and soundscapes, view weekly energy graphs, earn gamified "Growth Coins", practice 4-7-8 breathing, and chat with an empathetic, multi-turn AI companion (**Lumi 🌿**, powered by Google Gemini).
- **Core Philosophy**: Non-punitive, non-clinical, and compassionate. Emotional ups and downs are treated like natural weather, not bugs to be fixed.

---

## 🛠️ 2. The Tech Stack (Explained for HTML/CSS Developers)

If a judge asks: *"What technologies did you use to build this?"*, here is how you explain each tool:

| Technology | What it is in simple terms | Why we used it instead of plain HTML/CSS |
| :--- | :--- | :--- |
| **React 18** | A JavaScript library for building user interfaces with reusable "components" (like custom HTML tags). | In plain HTML, if you want a button on 5 pages, you copy-paste it 5 times. In React, you make `<Button />` once and reuse it everywhere. When data changes (like your mood or coin balance), React instantly updates only that part of the screen without refreshing the whole page. |
| **Vite** | The ultra-fast build tool and local development server. | Instead of opening `index.html` directly in the browser, Vite runs a local server (`http://localhost:5173`) that updates the browser instantly whenever you edit code (called "Hot Module Replacement"). |
| **Tailwind CSS** | A utility-first CSS framework. | Instead of writing a separate `style.css` file with custom class names, you write pre-made utility classes directly on HTML elements (e.g. `bg-emerald-500 text-white rounded-xl p-4 shadow-md`). It keeps styling clean, consistent, and fast to build. |
| **React Router v6** | The navigation manager for multi-page web apps. | In traditional HTML, clicking a link loads a new `.html` file from the server. React Router changes what appears on screen instantly without any page reload (called a **Single Page Application** or SPA). |
| **Google Gemini AI (`gemini-3.8-flash`)** | Google's official Large Language Model API. | Powers Lumi 🌿. It gives real, intelligent, empathetic answers, retains memory across follow-up questions, and can write and debug code (C++, JS, Python) or answer general science and study questions. |
| **Framer Motion** | A production animation library for React. | Powers smooth page transitions, tactile button pops, and the breathing circle pacer. |
| **Canvas Confetti** | A lightweight particle effects engine. | Celebrates task completions, virtual hugs, and mood selections with colorful bursts and sparkles. |
| **Lucide React** | Modern, clean vector icon set. | Provides crisp icons (`Send`, `Heart`, `Smile`, `Sparkles`, `Terminal`, `Wallet`, etc.). |
| **LocalStorage** | Browser-native permanent storage. | Allows user profiles, check-ins, journal notes, and coins to stay saved on the user's laptop even after closing or restarting the browser—without needing a paid SQL database. |

---

## 📂 3. Folder Structure (What lives where?)

```text
Mood Mate/
├── index.html              # The single HTML entry point of the entire website
├── package.json            # Lists all project dependencies and npm scripts
├── vite.config.js          # Vite configuration & dev-server backend API proxy
├── vercel.json             # Deployment routing configuration for Vercel
├── .env                    # Stores secret keys (e.g. GEMINI_API_KEY)
│
├── api/                    # Vercel Serverless Functions
│   ├── chat.js             # Handles /api/chat when deployed to the cloud
│   └── health.js           # Handles /api/health connectivity checks
│
├── server/
│   └── chatHandler.js      # Formats Gemini multi-turn messages & calls Google API
│
└── src/
    ├── main.jsx            # Mounts React into index.html (<div id="root">)
    ├── App.jsx             # Defines all page routes (/checkin, /analytics, /lumi, etc.)
    ├── index.css           # Global Tailwind CSS directives & color palettes
    │
    ├── context/            # Global Data Hubs (accessible by any page)
    │   ├── AuthContext.jsx # Handles user login, signup, avatar, and active session
    │   ├── MoodContext.jsx # Stores 14-day mood history & check-in submissions
    │   └── WalletContext.jsx # Tracks Calm, Happy, and Growth Coins
    │
    ├── components/         # Reusable UI Blocks
    │   ├── Navbar.jsx      # Top header with live coin balances & streak
    │   ├── Footer.jsx      # Bottom links & demo data reset
    │   ├── LumiChat.jsx    # The full Gemini AI companion chat window
    │   ├── MarkdownRenderer.jsx # Renders code snippets, copy button, & bold text
    │   └── UserProfileModal.jsx # Avatar & goal editor modal
    │
    └── pages/              # The Full Screen Views
        ├── LandingPage.jsx   # Public landing page (/)
        ├── AuthGateway.jsx   # Login & Signup screen (/login)
        ├── CheckInPage.jsx   # 8-Mood tactile check-in & micro-tasks (/checkin)
        ├── AnalyticsPage.jsx # The Joyful Bar Graph (/analytics)
        ├── WalletPage.jsx    # Growth Coin rewards ledger (/wallet)
        ├── BreathePage.jsx   # 4-7-8 Zen Breathing Sanctuary (/breathe)
        └── CommunityPage.jsx # Kindness Wall & Virtual Hugs (/community)
```

---

## 🧠 4. How the Features Actually Work (Behind the Scenes)

### A. How Does Data Save Without a Database? (LocalStorage)
- In plain HTML/CSS, if you refresh the page, your typed inputs disappear.
- MoodMate uses the browser's built-in **`localStorage`**:
  * When you register, your profile is stored under `moodmate_users`.
  * Your journal and check-ins are saved under `moodmate_data_<userId>`.
  * Because it is partitioned by user ID, multiple people can test on the same computer without mixing up their logs!
  * For judges, we built a **"Load Demo Profile"** toggle that pre-populates 14 days of realistic logs in 1 click.

### B. How Does Lumi AI 🌿 Work?
1. The user types a message in `<LumiChat />`.
2. The frontend sends:
   - The new message
   - The previous conversation history (for multi-turn memory)
   - The user's name and current mood
3. It calls `/api/chat`.
4. `server/chatHandler.js` takes that history and formats it into Google Gemini's required structure:
   - Must start with `user`
   - Must strictly alternate `user` -> `model` -> `user`
   - Attaches a **System Instruction** telling Gemini it is Lumi, an empathetic wellness companion that can also answer any technical/coding question.
5. Gemini (`gemini-3.8-flash`) generates the response and sends it back.
6. `MarkdownRenderer.jsx` reads the response. If Lumi wrote code (e.g. C++), it draws a stylish dark terminal box with a working **"Copy"** button!
7. If the server ever has network trouble, Lumi automatically falls back to calling Gemini directly from the user's browser so it never breaks.

### C. How Does the Joyful Bar Graph Work?
- Located in `src/pages/AnalyticsPage.jsx`.
- It reads the 7 days of the current week (Monday through Sunday).
- For each day, it calculates an emotional energy score from **1 to 8**:
  * Happy / Excited = high energy (7–8)
  * Thoughtful / Calm = steady energy (5–6)
  * Tired / Bored = low energy (3–4)
  * Stressed / Sad = gentle dip (2–3)
- It renders rounded vertical pillars colored dynamically by the mood's palette, with an interactive tooltip showing your journal note when hovered or tapped.

### D. How Does the Coin Economy Work?
- Users earn:
  * **+20 Calm Coins** for completing a 4-7-8 breathing session.
  * **+15 Growth Coins** for completing daily micro-tasks.
  * **+10 Happy Coins** for checking in and sending virtual hugs on the Kindness Wall.
- Coins can be redeemed in `/wallet` for digital rewards (guided soundscapes, forest donation tokens, streak freezes).

---

## 🎤 5. Common Judge & Viva Questions (With Ready-Made Answers)

#### Q1: "Why did you build MoodMate instead of just using a standard mood tracker like Daylio?"
> **Answer**: *"Most mood trackers are clinical, punitive (making you feel guilty if you break a streak), and treat sadness or stress like failures. MoodMate treats emotions like natural weather. It pairs tactile check-ins with somatic grounding (like the 4-7-8 breath pacer), micro-actions, and an intelligent AI companion (Lumi) that can help students de-escalate anxiety while also assisting them with college study and coding deadlines."*

#### Q2: "Is the AI companion real or are the responses hardcoded?"
> **Answer**: *"Lumi is powered by a live integration with Google's official Gemini 3.8 Flash model. It has true multi-turn context retention—meaning you can ask it to write a C++ algorithm and then say 'explain how line 4 works', and it will remember. We also built custom Markdown rendering with one-click code copying and a dual-mode API bridge that works both server-side and browser-direct."*

#### Q3: "How does the app protect user privacy?"
> **Answer**: *"MoodMate runs on a zero-leak local architecture. All personal reflections, mood logs, and credentials stay isolated inside the user's own browser storage (`localStorage`). No private journal entries are stored on third-party tracking databases."*

#### Q4: "What was the most challenging technical part of the project?"
> **Answer**: *"Architecting the multi-turn Gemini conversation handler. Gemini's API strictly requires alternating turns starting with the user, so we wrote an intelligent normalizer in `server/chatHandler.js` that merges consecutive same-role messages, trims older history to prevent token overflows, and injects somatic empathy prompts while preserving technical reasoning capabilities."*

---

## 🏆 6. Presentation Checklist Before You Present

- [ ] Dev server running (`npm run dev`) or live link open.
- [ ] Browser window open to `http://localhost:5173`.
- [ ] If using a fresh account, click **"Load Demo Profile"** so the Joyful Bar Graph has colorful data to show judges.
- [ ] Test 1 prompt ready in Lumi chat: Click the **💻 C++ String Reverse** chip to demonstrate real AI speed.
- [ ] Test 2 prompt ready: Say *"Explain that line by line"* to prove multi-turn context retention.
- [ ] Click a mood on `/checkin` to showcase the particle explosion.
- [ ] Show the 4-7-8 Breathing Sanctuary (`/breathe`) for the human happiness theme connection.
