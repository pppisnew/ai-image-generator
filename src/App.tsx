import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import HistorySidebar from './components/HistorySidebar';
import PromptInput from './features/generator/PromptInput';
import ParamSelector from './features/generator/ParamSelector';
import ActionButtons from './features/generator/ActionButtons';
import ImageDisplay from './features/generator/ImageDisplay';
import ApiSettings from './components/ApiSettings';
import { useOptimizePrompt } from './hooks/useOptimizePrompt';
import { useGenerateImage } from './hooks/useGenerateImage';
import { SIZE_OPTIONS } from './types/model';

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('1:1');
  const [selectedStyle, setSelectedStyle] = useState<string>('realistic');
  const [showSettings, setShowSettings] = useState(false);

  const { optimizedText, isOptimizing, error, startOptimize, resetOptimize } = useOptimizePrompt();
  const { imageUrl, isGenerating, error: generateError, startGenerate } = useGenerateImage();

  useEffect(() => {
    if (!isOptimizing && optimizedText) {
      setPrompt(optimizedText);
      resetOptimize();
    }
  }, [isOptimizing, optimizedText, resetOptimize]);

  const handleOptimize = () => {
    if (!prompt.trim()) {
      alert('请先输入图片描述');
      return;
    }
    startOptimize(prompt);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      alert('请先输入图片描述');
      return;
    }

    const sizeValue = SIZE_OPTIONS.find(s => s.id === selectedSize)?.value || '1024x1024';
    const finalPrompt = prompt;

    startGenerate(finalPrompt, sizeValue);
  };

  const displayError = error || generateError;

  return (
    <Layout sidebar={<HistorySidebar />}>
      <div className="w-full max-w-2xl">
        <Header onSettingsClick={() => setShowSettings(true)} />
        {displayError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
            {displayError}
          </div>
        )}
        <div className="space-y-8">
          <ImageDisplay imageUrl={imageUrl} isGenerating={isGenerating} />
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            isOptimizing={isOptimizing}
          />
          <ParamSelector
            selectedSize={selectedSize}
            selectedStyle={selectedStyle}
            onSizeChange={setSelectedSize}
            onStyleChange={setSelectedStyle}
          />
          <ActionButtons
            onOptimize={handleOptimize}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
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