import { supabase } from '../../../utils/supabase/client';
import { UploadResponse } from '../../../types';

export interface FileMetadata {
  title?: string;
  description?: string;
  genre?: string;
  bpm?: number;
  tags?: string[];
  isPreview?: boolean;
}

export class UploadService {
  static async requestUpload(
    fileType: 'preview' | 'full',
    fileName: string,
    fileSize: number
  ): Promise<UploadResponse> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data, error } = await supabase.functions.invoke('upload-request', {
      body: {
        fileType,
        fileName,
        fileSize,
        userId: user.user.id,
      },
    });

    if (error) throw error;
    return data;
  }

  static async uploadFile(
    uploadUrl: string,
    file: File | Blob,
    onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', event => {
        if (event.lengthComputable && onProgress) {
          onProgress({
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
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
  }

  static async completeUpload(fileKey: string, metadata: FileMetadata): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { error } = await supabase.functions.invoke('upload-complete', {
      body: {
        fileKey,
        metadata: {
          ...metadata,
          userId: user.user.id,
        },
      },
    });

    if (error) throw error;
  }

  static async getUploadedFiles(): Promise<string[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: files, error } = await supabase
      .from('uploaded_files')
      .select('file_key')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return files?.map((f: { file_key: string }) => f.file_key) || [];
  }

  static async deleteFile(fileKey: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { error } = await supabase
      .from('uploaded_files')
      .delete()
      .eq('file_key', fileKey)
      .eq('user_id', user.user.id);

    if (error) throw error;
  }

  static async getFileMetadata(fileKey: string): Promise<FileMetadata | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { data: file, error } = await supabase
      .from('uploaded_files')
      .select('metadata')
      .eq('file_key', fileKey)
      .eq('user_id', user.user.id)
      .single();

    if (error) throw error;
    return file?.metadata || null;
  }

  static async updateFileMetadata(fileKey: string, metadata: Partial<FileMetadata>): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Utilisateur non authentifié');

    const { error } = await supabase
      .from('uploaded_files')
      .update({ metadata })
      .eq('file_key', fileKey)
      .eq('user_id', user.user.id);

    if (error) throw error;
  }
}
