import { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryBar } from '@/components/category-bar';
import { EmptyState, ErrorState, LoadingState } from '@/components/request-state';
import { StatTile } from '@/components/stat-tile';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTransactions } from '@/hooks/use-transactions';
import { Transaction } from '@/lib/api';
import { categoryLabel, formatAmount } from '@/lib/format';

function summarize(transactions: Transaction[]) {
  let income = 0;
  let expenses = 0;
  const byCategory = new Map<string, number>();

  for (const t of transactions) {
    if (t.amount >= 0) {
      income += t.amount;
    } else {
      expenses += t.amount;
      const key = categoryLabel(t.category);
      byCategory.set(key, (byCategory.get(key) ?? 0) + t.amount);
    }
  }

  const categories = Array.from(byCategory.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => a.amount - b.amount);

  const largest = categories.length > 0 ? Math.abs(categories[0].amount) : 0;

  return { income, expenses, balance: income + expenses, categories, largest };
}

export default function SummaryScreen() {
  const { transactions, status, error, refreshing, refresh, retry } = useTransactions();
  const colors = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const summary = useMemo(() => summarize(transactions), [transactions]);
  const currency = transactions[0]?.currency ?? 'EUR';

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12, borderColor: colors.border }]}>
        <ThemedText type="title">Summary</ThemedText>
      </View>

      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState message={error ?? 'Unknown error'} onRetry={retry} />}
      {status === 'success' && transactions.length === 0 && (
        <EmptyState message="No transactions yet. Pull to refresh once your bank sync has run." />
      )}
      {status === 'success' && transactions.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.tint} />}>
          <View style={styles.statsRow}>
            <StatTile
              label="Balance"
              value={formatAmount(summary.balance, currency)}
              tone={summary.balance >= 0 ? 'success' : 'danger'}
            />
            <StatTile label="Income" value={formatAmount(summary.income, currency)} tone="success" />
            <StatTile label="Expenses" value={formatAmount(summary.expenses, currency)} tone="danger" />
          </View>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Spending by category
          </ThemedText>

          {summary.categories.length === 0 ? (
            <ThemedText style={{ color: colors.muted }}>No expenses recorded yet.</ThemedText>
          ) : (
            <View style={styles.categoryList}>
              {summary.categories.map(({ category, amount }) => (
                <CategoryBar
                  key={category}
                  category={category}
                  amount={amount}
                  currency={currency}
                  ratio={summary.largest === 0 ? 0 : Math.abs(amount) / summary.largest}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sectionTitle: {
    marginBottom: -8,
  },
  categoryList: {
    gap: 16,
  },
});
