import Layout from './components/Layout';
import Header from './components/Header';
import HistorySidebar from './components/HistorySidebar';
import PromptInput from './features/generator/PromptInput';
import ParamSelector from './features/generator/ParamSelector';
import ActionButtons from './features/generator/ActionButtons';
import ImageDisplay from './features/generator/ImageDisplay';

function App() {
  return (
    <Layout sidebar={<HistorySidebar />}>
      <div className="w-full max-w-2xl">
        <Header />
        <div className="space-y-8">
          <ImageDisplay />
          <PromptInput />
          <ParamSelector />
          <ActionButtons />
        </div>
      </div>
    </Layout>
  );
}

export default App;