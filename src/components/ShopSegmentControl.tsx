import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme';

export type ShopSegment = 'brands' | 'nearby' | 'marketplace';

interface ShopSegmentControlProps {
  value: ShopSegment;
  onChange: (value: ShopSegment) => void;
}

const SEGMENTS: { key: ShopSegment; label: string }[] = [
  { key: 'brands', label: 'Top Brands' },
  { key: 'nearby', label: 'Nearby Stores' },
  { key: 'marketplace', label: 'Marketplace' },
];

/**
 * Matches 1Fi Shop toggle: lavender pill track, white active chip,
 * purple label + thick underline under the selected segment.
 */
export function ShopSegmentControl({ value, onChange }: ShopSegmentControlProps) {
  return (
    <View style={styles.track}>
      {SEGMENTS.map((segment) => {
        const active = segment.key === value;
        return (
          <Pressable
            key={segment.key}
            onPress={() => onChange(segment.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={[styles.segment, active && styles.segmentActive]}>
            <Text
              style={[styles.label, active ? styles.labelActive : styles.labelInactive]}
              numberOfLines={1}>
              {segment.label}
            </Text>
            <View style={[styles.underline, active ? styles.underlineActive : null]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.segmentTrack,
    borderRadius: radii.pill,
    padding: 4,
    gap: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: radii.pill,
  },
  segmentActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  labelActive: {
    color: colors.primary,
  },
  labelInactive: {
    color: colors.textSecondary,
  },
  underline: {
    marginTop: 5,
    height: 3,
    width: 32,
    borderRadius: radii.pill,
    backgroundColor: 'transparent',
  },
  underlineActive: {
    backgroundColor: colors.primary,
  },
});
