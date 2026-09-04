import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '@/src/theme';

interface SectionHeaderProps {
  title: string;
  uppercase?: boolean;
}

export function SectionHeader({ title, uppercase = false }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={uppercase ? typography.label : typography.sectionTitle}>
        {uppercase ? title.toUpperCase() : title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
});
