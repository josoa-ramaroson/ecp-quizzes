/**
 * Gets the date for a specific day in the current week
 * @param date The reference date
 * @param dayIndex The day of the week to get (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
 * @returns Date object set to the specified day at 00:00:00
 */
export function setToXDay(date: Date, dayIndex: number): Date {
  // Create a copy of the input date to avoid modifying it
  const result = new Date(date);
  
  // Convert JS day (0 = Sunday, 1 = Monday) to our system (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
  const currentDay = result.getUTCDay() === 0 ? 6 : result.getUTCDay() - 1;

  // Find the Monday of current week
  result.setUTCDate(result.getUTCDate() - currentDay);
  
  // Add the desired number of days to get to the specified day
  result.setUTCDate(result.getUTCDate() + dayIndex);
  
  // Reset time to start of day
  result.setUTCHours(0, 0, 0, 0);
  
  return result;
}