import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radii } from '@/src/theme';

interface BrandLogoProps {
  color: string;
  initials: string;
  size?: number;
}

export function BrandLogo({ color, initials, size = 56 }: BrandLogoProps) {
  return (
    <View
      style={[
        styles.logo,
        {
          width: size,
          height: size,
          borderRadius: radii.md,
          backgroundColor: color,
        },
      ]}>
      {initials ? (
        <Text
          style={[
            styles.text,
            { fontSize: initials.length > 3 ? 10 : initials.length > 1 ? 14 : 20 },
          ]}
          numberOfLines={1}>
          {initials}
        </Text>
      ) : (
        <Ionicons name="logo-apple" size={size * 0.45} color={colors.white} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontFamily: 'Inter_700Bold',
  },
});
