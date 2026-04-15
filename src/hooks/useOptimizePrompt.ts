import { useState, useCallback, useRef } from 'react';
import { optimizePromptSSE } from '../api/prompt';

interface UseOptimizePromptReturn {
  optimizedText: string;
  isOptimizing: boolean;
  error: string | null;
  startOptimize: (prompt: string) => void;
  reset: () => void;
}

export function useOptimizePrompt(): UseOptimizePromptReturn {
  const [optimizedText, setOptimizedText] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<boolean>(false);

  const startOptimize = useCallback((prompt: string) => {
    if (!prompt.trim()) {
      setError('请先输入图片描述');
      return;
    }

    setOptimizedText('');
    setIsOptimizing(true);
    setError(null);
    abortRef.current = false;

    optimizePromptSSE(prompt, {
      onChunk: (text) => {
        if (abortRef.current) return;
        setOptimizedText((prev) => prev + text);
      },
      onFinish: () => {
        setIsOptimizing(false);
      },
      onError: (err) => {
        setError(err.message);
        setIsOptimizing(false);
      },
    });
  }, []);

  const reset = useCallback(() => {
    setOptimizedText('');
    setError(null);
  }, []);

  return {
    optimizedText,
    isOptimizing,
    error,
    startOptimize,
    reset,
  };
}