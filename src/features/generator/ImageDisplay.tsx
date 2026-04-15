interface ImageDisplayProps {
  imageUrl: string | null;
  isGenerating?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isGenerating = false }) => {
  if (isGenerating) {
    return (
      <div className="w-full max-w-2xl aspect-square rounded-xl bg-dark-card border border-gray-700 flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-400">正在生成中...</p>
        <p className="text-sm text-gray-500 mt-1">请稍候，这可能需要一些时间</p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="w-full max-w-2xl rounded-xl overflow-hidden bg-dark-card border border-gray-700 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="生成结果"
          className="max-w-full max-h-[512px] object-contain rounded-lg shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl aspect-square rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="text-lg font-medium">你的杰作将在这里呈现</p>
      <p className="text-sm mt-1">输入描述，开始创作</p>
    </div>
  );
};

export default ImageDisplay;