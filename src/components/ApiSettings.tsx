import { useState, useEffect } from 'react';
import { API_KEY_STORAGE_KEY } from '../types/model';

interface ApiSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ApiSettings: React.FC<ApiSettingsProps> = ({ isOpen = true, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-card rounded-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">API 设置</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-800 text-gray-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              智谱 AI API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="请输入您的 API Key"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="mt-2 text-xs text-gray-500">
              API Key 将保存在本地浏览器中，仅本地使用
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1 py-2.5 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaved ? '已保存 ✓' : '保存'}
            </button>
            <button
              onClick={handleClear}
              disabled={!apiKey}
              className="py-2.5 px-4 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              清除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettings;