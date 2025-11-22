import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ColorValue } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, CheckCircle, Folder, FileAudio, File, LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface File {
  id: string;
  name: string;
  size: string;
  type: 'audio' | 'archive' | 'document';
  format: string;
}

interface FileCardProps {
  file: File;
  isDownloaded: boolean;
  isDownloading: boolean;
  onDownload: (fileId: string) => void;
  index?: number;
}

function getFileIcon(type: string): LucideIcon {
  switch (type) {
    case 'audio':
      return FileAudio;
    case 'archive':
      return Folder;
    default:
      return File;
  }
}

function getGradientColors(type: string): string[] {
  switch (type) {
    case 'audio':
      return [colors.primary, colors.primaryDark];
    case 'archive':
      return [colors.accent, colors.secondary];
    default:
      return [colors.cyan, colors.primaryDark];
  }
}

export function FileCard({ file, isDownloaded, isDownloading, onDownload, index = 0 }: FileCardProps) {
  const Icon = getFileIcon(file.type);
  const gradientColors = getGradientColors(file.type);

  return (
    <AnimatedView entering={FadeInLeft.delay(index * 50)} style={styles.fileCard}>
      <View style={styles.fileCardContent}>
        <View style={styles.fileIconContainer}>
          <LinearGradient
            colors={gradientColors as [ColorValue, ColorValue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fileIconGradient}
          >
            <Icon size={24} color={colors.textPrimary} />
          </LinearGradient>
        </View>

        <View style={styles.fileInfo}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          <View style={styles.fileMeta}>
            <Text style={styles.fileSize}>{file.size}</Text>
            <Text style={styles.fileMetaSeparator}>•</Text>
            <View style={styles.fileFormatBadge}>
              <Text style={styles.fileFormatText}>{file.format}</Text>
            </View>
          </View>
        </View>

        {isDownloaded ? (
          <View style={styles.downloadedBadge}>
            <CheckCircle size={20} color={colors.cyan} fill={colors.cyan} />
            <Text style={styles.downloadedText}>Téléchargé</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onDownload(file.id)}
            disabled={isDownloading}
            style={[styles.downloadButton, isDownloading && styles.downloadButtonDisabled]}
            activeOpacity={0.8}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.downloadButtonGradient}
              >
                <Download size={20} color={colors.textPrimary} />
              </LinearGradient>
            )}
          </TouchableOpacity>
        )}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  fileCard: {
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  fileIconContainer: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  fileIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  fileName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  fileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  fileSize: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  fileMetaSeparator: {
    color: colors.border,
    fontSize: typography.fontSize.caption,
  },
  fileFormatBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.xs,
    backgroundColor: colors.surfaceElevated,
  },
  fileFormatText: {
    color: colors.primary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  downloadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  downloadedText: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  downloadButtonDisabled: {
    opacity: 0.5,
  },
  downloadButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
