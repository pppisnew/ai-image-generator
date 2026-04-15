import type { HistoryMeta, ImageRecord } from '../types/model';
import { DB_NAME, DB_VERSION, IMAGE_STORE_NAME, HISTORY_STORAGE_KEY } from '../types/model';

class ImageDB {
  private db: IDBDatabase | null = null;

  initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
          db.createObjectStore(IMAGE_STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async saveImage(id: string, base64Data: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(IMAGE_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(IMAGE_STORE_NAME);
      const record: ImageRecord = { id, base64Data };
      const request = store.put(record);

      request.onerror = () => reject(new Error('Failed to save image'));
      request.onsuccess = () => resolve();
    });
  }

  async getImage(id: string): Promise<string | null> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(IMAGE_STORE_NAME, 'readonly');
      const store = transaction.objectStore(IMAGE_STORE_NAME);
      const request = store.get(id);

      request.onerror = () => reject(new Error('Failed to get image'));
      request.onsuccess = () => {
        const result = request.result as ImageRecord | undefined;
        resolve(result?.base64Data ?? null);
      };
    });
  }

  async deleteImage(id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(IMAGE_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(IMAGE_STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(new Error('Failed to delete image'));
      request.onsuccess = () => resolve();
    });
  }
}

export const imageDB = new ImageDB();

export const historyStorage = {
  getAll(): HistoryMeta[] {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as HistoryMeta[];
    } catch {
      return [];
    }
  },

  save(records: HistoryMeta[]): void {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(records));
  },

  add(record: HistoryMeta): void {
    const records = this.getAll();
    records.unshift(record);
    if (records.length > 50) {
      records.pop();
    }
    this.save(records);
  },

  remove(id: string): void {
    const records = this.getAll().filter((r) => r.id !== id);
    this.save(records);
  },

  getById(id: string): HistoryMeta | undefined {
    return this.getAll().find((r) => r.id === id);
  },

  update(id: string, updates: Partial<HistoryMeta>): void {
    const records = this.getAll();
    const index = records.findIndex((r) => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      this.save(records);
    }
  },
};