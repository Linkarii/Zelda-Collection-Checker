export default function GameCard({ game, onToggle, onCondition }) {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Super Tall Image Area */}
      <div className="relative w-full h-[600px] bg-zinc-800">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
        />
        {/* Floating Platform Tag */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
          {game.platform}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg leading-tight mb-1">{game.title}</h3>
        <p className="text-zinc-500 text-sm mb-4">{game.year}</p>

        <div className="mt-auto space-y-2">
          <button 
            onClick={onToggle} 
            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${
              game.owned 
                ? "bg-green-600 text-white" 
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {game.owned ? "✓ Owned" : "Not Owned"}
          </button>

          {game.owned && (
            <select 
              value={game.condition} 
              onChange={(e) => onCondition(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="">Condition...</option>
              <option>Loose</option>
              <option>Game + Box</option>
              <option>CIB</option>
              <option>Sealed</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
