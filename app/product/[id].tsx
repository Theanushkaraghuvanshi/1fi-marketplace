import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
 Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { EmiPlanSelector } from '@/src/components/EmiPlanSelector';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { EmptyState, ErrorState, LoadingSkeleton } from '@/src/components/StateViews';
import { VariantSelector } from '@/src/components/VariantSelector';
import {
  getEffectivePrice,
  productService,
} from '@/src/services/productService';
import { colors, radii, spacing, typography } from '@/src/theme';
import { Product } from '@/src/types/product';
import { formatINR } from '@/src/utils/currency';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedStorageId, setSelectedStorageId] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedEmiPlanId, setSelectedEmiPlanId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      const data = await productService.getProductById(id);
      if (!data) {
        setNotFound(true);
        setProduct(null);
        return;
      }

      setProduct(data);

      const storage = data.variants.find((v) => v.type === 'storage' && v.available);
      const color = data.variants.find((v) => v.type === 'color' && v.available);
      const model = data.variants.find((v) => v.type === 'model' && v.available);

      setSelectedStorageId(storage?.id ?? null);
      setSelectedColorId(color?.id ?? null);
      setSelectedModelId(model?.id ?? null);
      setSelectedEmiPlanId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load product details');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedVariantIds = useMemo(() => {
    return [selectedStorageId, selectedColorId, selectedModelId].filter(
      (value): value is string => Boolean(value),
    );
  }, [selectedStorageId, selectedColorId, selectedModelId]);

  const effectivePrice = useMemo(() => {
    if (!product) return 0;
    return getEffectivePrice(product, selectedVariantIds);
  }, [product, selectedVariantIds]);

  const emiPlans = useMemo(() => {
    if (!product) return [];
    return productService.getEmiPlansForPrice(product, effectivePrice);
  }, [product, effectivePrice]);

  const storageVariants = product?.variants.filter((v) => v.type === 'storage') ?? [];
  const colorVariants = product?.variants.filter((v) => v.type === 'color') ?? [];
  const modelVariants = product?.variants.filter((v) => v.type === 'model') ?? [];

  const requiresStorage = storageVariants.some((v) => v.available);
  const requiresColor = colorVariants.some((v) => v.available);
  const requiresModel = modelVariants.some((v) => v.available);

  const variantsReady =
    (!requiresStorage || Boolean(selectedStorageId)) &&
    (!requiresColor || Boolean(selectedColorId)) &&
    (!requiresModel || Boolean(selectedModelId));

  const canContinue = variantsReady && Boolean(selectedEmiPlanId);

  const onContinue = () => {
    if (!product || !selectedEmiPlanId || !canContinue) return;

    router.push({
      pathname: '/confirmation',
      params: {
        productId: product.id,
        variantIds: selectedVariantIds.join(','),
        emiPlanId: selectedEmiPlanId,
        price: String(effectivePrice),
      },
    });
  };

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product details
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.padded}>
          <LoadingSkeleton rows={3} />
        </View>
      ) : error ? (
        <ErrorState
          title="Unable to load product details"
          message={error}
          onAction={() => void load()}
        />
      ) : notFound || !product ? (
        <EmptyState
          title="Product not found"
          message="This product is unavailable or the link is invalid."
          actionLabel="Back to Shop"
          onAction={() => router.replace('/(tabs)/shop')}
        />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.imageWrap}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                contentFit="cover"
                accessibilityLabel={`${product.name} image`}
              />
            </View>

            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={typography.screenTitle}>{product.name}</Text>
            <Text style={[typography.bodySecondary, styles.description]}>
              {product.description}
            </Text>

            <View style={styles.priceBlock}>
              <Text style={typography.price}>{formatINR(effectivePrice)}</Text>
              {product.originalPrice ? (
                <Text style={styles.original}>{formatINR(product.originalPrice)}</Text>
              ) : null}
              {product.discountPercent ? (
                <View style={styles.discountPill}>
                  <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.availability}>
              {product.availability === 'in_stock'
                ? 'In stock'
                : product.availability === 'limited'
                  ? 'Limited stock'
                  : 'Out of stock'}
            </Text>

            {product.specifications?.length ? (
              <View style={styles.specBlock}>
                <Text style={typography.cardTitle}>Specifications</Text>
                {product.specifications.map((spec) => (
                  <View key={spec.label} style={styles.specRow}>
                    <Text style={typography.bodySecondary}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            <View style={styles.section}>
              <VariantSelector
                title="Storage"
                variants={storageVariants}
                selectedId={selectedStorageId}
                onSelect={setSelectedStorageId}
              />
            </View>

            <View style={styles.section}>
              <VariantSelector
                title="Color"
                variants={colorVariants}
                selectedId={selectedColorId}
                onSelect={setSelectedColorId}
              />
            </View>

            <View style={styles.section}>
              <VariantSelector
                title="Model"
                variants={modelVariants}
                selectedId={selectedModelId}
                onSelect={setSelectedModelId}
              />
            </View>

            <View style={styles.section}>
              <EmiPlanSelector
                plans={emiPlans}
                selectedId={selectedEmiPlanId}
                onSelect={setSelectedEmiPlanId}
              />
            </View>
          </ScrollView>

          <View style={styles.ctaBar}>
            {!canContinue ? (
              <Text style={styles.ctaHint}>
                Select {variantsReady ? 'an EMI plan' : 'variant and EMI plan'} to continue
              </Text>
            ) : null}
            <PrimaryButton
              label="Continue"
              onPress={onContinue}
              disabled={!canContinue}
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
  },
  imageWrap: {
    height: 240,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.backgroundMuted,
    marginBottom: spacing.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  brand: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  description: {
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  original: {
    fontSize: 14,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
    fontFamily: 'Inter_400Regular',
  },
  discountPill: {
    backgroundColor: colors.primaryLight,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  discountText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  availability: {
    marginTop: spacing.sm,
    color: colors.success,
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
  },
  specBlock: {
    marginTop: spacing.xl,
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.backgroundMuted,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  specValue: {
    flexShrink: 1,
    textAlign: 'right',
    fontFamily: 'Inter_500Medium',
    color: colors.text,
    fontSize: 13,
  },
  section: {
    marginTop: spacing.xl,
  },
  ctaBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  ctaHint: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
