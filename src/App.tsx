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

  // Derived state - Optimized filtering
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40"></div>
        
        {/* Animated floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-32 w-40 h-40 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-br from-indigo-300/25 to-blue-300/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 z' fill='none' stroke='%23000000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`
        }}></div>
      </div>

      {/* Enhanced Glassmorphic Header */}
      <header className="relative z-30 bg-white/40 backdrop-blur-2xl border-b border-white/30 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white grid place-items-center font-bold text-sm shadow-xl transform group-hover:scale-105 transition-transform duration-200">
                  AI
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  AI Workspace
                </h1>
                <p className="text-xs text-gray-600 font-medium">Memory-first intelligence platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg transition-all duration-300 hover:bg-white/60 hover:shadow-xl hover:border-blue-200/50">
                  <kbd className="px-2.5 py-1 text-xs rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md">J</kbd>
                  <kbd className="px-2.5 py-1 text-xs rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md">K</kbd>
                  <span className="text-gray-700 font-medium text-sm">Navigate</span>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-xl rounded-xl border border-white/40 shadow-lg transition-all duration-300 hover:bg-white/60 hover:shadow-xl hover:border-pink-200/50">
                  <kbd className="px-2.5 py-1 text-xs rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md">P</kbd>
                  <span className="text-gray-700 font-medium text-sm">Pin</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/30 backdrop-blur-xl rounded-xl border border-white/30 shadow-md">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs font-medium text-gray-700">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Chat + Search */}
          <section className="lg:col-span-3 space-y-6">
            <div className="relative">
              <SearchBar query={query} setQuery={setQuery} />
              
              {/* Search stats */}
              {query && (
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium">{filtered.length} results found</span>
                    {filtered.length > 0 && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">Use J/K to navigate</span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <Chat
              filtered={filtered}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              togglePin={togglePin}
              handleCardKeyDown={handleCardKeyDown}
              listRef={listRef}
            />
          </section>

          {/* Right: Memory Panel */}
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
      </main>

      {/* Enhanced Glassmorphic Footer */}
      <footer className="relative z-20 mx-auto max-w-7xl px-6 pb-8 pt-12">
        {/* Gradient divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-8 h-8 bg-white/60 backdrop-blur-xl rounded-full border border-white/40 shadow-lg grid place-items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative flex flex-wrap items-center justify-between gap-6 text-sm bg-white/40 backdrop-blur-2xl rounded-2xl p-6 border border-white/40 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="font-bold text-gray-800">Memory-first workspace</span>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 text-gray-600">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="font-medium">Data persists locally</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="font-medium">{items.length} total items</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Built with</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-700 rounded-md font-bold text-xs">React</span>
                  <span className="text-gray-400">+</span>
                  <span className="px-2 py-1 bg-teal-500/10 text-teal-700 rounded-md font-bold text-xs">Tailwind</span>
                </div>
              </div>

              <div className="w-px h-4 bg-gray-300/60"></div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500">by</span>
                <span className="font-bold text-gray-800">VishalXDev</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}