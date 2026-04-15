import { MAX_PROMPT_LENGTH } from '../../types/model';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  isOptimizing?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  isOptimizing = false,
}) => {
  const charCount = value.length;
  const isNearLimit = charCount > MAX_PROMPT_LENGTH * 0.9;
  const isAtLimit = charCount >= MAX_PROMPT_LENGTH;

  return (
    <div className="w-full max-w-2xl">
      <textarea
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= MAX_PROMPT_LENGTH) {
            onChange(e.target.value);
          }
        }}
        placeholder="输入你的图片描述，例如：一只戴着墨镜的柴犬，坐在夏威夷海滩上，4K高清，电影级光影..."
        disabled={isOptimizing}
        className="w-full h-40 p-4 rounded-xl bg-dark-card border text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          borderColor: isAtLimit ? '#ef4444' : undefined,
        }}
      />
      <div className="flex justify-end mt-2">
        <span className={`text-xs ${
          isAtLimit ? 'text-red-500 font-medium' :
          isNearLimit ? 'text-yellow-500' : 'text-gray-500'
        }`}>
          {charCount} / {MAX_PROMPT_LENGTH}
        </span>
      </div>
    </div>
  );
};

export default PromptInput;