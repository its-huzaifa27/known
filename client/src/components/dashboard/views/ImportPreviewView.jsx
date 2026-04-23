import React from 'react';

const ImportPreviewView = ({ 
  importPreviewData, 
  selectedImportIndices, 
  isImporting, 
  onCancel, 
  onSubmit, 
  dispatch,
  theme = 'light'
}) => {
  return (
    <div className="h-full relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>Review & Import</h2>
          <p className="text-slate-500 font-medium">{importPreviewData.length} contacts found in file</p>
        </div>
        <div className="flex gap-4">
          <button 
             onClick={onCancel}
            className={`px-6 py-2.5 border-2 font-bold rounded-xl transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
          >
            Cancel
          </button>
          <button 
            onClick={onSubmit}
            disabled={isImporting || selectedImportIndices.length === 0}
            className="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isImporting ? "Importing..." : `Import ${selectedImportIndices.length} Contacts`}
          </button>
        </div>
      </div>

      <div className={`rounded-2xl shadow-sm border overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-slate-800/50 border-b border-slate-800' : 'bg-slate-50 border-b border-slate-100'}`}>
              <th className="p-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  checked={selectedImportIndices.length === importPreviewData.length}
                  onChange={(e) => {
                    if (e.target.checked) dispatch({ type: 'SET_IMPORT_STATE', payload: { selectedImportIndices: importPreviewData.map((_, i) => i) } });
                    else dispatch({ type: 'SET_IMPORT_STATE', payload: { selectedImportIndices: [] } });
                  }}
                />
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
            {importPreviewData.map((contact, idx) => (
              <tr key={idx} className={`transition-colors ${theme === 'dark' ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'} ${contact.isDuplicate ? (theme === 'dark' ? 'bg-amber-900/10' : 'bg-amber-50/30') : ''}`}>
                <td className="p-4 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                    checked={selectedImportIndices.includes(idx)}
                    onChange={(e) => {
                      if (e.target.checked) dispatch({ type: 'SET_IMPORT_STATE', payload: { selectedImportIndices: [...selectedImportIndices, idx] } });
                      else dispatch({ type: 'SET_IMPORT_STATE', payload: { selectedImportIndices: selectedImportIndices.filter(i => i !== idx) } });
                    }}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                      {contact.name?.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{contact.name}</p>
                      <p className="text-xs text-slate-400">{contact.email || 'No email'}</p>
                    </div>
                  </div>
                </td>
                <td className={`p-4 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{contact.phone}</td>
                <td className="p-4 text-right">
                  {contact.isDuplicate ? (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Duplicate</span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wide">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportPreviewView;
