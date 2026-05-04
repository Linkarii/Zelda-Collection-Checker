"use server"
import { kv } from "@vercel/kv";

export async function saveGamesAction(games) {
  // This sends your game list to the Vercel cloud
  await kv.set("zelda_collection", games);
}

export async function getGamesAction() {
  // This pulls the game list from the Vercel cloud
  return await kv.get("zelda_collection");
}
