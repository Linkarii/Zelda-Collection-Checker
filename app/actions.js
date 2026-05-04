// app/actions.js
"use server"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})


export async function saveGames(games) {
  // Stores the entire array under a single key for all users
  await redis.set("zelda_collection", JSON.stringify(games));
}

export async function getGames() {
  const data = await redis.get("zelda_collection");
  // If data exists, return it; otherwise return null
  return data ? data : null;
}
