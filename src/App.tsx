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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-2xl bg-black text-white grid place-items-center font-bold text-lg">
                AI
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Workspace
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs rounded-lg border bg-gray-100/80">J/K</kbd>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs rounded-lg border bg-gray-100/80">P</kbd>
              <span>pin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Chat + Search */}
        <section className="lg:col-span-3 space-y-6">
          <SearchBar query={query} setQuery={setQuery} />
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
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          {/* Left: Product info */}
          <span className="text-gray-500">Memory-first workspace • Data persists locally</span>

          {/* Center: Tech stack */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400">Built with</span>
            <div className="flex items-center gap-1">
              <span className="text-lg">⚛️</span>
              <span className="text-gray-700 font-medium">React</span>
            </div>
            <span className="text-gray-300">+</span>
            <div className="flex items-center gap-1">
              <span className="text-lg">🎨</span>
              <span className="text-gray-700 font-medium">Tailwind</span>
            </div>
          </div>

          {/* Right: Creator */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400">by</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                V
              </div>
              <span className="font-semibold text-gray-900">VishalXDev</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}