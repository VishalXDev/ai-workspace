Mini AI Workspace (169Pi Task)

This is a **2-hour build assignment** for 169Pi 🚀.  
Built with **React + TypeScript + TailwindCSS** to demonstrate a **memory-first UX**.

---

## Features

- 💬 **Chat Area** — Displays dataset messages (from `dataset.json`).
- 📌 **Memory Panel** — Pin/unpin messages into memory, visible on the side.
- 🔍 **Search Bar** — Filter messages by title, description, author, or tags.
- ⌨️ **Keyboard Shortcuts**:
  - **J / K** → Navigate messages
  - **P** → Pin/unpin selected message
- 💾 **Persistence** — Pinned memory is saved in `localStorage`.
- 📱 **Responsive** — Desktop-first, with mobile toggle for memory panel.

---

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Local state (`useState`, `useEffect`, `useMemo`)
- LocalStorage persistence

---

## Getting Started

### 1. Clone & Install
```bash
git clone <your_repo_url>
cd ai-workspace
npm install
2. Run Development
bash
Copy code
npm start
3. Build for Production
bash
Copy code
npm run build
Project Structure
pgsql
Copy code
src/
 ├─ components/      # UI components
 │   ├─ Chat.tsx
 │   ├─ Message.tsx
 │   ├─ MemoryPanel.tsx
 │   └─ SearchBar.tsx
 ├─ data/            # Provided dataset
 │   └─ dataset.json
 ├─ App.tsx
 ├─ index.tsx
 └─ index.css
Demo Script (Loom)
Suggested Loom flow (5–7 minutes):

Intro (what you built) → Mini AI Workspace with chat + memory.

Search → Type into the search bar, filter messages.

Pin to Memory → Click 📌 or press P. Show memory panel updating.

Persistence → Refresh page, memory stays.

Keyboard Shortcuts → Use J/K to move, P to pin.

Responsive View → Show memory toggle on mobile width.

Wrap-up → Clean UI, memory-first UX, extendable design.

Deployment
Easiest way: Vercel (one command).

bash
Copy code
npm i -g vercel
vercel
Author
Built by Vishal ✨ for 169Pi Launch Team Task.