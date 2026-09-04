import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii, spacing, typography } from '@/src/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={typography.screenTitle}>Home</Text>
        <Text style={[typography.bodySecondary, styles.subtitle]}>
          Welcome to 1Fi. Shop with no-cost EMIs backed by your mutual funds.
        </Text>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="sparkles" size={28} color={colors.primary} />
          </View>
          <Text style={typography.cardTitle}>Ready to shop?</Text>
          <Text style={[typography.bodySecondary, styles.cardText]}>
            Open the Shop tab to browse Top Brands or explore Marketplace products
            with flexible EMI plans.
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
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: radii.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
  },
});
