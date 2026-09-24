import { useCallback, useEffect, useState } from 'react';

import { fetchTransactions, Transaction } from '@/lib/api';

type Status = 'loading' | 'error' | 'success';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh: boolean) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setStatus('loading');
    }

    try {
      const data = await fetchTransactions();
      data.sort((a, b) => b.date.localeCompare(a.date));
      setTransactions(data);
      setStatus('success');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  return {
    transactions,
    status,
    error,
    refreshing,
    refresh: () => load(true),
    retry: () => load(false),
  };
}
