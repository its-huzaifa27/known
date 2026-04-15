import React from 'react';
import { useDashboard } from '../context/DashboardContext';

function Sidebar() {
  const { activeView, setActiveView } = useDashboard();

  const getNavClass = (viewName) => {
    return activeView === viewName
      ? "flex items-center gap-3 px-5 py-3.5 text-[15px] font-semibold rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/50 text-emerald-800 shadow-sm border border-emerald-200/50 cursor-pointer transform transition-all duration-200 scale-[1.02]"
      : "flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium rounded-xl text-slate-600 hover:bg-slate-50 hover:text-emerald-700 hover:shadow-sm cursor-pointer transform transition-all duration-200 hover:translate-x-1";
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between py-8 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.05)] z-0">
      <nav className="flex flex-col gap-2 px-5">
        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3 px-2">Navigation</div>
        
        <a onClick={() => setActiveView('MyContacts')} className={getNavClass('MyContacts')}>
          <svg className={`w-5 h-5 ${activeView === 'MyContacts' ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          My Contacts
        </a>
        <a onClick={() => setActiveView('CreateContact')} className={getNavClass('CreateContact')}>
          <svg className={`w-5 h-5 ${activeView === 'CreateContact' ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          Create Contact
        </a>
        <a onClick={() => setActiveView('Favorites')} className={getNavClass('Favorites')}>
          <svg className={`w-5 h-5 ${activeView === 'Favorites' ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          Favorites
        </a>
        <a onClick={() => setActiveView('MyGroups')} className={getNavClass('MyGroups')}>
          <svg className={`w-5 h-5 ${activeView === 'MyGroups' ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          My Groups
        </a>
        <a onClick={() => setActiveView('AddContact')} className={getNavClass('AddContact')}>
          <svg className={`w-5 h-5 ${activeView === 'AddContact' ? 'text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Add Contact with File
        </a>
      </nav>

      <div className="px-5 mt-auto">
        <div className="h-px bg-slate-200 mb-6 w-full"></div>
        <a href="#" className="flex items-center gap-3 px-5 py-3.5 text-[15px] font-medium rounded-xl text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 transition-colors group">
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Settings
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
