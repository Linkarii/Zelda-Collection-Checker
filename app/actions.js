"use server"
import { Redis } from "@upstash/redis"

// Credentials are automatically injected by Vercel after linking
const redis = Redis.fromEnv()

export async function saveGames(games) {
  // Stores the entire array under a single key for all users
  await redis.set("zelda_collection", JSON.stringify(games));
}

export async function getGames() {
  const data = await redis.get("zelda_collection");
  // If data exists, return it; otherwise return null
  return data ? data : null;
}
