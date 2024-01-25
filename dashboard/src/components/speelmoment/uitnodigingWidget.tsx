// Component die het mogelijk maakt om een uitnodiging te beantwoorden
"use client";
import { useRouter } from "next/navigation";
import Tile from "../tile";
import { FaBan, FaCheck } from "react-icons/fa6";
import { API_URL } from "@/APIURL";
export default function UitnodigingWidget({ id }: any) {
  const router = useRouter();
  async function submit(antwoord: any) {
    console.log("vbo");
    const res = await fetch(
      `${API_URL}/uitnodiging-answer?answer=${antwoord}&id=${id}`
    );
    router.refresh();
  }
  return (
    <Tile>
      <div className="flex flex-row items-center">
        <h1 className="flex-1">Je bent voor dit spelmoment uitgenodigd</h1>
        <div
          onClick={() => {
            submit(false);
          }}
          className="bg-red-500 p-2 rounded-md text-donkerzwartblauw hover:bg-red-700 cursor-pointer flex flex-row items-center gap-2"
        >
          <FaBan /> Weigeren
        </div>
        <div
          onClick={() => {
            submit(true);
          }}
          className="bg-green-500 p-2 rounded-md text-donkerzwartblauw hover:bg-green-700 cursor-pointer flex flex-row items-center gap-2 ml-4"
        >
          <FaCheck /> Accepteren
        </div>
      </div>
    </Tile>
  );
}
