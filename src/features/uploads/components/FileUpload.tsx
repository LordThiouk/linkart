import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { Card, Title, Button, ProgressBar, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Upload } from 'lucide-react-native';
import { useUpload } from '../hooks/useUpload';

export interface FileUploadProps {
  fileType: 'preview' | 'full';
  onFileSelected?: (file: any) => void;
  onUploadComplete?: (fileKey: string) => void;
  onUploadError?: (error: string) => void;
  maxFileSize?: number;
  allowedTypes?: string[];
  style?: ViewStyle;
  testID?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  fileType,
  onFileSelected,
  onUploadComplete,
  onUploadError,
  maxFileSize = 50 * 1024 * 1024, // 50MB par défaut
  allowedTypes = ['mp3', 'wav', 'zip'],
  style,
  testID,
}) => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { uploadState, uploadFile, resetUploadState, requestUpload } = useUpload({
    maxFileSize,
    allowedTypes,
    onComplete: onUploadComplete,
    onError: onUploadError,
  });

  const handleFileSelect = () => {
    // TODO: Implémenter la sélection de fichier pour React Native
    // Utiliser expo-document-picker ou react-native-document-picker
    console.log('File selection not implemented for React Native yet');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // Demander une URL d'upload
      const uploadResponse = await requestUpload(fileType, selectedFile.name, selectedFile.size);

      // Uploader le fichier
      await uploadFile(selectedFile as any, fileType, selectedFile.name);

      // Aucun traitement supplémentaire ici, la gestion de l'achèvement ou des erreurs est centralisée via les callbacks onComplete/onError passés au hook useUpload

      onUploadComplete?.(uploadResponse.key);
    } catch (error: unknown) {
      onUploadError?.((error as Error).message);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    resetUploadState();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'zip':
        return '📦';
      default:
        return '📄';
    }
  };

  return (
    <View style={style} testID={testID}>
      {!selectedFile ? (
        <Card>
          <Card.Content style={{ alignItems: 'center', padding: 24 }}>
            <Upload size={48} color={theme.colors.primary} />
            <Title style={{ marginTop: 16, marginBottom: 8, color: theme.colors.onSurface }}>
              {fileType === 'preview' ? 'Téléverser un aperçu' : 'Téléverser le fichier complet'}
            </Title>
            <Text
              style={{
                textAlign: 'center',
                color: theme.colors.onSurfaceVariant,
                marginBottom: 16,
              }}
            >
              {fileType === 'preview'
                ? 'Fichier audio de 30 secondes maximum (MP3, WAV)'
                : 'Fichier complet (ZIP, MP3, WAV)'}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: theme.colors.onSurfaceVariant,
                marginBottom: 16,
                fontSize: 12,
              }}
            >
              Taille maximum: {formatFileSize(maxFileSize)}
            </Text>
            <Button mode="contained" onPress={handleFileSelect}>
              Choisir un fichier
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <Card>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 24, marginRight: 12 }}>{getFileIcon(selectedFile.name)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: theme.colors.onSurface }}>{selectedFile.name}</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant }}>{formatFileSize(selectedFile.size)}</Text>
              </View>
            </View>

            {uploadState.isUploading && uploadState.progress && (
              <View style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ color: theme.colors.onSurface }}>Téléversement en cours...</Text>
                  <Text style={{ color: theme.colors.onSurface }}>{uploadState.progress.percentage}%</Text>
                </View>
                <ProgressBar progress={uploadState.progress.percentage / 100} color={theme.colors.primary} />
              </View>
            )}

            {uploadState.error && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ color: theme.colors.error }}>{uploadState.error}</Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                mode="contained"
                onPress={handleUpload}
                loading={uploadState.isUploading}
                disabled={uploadState.isUploading}
                style={{ flex: 1 }}
              >
                {uploadState.isUploading ? 'Téléversement...' : 'Téléverser'}
              </Button>
              <Button mode="outlined" onPress={handleCancel} disabled={uploadState.isUploading}>
                Annuler
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};
