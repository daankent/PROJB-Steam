"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBan, FaChevronRight, FaPlus, FaSteam } from "react-icons/fa6";

export default function CreateSpeelmomentForm({ game, id, creator }: any) {
  const [datum, setDatum] = useState<any>(null);
  const [startTijd, setStartTijd] = useState<any>(null);
  const [eindTijd, setEindTijd] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  async function submit() {
    if (startTijd && datum && eindTijd) {
      if (startTijd > eindTijd) {
        setError("Starttijd ligt na eindtijd");
      } else {
        const res = await fetch(
          `http://localhost:8000/createSpeelmoment/?creator=${creator}&game_id=${id}&game_name=${game.name}&datum=${datum}&starttijd=${startTijd}&eindtijd=${eindTijd}`
        );
        if (res.ok) {
          setError("Succes");
        } else {
          setError("server error");
        }
      }
    } else {
      setError("Niet alle velden zijn ingevuld");
    }
  }
  return (
    <>
      <div className="">
        {error != null && <p>{error}</p>}
        <h2 className="text-lichtgrijs  font-bold text-xl  mb-2">
          Geselecteerde game:
        </h2>
        <div className="flex flex-row items-center">
          <img
            className="rounded-xl mr-4 w-32 shadow-xl"
            src={`https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`}
            alt=""
          />
          <h3 className="text-lichtgrijs  font-bold text-xl  mb-2">
            {game.name}
          </h3>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lichtgrijs  font-bold text-xl  mb-2">
          Datum selecteren:
        </h2>
        <input
          type="date"
          onChange={(e) => {
            setDatum(e.target.value);
          }}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lichtgrijs  font-bold text-xl  mb-2">
          Starttijd selecteren:
        </h2>
        <input
          type="time"
          onChange={(e) => {
            setStartTijd(e.target.value);
          }}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lichtgrijs  font-bold text-xl  mb-2">
          Eindtijd selecteren:
        </h2>
        <input
          type="time"
          onChange={(e) => {
            setEindTijd(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-row mt-4">
        <Link href={`/game/${game.appid}`}>
          <div className="bg-lichtgrijs p-2 rounded-md text-donkerblauw hover:bg-blauw flex flex-row items-center gap-3">
            <FaBan /> Annuleren
          </div>
        </Link>

        <div
          onClick={submit}
          className="bg-blauw p-2 rounded-md text-donkerblauw hover:bg-blauwgrijs hover:text-blauw flex flex-row items-center gap-3 ml-4 cursor-pointer"
        >
          <FaPlus /> Speelmoment aanmaken
        </div>
      </div>
    </>
  );
}
