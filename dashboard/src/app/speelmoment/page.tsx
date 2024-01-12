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
import { API_URL } from "@/APIURL";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(`${API_URL}/speelmomenten/?id=${steamId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}
export default async function SpeelmomentenPage() {
  const data = await getData();
  const speelmomenten = data;

  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl  mb-8">
            Speelmomenten
          </h1>
          {speelmomenten.private.deelnames.length > 0 && (
            <div className="">
              <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
                Jij neemt deel aan:
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {speelmomenten.private?.deelnames?.map((m: any) => {
                  return (
                    <Tile key={m.sid}>
                      <div className="flex flex-row items-center">
                        <div className="flex-1">
                          <h1 className="text-donkerblauw font-bold">
                            {new Date(m.datum).toDateString()}{" "}
                            {m.starttijd.split(":")[0]}:
                            {m.starttijd.split(":")[1]}-
                            {m.eindtijd.split(":")[0]}:
                            {m.eindtijd.split(":")[1]}
                          </h1>
                          <h2>{m.game_name}</h2>
                        </div>
                        <Link href={`/speelmoment/info/${m.sid}`}>
                          <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                            <FaChevronRight />
                          </div>
                        </Link>
                      </div>
                    </Tile>
                  );
                })}
              </div>
            </div>
          )}
        </Section>

        <Section>
          <div className="">
            <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
              Uitnodigingen:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {speelmomenten.private.uitnodigingen.length <= 0 && (
                <h3 className="text-lichtgrijs  font-bold text-lg italic mb-2">
                  Je hebt momenteel geen uitnodigengen
                </h3>
              )}
              {speelmomenten.private.uitnodigingen.map((m: any) => {
                return (
                  <Tile key={m.sid}>
                    <div className="flex flex-row items-center">
                      <div className="flex-1">
                        <h1 className="text-donkerblauw font-bold">
                          {new Date(m.datum).toDateString()}{" "}
                          {m.starttijd.split(":")[0]}:
                          {m.starttijd.split(":")[1]}-{m.eindtijd.split(":")[0]}
                          :{m.eindtijd.split(":")[1]}
                        </h1>
                        <h2>{m.game_name}</h2>
                      </div>

                      <Link href={`/speelmoment/info/${m.sid}`}>
                        <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                          <FaChevronRight />
                        </div>
                      </Link>
                    </div>
                  </Tile>
                );
              })}
            </div>
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
