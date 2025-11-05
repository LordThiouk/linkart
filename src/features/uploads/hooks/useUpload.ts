import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { UploadResponse } from '../../../types';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadState {
  isUploading: boolean;
  progress: UploadProgress | null;
  error: string | null;
  uploadedFiles: string[];
}

export interface UseUploadOptions {
  maxFileSize?: number; // en bytes
  allowedTypes?: string[];
  onProgress?: (progress: UploadProgress) => void;
  onComplete?: (fileKey: string) => void;
  onError?: (error: string) => void;
}

export const useUpload = (options: UseUploadOptions = {}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: null,
    error: null,
    uploadedFiles: [],
  });

  const requestUpload = async (
    fileType: 'preview' | 'full',
    fileName: string,
    fileSize: number
  ): Promise<UploadResponse> => {
    setUploadState(prev => ({
      ...prev,
      isUploading: true,
      error: null,
      progress: null,
    }));

    try {
      // Vérifier la taille du fichier
      if (options.maxFileSize && fileSize > options.maxFileSize) {
        throw new Error(`Fichier trop volumineux. Maximum: ${Math.round(options.maxFileSize / 1024 / 1024)}MB`);
      }

      // Vérifier le type de fichier
      if (options.allowedTypes && options.allowedTypes.length > 0) {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        if (!fileExtension || !options.allowedTypes.includes(fileExtension)) {
          throw new Error(`Type de fichier non autorisé. Types acceptés: ${options.allowedTypes.join(', ')}`);
        }
      }

      // Demander l'URL de téléversement
      const { data: uploadData, error: uploadError } = await supabase.functions.invoke('upload-request', {
        body: {
          fileType,
          fileName,
          fileSize,
        },
      });

      if (uploadError) throw uploadError;

      return uploadData;
    } catch (error: any) {
      const errorMessage = error.message || 'Erreur lors de la demande de téléversement';
      setUploadState(prev => ({
        ...prev,
        error: errorMessage,
        isUploading: false,
      }));
      options.onError?.(errorMessage);
      throw error;
    }
  };

  const _uploadPhysicalFile = async (
    uploadUrl: string,
    file: File | Blob,
    fileKey: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<void> => {
    setUploadState(prev => ({
      ...prev,
      isUploading: true,
      error: null,
    }));

    try {
      const xhr = new XMLHttpRequest();

      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            };

            setUploadState(prev => ({
              ...prev,
              progress,
            }));

            onProgress?.(progress);
            options.onProgress?.(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            setUploadState(prev => ({
              ...prev,
              isUploading: false,
              progress: null,
              uploadedFiles: [...prev.uploadedFiles, fileKey],
            }));
            options.onComplete?.(fileKey);
            resolve();
          } else {
            reject(new Error(`Erreur de téléversement: ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Erreur de téléversement'));
        });

        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });
    } catch (error: any) {
      const errorMessage = error.message || 'Erreur lors du téléversement';
      setUploadState(prev => ({
        ...prev,
        error: errorMessage,
        isUploading: false,
      }));
      options.onError?.(errorMessage);
      throw error;
    }
  };

  const completeUpload = async (fileKey: string, metadata: any): Promise<void> => {
    try {
      const { error } = await supabase.functions.invoke('upload-complete', {
        body: {
          fileKey,
          metadata,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      const errorMessage = error.message || 'Erreur lors de la finalisation du téléversement';
      setUploadState(prev => ({
        ...prev,
        error: errorMessage,
      }));
      options.onError?.(errorMessage);
      throw error;
    }
  };

  const uploadFile = async (
    file: File | Blob,
    fileType: 'preview' | 'full',
    fileName: string,
    metadata?: any
  ): Promise<string> => {
    const fileSize = file.size;
    const fileKey = `${Date.now()}-${fileName}`;

    try {
      // 1. Demander l'URL de téléversement
      const uploadData = await requestUpload(fileType, fileName, fileSize);

      // 2. Téléverser le fichier
      await _uploadPhysicalFile(uploadData.uploadUrl, file, fileKey);

      // 3. Finaliser le téléversement
      await completeUpload(fileKey, metadata);

      return fileKey;
    } catch (error: any) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: error.message,
      }));
      throw error;
    }
  };

  const resetUploadState = () => {
    setUploadState({
      isUploading: false,
      progress: null,
      error: null,
      uploadedFiles: [],
    });
  };

  return {
    uploadState,
    requestUpload,
    uploadFile,
    completeUpload,
    resetUploadState,
  };
};
