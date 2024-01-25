// Een component die een korte lijst van speelmomenten laat zien op de homepage

import Link from "next/link";
import { cookies } from "next/headers";
import SubTile from "@/components/subtile";
import { API_URL } from "@/APIURL";
import { FaChevronRight } from "react-icons/fa6";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(`${API_URL}/speelmomenten?id=${steamId}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de vrienden");
    console.log("vriendenophaal fout");
  }
  return res.json();
}

export default async function SpeelmomentenList() {
  const data = await getData();
  const speelmomenten = data;
  let i = 0;
  return (
    <>
      <div className="flex flex-col">
        {speelmomenten.private?.deelnames?.map((m: any) => {
          return (
            <SubTile key={m.sid}>
              <div className="flex flex-row items-center">
                <div className="flex-1">
                  <h1 className="text-donkerblauw font-bold">
                    {new Date(m.datum).toDateString()}{" "}
                    {m.starttijd.split(":")[0]}:{m.starttijd.split(":")[1]}-
                    {m.eindtijd.split(":")[0]}:{m.eindtijd.split(":")[1]}
                  </h1>
                  <h2>{m.game_name}</h2>
                </div>
                <Link href={`/speelmoment/info/${m.sid}`}>
                  <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </SubTile>
          );
        })}
        <h1 className="text-donkerzwartblauw font-bold text-xl italic mb-2">
          Uitnodigingen
        </h1>
        {speelmomenten.private.uitnodigingen.length <= 0 && (
          <h3 className="text-lichtgrijs  font-bold text-lg italic mb-2">
            Je hebt momenteel geen uitnodigengen
          </h3>
        )}
        {speelmomenten.private.uitnodigingen.map((m: any) => {
          return (
            <SubTile key={m.sid}>
              <div className="flex flex-row items-center">
                <div className="flex-1">
                  <h1 className="text-donkerblauw font-bold">
                    {new Date(m.datum).toDateString()}{" "}
                    {m.starttijd.split(":")[0]}:{m.starttijd.split(":")[1]}-
                    {m.eindtijd.split(":")[0]}:{m.eindtijd.split(":")[1]}
                  </h1>
                  <h2>{m.game_name}</h2>
                </div>

                <Link href={`/speelmoment/info/${m.sid}`}>
                  <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </SubTile>
          );
        })}
      </div>

      <div className="flex flex-row justify-end col-span-3 italic"></div>
    </>
  );
}
