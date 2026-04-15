import type { CogViewRequest, CogViewResponse } from '../types/api';

const IMAGE_API_URL = '/api/zhipu/images/generations';

export interface GenerateImageResult {
  url: string;
  base64: string;
}

export async function generateImage(params: {
  prompt: string;
  size?: string;
}): Promise<GenerateImageResult> {
  const apiKey = localStorage.getItem('zhipu_api_key');
  if (!apiKey) {
    throw new Error('请先设置 API Key');
  }

  const requestData: CogViewRequest = {
    model: 'cogview-3-plus',
    prompt: params.prompt,
    size: params.size as CogViewRequest['size'] || '1024x1024',
  };

  const response = await fetch(IMAGE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `生成失败: ${response.status}`);
  }

  const data = await response.json() as CogViewResponse;

  if (data.data?.[0]?.base64) {
    return {
      url: `data:image/png;base64,${data.data[0].base64}`,
      base64: data.data[0].base64,
    };
  }

  if (data.data?.[0]?.url) {
    const imageUrl = data.data[0].url;
    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
    const imageResponse = await fetch(proxyUrl);
    if (!imageResponse.ok) {
      throw new Error('图片加载失败');
    }
    const blob = await imageResponse.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(blob).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return {
      url: `data:image/png;base64,${base64}`,
      base64,
    };
  }

  throw new Error('未获取到图片数据');
}

export async function fetchImageAsBlob(url: string): Promise<Blob> {
  if (url.startsWith('data:')) {
    const base64 = url.split(',')[1];
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: 'image/png' });
  }

  const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error('图片加载失败');
  }
  return response.blob();
}

export function blobToObjectURL(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url);
}