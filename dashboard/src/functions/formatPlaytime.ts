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
  } else if (minuten < 43200) {
    const weken = minuten / 20160;
    return `${weken.toFixed(1)} weken`;
  } else {
    const maanden = minuten / 43200;
    return `${maanden.toFixed(1)} maanden`;
  }
  return formatted;
}
