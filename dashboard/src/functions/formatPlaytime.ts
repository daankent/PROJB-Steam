export default function formatPlaytime(minuten: number) {
  let formatted = "";

  if (minuten < 60) {
    return minuten != 1 ? `${minuten} minuten` : "1 minuut";
  } else if (minuten < 1440) {
    const uur = minuten / 60;
    return `${uur.toFixed(1)} uur`;
  } else if (minuten < 20160) {
    const dagen = minuten / 1440;
    return `${dagen.toFixed(1)} dagen`;
  } else {
    const weken = minuten / 20160;
    return `${weken.toFixed(1)} weken`;
  }
  return formatted;
}
