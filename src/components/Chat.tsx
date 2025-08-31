import React, { memo, useMemo } from "react";
import { Note } from "../App";
import Message from "./Message";

type Props = {
  filtered: Note[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  togglePin: (id: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent, id: number) => void;
  listRef: React.RefObject<HTMLDivElement>;
};

// Enhanced empty state component
const EmptyState = memo(() => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <div className="relative group mb-4">
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200/60 shadow-lg flex items-center justify-center">
        <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
    <h3 className="text-base font-bold text-gray-800 mb-2">No results found</h3>
    <p className="text-sm text-gray-600 max-w-xs leading-relaxed">Try adjusting your search terms or browse all available messages</p>
    
    {/* Decorative elements */}
    <div className="flex items-center gap-2 mt-4 opacity-50">
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
    </div>
  </div>
));

// Enhanced message item component
const MessageItem = memo(({ 
  note, 
  isSelected, 
  onTogglePin, 
  onSelect, 
  onKeyDown 
}: {
  note: Note;
  isSelected: boolean;
  onTogglePin: (id: number) => void;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent, id: number) => void;
}) => (
  <li data-id={note.id} className="transform transition-all duration-300 hover:scale-[1.01] hover:z-10">
    <Message
      note={note}
      isSelected={isSelected}
      onTogglePin={onTogglePin}
      onSelect={onSelect}
      onKeyDown={onKeyDown}
    />
  </li>
));

export default function Chat({
  filtered,
  selectedId,
  setSelectedId,
  togglePin,
  handleCardKeyDown,
  listRef,
}: Props) {
  // Memoize the message items to prevent unnecessary re-renders
  const messageItems = useMemo(() => {
    return filtered.map((note) => (
      <MessageItem
        key={note.id}
        note={note}
        isSelected={selectedId === note.id}
        onTogglePin={togglePin}
        onSelect={() => setSelectedId(note.id)}
        onKeyDown={handleCardKeyDown}
      />
    ));
  }, [filtered, selectedId, setSelectedId, togglePin, handleCardKeyDown]);

  return (
    <div className="relative group">
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/50 to-white/40 backdrop-blur-xl rounded-xl border border-white/50 shadow-lg"></div>
      
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      {/* Main content container - same dimensions as original */}
      <div
        ref={listRef}
        className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-3 max-h-[70vh] overflow-auto shadow-xl"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.4) transparent',
          transform: 'translate3d(0, 0, 0)',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain'
        }}
      >
        {/* Enhanced custom scrollbar styles */}
        <style>{`
          .relative::-webkit-scrollbar {
            width: 8px;
          }
          .relative::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          .relative::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, rgba(156, 163, 175, 0.4), rgba(156, 163, 175, 0.6));
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .relative::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, rgba(156, 163, 175, 0.6), rgba(156, 163, 175, 0.8));
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `}</style>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-2" style={{ willChange: 'contents' }}>
            {messageItems}
          </ul>
        )}

        {/* Enhanced message counter */}
        {filtered.length > 0 && (
          <div className="absolute bottom-3 right-3">
            <div className="relative group/counter">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur opacity-0 group-hover/counter:opacity-100 transition duration-300"></div>
              
              <div className="relative px-3 py-1.5 bg-white/70 backdrop-blur-xl rounded-lg border border-white/50 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span>{filtered.length} {filtered.length === 1 ? 'message' : 'messages'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>
      </div>
    </div>
  );
}