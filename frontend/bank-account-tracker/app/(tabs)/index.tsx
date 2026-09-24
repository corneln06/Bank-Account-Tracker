import { useMemo } from 'react';
import { RefreshControl, SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState, ErrorState, LoadingState } from '@/components/request-state';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TransactionRow } from '@/components/transaction-row';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTransactions } from '@/hooks/use-transactions';
import { Transaction } from '@/lib/api';
import { formatDate } from '@/lib/format';

function groupByDate(transactions: Transaction[]) {
  const groups = new Map<string, Transaction[]>();
  for (const transaction of transactions) {
    const bucket = groups.get(transaction.date) ?? [];
    bucket.push(transaction);
    groups.set(transaction.date, bucket);
  }
  return Array.from(groups.entries()).map(([date, data]) => ({ title: formatDate(date), data }));
}

export default function TransactionsScreen() {
  const { transactions, status, error, refreshing, refresh, retry } = useTransactions();
  const colors = Colors[useColorScheme() ?? 'light'];
  const insets = useSafeAreaInsets();
  const sections = useMemo(() => groupByDate(transactions), [transactions]);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12, borderColor: colors.border }]}>
        <ThemedText type="title">Transactions</ThemedText>
      </View>

      {status === 'loading' && <LoadingState />}
      {status === 'error' && <ErrorState message={error ?? 'Unknown error'} onRetry={retry} />}
      {status === 'success' && sections.length === 0 && (
        <EmptyState message="No transactions yet. Pull to refresh once your bank sync has run." />
      )}
      {status === 'success' && sections.length > 0 && (
        <SectionList
          sections={sections}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TransactionRow transaction={item} />}
          renderSectionHeader={({ section }) => (
            <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
              <ThemedText style={[styles.sectionTitle, { color: colors.muted }]}>{section.title}</ThemedText>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.tint} />
          }
          stickySectionHeadersEnabled
        />
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
