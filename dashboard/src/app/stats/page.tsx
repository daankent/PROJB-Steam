import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import Tile from "@/components/tile";
import { FaChevronRight } from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
import { API_URL } from "@/APIURL";
import GenreStats from "@/components/stats/genreStats";
import PrijsSpeeltijdStats from "@/components/stats/prijsSpeeltijd";
import DeveloperStats from "@/components/stats/developerStats";

async function getGenreData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(`${API_URL}/genrestats/`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}

async function getPrijsSPeeltijdData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(`${API_URL}/priceplaytimestats/`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}

export default async function StatsPage() {
  const genreData = await getGenreData();
  const genres = genreData;

  const prijsSpeeltijdData = await getPrijsSPeeltijdData();
  const prijsSpeeltijd = prijsSpeeltijdData;
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
            Algemene Statistieken
          </h1>
          <div className="w-full grid grid-cols-10 gap-10">
            <div className="col-span-5">
              <Tile>
                <h2 className="text-lichtgrijs  font-bold text-xl italic mb-2">
                  Game genres:
                </h2>
                <p className="italic text-lichtgrijs  mb-2">
                  Visualistatie van alle het aantal keer dat een genre voorkomt
                  in alle steam games.
                </p>
                <GenreStats data={genres} />
              </Tile>
            </div>
            <div className="col-span-5">
              <Tile>
                <h2 className="text-lichtgrijs  font-bold text-xl italic mb-2">
                  Prijs vs Speeltijd:
                </h2>
                <p className="italic text-lichtgrijs  mb-2">
                  Visualistatie van alle het aantal keer dat een genre voorkomt
                  in alle steam games.
                </p>
                <PrijsSpeeltijdStats data={prijsSpeeltijd} />
              </Tile>
            </div>
          </div>
        </Section>
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
            Developer Statistieken
          </h1>
          <div className="w-full ">
            <DeveloperStats />
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
