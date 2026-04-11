import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainArea from './MainArea';

function DashBoard() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainArea />
      </div>
    </div>
  );
}

export default DashBoard;