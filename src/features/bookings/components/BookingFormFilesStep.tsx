import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload, FileText, CheckCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { InfoBanner } from '@/features/uploads/components';

const AnimatedView = Animated.createAnimatedComponent(View);

interface UploadedFile {
  name: string;
  size?: string;
}

interface BookingFormFilesStepProps {
  uploadedFiles: UploadedFile[];
  onFileUpload: () => void;
}

export function BookingFormFilesStep({ uploadedFiles, onFileUpload }: BookingFormFilesStepProps) {
  return (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Fichiers du projet</Text>
        <Text style={styles.stepSubtitle}>
          Uploadez vos fichiers audio, références ou tout autre document nécessaire
        </Text>
      </View>

      {/* Upload Area */}
      <TouchableOpacity onPress={onFileUpload} style={styles.uploadArea} activeOpacity={0.9}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.uploadIcon}
        >
          <Upload size={32} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.uploadTitle}>Glissez vos fichiers ici</Text>
        <Text style={styles.uploadSubtitle}>ou cliquez pour parcourir</Text>
        <TouchableOpacity onPress={onFileUpload} style={styles.uploadButton} activeOpacity={0.8}>
          <Text style={styles.uploadButtonText}>Parcourir</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <View style={styles.uploadedFilesContainer}>
          <Text style={styles.uploadedFilesTitle}>Fichiers uploadés ({uploadedFiles.length})</Text>
          {uploadedFiles.map((file, index) => (
            <View key={index} style={styles.uploadedFileCard}>
              <View style={styles.uploadedFileIcon}>
                <FileText size={20} color={colors.primary} />
              </View>
              <View style={styles.uploadedFileInfo}>
                <Text style={styles.uploadedFileName}>{file.name}</Text>
                {file.size && <Text style={styles.uploadedFileSize}>{file.size}</Text>}
              </View>
              <CheckCircle size={20} color={colors.success} />
            </View>
          ))}
        </View>
      )}

      <InfoBanner message="💡 Conseil: Plus vos fichiers et descriptions sont précis, meilleur sera le résultat final." />
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  stepHeader: {
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  stepTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  uploadArea: {
    padding: spacing.xl,
    borderRadius: radii.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: spacing.md,
  },
  uploadIcon: {
    width: spacing.xl * 2,
    height: spacing.xl * 2,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  uploadTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  uploadSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  uploadButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  uploadButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  uploadedFilesContainer: {
    gap: spacing.md,
  },
  uploadedFilesTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  uploadedFileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  uploadedFileIcon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedFileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  uploadedFileName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  uploadedFileSize: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
