import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import { revalidateTag } from "next/cache";

import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/games/gameList";
async function getData(sort = "x") {
  "use server";
  const steamId = cookies().get("steamid")?.value;

  const res = await fetch(
    `http://localhost:8000/playerOwnedGames/${sort}?id=${steamId}`,
    {
      next: { revalidate: 600, tags: ["ownedGames"] },
      // cache: "no-cache",
    }
  );
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}

async function sort(sort: any) {
  "use server";
  // revalidateTag("ownedGames");
  const data = await getData(sort);
  console.log("SSSSS", data);
  return data;
}
export default async function GamesPage() {
  const data = await getData();
  const games = data;
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <GameList sort={sort} data={games} />
        </Section>
      </LoggedFrame>
    </div>
  );
}
