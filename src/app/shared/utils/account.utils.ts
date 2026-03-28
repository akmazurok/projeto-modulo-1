export function calculateBalance(
  current: number,
  amount: number,
  type: 'income' | 'expense',
): number {
  const result = type === 'income' ? current + amount : current - amount;
  return Number(result.toFixed(2));
}

export function deleteTransaction(current: number, amount: number): number {
  return current - amount;
}
