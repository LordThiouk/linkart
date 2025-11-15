import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, CheckCircle, Folder, FileAudio, File, AlertCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

interface DownloadViewerScreenFigmaProps {
  onBack?: () => void;
  purchaseId: string;
}

const downloadData = {
  id: 'p1',
  title: 'Midnight Vibes',
  artist: 'DJ Shadow',
  coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
  license: 'Premium',
  files: [
    { id: 'f1', name: 'Midnight_Vibes_MP3.mp3', size: '8.5 MB', type: 'audio', format: 'MP3' },
    { id: 'f2', name: 'Midnight_Vibes_WAV.wav', size: '42.3 MB', type: 'audio', format: 'WAV' },
    { id: 'f3', name: 'Midnight_Vibes_Stems.zip', size: '156.8 MB', type: 'archive', format: 'ZIP' },
    { id: 'f4', name: 'License_Contract.pdf', size: '125 KB', type: 'document', format: 'PDF' },
    { id: 'f5', name: 'Track_Info.txt', size: '2 KB', type: 'document', format: 'TXT' },
  ],
};

export function DownloadViewerScreenFigma({ onBack, purchaseId }: DownloadViewerScreenFigmaProps) {
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (fileId: string) => {
    setDownloading(fileId);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloadedFiles(prev => new Set([...prev, fileId]));
    setDownloading(null);
  };

  const handleDownloadAll = async () => {
    setDownloading('all');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloadedFiles(new Set(downloadData.files.map(f => f.id)));
    setDownloading(null);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return FileAudio;
      case 'archive':
        return Folder;
      default:
        return File;
    }
  };

  const progressPercentage = (downloadedFiles.size / downloadData.files.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Téléchargements</Text>
              <Text style={styles.headerSubtitle}>{downloadData.files.length} fichiers disponibles</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Product Info */}
        <AnimatedView entering={FadeIn} style={styles.productInfoSection}>
          <View style={styles.productInfoCard}>
            <View style={styles.productInfoContent}>
              <ImageWithFallback src={downloadData.coverImage} alt={downloadData.title} style={styles.productImage} />
              <View style={styles.productInfoText}>
                <Text style={styles.productTitle}>{downloadData.title}</Text>
                <Text style={styles.productArtist}>{downloadData.artist}</Text>
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.licenseBadge}
                >
                  <Text style={styles.licenseBadgeText}>{downloadData.license} License</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </AnimatedView>

        {/* Important Notice */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.noticeSection}>
          <View style={styles.noticeCard}>
            <AlertCircle size={20} color={colors.accent} />
            <View style={styles.noticeText}>
              <Text style={styles.noticeTitle}>⚠️ Important</Text>
              <Text style={styles.noticeMessage}>
                Téléchargez tous vos fichiers maintenant. Les liens expirent après 30 jours.
              </Text>
            </View>
          </View>
        </AnimatedView>

        {/* Download All Button */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.downloadAllSection}>
          <PrimaryButton onPress={handleDownloadAll} disabled={downloading !== null} fullWidth>
            <View style={styles.downloadAllButtonContent}>
              <Download size={20} color={colors.textPrimary} />
              <Text style={styles.downloadAllButtonText}>
                {downloading === 'all' ? 'Téléchargement...' : 'Tout télécharger'}
              </Text>
            </View>
          </PrimaryButton>
        </AnimatedView>

        {/* Files List */}
        <AnimatedView entering={FadeIn.delay(300)} style={styles.filesSection}>
          <Text style={styles.sectionTitle}>Fichiers inclus</Text>
          <View style={styles.filesList}>
            {downloadData.files.map((file, index) => {
              const Icon = getFileIcon(file.type);
              const isDownloaded = downloadedFiles.has(file.id);
              const isDownloading = downloading === file.id;

              return (
                <AnimatedView key={file.id} entering={FadeInLeft.delay(index * 50)} style={styles.fileCard}>
                  <View style={styles.fileCardContent}>
                    {/* Icon */}
                    <View
                      style={[
                        styles.fileIconContainer,
                        file.type === 'audio'
                          ? styles.fileIconAudio
                          : file.type === 'archive'
                            ? styles.fileIconArchive
                            : styles.fileIconDocument,
                      ]}
                    >
                      <LinearGradient
                        colors={
                          file.type === 'audio'
                            ? [colors.primary, colors.primaryDark]
                            : file.type === 'archive'
                              ? [colors.accent, colors.secondary]
                              : [colors.cyan, colors.primaryDark]
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.fileIconGradient}
                      >
                        <Icon size={24} color={colors.textPrimary} />
                      </LinearGradient>
                    </View>

                    {/* Info */}
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

                    {/* Download Button */}
                    {isDownloaded ? (
                      <View style={styles.downloadedBadge}>
                        <CheckCircle size={20} color={colors.cyan} fill={colors.cyan} />
                        <Text style={styles.downloadedText}>Téléchargé</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleDownload(file.id)}
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
            })}
          </View>
        </AnimatedView>

        {/* Download Stats */}
        <AnimatedView entering={FadeIn.delay(400)} style={styles.statsSection}>
          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsLabel}>Progression</Text>
              <Text style={styles.statsValue}>
                {downloadedFiles.size}/{downloadData.files.length} fichiers
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressPercentage}%`,
                  },
                ]}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.progressBarGradient}
                />
              </Animated.View>
            </View>
          </View>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg, // 48px
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  productInfoSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  productInfoCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productInfoContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  productInfoText: {
    flex: 1,
    gap: spacing.sm,
  },
  productTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  productArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  noticeSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  noticeCard: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: hexToRgba(colors.accent, 0.1),
    borderWidth: 1,
    borderColor: hexToRgba(colors.accent, 0.3),
  },
  noticeText: {
    flex: 1,
    gap: spacing.xs,
  },
  noticeTitle: {
    color: colors.accent,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  noticeMessage: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  downloadAllSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
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
  filesSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  filesList: {
    gap: spacing.md - spacing.xs, // 12px
  },
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
    width: spacing.xxl * 2, // 48px
    height: spacing.xxl * 2, // 48px
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  fileIconAudio: {
    // Gradient handled by LinearGradient
  },
  fileIconArchive: {
    // Gradient handled by LinearGradient
  },
  fileIconDocument: {
    // Gradient handled by LinearGradient
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
  statsSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  statsCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statsLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statsValue: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  progressBarContainer: {
    height: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressBarGradient: {
    width: '100%',
    height: '100%',
  },
});
