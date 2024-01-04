import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";
import Chip from "@/components/chip";

import {
  FaChevronRight,
  FaSteam,
  FaLock,
  FaTriangleExclamation,
  FaWindows,
  FaApple,
  FaLinux,
  FaThumbsDown,
  FaThumbsUp,
  FaPeopleGroup,
  FaA,
} from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
async function getData(id: any) {
  const res = await fetch(`http://localhost:8000/gameInfoExtended/?id=${id}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}
export default async function GamePage({ params }: any) {
  const data = await getData(params.id);
  const game = data;
  console.log("game", game);
  if (!game || game.length < 1)
    return (
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="font-bold text-lg">
            Er ging iets fout bij het vinden van de game
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
            <div className="flex flex-col mt-4  items-center flex-1">
              <img
                className="rounded-xl mr-4 w-full shadow-xl"
                src={`https://cdn.akamai.steamstatic.com/steam/apps/${params.id}/header.jpg`}
                alt=""
              />
              <div className="flex flex-row items-center gap-5 p-2">
                <h1 className="text-lichtgrijs text-3xl font-bold ">
                  {game.name}
                </h1>

                <Link
                  href={`https://store.steampowered.com/app/${params.id}`}
                  target="_blank"
                  className="text-3xl text-blauwgrijs bg-lichtgrijs rounded-full hover:text-donkerblauw"
                >
                  <FaSteam />
                </Link>
              </div>
              <div className="flex flex-row">
                {game.platforms.includes("windows") && (
                  <Chip>
                    <div className="px-4 py-2">
                      <FaWindows />
                    </div>
                  </Chip>
                )}

                {game.platforms.includes("mac") && (
                  <Chip>
                    <div className="px-4 py-2">
                      <FaApple />
                    </div>
                  </Chip>
                )}

                {game.platforms.includes("linux") && (
                  <Chip>
                    <div className="px-4 py-2">
                      <FaLinux />
                    </div>
                  </Chip>
                )}
              </div>
              <div className="flex flex-row">
                {game.ratings.known && (
                  <>
                    <Chip>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <span className="text-green-800">
                          <FaThumbsUp />
                        </span>{" "}
                        {game.ratings.positive}
                      </div>
                    </Chip>

                    <Chip>
                      <div className="flex flex-row items-center gap-2 p-2">
                        <span className="text-red-800">
                          <FaThumbsDown />
                        </span>{" "}
                        {game.ratings.negative}
                      </div>
                    </Chip>
                  </>
                )}

                {game.owners.known && (
                  <Chip>
                    <div className="flex flex-row items-center gap-2 p-2">
                      <span className="text-2xl">
                        <FaPeopleGroup />
                      </span>
                      {game.owners.minmax}
                    </div>
                  </Chip>
                )}
              </div>

              {/* TODO: prijs converten naar euro */}
              {/* <h2 className="font-bold text-lichtgrijs">€{game.prijs}</h2> */}
              <h1 className="font-bold text-lichtgrijs mt-4 text-xl">
                Categorieën
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {game.categories.map((cat: any) => {
                  return (
                    <Chip key={cat}>
                      <p className="text-xs p-2 font-semibold text-donkerzwartblauw text-center">
                        {cat}
                      </p>
                    </Chip>
                  );
                })}
              </div>

              <h1 className="font-bold text-lichtgrijs mt-4 text-xl">Genres</h1>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {game.genres.map((gen: any) => {
                  return (
                    <Chip key={gen}>
                      <p className="text-xs p-2 font-semibold text-donkerzwartblauw text-center">
                        {gen}
                      </p>
                    </Chip>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
