import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import { FaBan, FaChevronRight, FaPlus, FaSteam } from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/home/gameList";
import CreateSpeelmomentForm from "@/components/speelmoment/createSpeelmoment";
async function getData(appid: any) {
  const res = await fetch(
    `http://localhost:8000/gameInfoExtended/?id=${appid}`,
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
export default async function CreateSpeelmomentPage({ params }: any) {
  const steamId = cookies().get("steamid")?.value;

  if (!params.id) {
    return "Geen id aanwezig";
  }
  const data = await getData(params.id);
  const game = data;
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl  mb-8">
            Speelmoment aanmaken
          </h1>
          <CreateSpeelmomentForm game={game} id={params.id} creator={steamId} />
        </Section>
      </LoggedFrame>
    </div>
  );
}
