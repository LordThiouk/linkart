import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, ShoppingCart } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProductBottomCTAProps {
  price: number;
  hasPurchased?: boolean;
  onDownload?: () => void;
  onBuy: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProductBottomCTA({
  price,
  hasPurchased = false,
  onDownload,
  onBuy,
  style,
  testID,
}: ProductBottomCTAProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <LinearGradient
        colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)', colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {hasPurchased && onDownload && (
            <TouchableOpacity
              onPress={onDownload}
              style={styles.downloadButton}
              activeOpacity={0.9}
              testID="download-button"
            >
              <View style={styles.downloadButtonInner}>
                <Download size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          )}
          <PrimaryButton onPress={onBuy} style={styles.buyButton} testID="buy-button">
            <View style={styles.buyButtonContent}>
              {!hasPurchased && <ShoppingCart size={20} color={colors.textPrimary} />}
              <Text style={styles.buyButtonText}>
                {hasPurchased ? 'Télécharger' : `Acheter - ${price.toLocaleString()} F`}
              </Text>
            </View>
          </PrimaryButton>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xxl + spacing.xl,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    pointerEvents: 'box-none',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    maxWidth: 375,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    pointerEvents: 'auto',
  },
  downloadButton: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    flex: 1,
  },
  buyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buyButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
