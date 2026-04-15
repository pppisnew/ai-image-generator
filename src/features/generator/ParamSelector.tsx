interface ParamSelectorProps {
  selectedSize?: string;
  selectedStyle?: string;
  onSizeChange?: (size: string) => void;
  onStyleChange?: (style: string) => void;
}

const SIZES = [
  { id: '1:1', label: '1:1', desc: '1024×1024' },
  { id: '16:9', label: '16:9', desc: '1920×1080' },
  { id: '9:16', label: '9:16', desc: '1080×1920' },
];

const STYLES = [
  { id: 'realistic', label: '真实摄影' },
  { id: 'anime', label: '二次元动漫' },
  { id: '3d', label: '3D 渲染' },
  { id: 'oil', label: '油画艺术' },
  { id: 'cyberpunk', label: '赛博朋克' },
  { id: 'ink', label: '水墨国风' },
];

const ParamSelector: React.FC<ParamSelectorProps> = ({
  selectedSize = '1:1',
  selectedStyle = 'realistic',
  onSizeChange,
  onStyleChange,
}) => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">尺寸</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => onSizeChange?.(size.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSize === size.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-card border border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">风格</h3>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleChange?.(style.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedStyle === style.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-card border border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParamSelector;