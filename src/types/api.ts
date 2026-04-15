export interface CogViewRequest {
  model: 'cogview-3-plus';
  prompt: string;
  size?: '1024x1024' | '768x768' | '512x512';
  n?: 1 | 2 | 3 | 4;
}

export interface CogViewResponse {
  created: number;
  data: Array<{
    url: string;
    base64?: string;
  }>;
  request_id?: string;
}

export interface GLMOptimizeRequest {
  model: 'glm-4-flash';
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  stream?: boolean;
}

export interface GLMOptimizeResponse {
  choices: Array<{
    delta: {
      content: string;
    };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ZhipuErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
  msg?: string;
  request_id?: string;
}