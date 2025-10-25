import { api } from './api';
import { UploadResponse } from '../types';

export interface UploadRequestResponse extends UploadResponse {
  fileKey: string;
}

export interface UploadCompleteData {
  fileKey: string;
  fileSize: number;
  mimeType: string;
}

export class UploadService {
  static async requestUpload(fileType: 'preview' | 'full', fileName: string): Promise<UploadRequestResponse> {
    const { data } = await api.post('/upload-request', {
      fileType,
      fileName,
    });

    return data;
  }

  static async uploadFile(uploadUrl: string, file: File | Blob): Promise<void> {
    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
  }

  static async completeUpload(data: UploadCompleteData): Promise<void> {
    await api.post('/upload-complete', data);
  }

  static async getDownloadUrl(fileKey: string): Promise<string> {
    const { data } = await api.post('/generate-download', { fileKey });
    return data.downloadUrl;
  }
}
