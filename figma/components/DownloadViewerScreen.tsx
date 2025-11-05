import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, CheckCircle, Folder, FileAudio, File, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PrimaryButton } from './PrimaryButton';

interface DownloadViewerScreenProps {
  onBack: () => void;
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

export function DownloadViewerScreen({ onBack, purchaseId }: DownloadViewerScreenProps) {
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

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-[#F5F5F5] mb-1">Téléchargements</h1>
              <p className="text-[#A3A3A3] text-sm">{downloadData.files.length} fichiers disponibles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Product Info */}
        <div className="px-6 py-4">
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
            <div className="flex gap-4">
              <ImageWithFallback
                src={downloadData.coverImage}
                alt={downloadData.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-[#F5F5F5] mb-1">{downloadData.title}</h2>
                <p className="text-[#A3A3A3] text-sm mb-2">{downloadData.artist}</p>
                <div className="inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] text-xs">
                  {downloadData.license} License
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="px-6 py-2">
          <div className="flex gap-3 p-4 rounded-xl bg-[#EC4899]/10 border border-[#EC4899]/30">
            <AlertCircle className="w-5 h-5 text-[#EC4899] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#EC4899] text-sm mb-1">⚠️ Important</p>
              <p className="text-[#D4D4D4] text-sm">
                Téléchargez tous vos fichiers maintenant. Les liens expirent après 30 jours.
              </p>
            </div>
          </div>
        </div>

        {/* Download All Button */}
        <div className="px-6 py-4">
          <PrimaryButton
            onClick={handleDownloadAll}
            disabled={downloading !== null}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {downloading === 'all' ? 'Téléchargement...' : 'Tout télécharger'}
          </PrimaryButton>
        </div>

        {/* Files List */}
        <div className="px-6 py-4">
          <h3 className="text-[#F5F5F5] mb-4">Fichiers inclus</h3>
          <div className="space-y-3">
            {downloadData.files.map((file, index) => {
              const Icon = getFileIcon(file.type);
              const isDownloaded = downloadedFiles.has(file.id);
              const isDownloading = downloading === file.id;

              return (
                <motion.div
                  key={file.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-all"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      file.type === 'audio'
                        ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]'
                        : file.type === 'archive'
                          ? 'bg-gradient-to-br from-[#EC4899] to-[#F59E0B]'
                          : 'bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6]'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-[#F5F5F5]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#F5F5F5] text-sm truncate mb-1">{file.name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#A3A3A3]">{file.size}</span>
                      <span className="text-[#404040]">•</span>
                      <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#6366F1]">{file.format}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  {isDownloaded ? (
                    <div className="flex items-center gap-2 text-[#06B6D4]">
                      <CheckCircle className="w-5 h-5 fill-current" />
                      <span className="text-sm">Téléchargé</span>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(file.id)}
                      disabled={isDownloading}
                      className="p-3 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Download className="w-5 h-5 text-[#F5F5F5]" />
                        </motion.div>
                      ) : (
                        <Download className="w-5 h-5 text-[#F5F5F5]" />
                      )}
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Download Stats */}
        <div className="px-6 py-4">
          <div className="p-4 rounded-xl bg-[#111111] border border-[#404040]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#D4D4D4] text-sm">Progression</span>
              <span className="text-[#6366F1] text-sm">
                {downloadedFiles.size}/{downloadData.files.length} fichiers
              </span>
            </div>
            <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(downloadedFiles.size / downloadData.files.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
