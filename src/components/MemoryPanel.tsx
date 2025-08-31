import React, { memo } from "react";
import { Note } from "../App";

type Props = {
  pinned: Note[];
  onTogglePin: (id: number) => void;
  onClearAll: () => void;
  showMobile: boolean;
  toggleMobile: () => void;
};

// Enhanced empty state with better visual hierarchy
const EmptyState = memo(() => (
  <div className="text-center py-8">
    <div className="relative group mb-4">
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200/50 to-orange-200/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border border-amber-200/60 shadow-lg flex items-center justify-center">
        <span className="text-3xl">📌</span>
      </div>
    </div>
    
    <h3 className="font-bold text-base text-amber-900 mb-2">Nothing pinned yet</h3>
    <p className="text-sm text-amber-700/80 leading-relaxed max-w-xs mx-auto mb-4">
      Pin important messages to keep them accessible. Press{" "}
      <kbd className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-amber-200 to-amber-300 border border-amber-400 rounded-md text-xs font-bold text-amber-900 shadow-sm">P</kbd>{" "}
      while hovering over any message
    </p>
    
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-xl rounded-full border border-amber-200/60 shadow-sm">
      <div className="relative">
        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <span className="text-xs font-medium text-amber-800">Try pinning a message</span>
    </div>
  </div>
));

// Enhanced pinned item with better interactions
const PinnedItem = memo(({ note, onTogglePin }: { note: Note; onTogglePin: (id: number) => void }) => (
  <li className="group transform transition-all duration-300 hover:scale-[1.02]">
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/70 via-amber-50/60 to-white/70 backdrop-blur-xl border border-white/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-white/80 hover:via-amber-50/70 hover:to-white/80">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex items-start gap-3">
        {/* Enhanced pin icon */}
        <div className="mt-1 flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-orange-300 border border-amber-400/50 shadow-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-sm">📌</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h4 className="font-bold text-amber-900 text-sm leading-tight line-clamp-2 pr-2">
              {note.title}
            </h4>
            
            {/* Enhanced remove button */}
            <button
              onClick={() => onTogglePin(note.id)}
              className="relative flex-shrink-0 p-1.5 bg-white/60 backdrop-blur-sm text-amber-600 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 hover:text-red-600 hover:shadow-md hover:scale-105"
              title="Unpin message"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-amber-800/90 leading-relaxed line-clamp-3 mb-3">
            {note.description}
          </p>
          
          {/* Enhanced tags */}
          <div className="flex flex-wrap gap-1.5">
            {note.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-md text-xs font-medium border border-amber-300/50 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md text-xs font-medium border border-gray-300/50 shadow-sm">
                +{note.tags.length - 2} more
              </span>
            )}
          </div>

          {/* Author and date info */}
          <div className="mt-2 pt-2 border-t border-amber-200/30">
            <div className="flex items-center justify-between text-xs text-amber-700/70">
              <span className="font-medium">{note.author}</span>
              <span>{new Date(note.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </li>
));

export default function MemoryPanel({
  pinned,
  onTogglePin,
  onClearAll,
  showMobile,
  toggleMobile,
}: Props) {
  return (
    <aside className="lg:col-span-1">
      {/* Enhanced mobile toggle */}
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
            <span className="text-xs">🧠</span>
          </div>
          <h2 className="text-lg font-bold text-amber-900">Memory</h2>
        </div>
        
        <button
          onClick={toggleMobile}
          className="relative group px-4 py-2 bg-white/60 backdrop-blur-xl border border-white/50 text-sm font-bold rounded-xl text-gray-700 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl hover:scale-105"
        >
          <span className="relative z-10">{showMobile ? "Hide" : "Show"}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>

      <div className={`${showMobile ? "block" : "hidden lg:block"}`}>
        {/* Enhanced main container */}
        <div className="relative group">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-amber-50/40 to-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl"></div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 via-orange-400/5 to-amber-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <div className="relative p-5 max-h-[70vh] overflow-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(217, 119, 6, 0.3) transparent'
          }}>
            
            {/* Enhanced scrollbar styles */}
            <style>{`
              .relative::-webkit-scrollbar {
                width: 6px;
              }
              .relative::-webkit-scrollbar-track {
                background: rgba(252, 211, 77, 0.1);
                border-radius: 3px;
              }
              .relative::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, rgba(217, 119, 6, 0.3), rgba(217, 119, 6, 0.5));
                border-radius: 3px;
                border: 1px solid rgba(255, 255, 255, 0.2);
              }
              .relative::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, rgba(217, 119, 6, 0.5), rgba(217, 119, 6, 0.7));
              }
            `}</style>
            
            {/* Enhanced header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-50"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-orange-400 to-amber-500 shadow-lg flex items-center justify-center transform transition-transform duration-200 hover:scale-105">
                    <span className="text-lg">🧠</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-bold text-amber-900 mb-1">Memory Bank</h2>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-amber-200 to-orange-300 border border-amber-400/50 rounded-full text-xs font-bold text-amber-900 shadow-sm">
                      {pinned.length} {pinned.length === 1 ? 'item' : 'items'}
                    </span>
                    {pinned.length > 0 && (
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {pinned.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="relative group px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-white/50 text-xs font-bold text-gray-600 rounded-lg shadow-md transition-all duration-200 hover:bg-red-100 hover:text-red-700 hover:shadow-lg hover:scale-105"
                  title="Clear all pinned items"
                >
                  <span className="relative z-10">Clear all</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-red-300/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
            </div>

            {/* Content */}
            {pinned.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-4">
                {pinned.map((note) => (
                  <PinnedItem key={note.id} note={note} onTogglePin={onTogglePin} />
                ))}
              </ul>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
        </div>
      </div>
    </aside>
  );
}