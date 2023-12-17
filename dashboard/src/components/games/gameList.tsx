"use client";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";

import {
  FaChevronRight,
  FaSteam,
  FaArrowDownAZ,
  FaArrowDownZA,
  FaArrowDown19,
  FaArrowDown91,
  FaStopwatch,
  FaBan,
} from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/games/gameList";
import { useEffect, useState } from "react";

export default function GamesPage({ sort }: any) {
  const [games, setGames] = useState<any>();
  const [sortType, setSort] = useState<string>("x");
  const [hideNoPlaytime, setHideNoPlaytime] = useState<boolean>(false);
  useEffect(() => {
    const res = sort(sortType).then((games: any) => {
      console.log(games);
      setGames(games);
    });
  }, [sortType]);
  return (
    <div>
      <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
        Jouw Games ({games?.length})
      </h1>
      <div className=" flex flex-col md:flex-row mb-4 p-2 justify-center md:items-center gap-2">
        <h2 className="text-lichtgrijs italic font-bold">Filters: </h2>
        <div
          onClick={() => {
            setHideNoPlaytime(!hideNoPlaytime);
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer text-center shadow-md hover:bg-purple-800 ${
            hideNoPlaytime ? "bg-blauwgrijs text-lichtgrijs" : "bg-blauw"
          }`}
        >
          verberg games zonder speeltijd
        </div>

        <div
          onClick={() => {
            setSort("az");
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer justify-center shadow-md hover:bg-purple-800 flex flex-row items-center gap-2  hover:text-lichtgrijs ${
            sortType == "az"
              ? "bg-blauwgrijs text-lichtgrijs"
              : "bg-blauw text-blauwgrijs"
          }`}
        >
          <span className="text-xl ">
            <FaArrowDownAZ />
          </span>
        </div>

        <div
          onClick={() => {
            setSort("za");
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer justify-center shadow-md hover:bg-purple-800 flex flex-row items-center gap-2  hover:text-lichtgrijs ${
            sortType == "za"
              ? "bg-blauwgrijs text-lichtgrijs"
              : "bg-blauw text-blauwgrijs"
          }`}
        >
          <span className="text-xl ">
            <FaArrowDownZA />
          </span>
        </div>

        <div
          onClick={() => {
            setSort("playtime-asc");
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer justify-center shadow-md hover:bg-purple-800 flex flex-row items-center gap-2  hover:text-lichtgrijs ${
            sortType == "playtime-asc"
              ? "bg-blauwgrijs text-lichtgrijs"
              : "bg-blauw text-blauwgrijs"
          }`}
        >
          <span className="text-xl flex flex-row items-center ">
            <FaStopwatch />
            <FaArrowDown19 />
          </span>
        </div>

        <div
          onClick={() => {
            setSort("playtime-desc");
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer justify-center shadow-md hover:bg-purple-800 flex flex-row items-center gap-2  hover:text-lichtgrijs ${
            sortType == "playtime-desc"
              ? "bg-blauwgrijs text-lichtgrijs"
              : "bg-blauw text-blauwgrijs"
          }`}
        >
          <span className=" text-xl flex flex-row items-center ">
            <FaStopwatch />
            <FaArrowDown91 />
          </span>
        </div>

        <div
          onClick={() => {
            setSort("x");
            setHideNoPlaytime(false);
          }}
          className={` p-2 ml-2 rounded-md cursor-pointer justify-center shadow-md bg-red-900 hover:bg-red-700 flex flex-row items-center gap-2  text-lichtgrijs `}
        >
          reset
          <span className=" text-xl flex flex-row items-center ">
            <FaBan />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {games?.length > 0 ? (
          games?.map((game: any) => {
            if (hideNoPlaytime) {
              if (!(game.playtime_forever > 0)) return;
            }

            return (
              <SubTile key={game.appid}>
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
    </div>
  );
}
