import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainArea from './MainArea';
import { DashboardProvider } from '../context/DashboardContext';
import { useTheme } from '../context/ThemeContext';

function DashBoard() {
  const { theme } = useTheme();

  return (
    <DashboardProvider>
      <div className={`flex flex-col h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-100 dark' : 'bg-slate-50 text-slate-800'}`}>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainArea />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default DashBoard;