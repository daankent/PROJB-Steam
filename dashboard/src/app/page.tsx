import Link from "next/link";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";

import { FaChevronRight } from "react-icons/fa6";
export default function Home() {
  const steamid = "76561198819434745";
  return (
    <div>
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
                  {[
                    ["Kevin", "bg-red-500"],
                    ["Daan", "bg-orange-500"],
                    ["Wassim", "bg-yellow-500"],
                    ["Sem", "bg-purple-500"],
                    ["Alesio", "bg-green-500"],
                  ].map((i) => {
                    return (
                      <SubTile>
                        <div className="flex flex-row items-center">
                          <div
                            className={`rounded-full w-[32px] h-[32px] ${i[1]} mr-4`}
                          ></div>
                          <h2 className="italic font-bold font-xl text-donkerblauw flex-1 w-[100%] h-[100%]">
                            {i[0]}
                          </h2>
                          <Link href="/">
                            <div className="bg-blauwgrijs p-2 rounded-md text-lichtgrijs hover:bg-donkerblauw">
                              <FaChevronRight />
                            </div>
                          </Link>
                        </div>
                      </SubTile>
                    );
                  })}
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
    </div>
  );
}
