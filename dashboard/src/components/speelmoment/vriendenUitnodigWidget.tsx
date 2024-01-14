"use client";
import { useRouter } from "next/navigation";
import Tile from "../tile";

import Section from "../section";
import { API_URL } from "@/APIURL";
export default function VriendenUitnodigWidget({
  friends,
  u,
  speelmoment,
}: any) {
  const router = useRouter();
  let uitgenodigden: any = [];
  u.map((i: any) => {
    uitgenodigden.push(i.player);
  });

  async function invite(id: any, name: any) {
    const res = await fetch(
      `${API_URL}/uitnodiging?player=${id}&speelmoment=${speelmoment}&player_name=${name}`
    );
    router.refresh();
  }

  return (
    <Section>
      <h1 className="text-lichtgrijs  font-bold text-lg  text-center">
        Vrienden uitnodigen
      </h1>
      <div className="max-w-[750px] m-auto flex flex-col gap-2">
        {friends.map((friend: any) => {
          console.log(friend);
          if (uitgenodigden.includes(friend.steamid)) {
            return;
          }
          return (
            <Tile key={friend.personaname}>
              <div className="flex flex-row items-center">
                <img className="rounded-md mr-4" src={friend.avatar} alt="" />
                <div className="flex flex-col flex-1">
                  <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%] text-clip text-lg">
                    {friend.personaname}
                  </h2>
                  <h3>Laatst gespeeld: {friend.lastPlayed.name}</h3>
                </div>
                <div
                  onClick={() => {
                    invite(friend.steamid, friend.personaname);
                  }}
                  className="bg-blauwgrijs cursor-pointer p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw"
                >
                  Uitnodigen
                </div>
              </div>
            </Tile>
          );
        })}
      </div>
    </Section>
  );
}
