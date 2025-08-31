import React from "react";
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

export default function Chat({
  filtered,
  selectedId,
  setSelectedId,
  togglePin,
  handleCardKeyDown,
  listRef,
}: Props) {
  return (
    <div className="relative group">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 rounded-2xl blur-2xl transform transition-all duration-500 group-hover:scale-105"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-100/20 via-transparent to-cyan-100/20 rounded-2xl blur-xl"></div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 p-px transform transition-all duration-500 group-hover:from-blue-300/50 group-hover:via-purple-300/50 group-hover:to-pink-300/50">
        <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl"></div>
      </div>

      {/* Main content container */}
      <div
        ref={listRef}
        className="relative bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 max-h-[75vh] overflow-auto shadow-2xl transform transition-all duration-300 hover:shadow-3xl"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(168, 85, 247, 0.3) transparent'
        }}
      >
        {/* Custom scrollbar styles */}
        <style>{`
          .relative::-webkit-scrollbar {
            width: 8px;
          }
          .relative::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .relative::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4));
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .relative::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, rgba(168, 85, 247, 0.6), rgba(236, 72, 153, 0.6));
          }
        `}</style>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center transform transition-all duration-500 hover:scale-105">
            {/* Enhanced empty state */}
            <div className="relative mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100/80 to-gray-200/80 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
                <svg 
                  className="w-8 h-8 text-gray-500 transform transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              {/* Floating particles around the icon */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-70"></div>
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-ping delay-1000 opacity-70"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-2xl blur-lg animate-pulse"></div>
            </div>

            <div className="space-y-3 transform transition-all duration-300 hover:scale-102">
              <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                No results found
              </h3>
              <p className="text-gray-600 max-w-xs leading-relaxed">
                Try adjusting your search or browse all messages
              </p>
            </div>

            {/* Animated suggestion pills */}
            <div className="flex gap-2 mt-6">
              {['Clear search', 'Show all', 'Recent'].map((suggestion, i) => (
                <div 
                  key={suggestion}
                  className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full border border-white/40 text-xs text-gray-600 shadow-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/40 cursor-pointer"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((note, index) => (
              <li 
                key={note.id} 
                data-id={note.id}
                className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInUp 0.4s ease-out forwards'
                }}
              >
                <div className="relative group/item">
                  {/* Item glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all duration-300 blur-sm transform group-hover/item:scale-105"></div>
                  
                  <Message
                    note={note}
                    isSelected={selectedId === note.id}
                    onTogglePin={togglePin}
                    onSelect={() => setSelectedId(note.id)}
                    onKeyDown={handleCardKeyDown}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Floating action indicator */}
        {filtered.length > 0 && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-medium">{filtered.length} messages</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional floating elements */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-ping delay-500"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-30 animate-ping delay-1000"></div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-8px) rotate(2deg); 
          }
          66% { 
            transform: translateY(4px) rotate(-2deg); 
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}