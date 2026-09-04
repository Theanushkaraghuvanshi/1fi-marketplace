export const colors = {
  /** Sampled from Limit CTA in official 1Fi screenshot (~rgb 121,39,227) */
  primary: '#7927E3',
  primaryDark: '#6418C9',
  primaryLight: '#F3EBFF',
  primaryMuted: '#E9D9FF',
  background: '#FFFFFF',
  backgroundMuted: '#F6F6F6',
  surface: '#FFFFFF',
  text: '#1A1C1E',
  textSecondary: '#74777F',
  textTertiary: '#9CA3AF',
  border: '#E6E6EA',
  borderLight: '#F0F0F2',
  danger: '#DC2626',
  success: '#059669',
  white: '#FFFFFF',
  black: '#000000',
  /** Sampled from Shop hero banner (~rgb 41,12,152) */
  heroGradientStart: '#290C98',
  heroGradientEnd: '#4B1FC4',
  /** Segment track behind Top Brands / Nearby Stores (~rgb 244,240,255) */
  segmentTrack: '#F4F0FF',
  searchBackground: '#FFFFFF',
  disabled: '#D1D5DB',
  disabledText: '#9CA3AF',
  skeleton: '#E5E7EB',
} as const;

export type ColorName = keyof typeof colors;
