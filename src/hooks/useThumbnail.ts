import { useState, useEffect } from 'react';
import { imageDB } from '../utils/storage';

export function useThumbnail(imageId: string | null) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageId) {
      setThumbnailUrl(null);
      return;
    }

    let objectURL: string | null = null;

    const loadThumbnail = async () => {
      setIsLoading(true);
      try {
        const base64 = await imageDB.getImage(imageId);
        if (!base64) {
          setThumbnailUrl(null);
          return;
        }

        const binary = atob(base64);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([array], { type: 'image/png' });
        objectURL = URL.createObjectURL(blob);
        setThumbnailUrl(objectURL);
      } catch (error) {
        console.error('Failed to load thumbnail:', error);
        setThumbnailUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [imageId]);

  return { thumbnailUrl, isLoading };
}