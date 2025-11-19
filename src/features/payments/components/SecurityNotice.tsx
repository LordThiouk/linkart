import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface SecurityNoticeProps {
  title?: string;
  description?: string;
}

export function SecurityNotice({
  title = 'Paiement 100% sécurisé',
  description = 'Vos informations bancaires sont chiffrées et sécurisées. Nous ne stockons jamais vos données de paiement.',
}: SecurityNoticeProps) {
  return (
    <View style={styles.container}>
      <Shield size={20} color={colors.success} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
