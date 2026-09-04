import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/src/theme';
import { EmiPlan } from '@/src/types/product';
import { formatINR } from '@/src/utils/currency';

interface EmiPlanSelectorProps {
  plans: EmiPlan[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function EmiPlanSelector({ plans, selectedId, onSelect }: EmiPlanSelectorProps) {
  if (plans.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={typography.bodySecondary}>No EMI plans available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={typography.cardTitle}>Choose EMI plan</Text>
      <Text style={typography.bodySecondary}>No-cost EMIs backed by your mutual funds</Text>
      <View style={styles.list}>
        {plans.map((plan) => {
          const selected = plan.id === selectedId;
          return (
            <Pressable
              key={plan.id}
              onPress={() => onSelect(plan.id)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.card, selected && styles.cardSelected]}>
              <View style={styles.left}>
                <Text style={[styles.emiAmount, selected && styles.selectedText]}>
                  {formatINR(plan.emiAmount)}
                  <Text style={styles.perMonth}>/mo</Text>
                </Text>
                <Text style={typography.bodySecondary}>
                  {plan.months} months · {plan.interestLabel}
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={typography.caption}>Total</Text>
                <Text style={[styles.total, selected && styles.selectedText]}>
                  {formatINR(plan.totalPayable)}
                </Text>
              </View>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  empty: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  list: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: colors.white,
    gap: spacing.md,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  left: {
    flex: 1,
    gap: 2,
  },
  right: {
    alignItems: 'flex-end',
    marginRight: spacing.sm,
  },
  emiAmount: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  perMonth: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
  },
  total: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});
