import React from "react";
import { Note } from "../App";

type Props = {
  pinned: Note[];
  onTogglePin: (id: number) => void;
  onClearAll: () => void;
  showMobile: boolean;
  toggleMobile: () => void;
};

export default function MemoryPanel({
  pinned,
  onTogglePin,
  onClearAll,
  showMobile,
  toggleMobile,
}: Props) {
  return (
    <aside className="lg:col-span-1">
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Memory</h2>
        <button
          onClick={toggleMobile}
          className="px-4 py-2 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-sm font-medium hover:bg-white hover:border-gray-300 transition-all duration-200"
        >
          {showMobile ? "Hide" : "Show"}
        </button>
      </div>

      <div
        className={`relative backdrop-blur-sm border border-gray-200/50 bg-white/30 rounded-3xl p-6 max-h-[75vh] overflow-auto transition-all duration-300 ${
          showMobile ? "block" : "hidden lg:block"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-3xl"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                <span className="text-sm">🧠</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Memory
                <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  {pinned.length}
                </span>
              </h2>
            </div>
            
            {pinned.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors duration-200 underline decoration-dotted underline-offset-4"
              >
                Clear all
              </button>
            )}
          </div>

          {pinned.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📌</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Nothing pinned yet</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                Pin important messages to keep them handy. Use the pin button or press{" "}
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-xs font-mono">P</kbd>
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {pinned.map((note) => (
                <li key={note.id}>
                  <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center">
                        <span className="text-xs">📌</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-amber-900 leading-tight truncate">
                            {note.title}
                          </h4>
                          <button
                            onClick={() => onTogglePin(note.id)}
                            className="text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors duration-200 opacity-0 group-hover:opacity-100 underline decoration-dotted underline-offset-2"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-amber-800 leading-relaxed line-clamp-2">
                          {note.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {note.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-full text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {note.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-amber-200 text-amber-700 rounded-full text-xs">
                              +{note.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}