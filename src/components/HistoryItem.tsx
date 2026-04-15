import type { HistoryMeta } from '../types/model';

interface HistoryItemProps {
  record: HistoryMeta;
  onSelect: (record: HistoryMeta) => void;
  onDelete: (id: string) => void;
}

const STYLE_COLORS: Record<string, string> = {
  realistic: 'from-blue-600 to-blue-800',
  anime: 'from-pink-500 to-pink-700',
  '3d': 'from-purple-600 to-purple-800',
  oil: 'from-amber-600 to-amber-800',
  cyberpunk: 'from-cyan-500 to-cyan-700',
  ink: 'from-gray-600 to-gray-800',
};

const STYLE_ICONS: Record<string, string> = {
  realistic: '📷',
  anime: '🎭',
  '3d': '🎲',
  oil: '🖼️',
  cyberpunk: '🤖',
  ink: '🖌️',
};

const HistoryItem: React.FC<HistoryItemProps> = ({ record, onSelect, onDelete }) => {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    return `${Math.floor(diff / 86400000)} 天前`;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(record.id);
  };

  const colorClass = STYLE_COLORS[record.style] || 'from-gray-600 to-gray-800';
  const icon = STYLE_ICONS[record.style] || '🎨';

  return (
    <div
      onClick={() => onSelect(record)}
      className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors group relative"
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 rounded bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        title="删除"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className={`aspect-square mb-2 rounded bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-xs text-gray-300 line-clamp-2 mb-1">{record.prompt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{record.style}</span>
        <span>{formatTime(record.createdAt)}</span>
      </div>
    </div>
  );
};

export default HistoryItem;