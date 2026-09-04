import { TextStyle } from 'react-native';

import { colors } from './colors';

export const typography = {
  heroTitle: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    color: colors.white,
    lineHeight: 34,
  } satisfies TextStyle,
  heroSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.white,
    lineHeight: 18,
    opacity: 0.92,
  } satisfies TextStyle,
  screenTitle: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  } satisfies TextStyle,
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  } satisfies TextStyle,
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: colors.text,
  } satisfies TextStyle,
  body: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: colors.text,
  } satisfies TextStyle,
  bodySecondary: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.textSecondary,
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: colors.textSecondary,
  } satisfies TextStyle,
  label: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: colors.textTertiary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  } satisfies TextStyle,
  button: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: colors.white,
  } satisfies TextStyle,
  price: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: colors.text,
  } satisfies TextStyle,
} as const;
