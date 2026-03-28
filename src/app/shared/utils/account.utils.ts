export function calculateBalance(
  current: number,
  amount: number,
  type: 'income' | 'expense',
): number {
  return type === 'income' ? current + amount : current - amount;
}

export function deleteTransaction(current: number, amount: number): number {
  return current - amount;
}
