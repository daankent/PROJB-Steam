import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import {
  FaChevronRight,
  FaSteam,
  FaLock,
  FaTriangleExclamation,
} from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
async function getData(id: any) {
  const res = await fetch(
    `http://localhost:8000/playerInfoExtended/?id=${id}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}
export default async function PlayerPage({ params }: any) {
  const data = await getData(params.id);
  const player = data[0];
  if (!player)
    return (
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="font-bold text-lg">
            Er ging iets fout bij het vinden van deze speler
          </h1>
        </Section>
      </LoggedFrame>
    );
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <div className="flex flex-row max-w-[1000px] m-auto items-center">
            <div className="flex flex-row mt-4  items-center flex-1">
              <img
                className="rounded-md mr-4 w-16 h-16"
                src={player.avatar}
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-lichtgrijs text-3xl font-bold ">
                  {player.personaname}
                </h1>
                {player.realname && (
                  <h2 className="italic  text-lichtgrijs">{player.realname}</h2>
                )}
              </div>
            </div>
            <Link
              href={player.profileurl}
              target="_blank"
              className="text-3xl text-blauwgrijs bg-lichtgrijs rounded-full hover:text-donkerblauw"
            >
              <FaSteam />
            </Link>
          </div>
        </Section>

        {player.communityvisibilitystate == "3" ? (
          <Section>
            <div className="max-w-[1200px] m-auto">
              <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
                Games ({player.games.length})
              </h1>
              {player.games.length == 0 && (
                <SubTile>
                  <div className="flex flex-row items-center">
                    <div className="text-xl text-yellow-500">
                      <FaTriangleExclamation />
                    </div>
                    <p className="font-semibold ml-4">
                      Geen games gevonden voor deze speler, hij/zij bezit geen
                      games of heeft geen toestemming gegeven om de games weer
                      te geven.
                    </p>
                  </div>
                </SubTile>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {player.games.map((game: any) => {
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
            </div>
          </Section>
        ) : (
          <Section>
            <div className="max-w-[1000px] m-auto flex flex-row items-center justify-center text-2xl font-bold gap-5 text-donkerblauw">
              <FaLock />
              <h2>Dit account is privé.</h2>
            </div>
          </Section>
        )}

        {player.communityvisibilitystate == "3" && (
          <Section>
            <div className="max-w-[1200px] m-auto">
              <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
                Vrienden ({player.friends.length})
              </h1>
              {player.friends.length == 0 && (
                <SubTile>
                  <div className="flex flex-row items-center">
                    <div className="text-xl text-yellow-500">
                      <FaTriangleExclamation />
                    </div>
                    <p className="font-semibold ml-4">
                      Geen vrienden gevonden voor deze speler, hij/zij heeft
                      geen vrienden of heeft geen toestemming gegeven om deze
                      weer te geven.
                    </p>
                  </div>
                </SubTile>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {player.friends.map((friend: any) => {
                  return (
                    <SubTile>
                      <div className="flex flex-row items-center">
                        <img
                          className="rounded-md mr-4"
                          src={friend.avatar}
                          alt=""
                        />
                        <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%] text-clip text-lg">
                          {friend.personaname}
                        </h2>

                        <Link href={`/player/${friend.steamid}`}>
                          <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                            <FaChevronRight />
                          </div>
                        </Link>
                      </div>
                    </SubTile>
                  );
                })}
              </div>
            </div>
          </Section>
        )}
      </LoggedFrame>
    </div>
  );
}
