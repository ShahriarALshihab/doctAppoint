"use client";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by doctor name...",
}) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
        🔍
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field pl-11"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-lg"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
