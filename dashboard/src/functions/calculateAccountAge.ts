export default function calculateAccountAge(sec: number) {
  const milli = sec * 1000;
  const accountCreationDate = new Date(milli);
  const now = new Date();

  const diff = now.getTime() - accountCreationDate.getTime();
  const diff_days = Math.round(diff / (1000 * 3600 * 24));
  return { diff: diff_days, accountCreationDate };
}
