import React from "react";

type Props = {
  query: string;
  setQuery: (q: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search messages, tags, authors…"
        className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 pr-10 outline-none focus:ring-4 focus:ring-neutral-200"
      />
      <div className="absolute inset-y-0 right-3 grid place-items-center pointer-events-none">
        <span className="text-neutral-400">⌘K</span>
      </div>
    </div>
  );
}
