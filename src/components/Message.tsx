import React from "react";
import { Note } from "../App";

type Props = {
  note: Note;
  isSelected: boolean;
  onTogglePin: (id: number) => void;
  onSelect: () => void;
  onKeyDown: (e: React.KeyboardEvent, id: number) => void;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Message({
  note,
  isSelected,
  onTogglePin,
  onSelect,
  onKeyDown,
}: Props) {
  return (
    <article
      tabIndex={0}
      onFocus={onSelect}
      onKeyDown={(e) => onKeyDown(e, note.id)}
      className={
        "group rounded-xl border bg-white p-4 shadow-sm transition-all outline-none " +
        (isSelected ? "border-neutral-900 shadow-md" : "border-neutral-200 hover:shadow")
      }
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onTogglePin(note.id)}
          className={
            "mt-0.5 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition " +
            (note.pinned
              ? "border-amber-500 bg-amber-50 text-amber-700"
              : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100")
          }
        >
          <span>📌</span>
          <span>{note.pinned ? "Pinned" : "Pin"}</span>
        </button>
        <div className="flex-1">
          <h3 className="text-base font-semibold leading-tight">{note.title}</h3>
          <p className="mt-1 text-sm text-neutral-600">{note.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span className="rounded-full bg-neutral-100 px-2 py-1 border border-neutral-200">
              {note.author}
            </span>
            <time className="rounded-full bg-neutral-100 px-2 py-1 border border-neutral-200">
              {formatDate(note.created_at)}
            </time>
            {note.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-2 py-1 border border-neutral-200"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
