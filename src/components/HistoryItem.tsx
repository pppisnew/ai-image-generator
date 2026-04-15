interface HistoryRecord {
  id: string;
  prompt: string;
  style: string;
  createdAt: number;
}

interface HistoryItemProps {
  record: HistoryRecord;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ record }) => {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    return `${Math.floor(diff / 86400000)} 天前`;
  };

  return (
    <div className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-colors group">
      <div className="aspect-square mb-2 rounded bg-gray-700/50 flex items-center justify-center">
        <span className="text-3xl">🎨</span>
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