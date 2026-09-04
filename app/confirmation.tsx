import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { EmptyState, ErrorState, LoadingSkeleton } from '@/src/components/StateViews';
import { productService } from '@/src/services/productService';
import { colors, radii, spacing, typography } from '@/src/theme';
import { EmiPlan, Product, ProductVariant } from '@/src/types/product';
import { formatINR } from '@/src/utils/currency';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    productId: string;
    variantIds: string;
    emiPlanId: string;
    price: string;
  }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!params.productId) {
        setError('Missing product selection');
        setLoading(false);
        return;
      }

      try {
        const data = await productService.getProductById(params.productId);
        if (cancelled) return;
        if (!data) {
          setError('Product not found');
          setProduct(null);
        } else {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load confirmation');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [params.productId]);

  const selectedVariants: ProductVariant[] = useMemo(() => {
    if (!product) return [];
    const ids = (params.variantIds ?? '').split(',').filter(Boolean);
    return product.variants.filter((variant) => ids.includes(variant.id));
  }, [product, params.variantIds]);

  const selectedPlan: EmiPlan | null = useMemo(() => {
    if (!product) return null;
    const price = Number(params.price) || product.price;
    const plans = productService.getEmiPlansForPrice(product, price);
    return plans.find((plan) => plan.id === params.emiPlanId) ?? null;
  }, [product, params.emiPlanId, params.price]);

  const price = Number(params.price) || product?.price || 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Order summary</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.padded}>
          <LoadingSkeleton rows={3} />
        </View>
      ) : error || !product ? (
        <ErrorState
          title="Unable to load summary"
          message={error ?? 'Something went wrong'}
          actionLabel="Back to Shop"
          onAction={() => router.replace('/(tabs)/shop')}
        />
      ) : !selectedPlan ? (
        <EmptyState
          title="EMI plan missing"
          message="Go back and select an EMI plan to continue."
          actionLabel="Back"
          onAction={() => router.back()}
        />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.successBanner}>
              <Ionicons name="checkmark-circle" size={28} color={colors.primary} />
              <Text style={styles.successTitle}>Selections confirmed</Text>
              <Text style={typography.bodySecondary}>
                Review your product, variant and EMI plan below. No payment is processed in this demo.
              </Text>
            </View>

            <View style={styles.card}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                contentFit="cover"
                accessibilityLabel={`${product.name} image`}
              />
              <View style={styles.cardBody}>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={typography.cardTitle}>{product.name}</Text>
                <Text style={typography.price}>{formatINR(price)}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={typography.cardTitle}>Selected variants</Text>
              {selectedVariants.length === 0 ? (
                <Text style={typography.bodySecondary}>No variants selected</Text>
              ) : (
                selectedVariants.map((variant) => (
                  <View key={variant.id} style={styles.row}>
                    <Text style={typography.bodySecondary}>
                      {variant.type.charAt(0).toUpperCase() + variant.type.slice(1)}
                    </Text>
                    <Text style={styles.rowValue}>{variant.label}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.section}>
              <Text style={typography.cardTitle}>EMI plan</Text>
              <View style={styles.row}>
                <Text style={typography.bodySecondary}>Monthly EMI</Text>
                <Text style={styles.rowValue}>{formatINR(selectedPlan.emiAmount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={typography.bodySecondary}>Tenure</Text>
                <Text style={styles.rowValue}>{selectedPlan.months} months</Text>
              </View>
              <View style={styles.row}>
                <Text style={typography.bodySecondary}>Interest</Text>
                <Text style={styles.rowValue}>{selectedPlan.interestLabel}</Text>
              </View>
              <View style={styles.row}>
                <Text style={typography.bodySecondary}>Total payable</Text>
                <Text style={styles.rowValue}>{formatINR(selectedPlan.totalPayable)}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.ctaBar}>
            <PrimaryButton
              label="Done"
              onPress={() => router.replace('/(tabs)/shop')}
            />
            <PrimaryButton
              label="Back to product"
              variant="outline"
              onPress={() => router.back()}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  padded: {
    padding: spacing.lg,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  successBanner: {
    backgroundColor: colors.primaryLight,
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.sm,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.backgroundMuted,
  },
  cardBody: {
    padding: spacing.lg,
    gap: 4,
  },
  brand: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  section: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowValue: {
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
  },
  ctaBar: {
    padding: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
