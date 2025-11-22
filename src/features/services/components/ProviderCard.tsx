import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle, MapPin } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProviderCardProps {
  providerImage: string;
  providerName: string;
  location: string;
  onContact?: () => void;
  testID?: string;
}

export function ProviderCard({ providerImage, providerName, location, onContact, testID }: ProviderCardProps) {
  return (
    <View style={styles.container} testID={testID}>
      <ImageWithFallback src={providerImage} alt={providerName} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{providerName}</Text>
        <View style={styles.location}>
          <MapPin size={12} color={colors.textMuted} />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
      {onContact && (
        <TouchableOpacity onPress={onContact} style={styles.contactButton} activeOpacity={0.8} testID="contact-button">
          <MessageCircle size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  contactButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
