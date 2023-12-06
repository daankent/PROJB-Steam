import Link from "next/link";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import Section from "@/components/section";
import SubTile from "@/components/subtile";
import Tile from "@/components/tile";
import { cookies } from "next/headers";

import { FaChevronRight } from "react-icons/fa6";
import FriendList from "@/components/home/friendList";
import LoggedFrame from "@/components/loggedIn";
import LoginForm from "@/components/LoginForm";
export default function LoginPage() {
  if (cookies().get("steamid")) {
    return redirect("/");
  }
  return (
    <div>
      <Navbar />
      <div className="w-[90%] lg:w-[50%] m-auto">
        <Section>
          <Tile>
            <h1 className="font-bold text-lichtgrijs text-2xl">Inloggen.</h1>
            <LoginForm />
          </Tile>
        </Section>
      </div>
    </div>
  );
}
