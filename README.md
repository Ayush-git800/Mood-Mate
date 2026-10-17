# 🌿 MoodMate — Your Everyday Happiness & Mental Reset Hub

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.8_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> Built for the Global Hackathon Theme: **"Building for Human Happiness & Connection"**

---

## 🌟 Executive Summary

**MoodMate** is a production-grade, human-crafted emotional wellness and mental reset web application. 

Most conventional mental health apps are clinical, sterile, and punitive—guilt-tripping users when they break a streak or treating sadness like an error. **MoodMate completely reimagines emotional tracking**:

1. **Emotions as Weather**: Feelings are natural atmospheric shifts, not bugs to fix.
2. **Tactile & Expressive**: 8 responsive mood buttons trigger bespoke atmospheric particle explosions (fireworks that cool into green leaves, floating rain droplets, gold star showers).
3. **Genuine Intelligence**: Powered by **Lumi 🌿**, an empathetic AI companion backed by **Google Gemini 3.8 Flash** with true multi-turn context retention, Markdown syntax highlighting, and coding capabilities (C++, Python, JS).
4. **Zero-Knowledge Privacy**: 100% client-isolated local storage (`localStorage`). No private journals or feelings are sold or stored on external database servers.
5. **Gamified Kindness Economy**: Non-judgmental "Growth Coins" earned by completing somatic micro-tasks, 4-7-8 breathing pacers, and sending virtual hugs on a communal corkboard.

---

## 🏗️ System Architecture

```text
                               ┌──────────────────────────────────────────────────┐
                               │                 User Browser                     │
                               │                                                  │
                               │   ┌──────────────────────────────────────────┐   │
                               │   │          React 18 SPA (Vite)             │   │
                               │   │                                          │   │
                               │   │   [Navbar]  [Landing]  [AuthGateway]     │   │
                               │   │   [CheckIn] [Analytics] [Wallet]         │   │
                               │   │   [LumiChat] [Breathe]  [Community]      │   │
                               │   └────────────────────┬─────────────────────┘   │
                               │                        │                         │
                               │                        ▼                         │
                               │   ┌──────────────────────────────────────────┐   │
                               │   │          Global State Context            │   │
                               │   │    AuthContext   MoodContext   Wallet    │   │
                               │   └────────────────────┬─────────────────────┘   │
                               │                        │                         │
                               │                        ▼                         │
                               │   ┌──────────────────────────────────────────┐   │
                               │   │        Client-Side LocalStorage          │   │
                               │   │     moodmate_users  moodmate_data_<uid>  │   │
                               │   └──────────────────────────────────────────┘   │
                               └────────────────────────┬─────────────────────────┘
                                                        │
                         ┌──────────────────────────────┴──────────────────────────────┐
                         │                                                             │
                         ▼                                                             ▼
         ┌──────────────────────────────┐                              ┌──────────────────────────────┐
         │   Local / Cloud API Proxy    │                              │   Client-Direct AI Fallback  │
         │  /api/chat (Vite / Vercel)   │                              │    (Browser Fetch Fallback)  │
         └──────────────┬───────────────┘                              └──────────────┬───────────────┘
                        │                                                             │
                        └──────────────────────────────┬──────────────────────────────┘
                                                       │
                                                       ▼
                                     ┌───────────────────────────────────┐
                                     │     Google Gemini REST API        │
                                     │       (gemini-3.8-flash)          │
                                     │  • Multi-Turn Alternation         │
                                     │  • Empathetic System Instruction  │
                                     │  • Technical & Coding Engine      │
                                     └───────────────────────────────────┘
```

---

## 🚀 Core Features & Innovation Pillars

### 1. 🔐 Authentic Multi-User Auth Gateway (`/login` & `/signup`)
- **Zero-Leak User Partitioning**: Data is isolated under `moodmate_users` and `moodmate_data_<userId>`.
- **True Blank Canvas**: Brand new accounts start with **0 days logged**, 0 coins, and an encouraging empty graph: *"Your emotional canvas is waiting for its first check-in! 🎨"*.
- **6 Illustrated Avatars**: `🌱 Gentle Sprout`, `🦊 Curious Fox`, `🌸 Calm Lotus`, `✨ Cosmic Star`, `🦉 Wise Owl`, `☀️ Warm Sun`.
- **Judges Demo Switch**: One-click **"Load Demo Profile"** toggle on the gateway, graph, and footer that instantly populates 14 days of realistic logs, 160 coins, and a 5-day streak for live hackathon evaluation.

### 2. 🌿 Lumi AI Companion — Powered by Google Gemini 3.8 Flash (`/lumi`)
- **Zero Mock / Canned Responses**: Direct integration with Google's state-of-the-art `gemini-3.8-flash` model.
- **Dual-Capability Intelligence**:
  - **Emotional Wellbeing & Grounding**: Active listening, stress de-escalation, and somatic 5-4-3-2-1 sensory grounding.
  - **Technical & Academic Reasoning**: Capable of writing, debugging, and explaining code (C++, Python, JavaScript), explaining algorithms, and solving academic problems.
- **Multi-Turn Context Retention**: Remembers previous turns (e.g., asking for a C++ reverse-string algorithm, then saying *"Explain that line by line"*).
- **Custom Markdown Renderer**: Dark terminal syntax boxes with language headers and a one-click **Copy Code** button.
- **Resilient Dual-Mode Bridge**: Vite dev proxy + cloud serverless function + browser-direct fallback.

### 3. 🎆 Tactile 8-Mood Sanctuary & Dynamic Pop-Outs (`/checkin`)
Selecting any mood triggers a dynamic atmospheric background tint and a distinct Framer Motion / Canvas Confetti particle explosion:
- 😊 **Happy**: Gold sparkle stars and floating yellow hearts.
- 😢 **Sad**: Soft floating rain droplets with gentle ripples.
- 😰 **Stressed**: Exhaling vapor cloud animation that expands and dissipates tension.
- 😴 **Tired**: Glowing crescent moon and purple "Zzz" drifting upward.
- 😠 **Angry**: Firework sparks that cool down into calming green leaves.
- 😐 **Bored**: Pop of colorful bouncing geometric confetti.
- 😟 **Anxious**: Grounding glowing circle that expands and anchors downward.
- 🤩 **Excited**: High-energy multi-color confetti fountain with party poppers.
- **Happiness Pack**: Curated lighthearted joke, grounding quote, and 30-second micro-challenge.
- **Tailored Micro-Tasks**: 3 clickable tasks per mood with strike-through animations that award **+15 🟣 Growth Coins**.
- **Curated YouTube Soundscapes**: Handpicked frequency tracks per mood (Lofi cafe, Delta sleep waves, 432Hz deep focus, Solfeggio 528Hz vagus nerve reset) with in-app audio/video cards.

### 4. 📊 The Joyful Mood Graph (`/analytics`)
- **7-Day Vertical Energy Pillars**: Monday through Sunday columns with rounded pill bars scaled to emotional energy (1 to 8).
- **Dynamic Mood Coloring**: Bars colored to match the logged emotion (Amber for joy, Emerald for calm, Indigo for sad, Violet for tired, Rose for stressed).
- **Interactive Tooltips**: Hover or tap any pillar to view the Day, Mood Emoji, Energy Level, and personal reflection note.
- **Weekly Joy Index**: Automatic metric badge (e.g., *"78% Positive Energy this week"*).
- **Monthly Calendar Grid**: 30-day interactive overview with mood stamps.

### 5. 🌬️ Zen Breathing Sanctuary (`/breathe`)
- Interactive **4-7-8 Somatic Breathing Pacer** with animated breathing pacers powered by Framer Motion.
- Guides users through: Inhale (4s) ➔ Hold (7s) ➔ Exhale (8s).
- Awards **+20 🟢 Calm Coins** upon completion with singing bowl audio feedback.

### 6. 💌 Kindness Corkboard & Coin Wallet (`/community` & `/wallet`)
- **Kindness Wall**: Post anonymous supportive sticky notes, read uplifting peer encouragement, and click **"Send a Virtual Hug 🫂"** to trigger celebratory floating hearts.
- **Growth Coin Economy**: Non-punitive currency ledger tracking **Calm Coins**, **Happy Coins**, and **Growth Coins**. Redeemable for soundscapes, forest restoration tokens, and streak shields.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3.1 | Component-based interactive UI with instantaneous state updates |
| **Build & Tooling** | Vite 6.1.0 | Lightning-fast HMR and optimized production bundle |
| **Styling & Design** | Tailwind CSS 3.4.17 | Custom sand/sage nature palette, responsive design, dark mode |
| **AI Engine** | Google Gemini 3.8 Flash | Live multi-turn conversational reasoning, grounding, and code synthesis |
| **Animation & Physics** | Framer Motion 12.38 | Page transitions, breathing circle pacers, tactile mood pops |
| **Particle Effects** | Canvas Confetti 1.9.4 | Custom confetti explosions and milestone celebrations |
| **Icons** | Lucide React 1.16.0 | Modern, clean vector iconography |
| **Audio Synthesis** | Web Audio API | Client-side synthesized Tibetan singing bowl frequencies |
| **Data Persistence** | HTML5 LocalStorage | Client-side isolated storage without external database overhead |
| **Routing** | React Router DOM 6.29 | Client-side routing with clean URL architecture |

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Ayush-git800/Mood-Mate.git
cd Mood-Mate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Gemini API Key
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)).*

> **Note**: You can also enter your Gemini key directly in the live app UI by clicking the 🔑 **Setup API Key** button in the Lumi Chat header!

### 4. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 5. Build for Production
```bash
npm run build
```
Generates an optimized static build in `dist/` in ~1.0 second.

---

## 🌐 Deployment Guide

### Deploying to Netlify (Drag & Drop — 30 Seconds)
1. Run `npm run build` to generate the production bundle.
2. Go to **[Netlify App](https://app.netlify.com)** and log in.
3. Drag and drop the **`dist`** folder into the Netlify manual deploy zone.
4. Your site is live!

### Deploying to Vercel (Recommended via GitHub)
1. Push your code to GitHub.
2. Go to **[Vercel](https://vercel.com)** ➔ Click **Add New Project** ➔ Import `Mood-Mate`.
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini API key.
4. Click **Deploy**. Both the client app and `/api/chat` serverless functions will be deployed automatically!

---

## ⏱️ 2-Minute Live Demo Script (For Hackathon Judges)

| Time | Stage | Action & What to Show |
| :--- | :--- | :--- |
| **0:00 – 0:25** | **Auth Barrier & Fresh Onboarding** | Open `/login`. Highlight the 3 modes: *Create Account*, *Sign In*, and *Explore as Guest*. Point out the 6 friendly illustrated avatars. Click **Explore as Guest** to show that a real new user starts with **0 logs** and an empty canvas. Then click **"Load Demo Profile"** to load 14 days of realistic judge data. |
| **0:25 – 0:50** | **Tactile Sanctuary & Particle Pop-Outs** | Navigate to `/checkin`. Tap 😊 **Happy** to trigger the shower of golden sparkle stars and yellow hearts! Then tap 😰 **Stressed** to show the exhaling vapor mist. Check off one of the **Tailored Micro-Tasks** to earn **+15 🟣 Growth Coins**. Click **"Listen"** on the curated YouTube soundscape card. Log a note and hit **"Complete Check-In"**. |
| **0:50 – 1:15** | **The Joyful Bar Graph** | Open `/analytics`. Admire the **7-Day Vertical Bar Chart** with rounded colored pill bars. Tap on Wednesday to view the interactive tooltip with the mood stamp and journal note. Point out the **Weekly Joy Index** metric and the 30-Day Calendar. |
| **1:15 – 1:40** | **Lumi AI 🌿 (Gemini 3.8 Flash)** | Open `/lumi`. Click the **💻 C++ String Reverse** prompt chip. Show how Lumi generates working C++ code in a formatted dark code box with a **Copy Code** button. Then type: *"Explain how that works line by line"*, proving true multi-turn context memory. |
| **1:40 – 2:00** | **Kindness Wall & Rewards Hub** | Hop into `/community` and click **"Send a Virtual Hug 🫂"** to see floating heart confetti. Show the Rewards Hub `/wallet` with the 3 coin pools. Conclude: *"MoodMate provides a complete, human-first emotional ecosystem—private, multi-user, and built for genuine connection."* |

---

## 🔒 Privacy & Security Architecture

- **Zero Third-Party Trackers**: No analytics or tracking scripts are embedded.
- **Client-Side Partitioned Storage**: Private journal notes and check-in history never leave the user's browser without explicit consent.
- **Server-Side API Key Shielding**: `GEMINI_API_KEY` is loaded through server-side environment variables and proxy endpoints, preventing exposure in client-side bundles.
- **Sanitized Markdown**: All AI output is sanitized before rendering to prevent cross-site scripting (XSS).

---

## 👥 Hackathon Team & Acknowledgments

- **Team Name**: **Version Controllers** 🚀
- **Team Members**:
  - **Ayush Chauhan** ([@Ayush-git800](https://github.com/Ayush-git800))
  - **Rishav Ranjan**
- **Hackathon Theme**: *Building for Human Happiness & Connection*
- **Special Thanks**: Google Gemini AI Team, Vite Team, Tailwind Labs, and the React open-source ecosystem.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
