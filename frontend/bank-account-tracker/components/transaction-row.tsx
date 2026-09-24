import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { categoryColor, categoryLabel, formatAmount } from '@/lib/format';
import { Transaction } from '@/lib/api';

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const isCredit = transaction.amount > 0;

  return (
    <View style={[styles.row, { borderColor: colors.border }]}>
      <View style={[styles.dot, { backgroundColor: categoryColor(transaction.category, scheme) }]} />
      <View style={styles.details}>
        <ThemedText numberOfLines={1} style={styles.description}>
          {transaction.description}
        </ThemedText>
        <ThemedText style={[styles.category, { color: colors.muted }]}>
          {categoryLabel(transaction.category)}
        </ThemedText>
      </View>
      <ThemedText style={[styles.amount, { color: isCredit ? colors.success : colors.text }]}>
        {formatAmount(transaction.amount, transaction.currency)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  category: {
    fontSize: 13,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
});
