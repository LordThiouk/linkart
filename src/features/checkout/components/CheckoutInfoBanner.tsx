import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

export function CheckoutInfoBanner() {
  return (
    <View style={styles.infoBanner}>
      <AlertCircle size={20} color={colors.cyan} />
      <View style={styles.infoBannerContent}>
        <Text style={styles.infoBannerTitle}>Paiement transparent</Text>
        <Text style={styles.infoBannerText}>
          Vous payez exactement le prix affiché. Après paiement, vous recevrez immédiatement votre contrat de licence et
          vos fichiers.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: hexToRgba(colors.cyan, 0.1),
    borderWidth: 1,
    borderColor: hexToRgba(colors.cyan, 0.3),
    flexDirection: 'row',
    gap: spacing.md,
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  infoBannerText: {
    color: colors.cyan,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 18,
  },
});
