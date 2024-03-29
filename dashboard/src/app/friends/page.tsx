// Dit bestand bevat de vrienden pagina
// Hierop kan de gebruiker een lijst inzien met al zijn/haar vrienden
import Link from "next/link";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import Tile from "@/components/tile";
import { FaChevronRight } from "react-icons/fa6";
import LoggedFrame from "@/components/loggedIn";
import { API_URL } from "@/APIURL";
import stateConverter from "@/functions/stateConverter";
async function getData() {
  const steamId = cookies().get("steamid")?.value;
  const res = await fetch(`${API_URL}/playerFriendsExtended/?id=${steamId}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    // throw new Error("Fout bij het ophalen van de games");
    return [];
  }
  return res.json();
}
export default async function FriendsPage() {
  const data = await getData();
  const friends = data;

  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <h1 className="text-lichtgrijs  font-bold text-2xl italic mb-2">
            Jouw Vrienden ({friends.length})
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.length > 0 ? (
              friends.map((friend: any) => {
                return (
                  <Tile key={friend.personaname}>
                    <div className="flex flex-row items-center">
                      <img
                        className="rounded-md mr-4"
                        src={friend.avatar}
                        alt=""
                      />
                      <div className="flex flex-col flex-1">
                        <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%] text-clip text-lg">
                          {friend.personaname}
                        </h2>
                        <h3>Laatst gespeeld: {friend.lastPlayed.name}</h3>
                        <h3>Status: {stateConverter(friend.personastate)}</h3>
                      </div>

                      <Link href={`/player/${friend.steamid}`}>
                        <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                          <FaChevronRight />
                        </div>
                      </Link>
                    </div>
                  </Tile>
                );
              })
            ) : (
              <Tile>geen vrienden gevonden</Tile>
            )}
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
