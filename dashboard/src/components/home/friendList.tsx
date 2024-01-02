import Link from "next/link";
import { cookies } from "next/headers";

import SubTile from "@/components/subtile";

import { FaChevronRight } from "react-icons/fa6";
import Tile from "../tile";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(
    `http://localhost:8000/playerFriends/?id=${steamId}`,
    {
      next: { revalidate: 600 },
    }
  );
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de vrienden");
    return [];
  }
  return res.json();
}

export default async function FriendList() {
  const data = await getData();
  const vrienden = data;
  let i = 0;
  return (
    <div>
      {vrienden.length > 0 ? (
        vrienden.map((vriend: any) => {
          i++;

          if (i > 5) return;
          return (
            <SubTile key={i}>
              <div className="flex flex-row items-center">
                <div
                  className={`rounded-full w-[32px] h-[32px] bg-red-100 mr-4`}
                >
                  <img
                    className="rounded-full"
                    src={vriend.avatar}
                    alt="profielfoto van een steam gebruiker"
                  />
                </div>
                <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%]">
                  {vriend.personaname}{" "}
                  {vriend?.realname && `(${vriend.realname})`}
                </h2>
                <Link href="/">
                  <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                    <FaChevronRight />
                  </div>
                </Link>
              </div>
            </SubTile>
          );
        })
      ) : (
        <Tile>Geen vrienden gevonden</Tile>
      )}
    </div>
  );
}
