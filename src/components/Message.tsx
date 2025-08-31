import React, { memo } from "react";
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
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

// Memoized component to prevent unnecessary re-renders
export default memo(function Message({
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
      className={`group relative overflow-hidden rounded-lg border transition-all duration-150 outline-none cursor-pointer transform ${
        isSelected 
          ? "border-blue-300 bg-blue-50/80 shadow-sm scale-[1.01]" 
          : "border-gray-200/60 bg-white/60 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-sm"
      }`}
      // Optimize for performance
      style={{ 
        willChange: isSelected ? 'transform, background-color' : 'auto',
        transform: 'translate3d(0, 0, 0)' // GPU acceleration
      }}
    >
      <div className="p-3">
        {/* Compact header section */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1 line-clamp-1">
            {note.title}
          </h3>
          
          {/* Compact pin button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
              note.pinned
                ? "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-150"
                : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-150 hover:text-gray-700"
            }`}
          >
            <span className="text-xs">📌</span>
            <span>{note.pinned ? "Pinned" : "Pin"}</span>
          </button>
        </div>
        
        {/* Compact description */}
        <p className="text-gray-600 mb-3 leading-relaxed text-xs line-clamp-2">
          {note.description}
        </p>
        
        {/* Compact metadata section */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Author badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100/80 rounded-md border border-emerald-200/60">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
            <span className="text-emerald-700 font-medium">{note.author}</span>
          </div>
          
          {/* Date badge */}
          <time className="px-2 py-0.5 bg-slate-100/80 text-slate-600 rounded-md border border-slate-200/60">
            {formatDate(note.created_at)}
          </time>
          
          {/* Compact tags - show max 3 tags */}
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-blue-100/80 text-blue-700 rounded-md border border-blue-200/60"
            >
              #{tag}
            </span>
          ))}
          
          {note.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100/80 text-gray-600 rounded-md border border-gray-200/60">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Simple selection indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>
      )}
    </article>
  );
});