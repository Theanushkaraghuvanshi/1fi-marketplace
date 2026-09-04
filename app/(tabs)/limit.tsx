import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { colors, spacing, typography } from '@/src/theme';

export default function LimitScreen() {
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const onFetch = () => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
      setFetched(true);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.centerBlock}>
          <View style={styles.lockWrap}>
            <Ionicons name="lock-closed" size={72} color={colors.primary} />
            <Ionicons
              name="sparkles"
              size={16}
              color={colors.primary}
              style={styles.sparkleLeft}
            />
            <Ionicons
              name="star"
              size={12}
              color="#FBBF24"
              style={styles.sparkleRight}
            />
          </View>
          <Text style={typography.label}>CHECK ELIGIBILITY</Text>
          <Text style={styles.headline}>
            Shop on 0% interest backed by your Mutual Funds
          </Text>
          {fetched ? (
            <Text style={[typography.bodySecondary, styles.demoNote]}>
              Demo only. Portfolio fetch is simulated for this assignment.
            </Text>
          ) : null}
        </View>
        <PrimaryButton
          label={fetched ? 'Portfolio fetched' : 'Fetch my portfolio'}
          onPress={onFetch}
          loading={fetching}
          disabled={fetched}
        />
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
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
    justifyContent: 'space-between',
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lockWrap: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleLeft: {
    position: 'absolute',
    left: -20,
    top: 8,
  },
  sparkleRight: {
    position: 'absolute',
    right: -16,
    top: 20,
  },
  headline: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  demoNote: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
