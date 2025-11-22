import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, Share2 } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

export interface ContractHeaderProps {
  contractNumber: string;
  onBack?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  testID?: string;
}

export function ContractHeader({ contractNumber, onBack, onDownload, onShare, testID }: ContractHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.top}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8} testID="back-button">
              <ArrowLeft size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
          <View style={styles.text}>
            <Text style={styles.title}>Contrat de Licence</Text>
            <Text style={styles.subtitle}>N° {contractNumber}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {onDownload && (
            <TouchableOpacity
              onPress={onDownload}
              style={styles.downloadButton}
              activeOpacity={0.8}
              testID="download-button"
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.downloadButtonGradient}
              >
                <Download size={16} color={colors.textPrimary} />
                <Text style={styles.downloadButtonText}>Télécharger PDF</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {onShare && (
            <TouchableOpacity onPress={onShare} style={styles.shareButton} activeOpacity={0.8} testID="share-button">
              <Share2 size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  content: {
    gap: spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  downloadButton: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  downloadButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  shareButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
