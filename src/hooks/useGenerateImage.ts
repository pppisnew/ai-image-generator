import { useState, useCallback, useRef, useEffect } from 'react';
import { generateImage, fetchImageAsBlob, blobToObjectURL, revokeObjectURL } from '../api/image';

interface UseGenerateImageReturn {
  imageUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  startGenerate: (prompt: string, size?: string) => void;
  reset: () => void;
}

export function useGenerateImage(): UseGenerateImageReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const objectURLRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectURLRef.current) {
        revokeObjectURL(objectURLRef.current);
        objectURLRef.current = null;
      }
    };
  }, []);

  const startGenerate = useCallback(async (prompt: string, size: string = '1024x1024') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (objectURLRef.current) {
      revokeObjectURL(objectURLRef.current);
      objectURLRef.current = null;
    }

    setImageUrl(null);
    setIsGenerating(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const imageURL = await generateImage({ prompt, size });
      const blob = await fetchImageAsBlob(imageURL);
      const objectURL = blobToObjectURL(blob);
      objectURLRef.current = objectURL;
      setImageUrl(objectURL);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (objectURLRef.current) {
      revokeObjectURL(objectURLRef.current);
      objectURLRef.current = null;
    }
    setImageUrl(null);
    setError(null);
  }, []);

  return {
    imageUrl,
    isGenerating,
    error,
    startGenerate,
    reset,
  };
}