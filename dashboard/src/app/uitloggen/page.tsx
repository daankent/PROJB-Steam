"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UitlogPage() {
  const router = useRouter();
  async function uitloggen() {
    const res = await fetch(`http://localhost:3000/api/auth/logout`, {
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
