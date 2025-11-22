import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { LucideIcon } from 'lucide-react-native';
import { RoleCardFigma } from '@/components/atoms/RoleCardFigma';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface Role {
  id: 'buyer' | 'seller' | 'both';
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface RoleSelectorProps {
  roles: Role[];
  selectedRole: 'buyer' | 'seller' | 'both' | null;
  onSelectRole: (roleId: 'buyer' | 'seller' | 'both') => void;
  testID?: string;
}

export function RoleSelector({ roles, selectedRole, onSelectRole, testID }: RoleSelectorProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const rolesY = useSharedValue(isStorybook ? 0 : 20);
  const rolesOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    rolesY.value = withDelay(300, withTiming(0, { duration: 500 }));
    rolesOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const rolesAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rolesY.value }],
    opacity: rolesOpacity.value,
  }));

  return (
    <AnimatedView style={[styles.container, rolesAnimatedStyle]} testID={testID}>
      <Text style={styles.label}>Votre rôle</Text>
      <View style={styles.rolesContainer}>
        {roles.map(role => (
          <RoleCardFigma
            key={role.id}
            icon={role.icon}
            title={role.title}
            description={role.description}
            selected={selectedRole === role.id}
            onPress={() => onSelectRole(role.id)}
            style={styles.roleCard}
            testID={`role-${role.id}`}
          />
        ))}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  rolesContainer: {
    gap: spacing.md,
  },
  roleCard: {
    marginBottom: 0,
  },
});
