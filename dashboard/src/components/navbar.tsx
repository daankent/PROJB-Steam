import Link from "next/link";
import { cookies } from "next/headers";
import NavbarMenu from "./navbarMenu";
export default function Navbar() {
  const id = cookies().get("steamid");
  let user = undefined;
  if (id) {
    console.log("id");
    const userCookie = cookies().get("steamuser")?.value || "d";
    user = JSON.parse(userCookie);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row bg-donkerblauw border-b-2 border-b-white z-0">
        <div className="flex items-center p-4 flex-1 ">
          <Link href="/">
            <h1 className="text-lichtgrijs font-bold ">
              STEAM<span className="text-blauw">HUB</span>
            </h1>
          </Link>
        </div>
        {id && user && (
          <>
            {/* <div className="flex flex-row items-center mr-4">
              <Link href="/uitloggen">
                <h1 className="text-lichtgrijs mr-4 font-bold">
                  {user["personaname"]}
                </h1>
              </Link>

              <img
                className="rounded-full"
                src={user["avatar"]}
                alt="user avatar"
              />
            </div> */}
            <NavbarMenu user={user} />
          </>
        )}
      </div>
    </div>
  );
}
