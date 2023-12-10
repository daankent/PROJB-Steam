import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import { FaChevronRight, FaSteam } from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/home/gameList";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(
    `http://localhost:8000/playerOwnedGames/?id=${steamId}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    throw new Error("Fout bij het ophalen van de games");
  }
  return res.json();
}
export default async function GamesPage() {
  const data = await getData();
  const games = data?.response?.games;
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
            Jouw Games ({games.length})
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {games.map((game: any) => {
              //   if (!(game.playtime_forever > 0)) return;
              return (
                <SubTile>
                  <div className="flex flex-row items-center">
                    <img
                      className="rounded-md mr-4"
                      src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                      alt=""
                    />
                    <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%] text-clip text-lg">
                      {game.name}
                    </h2>

                    <Link
                      href={`https://store.steampowered.com/app/${game.appid}/`}
                      target="_blank"
                    >
                      <div className="bg-transparent p-2 rounded-md text-donkerblauw hover:text-blauw text-xl">
                        <FaSteam />
                      </div>
                    </Link>
                  </div>
                  <h3 className="text-donkerblauw p-2 font-semibold ">
                    {game.playtime_forever} minuten gespeeld sinds aankoop
                  </h3>
                </SubTile>
              );
            })}
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
