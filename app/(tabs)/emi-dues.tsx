import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, spacing, typography } from '@/src/theme';

export default function EmiDuesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={typography.screenTitle}>EMI Dues</Text>
        <Text style={[typography.bodySecondary, styles.subtitle]}>
          Track upcoming EMI payments for your purchases.
        </Text>
        <View style={styles.emptyCard}>
          <Ionicons name="receipt-outline" size={40} color={colors.primary} />
          <Text style={typography.cardTitle}>No dues yet</Text>
          <Text style={[typography.bodySecondary, styles.center]}>
            When you complete a Marketplace purchase, your EMI schedule will appear here.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  emptyCard: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: radii.xl,
    padding: spacing.xxxl,
    alignItems: 'center',
    gap: spacing.md,
  },
  center: {
    textAlign: 'center',
  },
});
