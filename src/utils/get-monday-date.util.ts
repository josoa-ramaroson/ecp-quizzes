export function getLastMondayFromWeek(week: number) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysSinceMonday = (dayOfWeek + 6) % 7; // Adjust so Monday is 0
  today.setDate(today.getDate() - daysSinceMonday - 7 * week); // Go back to last Monday

  return today;
}
