export interface HistoryMeta {
  id: string;
  prompt: string;
  optimizedPrompt?: string;
  style: string;
  size: string;
  createdAt: number;
}

export interface ImageRecord {
  id: string;
  base64Data: string;
}

export interface GenerationParams {
  prompt: string;
  optimizedPrompt?: string;
  style: string;
  size: string;
}

export const STYLE_OPTIONS = [
  { id: 'realistic', label: '真实摄影' },
  { id: 'anime', label: '二次元动漫' },
  { id: '3d', label: '3D 渲染' },
  { id: 'oil', label: '油画艺术' },
  { id: 'cyberpunk', label: '赛博朋克' },
  { id: 'ink', label: '水墨国风' },
] as const;

export type StyleId = typeof STYLE_OPTIONS[number]['id'];

export const SIZE_OPTIONS = [
  { id: '1:1', label: '1:1', desc: '1024×1024', value: '1024x1024' },
  { id: '16:9', label: '16:9', desc: '1920×1080', value: '1920x1080' },
  { id: '9:16', label: '9:16', desc: '1080×1920', value: '1080x1920' },
  { id: '4:3', label: '4:3', desc: '1024×768', value: '1024x768' },
  { id: '3:4', label: '3:4', desc: '768×1024', value: '768x1024' },
] as const;

export type SizeId = typeof SIZE_OPTIONS[number]['id'];

export const MAX_PROMPT_LENGTH = 1000;
export const HISTORY_STORAGE_KEY = 'ai_image_history_meta';
export const API_KEY_STORAGE_KEY = 'zhipu_api_key';
export const DB_NAME = 'AI_Image_DB';
export const DB_VERSION = 1;
export const IMAGE_STORE_NAME = 'images';