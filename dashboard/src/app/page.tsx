import Link from "next/link";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import { FaChevronRight, FaEnvelope } from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import FriendGameList from "@/components/home/friendGameList";
import LoggedFrame from "@/components/loggedIn";
import GameList from "@/components/home/gameList";
export default function Home() {
  return (
    <div>
      <LoggedFrame>
        <Navbar />
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 mt-8">
            <div className="col-span-1 lg:col-span-5">
              <Tile>
                <div className="flex flex-col">
                  <h1 className="text-donkerzwartblauw font-bold text-xl italic">
                    Jouw Games
                  </h1>
                  <GameList />
                </div>
              </Tile>

              <div className="mt-8">
                <Tile>
                  <div className="flex flex-col">
                    <h1 className="text-donkerzwartblauw font-bold text-xl italic">
                      Games van Vrienden
                    </h1>
                    <FriendGameList />
                  </div>
                </Tile>
              </div>
            </div>

            {/* sidebar */}
            <div className="col-span-1 lg:col-span-2 ">
              <Tile>
                <div className="flex flex-col">
                  <h1 className="text-donkerzwartblauw font-bold text-xl italic mb-2">
                    Vrienden
                  </h1>
                  <div className="">
                    <FriendList />

                    <div className="flex items-center hover:text-blauwgrijs flex-row justify-end italic">
                      <Link href="/friends">
                        <h2 className="text-donkerzwartblauw font-bold hover:text-blauwgrijs">
                          Alle vrienden
                        </h2>
                      </Link>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              </Tile>

              <div className="mt-8">
                <Tile>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <h1 className="text-donkerzwartblauw font-bold text-xl italic mb-2 flex-1">
                        Speelmomenten
                      </h1>
                      {/* <h2 className="text-donkerzwartblauw flex flex-row items-center gap-2 text-xl font-semibold">
                        <span className="text-purple-700">
                          <FaEnvelope />
                        </span>
                        3
                      </h2> */}
                    </div>

                    <div className="flex items-center hover:text-blauwgrijs flex-row justify-end italic">
                      <Link href="/speelmoment">
                        <h2 className="text-donkerzwartblauw font-bold hover:text-blauwgrijs">
                          Alle speelmomenten
                        </h2>
                      </Link>
                      <FaChevronRight />
                    </div>
                  </div>
                </Tile>
              </div>
            </div>
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
