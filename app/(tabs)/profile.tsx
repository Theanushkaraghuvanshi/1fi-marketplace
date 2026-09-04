import { Ionicons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ListCard } from '@/src/components/ListCard';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { SectionHeader } from '@/src/components/SectionHeader';
import { colors, radii, spacing, typography } from '@/src/theme';

const ACTIONS: {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
}[] = [
  {
    title: 'Profile details',
    subtitle: 'Name, contact and KYC info',
    icon: 'person-outline',
  },
  {
    title: 'Purchases',
    subtitle: 'Orders, invoices and loan status',
    icon: 'cube-outline',
  },
  {
    title: 'Pledge history',
    subtitle: 'Funds you pledged or released',
    icon: 'wallet-outline',
  },
  {
    title: 'Invite friends',
    subtitle: 'Share the app, earn rewards',
    icon: 'person-add-outline',
    badge: 'EARN ₹500',
  },
  {
    title: 'Support & FAQs',
    subtitle: 'Find answers or contact us',
    icon: 'help-circle-outline',
  },
  {
    title: 'Privacy policy',
    subtitle: 'How we handle your data',
    icon: 'shield-checkmark-outline',
  },
  {
    title: 'Terms & conditions',
    subtitle: 'Rules governing your use',
    icon: 'document-text-outline',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={typography.screenTitle}>Profile</Text>
        <Text style={[typography.bodySecondary, styles.subtitle]}>
          Manage your account settings and personal preferences.
        </Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View>
            <Text style={typography.cardTitle}>User</Text>
            <Text style={typography.bodySecondary}>+91 9454729589</Text>
          </View>
        </View>

        <SectionHeader title="Quick Actions" uppercase />

        {ACTIONS.map((action) => (
          <ListCard
            key={action.title}
            title={action.title}
            subtitle={action.subtitle}
            badge={action.badge}
            onPress={() =>
              Alert.alert(action.title, 'This section is a visual match for the 1Fi app shell.')
            }
            left={
              <View style={styles.iconBox}>
                <Ionicons name={action.icon} size={20} color={colors.primary} />
              </View>
            }
          />
        ))}

        <View style={styles.logoutWrap}>
          <PrimaryButton
            label="Log out"
            variant="danger"
            onPress={() =>
              Alert.alert('Log out', 'Demo only. No session to clear.')
            }
          />
        </View>

        <Text style={styles.footer}>Made with ♥ by 1Fi</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: colors.primary,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutWrap: {
    marginTop: spacing.md,
  },
  footer: {
    marginTop: spacing.xxl,
    textAlign: 'center',
    color: colors.textTertiary,
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
  },
});
