import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/src/theme';
import { ProductVariant } from '@/src/types/product';

interface VariantSelectorProps {
  title: string;
  variants: ProductVariant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function VariantSelector({
  title,
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={typography.cardTitle}>{title}</Text>
      <View style={styles.row}>
        {variants.map((variant) => {
          const selected = variant.id === selectedId;
          return (
            <Pressable
              key={variant.id}
              disabled={!variant.available}
              onPress={() => onSelect(variant.id)}
              accessibilityRole="button"
              accessibilityState={{ selected, disabled: !variant.available }}
              style={[
                styles.chip,
                selected && styles.chipSelected,
                !variant.available && styles.chipDisabled,
              ]}>
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                  !variant.available && styles.chipTextDisabled,
                ]}>
                {variant.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipDisabled: {
    opacity: 0.45,
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  chipTextDisabled: {
    color: colors.textTertiary,
  },
});
