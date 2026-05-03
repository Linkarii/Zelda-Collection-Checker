"use client";
import './globals.css';
import { useEffect, useState } from "react";
import { initialGames } from "../lib/games";
import GameCard from "../components/GameCard";
import Filters from "../components/Filters";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sort, setSort] = useState("newest");

  // State for the Add Game Form
  const [showForm, setShowForm] = useState(false);
  const [newGame, setNewGame] = useState({ title: "", platform: "", year: "", image: "" });

  useEffect(() => {
    const saved = localStorage.getItem("games");
    setGames(saved ? JSON.parse(saved) : initialGames);
  }, []);

  useEffect(() => {
    if (games && games.length > 0) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  // Function to add a new game
  const handleAddGame = (e) => {
    e.preventDefault();
    const gameToAdd = {
      ...newGame,
      id: Date.now(), // Creates a unique ID
      year: parseInt(newGame.year),
      owned: false,
      condition: ""
    };
    setGames([gameToAdd, ...games]);
    setNewGame({ title: "", platform: "", year: "", image: "" }); // Reset form
    setShowForm(false); // Hide form
  };

  // Function to delete a game
  const deleteGame = (id) => {
    if (confirm("Are you sure you want to remove this game?")) {
      setGames((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const toggleOwned = (id) => {
    setGames((prev) => prev.map((g) => g.id === id ? { ...g, owned: !g.owned, condition: "" } : g));
  };

  const updateCondition = (id, value) => {
    setGames((prev) => prev.map((g) => g.id === id ? { ...g, condition: value } : g));
  };

  const platforms = ["All", ...new Set(games.map((g) => g.platform))];

  let filtered = games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));
  if (platform !== "All") {
    filtered = filtered.filter((g) => g.platform === platform);
  }

  filtered.sort((a, b) => sort === "newest" ? b.year - a.year : a.year - b.year);

  const ownedCount = games.filter((g) => g.owned).length;
  const percent = games.length ? Math.round((ownedCount / games.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Zelda Collection</h1>
            <div className="mt-4 max-w-xs">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>{ownedCount} owned</span>
                <span>{percent}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full mt-1">
                <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold transition shadow-lg shadow-green-900/20"
          >
            {showForm ? "Cancel" : "+ Add Game"}
          </button>
        </div>

        {/* Add Game Form */}
        {showForm && (
          <form onSubmit={handleAddGame} className="bg-zinc-800/50 border border-zinc-700 p-6 rounded-2xl mb-8 grid gap-4 sm:grid-cols-2">
            <input 
              placeholder="Game Title" 
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 focus:border-green-500 outline-none"
              value={newGame.title}
              onChange={e => setNewGame({...newGame, title: e.target.value})}
              required
            />
            <input 
              placeholder="Console (e.g. N64, Switch)" 
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 focus:border-green-500 outline-none"
              value={newGame.platform}
              onChange={e => setNewGame({...newGame, platform: e.target.value})}
              required
            />
            <input 
              placeholder="Release Year" 
              type="number"
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 focus:border-green-500 outline-none"
              value={newGame.year}
              onChange={e => setNewGame({...newGame, year: e.target.value})}
              required
            />
            <input 
              placeholder="Image URL (Direct link)" 
              className="bg-zinc-900 p-3 rounded-lg border border-zinc-700 focus:border-green-500 outline-none"
              value={newGame.image}
              onChange={e => setNewGame({...newGame, image: e.target.value})}
              required
            />
            <button type="submit" className="sm:col-span-2 bg-white text-black py-3 rounded-lg font-bold hover:bg-zinc-200 transition">
              Add to Collection
            </button>
          </form>
        )}

        <Filters search={search} setSearch={setSearch} platform={platform} setPlatform={setPlatform} sort={sort} setSort={setSort} platforms={platforms} />

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {filtered.map((game) => (
            <div key={game.id} className="relative group">
              <GameCard 
                game={game} 
                onToggle={() => toggleOwned(game.id)} 
                onCondition={(val) => updateCondition(game.id, val)} 
              />
              {/* Subtle Delete Button visible on hover */}
              <button 
                onClick={() => deleteGame(game.id)}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Game"
              >
                <svg xmlns="http://w3.org" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
