import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Download } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';

interface DownloadAllButtonProps {
  onPress: () => void;
  disabled?: boolean;
  downloading?: boolean;
}

export function DownloadAllButton({ onPress, disabled = false, downloading = false }: DownloadAllButtonProps) {
  return (
    <PrimaryButton onPress={onPress} disabled={disabled || downloading} fullWidth>
      <View style={styles.downloadAllButtonContent}>
        <Download size={20} color={colors.textPrimary} />
        <Text style={styles.downloadAllButtonText}>{downloading ? 'Téléchargement...' : 'Tout télécharger'}</Text>
      </View>
    </PrimaryButton>
  );
}

const styles = StyleSheet.create({
  downloadAllButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  downloadAllButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
