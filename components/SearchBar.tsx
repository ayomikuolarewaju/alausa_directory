"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ministries, agencies, officers..."
        className="flex-1 px-4 py-3 rounded-lg text-sm font-medium outline-none"
        style={{ border: "2px solid #0D0D0D", background: "#fff" }}
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
        style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}
      >
        Search
      </button>
    </form>
  );
}
