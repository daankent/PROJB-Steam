// Dit is de api route om een moderator in te loggen.
import { cookies } from "next/headers";
async function getData(id: any) {
  const res = await fetch(`http://localhost:8000/playerInfo/?ids=[${id}]`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    return new Response("fout met checken steamid", { status: 500 });
  }

  return res.json();
}
async function handler(req: Request, { params }: any) {
  if (req.method == "POST") {
    const body = await req.json();
    console.log(body);
    const data = await getData(body.id);
    const players = data;
    if (players.length > 0) {
      console.log("setting koek");
      cookies().set("steamid", body.id, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      cookies().set("steamuser", JSON.stringify(players[0]), {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      return Response.json({ status: "loggedin" });
    } else {
      return new Response("gebruiker niet gevonden", { status: 500 });
    }
  } else {
    return new Response("GET niet toegestaan", { status: 405 });
  }
}

export { handler as GET, handler as POST };
