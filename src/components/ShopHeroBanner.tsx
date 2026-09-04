import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, spacing, typography } from '@/src/theme';

export function ShopHeroBanner() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.heroGradientStart, colors.heroGradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.banner, { paddingTop: Math.max(insets.top, spacing.md) + spacing.md }]}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={12} color={colors.white} />
          <Text style={styles.badgeText}>NO-COST EMIs</Text>
        </View>
        <Text style={typography.heroTitle}>
          Shop today, Pay later using{'\n'}Mutual funds.
        </Text>
        <Text style={[typography.heroSubtitle, styles.subtitle]}>
          No credit score required. No interest. Backed by your investments.
        </Text>
      </View>
      <View style={styles.collage} pointerEvents="none">
        <View style={[styles.blob, styles.blobCar]} />
        <View style={[styles.blob, styles.blobPhone]} />
        <View style={[styles.blob, styles.blobBag]} />
        <View style={[styles.blob, styles.blobBike]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl + 8,
    minHeight: 210,
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
    maxWidth: '72%',
    gap: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  collage: {
    ...StyleSheet.absoluteFill,
  },
  blob: {
    position: 'absolute',
    borderRadius: radii.lg,
    opacity: 0.35,
  },
  blobCar: {
    right: 16,
    top: 72,
    width: 64,
    height: 36,
    backgroundColor: '#EF4444',
    borderRadius: radii.pill,
  },
  blobPhone: {
    right: 28,
    top: 116,
    width: 28,
    height: 48,
    backgroundColor: '#93C5FD',
  },
  blobBag: {
    right: 70,
    bottom: 36,
    width: 40,
    height: 40,
    backgroundColor: '#FBBF24',
    borderRadius: radii.md,
  },
  blobBike: {
    right: 12,
    bottom: 48,
    width: 52,
    height: 28,
    backgroundColor: '#E5E7EB',
    borderRadius: radii.pill,
  },
});
