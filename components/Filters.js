export default function Filters({
  search,
  setSearch,
  platform,
  setPlatform,
  sort,
  setSort,
  platforms,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <input
        placeholder="Search games..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
      >
        {platforms.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
