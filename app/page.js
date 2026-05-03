"use client";

import './globals.css';\
import { useEffect, useState } from "react";
import { initialGames } from "../lib/games";
import GameCard from "../components/GameCard";
import Filters from "../components/Filters";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const saved = localStorage.getItem("games");
    setGames(saved ? JSON.parse(saved) : initialGames);
  }, []);

  useEffect(() => {
    if (games.length) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  const toggleOwned = (id) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, owned: !g.owned, condition: "" }
          : g
      )
    );
  };

  const updateCondition = (id, value) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, condition: value } : g
      )
    );
  };

  const platforms = ["All", ...new Set(games.map((g) => g.platform))];

  let filtered = games.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  if (platform !== "All") {
    filtered = filtered.filter((g) => g.platform === platform);
  }

  filtered.sort((a, b) =>
    sort === "newest" ? b.year - a.year : a.year - b.year
  );

  const ownedCount = games.filter((g) => g.owned).length;
  const percent = games.length
    ? Math.round((ownedCount / games.length) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-6 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Zelda Collection</h1>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-zinc-400">
            <span>{ownedCount} owned</span>
            <span>{percent}%</span>
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full mt-1">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        platform={platform}
        setPlatform={setPlatform}
        sort={sort}
        setSort={setSort}
        platforms={platforms}
      />

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onToggle={() => toggleOwned(game.id)}
            onCondition={(val) => updateCondition(game.id, val)}
          />
        ))}
      </div>
    </main>
  );
}