import { useState, useEffect } from 'react';
import { downloadImage } from '../../utils/download';

interface ImageDisplayProps {
  imageUrl: string | null;
  isGenerating?: boolean;
  prompt?: string;
  onCancel?: () => void;
}

const LOADING_MESSAGES = [
  { maxTime: 5000, text: '正在解析语义...' },
  { maxTime: 15000, text: '正在布局构图...' },
  { maxTime: Infinity, text: '正在渲染细节...' },
];

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  imageUrl,
  isGenerating = false,
  prompt = '',
  onCancel,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!isGenerating) {
      setElapsedTime(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const getLoadingMessage = () => {
    for (const msg of LOADING_MESSAGES) {
      if (elapsedTime < msg.maxTime) {
        return msg.text;
      }
    }
    return LOADING_MESSAGES[LOADING_MESSAGES.length - 1].text;
  };

  const handleDownload = async () => {
    if (!imageUrl || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadImage(imageUrl, prompt);
    } catch {
    } finally {
      setIsDownloading(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="w-full max-w-2xl aspect-square rounded-xl bg-dark-card border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-dark-bg border-2 border-primary/30 flex items-center justify-center mb-6 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping" />
          </div>
          <p className="text-gray-300 text-lg font-medium mb-2">{getLoadingMessage()}</p>
          <p className="text-gray-500 text-sm">预计需要 10-30 秒</p>
          {onCancel && (
            <button
              onClick={onCancel}
              className="mt-6 px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 transition-colors text-sm"
            >
              取消生成
            </button>
          )}
        </div>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="w-full max-w-2xl rounded-xl overflow-hidden bg-dark-card border border-gray-700 flex flex-col">
        <div className="flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt="生成结果"
            className="max-w-full max-h-[512px] object-contain rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center pb-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isDownloading ? '下载中...' : '下载图片'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl aspect-square rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="text-lg font-medium">你的杰作将在这里呈现</p>
      <p className="text-sm mt-1">输入描述，开始创作</p>
    </div>
  );
};

export default ImageDisplay;