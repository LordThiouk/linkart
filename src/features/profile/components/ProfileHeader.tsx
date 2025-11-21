import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Share2, Settings } from 'lucide-react-native';
import { colors, spacing, radii } from '@/theme';

export interface ProfileHeaderProps {
  onShare?: () => void;
  onSettings?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProfileHeader({ onShare, onSettings, style, testID }: ProfileHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.actionsContainer}>
        {onShare && (
          <TouchableOpacity onPress={onShare} style={styles.button} activeOpacity={0.9} testID="share-button">
            <View style={styles.buttonInner}>
              <Share2 size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        )}
        {onSettings && (
          <TouchableOpacity onPress={onSettings} style={styles.button} activeOpacity={0.9} testID="settings-button">
            <View style={styles.buttonInner}>
              <Settings size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  button: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
