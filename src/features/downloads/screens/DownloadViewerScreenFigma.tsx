import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';
import {
  DownloadHeader,
  DownloadProductInfoCard,
  DownloadNoticeCard,
  DownloadAllButton,
  FileCard,
  DownloadProgressCard,
} from '@/features/downloads/components';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface DownloadViewerScreenFigmaProps {
  onBack?: () => void;
  purchaseId: string;
}

const mockDownloadData = {
  title: 'Midnight Vibes',
  artist: 'DJ Shadow',
  coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
  license: 'Premium',
  files: [
    { id: 'f1', name: 'Midnight_Vibes_MP3.mp3', size: '8.5 MB', type: 'audio' as const, format: 'MP3' },
    { id: 'f2', name: 'Midnight_Vibes_WAV.wav', size: '42.3 MB', type: 'audio' as const, format: 'WAV' },
    { id: 'f3', name: 'Midnight_Vibes_Stems.zip', size: '156.8 MB', type: 'archive' as const, format: 'ZIP' },
    { id: 'f4', name: 'License_Contract.pdf', size: '125 KB', type: 'document' as const, format: 'PDF' },
    { id: 'f5', name: 'Track_Info.txt', size: '2 KB', type: 'document' as const, format: 'TXT' },
  ],
};

export function DownloadViewerScreenFigma({ onBack }: DownloadViewerScreenFigmaProps) {
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
    setDownloadedFiles(new Set(mockDownloadData.files.map(f => f.id)));
    setDownloading(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DownloadHeader onBack={onBack} filesCount={mockDownloadData.files.length} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <AnimatedView entering={FadeIn} style={styles.productInfoSection}>
          <DownloadProductInfoCard
            title={mockDownloadData.title}
            artist={mockDownloadData.artist}
            coverImage={mockDownloadData.coverImage}
            license={mockDownloadData.license}
          />
        </AnimatedView>

        <AnimatedView entering={FadeIn.delay(100)} style={styles.noticeSection}>
          <DownloadNoticeCard message="Téléchargez tous vos fichiers maintenant. Les liens expirent après 30 jours." />
        </AnimatedView>

        <AnimatedView entering={FadeIn.delay(200)} style={styles.downloadAllSection}>
          <DownloadAllButton
            onPress={handleDownloadAll}
            disabled={downloading !== null}
            downloading={downloading === 'all'}
          />
        </AnimatedView>

        <AnimatedView entering={FadeIn.delay(300)} style={styles.filesSection}>
          <Text style={styles.sectionTitle}>Fichiers inclus</Text>
          <View style={styles.filesList}>
            {mockDownloadData.files.map((file, index) => (
              <FileCard
                key={file.id}
                file={file}
                isDownloaded={downloadedFiles.has(file.id)}
                isDownloading={downloading === file.id}
                onDownload={handleDownload}
                index={index}
              />
            ))}
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeIn.delay(400)} style={styles.statsSection}>
          <DownloadProgressCard downloadedCount={downloadedFiles.size} totalCount={mockDownloadData.files.length} />
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
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
  productInfoSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  noticeSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  downloadAllSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filesSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  filesList: {
    gap: spacing.md - spacing.xs,
  },
  statsSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
});
