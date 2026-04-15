import { useState, useCallback, useRef, useEffect } from 'react';
import { generateImage, fetchImageAsBlob, blobToObjectURL, revokeObjectURL } from '../api/image';

interface UseGenerateImageReturn {
  imageUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  startGenerate: (prompt: string, size?: string) => Promise<{ id: string; base64: string } | null>;
  cancelGenerate: () => void;
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
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const startGenerate = useCallback(async (prompt: string, size: string = '1024x1024'): Promise<{ id: string; base64: string } | null> => {
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
    const { signal } = abortControllerRef.current;

    try {
      const result = await generateImage({ prompt, size }, signal);
      const blob = await fetchImageAsBlob(result.url, signal);
      const objectURL = blobToObjectURL(blob);
      objectURLRef.current = objectURL;
      setImageUrl(objectURL);
      return { id: '', base64: result.base64 };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return null;
      }
      setError(err instanceof Error ? err.message : '生成失败');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const cancelGenerate = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (objectURLRef.current) {
      revokeObjectURL(objectURLRef.current);
      objectURLRef.current = null;
    }
    setImageUrl(null);
    setIsGenerating(false);
    setError(null);
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
    cancelGenerate,
    reset,
  };
}