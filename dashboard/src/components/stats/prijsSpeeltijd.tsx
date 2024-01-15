"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
export default function PrijsSpeeltijdStats({ data }: any) {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const chartdata = {
    datasets: [
      {
        label: "Game (gemiddelde speeltijd, prijs)",
        data: data,
        backgroundColor: "rgba(255,43,12,1)",
        borderColor: ["rgba(255,255,255,0)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col">
      <Scatter
        data={chartdata}
        options={{
          color: "black",
        }}
      />
    </div>
  );
}
