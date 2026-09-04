import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/src/theme';
import { PrimaryButton } from './PrimaryButton';

interface StateViewProps {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: StateViewProps) {
  return (
    <View style={styles.container}>
      <Text style={typography.sectionTitle}>{title}</Text>
      {message ? <Text style={[typography.bodySecondary, styles.message]}>{message}</Text> : null}
      {actionLabel && onAction ? (
        <View style={styles.action}>
          <PrimaryButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

export function ErrorState({ title, message, actionLabel = 'Retry', onAction }: StateViewProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.sectionTitle, { color: colors.danger }]}>{title}</Text>
      {message ? <Text style={[typography.bodySecondary, styles.message]}>{message}</Text> : null}
      {onAction ? (
        <View style={styles.action}>
          <PrimaryButton label={actionLabel} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <View style={styles.skeletonList}>
      {Array.from({ length: rows }).map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonLogo} />
          <View style={styles.skeletonLines}>
            <View style={[styles.line, { width: '55%' }]} />
            <View style={[styles.line, { width: '75%', marginTop: spacing.sm }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  action: {
    marginTop: spacing.xl,
    alignSelf: 'stretch',
  },
  skeletonList: {
    gap: spacing.md,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  skeletonLogo: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    backgroundColor: colors.skeleton,
  },
  skeletonLines: {
    flex: 1,
  },
  line: {
    height: 12,
    borderRadius: radii.sm,
    backgroundColor: colors.skeleton,
  },
});
