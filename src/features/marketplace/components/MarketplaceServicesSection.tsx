import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ServiceCardFigma } from '@/components/molecules/ServiceCardFigma';
import { TrendingUp } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface MarketplaceService {
  id: string;
  title: string;
  provider: string;
  providerImage?: string;
  coverImage: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  deliveryTime?: string;
  category?: string;
  isPro?: boolean;
}

interface MarketplaceServicesSectionProps {
  title?: string;
  services: MarketplaceService[];
  onServicePress?: (serviceId: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceServicesSection({
  title = 'Services populaires',
  services,
  onServicePress,
  style,
  testID,
}: MarketplaceServicesSectionProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.icon}
        >
          <TrendingUp size={20} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.servicesList}>
        {services.map(service => (
          <View key={service.id} style={styles.serviceCard}>
            <ServiceCardFigma {...service} onPress={() => onServicePress?.(service.id)} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  icon: {
    padding: spacing.sm,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  servicesList: {
    gap: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
});
