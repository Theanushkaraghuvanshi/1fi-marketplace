import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '@/src/theme';
import { Product } from '@/src/types/product';
import { formatINR } from '@/src/utils/currency';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const emiHint = product.emiPlans[0]
    ? `From ${formatINR(product.emiPlans[0].emiAmount)}/mo`
    : undefined;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${formatINR(product.price)}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          accessibilityLabel={`${product.name} image`}
        />
        {product.discountPercent ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={typography.cardTitle} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={typography.bodySecondary} numberOfLines={2}>
          {product.shortDescription}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatINR(product.price)}</Text>
          {product.originalPrice ? (
            <Text style={styles.original}>{formatINR(product.originalPrice)}</Text>
          ) : null}
        </View>
        {emiHint ? <Text style={styles.emi}>{emiHint} · No-cost</Text> : null}
        <Text style={styles.availability}>
          {product.availability === 'in_stock'
            ? 'In stock'
            : product.availability === 'limited'
              ? 'Limited stock'
              : 'Out of stock'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.94,
  },
  imageWrap: {
    height: 180,
    backgroundColor: colors.backgroundMuted,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  discountText: {
    color: colors.white,
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  body: {
    padding: spacing.lg,
    gap: 4,
  },
  brand: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  original: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  emi: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.primary,
  },
  availability: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  },
});
