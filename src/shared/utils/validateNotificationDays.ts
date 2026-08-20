export function validateNotificationDays(days: unknown): number[] | null {
  if (days === undefined || days === null) return null;
  if (!Array.isArray(days)) throw new Error('notificationDays deve ser um array');
  if (!days.every(d => Number.isInteger(d) && d >= 0)) {
    throw new Error('notificationDays deve conter apenas números inteiros não negativos');
  }
  return days as number[];
}