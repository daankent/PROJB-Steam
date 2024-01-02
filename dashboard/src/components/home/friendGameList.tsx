import Link from "next/link";
import { cookies } from "next/headers";

import SubTile from "@/components/subtile";

import { FaSteam } from "react-icons/fa6";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(
    `http://localhost:8000/playerFriendsOwnedGames/playtime-desc?id=${steamId}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    throw new Error("Fout bij het ophalen van de vrienden");
  }
  return res.json();
}

export default async function FriendGameList() {
  const data = await getData();
  const games = data;
  let i = 0;
  return (
    <>
      <div className="flex flex-row mb-2">
        <h1>Aantal: {games.length}</h1>
        <h2 className="italic ml-4">
          Gesorteerd op speeltijd van hoog naar laag
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {games.length > 0 ? (
          games.map((game: any) => {
            if (game.playtime_forever <= 0) return;
            i++;

            if (i > 15) return;
            return (
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
                    <div className="text-blauwgrijs p-2 rounded-md  hover:text-donkerblauw">
                      <FaSteam />
                    </div>
                  </Link>
                </div>
              </SubTile>
            );
          })
        ) : (
          <SubTile>
            <p>
              Geen games gevonden, mogelijk heeft de steam gebruiker zijn/haar
              spellijst op privé staan of bezit deze gebruiker geen games
            </p>
          </SubTile>
        )}
      </div>

      {/* <div className="flex flex-row justify-end col-span-3 italic">
        <Link
          href="/friendsGames"
          className="text-donkerzwartblauw font-bold hover:text-blauwgrijs flex flex-row items-center"
        >
          Alle games
          <FaChevronRight />
        </Link>
      </div> */}
    </>
  );
}