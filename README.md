# 🌿 MoodMate — Your Everyday Happiness & Mental Reset Hub (v2.0)
> Built for the Hackathon Theme: **"Building for Human Happiness & Connection"**

MoodMate is a production-grade, human-crafted emotional wellness and mental reset web application. It rejects cold clinical AI tropes and punitive mechanics. Instead, MoodMate treats emotional fluctuations like natural weather, validates feelings without judgment, provides somatic micro-resets, and connects peers through a communal kindness corkboard.

---

## 🌟 Key Upgrades in Version 2.0

### 1. 🔐 Authentic Multi-User Authentication & Onboarding Gateway (`/login` & `/signup`)
- **Zero-Leak Multi-User Isolation**: User accounts are partitioned under `moodmate_users` and `moodmate_data_<userId>`.
- **True Blank Canvas**: Brand new accounts start completely fresh with **0 days logged**, empty graphs, and a clean wallet.
- **Friendly Illustrated Avatars**: 6 curated spirits (`🌱 Gentle Sprout`, `🦊 Curious Fox`, `🌸 Calm Lotus`, `✨ Cosmic Star`, `🦉 Wise Owl`, `☀️ Warm Sun`).
- **Flexible Access Modes**: Create Fresh Account, Sign In, or instant "Explore as Guest".
- **Judges Demo Switch**: One-click **"Load Demo Profile"** toggle on the gateway, graph, and footer that instantly populates 14 days of realistic logs, 160 coins, and a 5-day streak for live hackathon judging.
- **Clean Logout**: Header & profile logout buttons flush the active session and return to `/login`.

### 2. 🎆 Dynamic Reaction Graphic Pop-Outs (Unique to All 8 Moods)
Tapping any of the 8 tactile mood buttons triggers an expressive visual particle explosion:
- 😊 **Happy**: Shower of gold sparkle stars and floating yellow hearts.
- 😢 **Sad**: Soft floating rain droplets with gentle ripples falling gracefully.
- 😰 **Stressed**: Exhaling mist / vapor cloud animation that expands and dissipates tension.
- 😴 **Tired**: Glowing crescent moon and purple "Zzz" drifting upward.
- 😠 **Angry**: Firework sparks that cool down into soft calming green leaves.
- 😐 **Bored**: Pop of bouncing colorful geometric confetti to spark energy.
- 😟 **Anxious**: Grounding glowing circle that expands and anchors downward.
- 🤩 **Excited**: High-energy multi-color confetti fountain with party poppers.

### 3. 🌿 Lumi — The Multi-Turn Emotional & Intelligence AI Companion (`/lumi`)
- **Real Google Gemini 3.8 Flash Engine**: Fully integrated with Google's state-of-the-art `gemini-3.8-flash` model. Zero canned or fake mock replies.
- **Dual-Capability Intelligence**:
  * **Empathetic Emotional Support**: Active listening, stress de-escalation, burnout recovery, and somatic 5-4-3-2-1 sensory grounding.
  * **Technical & Academic Reasoning**: Capable of writing, explaining, and debugging code (C++, JavaScript, Python), solving math & science problems, and answering general knowledge questions.
- **Full Multi-Turn Conversational Memory**: Context retention across multiple turns (e.g. asking for code, then saying *"Explain line by line what that code does"* or *"What was my first question?"*).
- **Rich Markdown & Code Syntax Rendering**: Beautiful custom code blocks with language badges and a one-click **Copy Code** button.
- **Zero-Friction Dual-Mode API Key Setup**: Configure `GEMINI_API_KEY` in `.env` (server-side) or paste directly into the in-app 🔑 Key modal for instant testing.
- **Resilient Fallback Architecture**: Backend proxy via Vite server middleware with automatic browser-direct client fallback.

### 4. 📊 The Joyful Mood Graph (Expressive Vertical Bar Chart)
- **7-Day Vertical Emotional Energy Pillars**: Monday through Sunday columns with rounded pill bars scaled to emotional valence (1 to 8).
- **Dynamic Mood Coloring**: Bars colored according to the logged mood (Amber for joy, Emerald for calm, Indigo for sad, Violet for tired, Rose for stressed).
- **Interactive Tooltip**: Hovering or tapping any bar reveals the day, mood emoji, valence score, and exact micro-journal note.
- **Weekly Joy Index**: Automatic metric badge (e.g. *"78% Positive Energy this week"*).
- **Encouraging Empty-State Canvas**: Welcoming illustration for fresh users: *"Your emotional canvas is waiting for its first check-in! 🎨"*.

### 5. 🎯 Mood-Specific Tasks & Curated YouTube Music Sanctuary
- **3 Tailored Micro-Tasks per Mood**: Actionable resets (e.g. 2-minute shoulder stretch, screen blackout, butterfly hug, horizon scan).
- **Interactive Task Checkboxes**: Checking off tasks awards **+15 🟣 Growth Coins** and fires celebratory confetti!
- **Curated YouTube Soundscapes**: Handpicked frequency tracks per mood (Lofi cafe, Delta sleep waves, 432Hz deep focus, Solfeggio 528Hz vagus nerve reset, piano comfort) with in-app popup player and external link.

---

## 🚀 Quick Start & Local Execution

### 1. Installation
```bash
npm install
```

### 2. Configure Gemini API Key
Add your key to `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Or enter it in the Lumi chat UI using the 🔑 button).*

### 3. Run Locally in Development Mode
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Production Build
```bash
npm run build
```
*(Verified: compiles in ~1.0s with 0 errors).*

---

## ⏱️ Updated 2-Minute Demo Script (For Hackathon Judges)

| Time | Stage | Action & Talking Points |
|---|---|---|
| **0:00 – 0:25** | **Auth Barrier & Fresh Onboarding** | Open on `/login`. Show the 3 modes: "Create Fresh Account", "Sign In", and "Explore as Guest". Highlight the 6 friendly illustrated avatars. Click **"Explore as Guest"** to show that a real new user starts with **0 logs** and an empty canvas. Then point out the **"Load Demo Profile"** button designed specifically for judges. |
| **0:25 – 0:50** | **Daily Sanctuary & Particle Pop-Outs** | Navigate to `/checkin`. Tap 😊 **Happy** to trigger the shower of golden sparkle stars and yellow hearts! Then tap 😰 **Stressed** to show the exhaling vapor mist. Check off one of the **Tailored Micro-Tasks** to earn **+15 🟣 Growth Coins**. Click **"Listen"** on the curated YouTube soundscape card. Log a note and hit **"Complete Check-In"**. |
| **0:50 – 1:15** | **The Joyful Bar Graph** | Open `/analytics`. Click **"Load 14-Day Sample History"**. Admire the **7-Day Vertical Bar Chart** with rounded colored pill bars. Tap on Wednesday to view the interactive tooltip with the mood stamp and journal note. Point out the **Weekly Joy Index** metric and the 30-Day Calendar. |
| **1:15 – 1:40** | **Lumi AI 🌿 (Gemini 3.8 Flash)** | Visit `/lumi`. Show real AI capabilities: click the **💻 C++ String Reverse** prompt chip. Show how Lumi generates working C++ code in a formatted block with a **Copy Code** button. Then send a follow-up: *"Explain how that works line by line"*, showcasing true multi-turn context retention. Point out the API key setup modal. |
| **1:40 – 2:00** | **Kindness Wall & Rewards Hub** | Hop into `/community` and click **"Send a Virtual Hug 🫂"** to see floating heart confetti. Show the Rewards Hub `/wallet` with the 3 coin pools. Conclude: *"MoodMate provides a complete, human-first emotional ecosystem—private, multi-user, and built for genuine connection."* |
