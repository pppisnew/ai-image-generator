import { useState, useCallback } from 'react';
import { historyStorage, imageDB } from '../utils/storage';
import type { HistoryMeta } from '../types/model';

interface UseHistoryReturn {
  history: HistoryMeta[];
  loadHistory: () => void;
  addHistory: (record: Omit<HistoryMeta, 'id' | 'createdAt'>, base64Data: string) => Promise<string>;
  deleteHistory: (id: string) => Promise<void>;
  getImageBlobURL: (id: string) => Promise<string | null>;
}

export function useHistory(): UseHistoryReturn {
  const [history, setHistory] = useState<HistoryMeta[]>(() => historyStorage.getAll());

  const loadHistory = useCallback(() => {
    setHistory(historyStorage.getAll());
  }, []);

  const addHistory = useCallback(async (record: Omit<HistoryMeta, 'id' | 'createdAt'>, base64Data: string): Promise<string> => {
    const id = crypto.randomUUID();
    const newRecord: HistoryMeta = {
      ...record,
      id,
      createdAt: Date.now(),
    };
    await imageDB.saveImage(id, base64Data);
    historyStorage.add(newRecord);
    setHistory(historyStorage.getAll());
    return id;
  }, []);

  const deleteHistory = useCallback(async (id: string): Promise<void> => {
    await imageDB.deleteImage(id);
    historyStorage.remove(id);
    setHistory(historyStorage.getAll());
  }, []);

  const getImageBlobURL = useCallback(async (id: string): Promise<string | null> => {
    const base64 = await imageDB.getImage(id);
    if (!base64) return null;
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([array], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }, []);

  return {
    history,
    loadHistory,
    addHistory,
    deleteHistory,
    getImageBlobURL,
  };
}