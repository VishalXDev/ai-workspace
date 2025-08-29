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
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/50 rounded-3xl blur-3xl"></div>
      <div
        ref={listRef}
        className="relative backdrop-blur-sm border border-gray-200/50 bg-white/30 rounded-3xl p-2 max-h-[75vh] overflow-auto"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 max-w-xs">Try adjusting your search or browse all messages</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((note) => (
              <li key={note.id} data-id={note.id}>
                <Message
                  note={note}
                  isSelected={selectedId === note.id}
                  onTogglePin={togglePin}
                  onSelect={() => setSelectedId(note.id)}
                  onKeyDown={handleCardKeyDown}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}