import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/src/theme';

type IconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  name,
  color,
  focused,
}: {
  name: IconName;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={styles.iconWrap}>
      {focused ? <View style={styles.indicator} /> : <View style={styles.indicatorSpacer} />}
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home-outline" color={String(color)} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="storefront-outline" color={String(color)} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="emi-dues"
        options={{
          title: 'EMI Dues',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="receipt-outline" color={String(color)} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="limit"
        options={{
          title: 'Limit',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="trending-up-outline" color={String(color)} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person-outline" color={String(color)} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    height: 64,
    paddingTop: 4,
    paddingBottom: 6,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
  },
  indicator: {
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginBottom: 4,
  },
  indicatorSpacer: {
    width: 28,
    height: 3,
    marginBottom: 4,
  },
});
