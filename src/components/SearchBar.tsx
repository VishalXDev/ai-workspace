import React from "react";

type Props = {
  query: string;
  setQuery: (q: string) => void;
};

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="relative group">
      {/* Enhanced glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      {/* Main container */}
      <div className="relative">
        {/* Enhanced search icon with animation */}
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/60 to-white/40 border border-white/50 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Enhanced input field */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages, tags, authors..."
          className="w-full h-14 pl-16 pr-20 bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl text-gray-800 placeholder-gray-500 outline-none text-sm font-medium focus:bg-white/50 focus:border-blue-400/60 focus:shadow-lg transition-all duration-300 hover:bg-white/40"
        />

        {/* Enhanced keyboard shortcut */}
        <div className="absolute inset-y-0 right-4 flex items-center">
          <div className="group/shortcut flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-white/60 to-white/50 border border-white/60 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-orange-50/80 hover:to-amber-50/80 hover:border-orange-200/70">
            <span className="text-xs font-bold text-gray-600 group-hover/shortcut:text-orange-700 transition-colors duration-200">⌘</span>
            <span className="text-xs font-bold text-gray-600 group-hover/shortcut:text-orange-700 transition-colors duration-200">K</span>
          </div>
        </div>

        {/* Clear button when there's a query */}
        {query && (
          <div className="absolute inset-y-0 right-16 flex items-center">
            <button
              onClick={() => setQuery('')}
              className="w-6 h-6 rounded-full bg-gray-400/60 hover:bg-gray-500/70 border border-white/50 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-sm"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Enhanced search indicator with better animation */}
        {query && (
          <div className="absolute top-full left-0 right-0 mt-3 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gradient-to-r from-white/90 via-white/85 to-white/90 backdrop-blur-2xl border border-white/50 rounded-xl shadow-lg p-3">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="relative">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="font-medium">
                  Searching for: <span className="text-blue-700 font-semibold">"{query}"</span>
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></div>
    </div>
  );
}