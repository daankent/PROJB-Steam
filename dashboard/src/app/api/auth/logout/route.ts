// Api endpoint om de gebruiker uit te loggen
import { cookies } from "next/headers";

async function handler(req: Request, { params }: any) {
  if (req.method == "GET") {
    cookies().delete("steamid");
    cookies().delete("steamuser");

    return Response.json("uitgelogd", { status: 200 });
  } else {
    return new Response("Post niet toegestaan", { status: 405 });
  }
}

export { handler as GET, handler as POST };
