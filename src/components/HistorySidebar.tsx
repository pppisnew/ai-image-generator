import HistoryItem from './HistoryItem';

interface HistoryRecord {
  id: string;
  prompt: string;
  style: string;
  createdAt: number;
}

const mockHistory: HistoryRecord[] = [
  {
    id: '1',
    prompt: '一只戴着墨镜的柴犬，坐在夏威夷海滩上，4K高清，电影级光影',
    style: '真实摄影',
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    prompt: '未来城市夜景，霓虹灯光，赛博朋克风格，高楼林立',
    style: '赛博朋克',
    createdAt: Date.now() - 7200000,
  },
  {
    id: '3',
    prompt: '中国水墨山水画，烟雾缭绕的山峰，古风意境',
    style: '水墨国风',
    createdAt: Date.now() - 86400000,
  },
];

const HistorySidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          历史记录
        </h2>
        <button className="p-1.5 rounded hover:bg-gray-800 text-gray-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {mockHistory.map((record) => (
          <HistoryItem key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;