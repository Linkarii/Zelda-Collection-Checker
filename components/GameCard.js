export default function GameCard({ game, onToggle, onCondition }) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-green-500 transition hover:scale-[1.02] overflow-hidden">
      
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{game.title}</h3>
        <p className="text-sm text-zinc-400">
          {game.platform} • {game.year}
        </p>

        <button
          onClick={onToggle}
          className={`w-full mt-3 py-2 rounded-lg font-medium ${
            game.owned
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {game.owned ? "Owned" : "Not Owned"}
        </button>

        {game.owned && (
          <select
            value={game.condition}
            onChange={(e) => onCondition(e.target.value)}
            className="w-full mt-3 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          >
            <option value="">Condition</option>
            <option>Loose</option>
            <option>Game + Box</option>
            <option>CIB</option>
          </select>
        )}
      </div>
    </div>
  );
}
