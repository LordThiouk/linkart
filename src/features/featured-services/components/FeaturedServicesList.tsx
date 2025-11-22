import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ServicePlaylistCard } from './ServicePlaylistCard';
import { type FeaturedService, type ServiceCategory } from '../types';
import { colors, spacing, typography } from '@/theme';

export interface FeaturedServicesListProps {
  services: FeaturedService[];
  activeCategory: ServiceCategory | 'all';
  onServicePress?: (serviceId: string) => void;
  testID?: string;
}

export function FeaturedServicesList({ services, activeCategory, onServicePress, testID }: FeaturedServicesListProps) {
  // Filtrer les services selon la catégorie
  const filteredServices =
    activeCategory === 'all' ? services : services.filter(service => service.category === activeCategory);

  if (filteredServices.length === 0) {
    return (
      <View style={styles.emptyContainer} testID={testID}>
        <Text style={styles.emptyTitle}>Aucun service disponible dans cette catégorie</Text>
        <Text style={styles.emptyText}>Revenez plus tard pour découvrir de nouveaux services</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      testID={testID}
      showsVerticalScrollIndicator={false}
    >
      {filteredServices.map(service => (
        <ServicePlaylistCard
          key={service.id}
          service={service}
          onPress={() => onServicePress?.(service.id)}
          testID={`service-${service.id}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
