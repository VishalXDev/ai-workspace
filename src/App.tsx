import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import Chat from "./components/Chat";
import MemoryPanel from "./components/MemoryPanel";
import dataset from "./data/alpie_frontend_dataset.json";

// --- Types
export type Note = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  author: string;
  created_at: string; // ISO
  pinned: boolean;
};

// Initialize with dataset
const initialItems: Note[] = (dataset as Note[]).map((d) => ({
  ...d,
  pinned: d.pinned ?? false,
}));

const LS_KEY = "169pi-pinned-ids";

export default function App() {
  // Base state
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Note[]>(() => initialItems);
  const [showMemoryOnMobile, setShowMemoryOnMobile] = useState(false);

  // Selection for keyboard shortcuts
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null!);

  // Load pinned from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;
    try {
      const pinnedIds: number[] = JSON.parse(saved);
      setItems((prev) =>
        prev.map((n) => ({ ...n, pinned: pinnedIds.includes(n.id) }))
      );
    } catch { }
  }, []);

  // Save pinned to localStorage
  useEffect(() => {
    const pinnedIds = items.filter((n) => n.pinned).map((n) => n.id);
    localStorage.setItem(LS_KEY, JSON.stringify(pinnedIds));
  }, [items]);

  // Derived state
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) => {
      const hay = `${n.title} ${n.description} ${n.author} ${n.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const pinned = useMemo(() => items.filter((n) => n.pinned), [items]);

  // Actions
  const togglePin = (id: number) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key.toLowerCase() === "p") {
      e.preventDefault();
      togglePin(id);
    }
  };

  // Keyboard navigation J/K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!filtered.length) return;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setSelectedId((curr) => {
          const idx = Math.max(
            0,
            curr ? filtered.findIndex((n) => n.id === curr) + 1 : 0
          );
          return filtered[Math.min(idx, filtered.length - 1)].id;
        });
      }
      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setSelectedId((curr) => {
          const idx = Math.max(
            0,
            curr ? filtered.findIndex((n) => n.id === curr) - 1 : 0
          );
          return filtered[Math.max(idx, 0)].id;
        });
      }
      if (e.key.toLowerCase() === "p" && selectedId != null) {
        togglePin(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selectedId]);

  useEffect(() => {
    if (!listRef.current || selectedId == null) return;
    const el = listRef.current.querySelector(`[data-id="${selectedId}"]`);
    if (el) (el as HTMLElement).scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-black rotate-45 animate-slow-spin"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-black rounded-full animate-slow-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black animate-ping delay-1000"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 backdrop-blur-lg bg-white/8 border-b border-white/15 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between transform-gpu">
            <div className="flex items-center gap-3 group">
              <div className="relative transform-gpu transition-all duration-300 hover:scale-105 hover:rotate-3">
                <div className="size-9 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white grid place-items-center font-bold text-sm shadow-lg border border-white/15 backdrop-blur-sm">
                  <span className="transform transition-transform duration-300 group-hover:scale-105">AI</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 border border-white rounded-full animate-ping shadow-sm"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 border border-white rounded-full shadow-sm"></div>
              </div>
              <div className="transform transition-all duration-300 hover:scale-102">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                  Workspace
                </h1>
                <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 backdrop-blur-sm rounded-xl border border-white/15 shadow-md transform transition-all duration-300 hover:scale-102 hover:bg-white/12">
                <kbd className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-sm">J/K</kbd>
                <span className="text-gray-700 font-medium">navigate</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 backdrop-blur-sm rounded-xl border border-white/15 shadow-md transform transition-all duration-300 hover:scale-102 hover:bg-white/12">
                <kbd className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold shadow-sm">P</kbd>
                <span className="text-gray-700 font-medium">pin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Chat + Search */}
          <section className="lg:col-span-3 space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
              <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className="transform transition-all duration-300 hover:scale-[1.005] hover:-translate-y-0.5">
              <Chat
                filtered={filtered}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                togglePin={togglePin}
                handleCardKeyDown={handleCardKeyDown}
                listRef={listRef}
              />
            </div>
          </section>

          {/* Right: Memory Panel */}
          <div className="transform transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5">
            <MemoryPanel
              pinned={pinned}
              onTogglePin={togglePin}
              onClearAll={() =>
                setItems((prev) => prev.map((n) => ({ ...n, pinned: false })))
              }
              showMobile={showMemoryOnMobile}
              toggleMobile={() => setShowMemoryOnMobile((s) => !s)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent mb-6 shadow-sm"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Left: Product info */}
          <div className="px-4 py-2 bg-white/8 backdrop-blur-sm rounded-xl border border-white/15 shadow-md transform transition-all duration-300 hover:scale-102 hover:bg-white/12">
            <span className="text-gray-700 font-medium">Memory-first workspace • Data persists locally</span>
          </div>

          {/* Center: Tech stack */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white/8 backdrop-blur-sm rounded-xl border border-white/15 shadow-md transform transition-all duration-300 hover:scale-102 hover:bg-white/12">
            <span className="text-gray-600">Built with</span>
            <div className="flex items-center gap-1.5 transform transition-all duration-300 hover:scale-105">
              <span className="text-sm filter drop-shadow-sm">⚛️</span>
              <span className="text-gray-800 font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">React</span>
            </div>
            <div className="w-0.5 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
            <div className="flex items-center gap-1.5 transform transition-all duration-300 hover:scale-105">
              <span className="text-sm filter drop-shadow-sm">🎨</span>
              <span className="text-gray-800 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tailwind</span>
            </div>
          </div>

          {/* Right: Creator */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/8 via-pink-500/8 to-orange-500/8 backdrop-blur-sm rounded-xl border border-purple-200/40 shadow-md transform transition-all duration-300 hover:scale-102 hover:shadow-lg group">
            <span className="text-gray-600">by</span>
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-6">
                  V
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-sm opacity-30 animate-pulse"></div>
              </div>
              <span className="font-bold text-gray-900 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent transform transition-all duration-300 group-hover:scale-102">
                VishalXDev
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes slowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-slow-spin {
          animation: slowSpin 20s linear infinite;
        }

        @keyframes slowBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-slow-bounce {
          animation: slowBounce 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}