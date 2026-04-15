import { API_KEY_STORAGE_KEY } from '../types/model';

const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

export interface StreamCallbacks {
  onChunk: (text: string) => void;
  onFinish: () => void;
  onError: (error: Error) => void;
}

export async function optimizePromptSSE(
  prompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  if (!apiKey) {
    callbacks.onError(new Error('请先设置 API Key'));
    return;
  }

  const systemPrompt = `你是一个专业的AI图片提示词优化专家。请将用户输入的图片描述优化为更详细、更专业的英文提示词，包含以下元素：
1. 主体描述（subject）
2. 风格特征（style）
3. 光影效果（lighting）
4. 构图方式（composition）
5. 画质参数（quality indicators如4K, 8K, HD等）

请直接输出优化后的英文提示词，不要解释，不要前缀，直接给出优化后的文本。`;

  try {
    const response = await fetch(ZHIPU_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `请求失败: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法读取响应流');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;

        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            callbacks.onChunk(content);
          }
        } catch {
          // Skip malformed JSON
        }
      }
    }

    callbacks.onFinish();
  } catch (error) {
    callbacks.onError(error instanceof Error ? error : new Error('未知错误'));
  }
}