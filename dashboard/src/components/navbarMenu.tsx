"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarMenu({ user }: any) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  function toggle() {
    setOpen(!open);
  }
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <>
      <div className="flex flex-row items-center mr-4" onClick={toggle}>
        <h1 className="text-lichtgrijs mr-4 font-bold cursor-pointer">
          {user.personaname}
        </h1>

        <img
          className="rounded-full cursor-pointer"
          src={user.avatar}
          alt="user avatar"
        />
      </div>
      {open && (
        <div className=" w-full flex flex-row-reverse z-10 p-4 rounded-md absolute mt-8">
          <div className="bg-lichtgrijs w-full md:w-[25%] lg:w-[15%]  rounded-md p-4 flex flex-row-reverse">
            <div className="flex flex-col">
              <Link href={`/player/${user.steamid}`}>
                <p className=" font-bold cursor-pointer mb-2 hover:text-blauw">
                  Profiel
                </p>
              </Link>
              <Link href="/uitloggen">
                <p className="text-red-900 font-bold cursor-pointer hover:text-red-700">
                  Uitloggen
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
