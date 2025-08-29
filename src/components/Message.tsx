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
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 outline-none cursor-pointer ${
        isSelected 
          ? "border-gray-900 shadow-xl shadow-gray-900/10 scale-[1.02] bg-white" 
          : "border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300 hover:shadow-lg hover:scale-[1.01]"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      )}
      
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight flex-1">
            {note.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              note.pinned
                ? "bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200"
                : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            <span className="text-sm">📌</span>
            <span>{note.pinned ? "Pinned" : "Pin"}</span>
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {note.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-200">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{note.author}</span>
          </div>
          
          <time className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 border border-gray-200">
            {formatDate(note.created_at)}
          </time>
          
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}