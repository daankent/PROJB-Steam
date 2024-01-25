// Component die genre statistieken laat zien

"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
export default function GenreStats({ data }: any) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels: any = [];
  const values: any = [];
  const colors: any = [];
  data.map((g: any) => {
    labels.push(g.genre);
    values.push(g.aantal);
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

    const randomRGB = () =>
      `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, 0.5)`;

    colors.push(randomRGB());
  });
  const chartdata = {
    labels: labels,
    datasets: [
      {
        label: "games met dit genre",
        data: values,
        backgroundColor: colors,
        borderColor: ["rgba(255,255,255,0)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full flex flex-col">
      <Pie
        data={chartdata}
        options={{
          color: "black",
        }}
      />
    </div>
  );
}
