export async function downloadImage(url: string, prompt: string): Promise<void> {
  try {
    let blob: Blob;

    if (url.startsWith('data:')) {
      const base64 = url.split(',')[1];
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      blob = new Blob([array], { type: 'image/png' });
    } else if (url.startsWith('blob:')) {
      const response = await fetch(url);
      blob = await response.blob();
    } else {
      const response = await fetch(url);
      if (!response.ok) throw new Error('下载失败');
      blob = await response.blob();
    }

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const timestamp = Date.now();
    const filename = prompt.slice(0, 5) || 'image';
    link.download = `AI_${timestamp}_${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('下载失败:', error);
    throw error;
  }
}