// Component die de zoekbalk weergeeft
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { API_URL } from "@/APIURL";
import Tile from "@/components/tile";
export default function ZoekBalk() {
  const [filter, setFilter] = useState<any>("name");
  const [zoekterm, setZoekterm] = useState<any>("");
  const [resultaten, setResultaten] = useState<any>([]);

  async function zoek() {
    const res = await fetch(
      `${API_URL}/zoeken?filter=${filter}&zoekterm=${zoekterm}`
    );
    if (res.ok) {
      const results = await res.json();
      setResultaten(results);
    }
  }

  return (
    <div className="">
      <div className="bg-donkerblauw max-w-[750px] flex flex-col gap-4 md:flex-row p-2 rounded-md md:rounded-full m-auto">
        <select
          className="bg-blauwgrijs  rounded-full mr-2 text-lichtgrijs px-2"
          name="filter"
          id="filter"
          defaultValue={"name"}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="fk" disabled>
            filter kiezen
          </option>
          <option value={"appid"}>AppID</option>
          <option value={"name"}>Gamenaam</option>
          <option value={"developer"}>Developer</option>
          <option value={"publisher"}>Publisher</option>
          <option value={"platforms"}>Platforms</option>
          <option value={"categories"}>Categorieën</option>
          <option value={"genres"}>Genres</option>
        </select>
        <input
          type="text"
          placeholder="vul een zoekterm in om te zoeken..."
          className="bg-blauwgrijs   rounded-full mr-2 md:flex-1 px-2 text-white"
          value={zoekterm}
          onChange={(e) => {
            setZoekterm(e.target.value);
          }}
        />
        <div
          onClick={zoek}
          className="bg-purple-500 py-2 px-8 rounded-full cursor-pointer hover:bg-purple-700"
        >
          Zoek{" "}
        </div>
      </div>

      <div className="flex flex-col max-w-[700px] m-auto gap-2 mt-4">
        {resultaten.length > 0 ? (
          resultaten.map((r: any) => {
            return (
              <Tile key={r.appid}>
                <div className="flex flex-col ">
                  <img
                    className="rounded-xl   shadow-xl"
                    src={`https://cdn.akamai.steamstatic.com/steam/apps/${r.appid}/header.jpg`}
                    alt=""
                  />
                  <div className="flex flex-row mt-4">
                    <h2 className="flex-1 font-bold text-xl">{r.name}</h2>
                    <Link href={`/game/${r.appid}`}>
                      <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                        <FaChevronRight />
                      </div>
                    </Link>
                  </div>
                </div>
              </Tile>
            );
          })
        ) : (
          <p>Geen resultaten, vul een zoekterm in om te zoeken...</p>
        )}
      </div>
    </div>
  );
}
