interface ActionButtonsProps {
  onOptimize?: () => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onOptimize,
  onGenerate,
  isGenerating = false,
}) => {
  return (
    <div className="w-full max-w-2xl flex gap-4">
      <button
        onClick={onOptimize}
        disabled={isGenerating}
        className="flex-1 py-3 px-6 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        优化提示词
      </button>
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="flex-1 py-3 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? '生成中...' : '生成图片'}
      </button>
    </div>
  );
};

export default ActionButtons;