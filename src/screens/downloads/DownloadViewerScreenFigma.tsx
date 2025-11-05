import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, CheckCircle, Folder, FileAudio, File, AlertCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

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
                <ArrowLeft size={20} color="#D4D4D4" />
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
                  colors={['#6366F1', '#8B5CF6']}
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
            <AlertCircle size={20} color="#EC4899" />
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
              <Download size={20} color="#F5F5F5" />
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
                            ? ['#6366F1', '#8B5CF6']
                            : file.type === 'archive'
                              ? ['#EC4899', '#F59E0B']
                              : ['#06B6D4', '#8B5CF6']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.fileIconGradient}
                      >
                        <Icon size={24} color="#F5F5F5" />
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
                        <CheckCircle size={20} color="#06B6D4" fill="#06B6D4" />
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
                          <ActivityIndicator size="small" color="#F5F5F5" />
                        ) : (
                          <LinearGradient
                            colors={['#6366F1', '#8B5CF6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.downloadButtonGradient}
                          >
                            <Download size={20} color="#F5F5F5" />
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
                  colors={['#6366F1', '#8B5CF6']}
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  productInfoSection: {
    padding: 24,
    paddingBottom: 16,
  },
  productInfoCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  productInfoContent: {
    flexDirection: 'row',
    gap: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  productInfoText: {
    flex: 1,
    gap: 8,
  },
  productTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  productArtist: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  licenseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  licenseBadgeText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '600',
  },
  noticeSection: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  noticeCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  noticeText: {
    flex: 1,
    gap: 4,
  },
  noticeTitle: {
    color: '#EC4899',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  noticeMessage: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  downloadAllSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  downloadAllButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  downloadAllButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  filesSection: {
    padding: 24,
    paddingTop: 16,
    gap: 16,
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  filesList: {
    gap: 12,
  },
  fileCard: {
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  fileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  fileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
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
    gap: 8,
  },
  fileName: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  fileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileSize: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  fileMetaSeparator: {
    color: '#404040',
    fontSize: 12,
  },
  fileFormatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
  },
  fileFormatText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
  },
  downloadedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  downloadedText: {
    color: '#06B6D4',
    fontSize: 14,
    fontWeight: '400',
  },
  downloadButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
    padding: 24,
    paddingTop: 16,
  },
  statsCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statsLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  statsValue: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
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
