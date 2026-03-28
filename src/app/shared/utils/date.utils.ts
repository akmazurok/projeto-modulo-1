export function getTodayISO(): string {
  return new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0];
}

export function toISOStringFromDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);

  const localDate = new Date(year, month - 1, day);

  return localDate.toISOString();
}
