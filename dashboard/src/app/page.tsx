import Link from "next/link";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import { FaChevronRight } from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import LoggedFrame from "@/components/loggedIn";
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
                  <div className="">Games</div>
                </div>
              </Tile>
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
                      <Link href="/">
                        <h2 className="text-donkerzwartblauw font-bold hover:text-blauwgrijs">
                          Alle vrienden
                        </h2>
                      </Link>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              </Tile>
            </div>
          </div>
        </Section>
      </LoggedFrame>
    </div>
  );
}
