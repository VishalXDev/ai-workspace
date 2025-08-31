import React from "react";
import { Note } from "../App";

type Props = {
  note: Note;
  isSelected: boolean;
  onTogglePin: (id: number) => void;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent, id: number) => void;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Message({
  note,
  isSelected,
  onTogglePin,
  onSelect,
  onKeyDown,
}: Props) {
  return (
    <article
      tabIndex={0}
      onFocus={onSelect}
      onKeyDown={(e) => onKeyDown(e, note.id)}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-200 outline-none cursor-pointer ${
        isSelected 
          ? "border-indigo-300/60 shadow-lg shadow-indigo-500/10 bg-white/90 backdrop-blur-sm" 
          : "border-white/40 bg-white/50 backdrop-blur-sm hover:bg-white/70 hover:border-white/60 hover:shadow-md"
      }`}
    >
      {/* Simple background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none"></div>
      
      {/* Selection state */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/8 to-pink-500/5 pointer-events-none"></div>
      )}

      <div className="relative p-4">
        {/* Header section */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight flex-1">
            {note.title}
          </h3>
          
          {/* Compact pin button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 backdrop-blur-sm border ${
              note.pinned
                ? "bg-amber-100/80 text-amber-800 border-amber-200/60 hover:bg-amber-200/80"
                : "bg-gray-100/80 text-gray-600 border-gray-200/60 hover:bg-gray-200/80 hover:text-gray-800"
            }`}
          >
            <span className="text-sm">📌</span>
            <span>{note.pinned ? "Pinned" : "Pin"}</span>
          </button>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          {note.description}
        </p>
        
        {/* Compact metadata section */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Author badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100/80 backdrop-blur-sm rounded-lg text-xs font-medium border border-emerald-200/60">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-emerald-800">{note.author}</span>
          </div>
          
          {/* Date badge */}
          <time className="px-2.5 py-1 bg-slate-100/80 backdrop-blur-sm text-slate-700 rounded-lg text-xs font-medium border border-slate-200/60">
            {formatDate(note.created_at)}
          </time>
          
          {/* Compact tags */}
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-blue-100/80 text-blue-800 rounded-lg text-xs font-medium border border-blue-200/60 backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Simple focus ring */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 focus-within:opacity-100 blur-sm transition-all duration-200 -z-10"></div>

      <style>{`
        /* Removed all animations */
      `}</style>
    </article>
  );
}