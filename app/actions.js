"use server"
import { createClient } from '@vercel/kv';

// This manually maps the library to your specific Vercel variable names
const kv = createClient({
  url: process.env.kv_KV_REST_API_URL,
  token: process.env.kv_KV_REST_API_TOKEN,
});

export async function saveGames(games) {
  try {
    await kv.set("zelda_collection", games);
    return { success: true };
  } catch (error) {
    console.error("KV Save Error:", error);
    throw new Error(error.message);
  }
}

export async function getGames() {
  try {
    const data = await kv.get("zelda_collection");
    return data;
  } catch (error) {
    console.error("KV Get Error:", error);
    return null;
  }
}
