import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function StatTile({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'danger';
}) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];
  const valueColor = tone === 'success' ? colors.success : tone === 'danger' ? colors.danger : colors.text;

  return (
    <View style={[styles.tile, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <ThemedText style={[styles.label, { color: colors.muted }]}>{label}</ThemedText>
      <ThemedText style={[styles.value, { color: valueColor }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 4,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
});
