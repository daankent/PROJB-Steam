// Deze pagina bevat het formulier om in te loggen met de steamid
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import Tile from "@/components/tile";
import { cookies } from "next/headers";
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
