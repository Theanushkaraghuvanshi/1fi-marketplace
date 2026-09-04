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
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}>
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
    padding: 3,
  },
  segment: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: radii.pill,
  },
  segmentActive: {
    backgroundColor: colors.white,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    width: '100%',
  },
  labelActive: {
    color: colors.primary,
  },
  labelInactive: {
    color: colors.textSecondary,
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: 28,
    borderRadius: radii.pill,
    backgroundColor: 'transparent',
  },
  underlineActive: {
    backgroundColor: colors.primary,
  },
});
