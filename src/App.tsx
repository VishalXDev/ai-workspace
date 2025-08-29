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
  // ✅ Fix: useRef<HTMLDivElement>(null!) instead of | null
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
    } catch {}
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
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <div className="size-8 rounded-xl bg-black text-white grid place-items-center font-semibold">
            AI
          </div>
          <h1 className="text-lg font-semibold tracking-tight">
            Mini AI Workspace
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <kbd className="hidden md:inline px-2 py-1 text-xs rounded border bg-neutral-100">J/K</kbd>
            <span className="hidden md:inline text-xs text-neutral-500">navigate</span>
            <kbd className="hidden md:inline px-2 py-1 text-xs rounded border bg-neutral-100">P</kbd>
            <span className="hidden md:inline text-xs text-neutral-500">pin</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Chat + Search */}
        <section className="md:col-span-2 flex flex-col gap-4">
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
      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-2 text-xs text-neutral-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>Memory-first UX • Pinned items persist via localStorage</span>
          <span>Built with React + Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
