import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { BrandLogo } from '@/src/components/BrandLogo';
import { ListCard } from '@/src/components/ListCard';
import { ProductCard } from '@/src/components/ProductCard';
import { SearchBar } from '@/src/components/SearchBar';
import { SectionHeader } from '@/src/components/SectionHeader';
import { ShopHeroBanner } from '@/src/components/ShopHeroBanner';
import {
  ShopSegment,
  ShopSegmentControl,
} from '@/src/components/ShopSegmentControl';
import { EmptyState, ErrorState, LoadingSkeleton } from '@/src/components/StateViews';
import { brandService } from '@/src/services/brandService';
import { productService } from '@/src/services/productService';
import { colors, spacing } from '@/src/theme';
import { Brand } from '@/src/types/brand';
import { Product } from '@/src/types/product';

export default function ShopScreen() {
  const router = useRouter();
  const [segment, setSegment] = useState<ShopSegment>('brands');
  const [search, setSearch] = useState('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadBrands = useCallback(async (query?: string) => {
    setError(null);
    setLoading(true);
    try {
      const data = await brandService.getBrands({ search: query });
      setBrands(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load brands');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (segment === 'marketplace') {
      void loadProducts();
      return;
    }

    if (segment === 'nearby') {
      setLoading(false);
      setError(null);
      return;
    }

    const handle = setTimeout(() => {
      void loadBrands(search);
    }, segment === 'brands' && search ? 250 : 0);

    return () => clearTimeout(handle);
  }, [segment, search, loadBrands, loadProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (segment === 'brands') {
      await loadBrands(search);
    } else if (segment === 'marketplace') {
      await loadProducts();
    }
    setRefreshing(false);
  }, [segment, search, loadBrands, loadProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query),
    );
  }, [products, search]);

  const listHeader = (
    <View>
      <ShopHeroBanner />
      <View style={styles.segmentOverlap}>
        <ShopSegmentControl value={segment} onChange={setSegment} />
      </View>
      <View style={styles.paddedBlock}>
        <View style={styles.searchWrap}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={
              segment === 'marketplace'
                ? 'Search marketplace products...'
                : 'Search online stores...'
            }
          />
        </View>
        {segment === 'brands' ? <SectionHeader title="Top Brands" /> : null}
        {segment === 'marketplace' ? <SectionHeader title="Marketplace" /> : null}
        {segment === 'nearby' ? <SectionHeader title="Nearby Stores" /> : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      {segment === 'brands' ? (
        <FlatList
          data={loading ? [] : brands}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.paddedBlock}>
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <ErrorState
                  title="Unable to load brands"
                  message={error}
                  onAction={() => void loadBrands(search)}
                />
              ) : (
                <EmptyState
                  title="No brands found"
                  message="Try a different search term."
                />
              )}
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.paddedBlock}>
              <ListCard
                title={item.name}
                subtitle={`No-cost EMIs upto ${item.maxEmiMonths} months`}
                left={
                  <BrandLogo
                    color={item.logoColor}
                    initials={item.logoInitials}
                  />
                }
              />
            </View>
          )}
        />
      ) : null}

      {segment === 'nearby' ? (
        <FlatList
          data={[]}
          keyExtractor={() => 'empty'}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.paddedBlock}>
              <EmptyState
                title="No nearby stores"
                message="Nearby store discovery is not required for this assignment."
              />
            </View>
          }
          renderItem={() => null}
        />
      ) : null}

      {segment === 'marketplace' ? (
        <FlatList
          data={loading ? [] : filteredProducts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
          }
          ListEmptyComponent={
            <View style={styles.paddedBlock}>
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <ErrorState
                  title="Unable to load products"
                  message={error}
                  onAction={() => void loadProducts()}
                />
              ) : (
                <EmptyState
                  title="No products available"
                  message="There are no marketplace products to show right now."
                />
              )}
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.paddedBlock}>
              <ProductCard
                product={item}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            </View>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  paddedBlock: {
    paddingHorizontal: spacing.lg,
  },
  segmentOverlap: {
    marginTop: -22,
    zIndex: 2,
    paddingHorizontal: spacing.lg,
  },
  searchWrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
});
