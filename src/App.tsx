import { useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import HistorySidebar from './components/HistorySidebar';
import PromptInput from './features/generator/PromptInput';
import ParamSelector from './features/generator/ParamSelector';
import ActionButtons from './features/generator/ActionButtons';
import ImageDisplay from './features/generator/ImageDisplay';
import ApiSettings from './components/ApiSettings';
import { useOptimizePrompt } from './hooks/useOptimizePrompt';

function App() {
  const [prompt, setPrompt] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const { optimizedText, isOptimizing, error, startOptimize } = useOptimizePrompt();

  const handleOptimize = () => {
    if (!prompt.trim()) {
      alert('请先输入图片描述');
      return;
    }
    startOptimize(prompt);
  };

  const handleGenerate = () => {
    console.log('生成图片', { prompt, optimizedText });
  };

  return (
    <Layout sidebar={<HistorySidebar />}>
      <div className="w-full max-w-2xl">
        <Header onSettingsClick={() => setShowSettings(true)} />
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-8">
          <ImageDisplay />
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            optimizedText={optimizedText}
          />
          <ParamSelector />
          <ActionButtons
            onOptimize={handleOptimize}
            onGenerate={handleGenerate}
            isOptimizing={isOptimizing}
            canOptimize={!!prompt.trim()}
          />
        </div>
      </div>
      <ApiSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </Layout>
  );
}

export default App;