interface PromptInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MAX_LENGTH = 1000;

const PromptInput: React.FC<PromptInputProps> = ({ value = '', onChange }) => {
  const charCount = value.length;

  return (
    <div className="w-full max-w-2xl">
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="输入你的图片描述，例如：一只戴着墨镜的柴犬，坐在夏威夷海滩上，4K高清，电影级光影..."
        maxLength={MAX_LENGTH}
        className="w-full h-40 p-4 rounded-xl bg-dark-card border border-gray-700 text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">
          {charCount} / {MAX_LENGTH}
        </span>
      </div>
    </div>
  );
};

export default PromptInput;