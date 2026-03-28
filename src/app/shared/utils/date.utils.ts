export function getTodayISO(): string {
  return new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0];
}

export function isFutureDate(date: string): boolean {
  return new Date(date) > new Date();
}