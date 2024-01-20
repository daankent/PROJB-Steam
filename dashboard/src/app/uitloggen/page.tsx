"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { API_URL } from "@/APIURL";
import { WEB_URL } from "@/WEBURL";

export default function UitlogPage() {
  const router = useRouter();
  async function uitloggen() {
    const res = await fetch(`${WEB_URL}/api/auth/logout`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Fout bij het uitloggen");
    } else {
      router.push("/login");
    }
  }
  useEffect(() => {
    uitloggen();
  }, []);
  return "uitloggen.....";
}
