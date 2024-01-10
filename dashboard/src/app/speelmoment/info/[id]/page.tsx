import Link from "next/link";
import { cookies } from "next/headers";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import {
  FaBan,
  FaCheck,
  FaChevronRight,
  FaPlus,
  FaSteam,
} from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/home/gameList";
import CreateSpeelmomentForm from "@/components/speelmoment/createSpeelmoment";
import UitnodigingWidget from "@/components/speelmoment/uitnodigingWidget";
import { redirect } from "next/navigation";
import VriendenUitnodigWidget from "@/components/speelmoment/vriendenUitnodigWidget";
async function getData(id: any) {
  const res = await fetch(`http://localhost:8000/speelmoment/?id=${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}

async function getFriends(steamid: any) {
  const res = await fetch(
    `http://localhost:8000/playerFriendsExtended/?id=${steamid}`,
    {
      next: { revalidate: 300 },
    }
  );
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}
export default async function SpeelmomentInfo({ params }: any) {
  const steamId = cookies().get("steamid")?.value;

  if (!params.id) {
    return "Geen id aanwezig";
  }
  const data = await getData(params.id);
  const m = data;
  const friendData = await getFriends(steamId);
  const friends = friendData;
  if (m.detail) {
    backToSpeelmomenten();
  }
  function checkU(steamid: any, u: any) {
    let check = false;
    let r = true;
    let id = null;
    u.map((i: any) => {
      if (i.player == steamid) {
        r = false;
        if (!i.answered && !i.accepted) {
          check = true;
          id = i.id;
        }
      }
    });
    if (!check && r) {
      backToSpeelmomenten();
    }
    return { check, id };
  }

  function backToSpeelmomenten() {
    redirect("/speelmoment");
  }

  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl  mb-8">
            Speelmoment:
          </h1>
          {checkU(steamId, m.uitnodigingen).check && (
            <UitnodigingWidget id={checkU(steamId, m.uitnodigingen).id} />
          )}
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-lichtgrijs  font-bold text-3xl  mb-2">
              {m.speelmoment.creator_name} heeft jou uitgenodigd voor:
            </h2>
            <img
              className="rounded-xl mr-4 w-[50%] shadow-xl"
              src={`https://cdn.akamai.steamstatic.com/steam/apps/${m.speelmoment.game_id}/header.jpg`}
              alt=""
            />
            <h3 className="text-lichtgrijs  font-bold text-xl  mt-2 mb-2">
              {m.speelmoment.game_name}
            </h3>
            <h3 className="text-lichtgrijs  font-bold text-xl  mt-2 mb-2">
              {m.speelmoment.datum}
            </h3>
            <h3 className="text-lichtgrijs  font-bold text-xl  mt-2 mb-2">
              {m.speelmoment.starttijd.split(":")[0]}:
              {m.speelmoment.starttijd.split(":")[1]}-
              {m.speelmoment.eindtijd.split(":")[0]}:
              {m.speelmoment.eindtijd.split(":")[1]}
            </h3>
          </div>
          <div className="max-w-[500px] m-auto flex flex-col justify-center text-center mt-8 gap-2">
            <h2 className="text-lichtgrijs  font-bold text-xl  mb-2">
              Uitgenodigde spelers:
            </h2>
            {m.uitnodigingen.map((u: any) => {
              return (
                <Tile key={u.player}>
                  <div className="flex flex-row items-center">
                    <h1 className="flex-1 text-left">{u.player_name}</h1>
                    {u.accepted && (
                      <div className="bg-green-500 py-2 px-4 rounded-full bg-opacity-50">
                        Geaccepteerd
                      </div>
                    )}
                    {!u.accepted && u.answered && (
                      <div className="bg-red-500 py-2 px-4 rounded-full bg-opacity-50">
                        Geweigerd
                      </div>
                    )}
                    {!u.accepted && !u.answered && (
                      <div className="bg-blue-500 py-2 px-4 rounded-full bg-opacity-50">
                        geen reactie
                      </div>
                    )}
                  </div>
                </Tile>
              );
            })}
          </div>
          {steamId == m.speelmoment.creator && (
            <VriendenUitnodigWidget
              friends={friends}
              u={m.uitnodigingen}
              speelmoment={m.speelmoment.id}
            />
          )}
        </Section>
      </LoggedFrame>
    </div>
  );
}
