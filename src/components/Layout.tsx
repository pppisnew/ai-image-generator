import type { ReactNode } from 'react';

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-200">
      <aside className="w-[280px] flex-shrink-0 bg-dark-card border-r border-gray-800">
        {sidebar}
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;