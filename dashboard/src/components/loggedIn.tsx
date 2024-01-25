// Page wrapper die checkt of iemand ingelogd is op de pagina's waar dat verplicht is
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function LoggedFrame({ children, reverse = false }: any) {
  if (!cookies().get("steamid")) {
    if (reverse) {
      return redirect("/");
    }
    return redirect("/login");
  }
  return <div className="">{children}</div>;
}
