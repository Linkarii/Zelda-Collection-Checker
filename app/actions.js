"use server"
import { kv } from "@vercel/kv";

export async function saveGames(games) {
  try {
    // Stores the game list in your Vercel KV database
    await kv.set("zelda_collection", games);
  } catch (error) {
    console.error("KV Save Error:", error);
  }
}

export async function getGames() {
  try {
    // Retrieves the game list from your Vercel KV database
    const data = await kv.get("zelda_collection");
    return data;
  } catch (error) {
    console.error("KV Get Error:", error);
    return null;
  }
}
