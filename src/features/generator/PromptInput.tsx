import { useEffect, useState } from 'react';
import { MAX_PROMPT_LENGTH } from '../../types/model';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  optimizedText?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  optimizedText = '',
}) => {
  const [displayText, setDisplayText] = useState(value);
  const isOptimizing = optimizedText !== '';

  useEffect(() => {
    if (isOptimizing) {
      setDisplayText(optimizedText);
      onChange(optimizedText);
    } else {
      setDisplayText(value);
    }
  }, [isOptimizing, optimizedText, value, onChange]);

  const charCount = displayText.length;

  return (
    <div className="w-full max-w-2xl">
      <textarea
        value={displayText}
        onChange={(e) => {
          if (!isOptimizing) {
            onChange(e.target.value);
          }
        }}
        placeholder="输入你的图片描述，例如：一只戴着墨镜的柴犬，坐在夏威夷海滩上，4K高清，电影级光影..."
        maxLength={MAX_PROMPT_LENGTH}
        disabled={isOptimizing}
        className="w-full h-40 p-4 rounded-xl bg-dark-card border border-gray-700 text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      />
      <div className="flex justify-end mt-2">
        <span className={`text-xs ${charCount > MAX_PROMPT_LENGTH * 0.9 ? 'text-yellow-500' : 'text-gray-500'}`}>
          {charCount} / {MAX_PROMPT_LENGTH}
        </span>
      </div>
    </div>
  );
};

export default PromptInput;