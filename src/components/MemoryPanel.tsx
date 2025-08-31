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
      {/* Mobile toggle with 3D effects */}
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-red-700 bg-clip-text text-transparent">
          Memory
        </h2>
        <button
          onClick={toggleMobile}
          className="relative px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/30 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 text-gray-700 group-hover:text-gray-900">
            {showMobile ? "Hide" : "Show"}
          </span>
        </button>
      </div>

      <div
        className={`relative group/panel transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
          showMobile ? "block" : "hidden lg:block"
        }`}
      >
        {/* Multi-layered background with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-red-50/20 rounded-2xl blur-xl transform transition-all duration-500 group-hover/panel:scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-100/30 via-transparent to-amber-100/30 rounded-2xl blur-lg"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-red-200/40 p-px transform transition-all duration-500 group-hover/panel:from-amber-300/60 group-hover/panel:via-orange-300/60 group-hover/panel:to-red-300/60">
          <div className="w-full h-full bg-white/30 backdrop-blur-lg rounded-2xl"></div>
        </div>

        {/* Main container */}
        <div className="relative bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 max-h-[75vh] overflow-auto shadow-2xl">
          {/* Custom scrollbar */}
          <style>{`
            .memory-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .memory-scroll::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            .memory-scroll::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(245, 158, 11, 0.4), rgba(251, 146, 60, 0.4));
              border-radius: 10px;
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .memory-scroll::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgba(245, 158, 11, 0.6), rgba(251, 146, 60, 0.6));
            }
          `}</style>
          
          <div className="memory-scroll relative">
            {/* Enhanced header */}
            <div className="flex items-center justify-between mb-6 group/header">
              <div className="flex items-center gap-3">
                {/* 3D Brain icon */}
                <div className="relative transform transition-all duration-500 hover:scale-110 hover:rotate-6 group-hover/header:animate-pulse">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-200 to-red-200 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
                    <span className="text-lg filter drop-shadow-sm transform transition-transform duration-300 group-hover/header:scale-110">🧠</span>
                  </div>
                  {/* Floating particles */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-70"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-ping delay-700 opacity-70"></div>
                </div>
                
                <div className="transform transition-all duration-300 group-hover/header:scale-105">
                  <h2 className="text-lg font-black bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent">
                    Memory
                  </h2>
                  {/* Animated counter badge */}
                  <div className="inline-flex items-center ml-2 px-3 py-1 bg-gradient-to-r from-amber-200/80 via-orange-200/80 to-red-200/80 backdrop-blur-sm border border-white/40 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
                    <span className="text-xs font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                      {pinned.length}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced clear button */}
              {pinned.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="relative px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-xs font-semibold text-gray-600 shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-red-100/30 hover:text-red-700 hover:border-red-200/50 group/clear overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-pink-200/20 opacity-0 group-hover/clear:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Clear all</span>
                </button>
              )}
            </div>

            {/* Enhanced empty state */}
            {pinned.length === 0 ? (
              <div className="text-center py-12 transform transition-all duration-500 hover:scale-105">
                {/* 3D pin icon with animation */}
                <div className="relative mx-auto mb-6 w-20 h-20 transform transition-all duration-500 hover:scale-110 hover:rotate-12">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-100/80 via-gray-200/80 to-gray-300/80 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-xl">
                    <span className="text-3xl filter drop-shadow-lg transform transition-all duration-300 hover:scale-110">📌</span>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-3xl blur-lg animate-pulse"></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-bounce opacity-60"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-ping delay-1000 opacity-60"></div>
                </div>

                <div className="space-y-3 transform transition-all duration-300 hover:scale-102">
                  <h3 className="font-black text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Nothing pinned yet
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                    Pin important messages to keep them handy. Use the pin button or press{" "}
                    <kbd className="px-2 py-1 bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-400 rounded-md text-xs font-bold shadow-sm transform inline-block hover:scale-110 transition-transform duration-200">
                      P
                    </kbd>
                  </p>
                </div>

                {/* Floating suggestion */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-white/30">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Try pinning a message</span>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {pinned.map((note, index) => (
                  <li 
                    key={note.id}
                    className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInScale 0.5s ease-out forwards'
                    }}
                  >
                    <div className="group/item relative overflow-hidden rounded-2xl transform transition-all duration-300 hover:shadow-2xl">
                      {/* Enhanced background layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-orange-100/50 to-red-100/40 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-yellow-50/40 via-transparent to-amber-50/40 rounded-2xl"></div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-orange-200/30 to-red-200/30 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-all duration-300 blur-sm transform group-hover/item:scale-105"></div>
                      
                      {/* Content container */}
                      <div className="relative bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-4 shadow-lg">
                        <div className="flex items-start gap-3">
                          {/* Enhanced pin icon */}
                          <div className="mt-1 flex-shrink-0 transform transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-12">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-orange-300 to-red-300 border border-white/40 shadow-lg flex items-center justify-center backdrop-blur-sm">
                              <span className="text-sm filter drop-shadow-sm">📌</span>
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h4 className="font-bold text-amber-900 leading-tight bg-gradient-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent transform transition-all duration-300 group-hover/item:scale-105">
                                {note.title}
                              </h4>
                              {/* Enhanced remove button */}
                              <button
                                onClick={() => onTogglePin(note.id)}
                                className="relative px-2 py-1 bg-white/30 backdrop-blur-sm rounded-lg border border-white/40 text-xs font-semibold text-amber-700 shadow-sm opacity-0 group-hover/item:opacity-100 transform translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 hover:scale-105 hover:bg-red-100/40 hover:text-red-700 hover:border-red-200/50 overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-pink-200/20 opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                                <span className="relative z-10">Remove</span>
                              </button>
                            </div>
                            
                            <p className="text-xs text-amber-800 leading-relaxed line-clamp-2 mb-3 transform transition-all duration-300 group-hover/item:text-amber-900">
                              {note.description}
                            </p>
                            
                            {/* Enhanced tags */}
                            <div className="flex flex-wrap gap-1.5">
                              {note.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-1 bg-gradient-to-r from-amber-200/80 to-orange-200/80 backdrop-blur-sm border border-white/40 text-amber-800 rounded-full text-xs font-semibold shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                                  style={{
                                    animationDelay: `${(index * 100) + (tagIndex * 50)}ms`
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                              {note.tags.length > 2 && (
                                <span className="px-2.5 py-1 bg-gradient-to-r from-gray-200/80 to-gray-300/80 backdrop-blur-sm border border-white/40 text-gray-700 rounded-full text-xs font-semibold shadow-sm transform transition-all duration-300 hover:scale-105">
                                  +{note.tags.length - 2}
                                </span>
                              )}
                            </div>
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

        {/* Floating corner elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-30 animate-ping delay-300"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 animate-ping delay-800"></div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes memoryFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-5px) rotate(1deg); 
          }
          66% { 
            transform: translateY(3px) rotate(-1deg); 
          }
        }
        
        .animate-memory-float {
          animation: memoryFloat 5s ease-in-out infinite;
        }
      `}</style>
    </aside>
  );
}