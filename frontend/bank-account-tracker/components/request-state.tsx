import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function LoadingState() {
  const colors = Colors[useColorScheme() ?? 'light'];
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.tint} size="large" />
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  return (
    <View style={styles.center}>
      <ThemedText style={[styles.errorTitle, { color: colors.danger }]}>Couldn&apos;t load data</ThemedText>
      <ThemedText style={[styles.errorMessage, { color: colors.muted }]}>{message}</ThemedText>
      <Pressable
        onPress={onRetry}
        style={[styles.retryButton, { backgroundColor: colors.tint }]}>
        <ThemedText style={styles.retryLabel} lightColor="#fff" darkColor="#151718">
          Try again
        </ThemedText>
      </Pressable>
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  const colors = Colors[useColorScheme() ?? 'light'];
  return (
    <View style={styles.center}>
      <ThemedText style={[styles.errorMessage, { color: colors.muted }]}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryLabel: {
    fontWeight: '600',
  },
});
