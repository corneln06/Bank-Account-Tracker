import { CategoryPalette } from '@/constants/theme';

export function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      signDisplay: 'exceptZero',
    }).format(amount);
  } catch {
    return `${amount > 0 ? '+' : ''}${amount.toFixed(2)} ${currency}`;
  }
}

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function categoryLabel(category: string | null): string {
  return category && category.trim().length > 0 ? category : 'Uncategorized';
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function categoryColor(category: string | null, scheme: 'light' | 'dark'): string {
  const key = categoryLabel(category);
  const slot = CategoryPalette[hashString(key) % CategoryPalette.length];
  return slot[scheme];
}
