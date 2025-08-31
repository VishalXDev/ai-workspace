import React from "react";

type Props = {
  query: string;
  setQuery: (q: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="relative group">
      {/* Multi-layered glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-400/20 to-pink-400/15 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 via-blue-300/15 to-indigo-300/10 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 left-1/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-ping delay-300"></div>
      <div className="absolute -top-1 right-1/3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-ping delay-700"></div>
      <div className="absolute -bottom-2 right-1/4 w-2.5 h-2.5 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-ping delay-1000"></div>

      {/* Main container */}
      <div className="relative transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5">
        {/* Glass container with enhanced border */}
        <div className="relative overflow-hidden rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-2xl">
          {/* Animated gradient border overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 p-px opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-full h-full bg-white/20 rounded-2xl"></div>
          </div>
          
          {/* Enhanced search icon */}
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
            <div className="relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-pink-100/60 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-gray-600 transform transition-all duration-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {/* Icon glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* Floating dot */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Main input field */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages, tags, authors..."
            className="relative z-10 w-full h-16 pl-20 pr-20 bg-transparent text-gray-800 placeholder-gray-500 outline-none text-base font-medium transition-all duration-300 focus:placeholder-gray-400"
            style={{
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
            }}
          />

          {/* Enhanced keyboard shortcut */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
            <div className="transform transition-all duration-300 group-hover:scale-105 hover:rotate-3">
              <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-gray-200/80 via-gray-300/80 to-gray-200/80 backdrop-blur-sm border border-white/60 rounded-xl shadow-lg">
                <div className="flex items-center gap-0.5 text-xs font-bold text-gray-700">
                  <span className="transform transition-all duration-200 hover:scale-110">⌘</span>
                  <span className="transform transition-all duration-200 hover:scale-110">K</span>
                </div>
              </div>
              {/* Shortcut glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300/30 to-gray-400/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100"></div>
          
          {/* Input focus states */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Focus ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-lg opacity-0 focus-within:opacity-100 transform focus-within:scale-105 transition-all duration-300 -z-10"></div>

        {/* Search suggestions indicator */}
        {query && (
          <div className="absolute top-full left-0 right-0 mt-2 transform transition-all duration-300 animate-fadeInUp">
            <div className="bg-white/40 backdrop-blur-lg border border-white/40 rounded-xl shadow-2xl p-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Searching for: "{query}"</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating action hints */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-lg text-xs">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium">Start typing to search</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-200 border border-gray-300 rounded text-xs font-bold">ESC</kbd>
            <span className="text-gray-600">to clear</span>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        
        @keyframes searchPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }
        
        input:focus {
          animation: searchPulse 2s infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-3px) rotate(1deg); 
          }
          66% { 
            transform: translateY(2px) rotate(-1deg); 
          }
        }
        
        .animate-search-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}