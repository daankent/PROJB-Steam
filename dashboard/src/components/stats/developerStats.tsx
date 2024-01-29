// Component die developer statistieken laat zien
"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { API_URL } from "@/APIURL";
import { useEffect, useState } from "react";
async function getDevStats(dev: string) {
  console.log(dev);
  const res = await fetch(`${API_URL}/devstats/?dev=${dev}`, {
    next: { revalidate: 600 },
    // cache: "no-cache",
  });
  if (!res.ok) {
    return [];
  }
  const result = await res.json();
  console.log("results", result);
  return result;
}
export default function DeveloperStats({}: any) {
  const [dev, setDev] = useState<any>("");

  const [stats, setStats] = useState<any>(null);
  async function getStats() {
    const res = await getDevStats(dev);
    setStats(res);
  }
  return (
    <div className="">
      <div className="flex flex-row  gap-5 mb-4">
        <input
          className={` bg-lichtgrijs w-[90%] lg:w-[30%] p-2 border-[1px]  rounded-md focus:outline-none focus:border-blauw focus:border-2 `}
          type="text"
          value={dev}
          placeholder="Voer de naam van een developer in...."
          onChange={(e) => {
            setDev(e.target.value);
          }}
        />
        <div
          className="bg-blauwgrijs rounded-md text-lichtgrijs px-4 py-2 font-bold hover:bg-donkerblauw"
          onClick={getStats}
        >
          Statistieken ophalen
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-10 gap-8">
        <div className="col-span-6">
          {stats != null && (
            <>
              <h1 className="text-lichtgrijs  font-bold text-xl italic mb-2">
                Aantal games per genre voor developer: {dev}
              </h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Genres
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aantal Games met dit genre (anders dan aantal totale
                      games)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats != null &&
                    stats.kwal &&
                    stats.kwal.map((s: any) => {
                      return (
                        <tr
                          key={s.genre}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {s.genre}
                          </th>
                          <td className="px-6 py-4">{s.aantal}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="col-span-4">
          {stats != null && (
            <>
              <h1 className="text-lichtgrijs  font-bold text-xl italic mb-2">
                Game prijzen van developer: {dev}
              </h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Gemiddelde
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mediaan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Gemiddelde
                    </th>
                    <td className="px-6 py-4">€{stats.kwan.gemiddelde}</td>
                  </tr>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Mediaan
                    </th>
                    <td className="px-6 py-4">€{stats.kwan.mediaan}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="col-span-4">
          {stats != null && (
            <>
              <h1 className="text-lichtgrijs  font-bold text-xl italic mb-2">
                Gradient Descent
              </h1>
              <p className="text-lichtgrijs italic mb-2">
                Je kan a en b invullen in de formule y=ax+b om een lijn te
                krijgen waarmee je het aantal positieve ratings bij een bepaalde
                gemiddelde speeltijd kunt krijgen.
              </p>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      gegeven
                    </th>
                    <th scope="col" className="px-6 py-3">
                      berekende waarde
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      a
                    </th>
                    <td className="px-6 py-4">{stats.gd[0]}</td>
                  </tr>

                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      b
                    </th>
                    <td className="px-6 py-4">{stats.gd[1]}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
