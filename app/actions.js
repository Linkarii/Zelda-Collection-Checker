"use server"
import { Redis } from "@upstash/redis"; // Note the capital R
import { revalidatePath } from "next/cache";

// This automatically looks for UPSTASH_REDIS_REST_URL and TOKEN
const redis = Redis.fromEnv(); 

export async function saveGamesAction(games) {
  try {
    // Save to the key 'zelda_collection'
    await redis.set("zelda_collection", JSON.stringify(games));
    revalidatePath("/"); // Refresh the UI data
  } catch (error) {
    console.error("Redis Save Error:", error);
  }
}

export async function getGamesAction() {
  try {
    const data = await redis.get("zelda_collection");
    // If it's a string, we parse it; if not, we return it as is
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.error("Redis Load Error:", error);
    return null;
  }
}
