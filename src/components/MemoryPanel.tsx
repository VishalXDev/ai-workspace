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
    <aside className="md:col-span-1">
      {/* Mobile toggle */}
      <div className="md:hidden mb-2 flex justify-between items-center">
        <h2 className="text-sm font-semibold tracking-tight">Memory</h2>
        <button
          onClick={toggleMobile}
          className="rounded-lg border px-3 py-1 text-sm bg-white"
        >
          {showMobile ? "Hide" : "Show"}
        </button>
      </div>

      <div
        className={
          "rounded-2xl border border-neutral-200 bg-white p-3 max-h-[70vh] overflow-auto " +
          (showMobile ? "block" : "hidden md:block")
        }
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold tracking-tight">
            Memory ({pinned.length})
          </h2>
          {pinned.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-neutral-600 underline"
            >
              Clear all
            </button>
          )}
        </div>

        {pinned.length === 0 ? (
          <div className="p-6 text-center text-neutral-500">
            Nothing pinned yet. Use the <span className="font-medium">📌 Pin</span> button
            or press <kbd className="px-1 border rounded">P</kbd>.
          </div>
        ) : (
          <ul className="space-y-2">
            {pinned.map((n) => (
              <li key={n.id}>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">📌</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold leading-tight">{n.title}</h4>
                        <button
                          onClick={() => onTogglePin(n.id)}
                          className="text-xs text-amber-700 underline"
                        >
                          Unpin
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-amber-900/80">{n.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
