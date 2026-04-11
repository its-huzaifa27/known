import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDashboard } from '../context/DashboardContext';

function MainArea() {
  const { activeView, setActiveView } = useDashboard();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (activeView === 'MyContacts') {
      setLoading(true);
      
      // Because we bypassed the token temporarily in the backend, we can just send any dummy token (or even none if backend handles it well, but convention uses the bearer format)
      axios.get('http://localhost:5000/api/contacts/', {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      })
      .then(res => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch contacts from backend. Ensure your server is running.");
        setLoading(false);
      });
    }
  }, [activeView]);

  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery)
  );

  return (
    <main className="flex-1 p-8 overflow-y-auto w-full h-full bg-slate-50 relative">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none"></div>

      {activeView === 'MyContacts' ? (
        <div className="h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Contacts</h2>
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search contacts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-emerald-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64 transition-shadow"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100">{error}</div>
          ) : contacts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-emerald-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 text-center">
               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               </div>
               <p className="text-xl font-semibold text-slate-700 mb-2">No Contacts Yet</p>
               <p className="text-sm text-slate-500 mb-8 max-w-sm">It looks like your address book is completely empty. Add your first contact to get started.</p>
               <button 
                 onClick={() => setActiveView('CreateContact')} 
                 className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform transition-all hover:scale-105"
               >
                 Create Contact
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContacts.map((contact) => (
                <div key={contact._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] border border-slate-100 hover:border-emerald-200 transform transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl shadow-inner uppercase">
                      {contact.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit Placeholder">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Placeholder">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-[17px] text-slate-800 break-words group-hover:text-emerald-700 transition-colors">{contact.name}</h3>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-3 text-slate-500">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span className="text-sm break-all">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <span className="text-sm font-medium">{contact.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredContacts.length === 0 && contacts.length > 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No contacts match your search "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col items-center justify-center text-slate-400 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white rounded-2xl pointer-events-none"></div>
          <svg className="w-20 h-20 mb-6 text-slate-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-xl text-slate-500 font-medium relative z-10">Dashboard feature <span className="text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-lg">{activeView}</span> coming soon!</p>
        </div>
      )}
    </main>
  );
}

export default MainArea;
