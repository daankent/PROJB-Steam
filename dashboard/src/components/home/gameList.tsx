import Link from "next/link";
import { cookies } from "next/headers";

import SubTile from "@/components/subtile";

import { FaChevronRight } from "react-icons/fa6";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(
    `http://localhost:8000/playerOwnedGames/?id=${steamId}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    throw new Error("Fout bij het ophalen van de vrienden");
  }
  return res.json();
}

export default async function GameList() {
  const data = await getData();
  const games = data;
  let i = 0;
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {games.response.games.map((game: any) => {
        if (game.playtime_forever <= 0) return;
        i++;

        if (i > 9) return;
        return (
          <div className="col-span-1 w-full ">
            <SubTile key={game.appid}>
              <div className="flex flex-row items-center">
                <img
                  className="rounded-md mr-4"
                  src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                  alt=""
                />
                <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%] text-clip">
                  {game.name}
                </h2>
                <Link
                  href={`https://store.steampowered.com/app/${game.appid}/`}
                  target="_blank"
                >
                  <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </SubTile>
          </div>
        );
      })}
      <div className="flex flex-row justify-end col-span-3 italic">
        <Link
          href="/games"
          className="text-donkerzwartblauw font-bold hover:text-blauwgrijs flex flex-row items-center"
        >
          Alle games
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
