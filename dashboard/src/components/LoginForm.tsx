"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/APIURL";

export default function LoginForm() {
  const [id, setId] = useState<any>("");
  const router = useRouter();

  async function inloggen(e: any) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status == 200) {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={inloggen}>
      <div className="flex flex-col mb-4  items-center mt-8 w-full">
        <label htmlFor="id" className="text-NS_BLAUW font-semibold">
          SteamId: {id}
        </label>

        <input
          className={` bg-lichtgrijs w-[90%] lg:w-[30%] p-2 border-[1px]  rounded-md focus:outline-none focus:border-blauw focus:border-2 `}
          type="text"
          name="id"
          id="id"
          value={id}
          placeholder="steamid...."
          pattern="[0-9]{17}"
          maxLength={17}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col mb-4 w-full lg:w-[30%] m-auto">
        <input
          type="submit"
          value="Inloggen"
          className="bg-blauwgrijs rounded-md text-lichtgrijs px-4 py-2 font-bold hover:bg-donkerblauw"
        />
      </div>
    </form>
  );
}
