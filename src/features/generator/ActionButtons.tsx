interface ActionButtonsProps {
  onOptimize: () => void;
  onGenerate: () => void;
  isGenerating?: boolean;
  isOptimizing?: boolean;
  canOptimize?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onOptimize,
  onGenerate,
  isGenerating = false,
  isOptimizing = false,
  canOptimize = true,
}) => {
  return (
    <div className="w-full max-w-2xl flex gap-4">
      <button
        onClick={onOptimize}
        disabled={isGenerating || isOptimizing || !canOptimize}
        className="flex-1 py-3 px-6 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {isOptimizing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            优化中...
          </span>
        ) : (
          '优化提示词'
        )}
      </button>
      <button
        onClick={onGenerate}
        disabled={isGenerating || isOptimizing}
        className="flex-1 py-3 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? '生成中...' : '生成图片'}
      </button>
    </div>
  );
};

export default ActionButtons;