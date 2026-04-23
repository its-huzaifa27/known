import React from 'react';

const AddContactFileView = ({ 
  onFileUpload, 
  theme = 'light' 
}) => {
  return (
    <div className="h-full relative z-10 flex items-start justify-center pt-10">
      <div className={`p-10 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-2xl relative overflow-hidden border text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        
        <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
        </div>
        
        <h2 className={`text-3xl font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Bulk Import</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Upload a .vcf or .csv file exported from your phone to instantly add your entire contact list.</p>

        <div className="relative group">
          <input 
            type="file" 
            accept=".vcf,.csv"
            onChange={onFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${theme === 'dark' ? 'border-slate-700 group-hover:border-emerald-500 group-hover:bg-emerald-900/20' : 'border-slate-200 group-hover:border-emerald-400 group-hover:bg-emerald-50/30'}`}>
            <p className="text-emerald-600 font-bold text-lg mb-1">Click to browse files</p>
            <p className="text-slate-400 text-sm italic">Supports .vcf (VCard) and .csv (Excel)</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 text-left">
          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <p className="text-xs font-bold text-slate-400 mb-1">PHONE STANDARD</p>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Best for iPhone/Android backups (.vcf)</p>
          </div>
          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <p className="text-xs font-bold text-slate-400 mb-1">POWER USER</p>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Best for Excel/Sheets (.csv)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactFileView;
