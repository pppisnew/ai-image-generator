import axios from 'axios';
import { API_KEY_STORAGE_KEY } from '../types/model';

const ZHIPU_API_BASE_URL = 'https://open.bigmodel.cn/api/paas/v4';

const client = axios.create({
  baseURL: ZHIPU_API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (apiKey) {
      config.headers.set('Authorization', `Bearer ${apiKey}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        console.error('API Key 无效或已过期，请检查设置');
      } else if (status === 403) {
        console.error('API Key 权限不足');
      } else if (status === 429) {
        console.error('请求过于频繁，请稍后重试');
      }
      console.error('API Error:', data);
    } else if (error.request) {
      console.error('网络错误，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

export default client;