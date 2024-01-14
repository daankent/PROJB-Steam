"use client";
import Link from "next/link";
import SubTile from "@/components/subtile";
import {
  FaChevronRight,
  FaArrowDownAZ,
  FaArrowDownZA,
  FaArrowDown19,
  FaArrowDown91,
  FaStopwatch,
  FaBan,
  FaCalendarPlus,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import formatPlaytime from "@/functions/formatPlaytime";

export default function GamesPage({ sort, title }: any) {
  const [games, setGames] = useState<any>();
  const [sortType, setSort] = useState<string>("x");
  const [loading, setLoading] = useState<boolean>(false);

  const [hideNoPlaytime, setHideNoPlaytime] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const res = sort(sortType).then((games: any) => {
      console.log(games);
      setGames(games);
      setLoading(false);
    });
  }, [sortType]);
  return (
    <div>
      <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
        {loading && <h1>Laden....</h1>}
        {title} ({games?.length})
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

                  <div className="flex flex-row gap-2">
                    <Link href={`/speelmoment/create/${game.appid}`}>
                      <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                        <FaCalendarPlus />
                      </div>
                    </Link>
                    <Link href={`/game/${game.appid}`}>
                      <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                        <FaChevronRight />
                      </div>
                    </Link>
                  </div>
                </div>
                <h3 className="text-donkerblauw p-2 font-semibold ">
                  {formatPlaytime(game.playtime_forever)} gespeeld sinds aankoop
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
