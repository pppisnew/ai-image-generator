import HistoryItem from './HistoryItem';
import type { HistoryMeta } from '../types/model';

interface HistorySidebarProps {
  history: HistoryMeta[];
  onSelect: (record: HistoryMeta) => void;
  onDelete: (id: string) => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onDelete }) => {
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
        {history.length === 0 ? (
          <div className="text-center text-gray-500 py-8 text-sm">
            暂无历史记录
          </div>
        ) : (
          history.map((record) => (
            <HistoryItem
              key={record.id}
              record={record}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;