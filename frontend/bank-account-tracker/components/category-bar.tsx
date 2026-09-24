import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { categoryColor, formatAmount } from '@/lib/format';

export function CategoryBar({
  category,
  amount,
  currency,
  ratio,
}: {
  category: string;
  amount: number;
  currency: string;
  ratio: number;
}) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const color = categoryColor(category, scheme);

  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <ThemedText style={styles.label} numberOfLines={1}>
          {category}
        </ThemedText>
        <ThemedText style={[styles.amount, { color: colors.muted }]}>
          {formatAmount(amount, currency)}
        </ThemedText>
      </View>
      <View style={[styles.track, { backgroundColor: colors.border }]}>
        <View style={[styles.fill, { backgroundColor: color, width: `${Math.max(ratio * 100, 3)}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  amount: {
    fontSize: 13,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
