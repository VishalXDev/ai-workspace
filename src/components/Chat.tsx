import React from "react";
import { Note } from "../App";
import Message from "./Message";

type Props = {
  filtered: Note[];
  selectedId: number | null;
  setSelectedId: (id: number) => void;
  togglePin: (id: number) => void;
  handleCardKeyDown: (e: React.KeyboardEvent, id: number) => void;
  listRef: React.RefObject<HTMLDivElement>; // ✅ fix here
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
    <div
      ref={listRef}
      className="rounded-2xl border border-neutral-200 bg-white p-2 max-h-[70vh] overflow-auto"
    >
      {filtered.length === 0 && (
        <div className="p-10 text-center text-neutral-500">No results</div>
      )}

      <ul className="space-y-2">
        {filtered.map((n) => (
          <li key={n.id} data-id={n.id}>
            <Message
              note={n}
              isSelected={selectedId === n.id}
              onTogglePin={togglePin}
              onSelect={() => setSelectedId(n.id)}
              onKeyDown={handleCardKeyDown}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
