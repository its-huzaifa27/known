import React from 'react';

const GroupFormView = ({ 
  groupFormData, 
  contacts, 
  onSubmit, 
  onCancel, 
  submitLoading, 
  dispatch,
  theme = 'light'
}) => {
  return (
    <div className="h-full relative z-10 flex items-start justify-center pt-10">
      <div className={`p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-2xl relative overflow-hidden border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        <h2 className={`text-3xl font-extrabold mb-2 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>Create New Group</h2>
        <p className="text-slate-500 mb-8">Organize items together for better management. Min 2 members.</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Group Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Work Partners"
              value={groupFormData.name}
              onChange={e => dispatch({ type: 'UPDATE_FORM', form: 'groupFormData', payload: { name: e.target.value } })}
              className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Select Contacts ({groupFormData.contacts.length} selected)</label>
            <div className={`grid grid-cols-2 gap-3 mt-3 max-h-60 overflow-y-auto p-2 border rounded-xl ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
              {contacts.map(contact => (
                <label key={contact._id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${groupFormData.contacts.includes(contact._id) ? 'bg-emerald-50 border-emerald-200 shadow-sm' : (theme === 'dark' ? 'bg-slate-800 border-transparent hover:border-slate-600' : 'bg-white border-transparent hover:border-slate-200')}`}>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                    checked={groupFormData.contacts.includes(contact._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        dispatch({ 
                          type: 'UPDATE_FORM', 
                          form: 'groupFormData', 
                          payload: { contacts: [...groupFormData.contacts, contact._id] } 
                        });
                      } else {
                        dispatch({ 
                          type: 'UPDATE_FORM', 
                          form: 'groupFormData', 
                          payload: { contacts: groupFormData.contacts.filter(id => id !== contact._id) } 
                        });
                      }
                    }}
                  />
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                    {contact.name?.charAt(0)}
                  </div>
                  <span className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{contact.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              type="button" 
              onClick={onCancel} 
              className={`flex-1 py-3.5 px-4 border-2 font-bold rounded-xl transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}`}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitLoading} 
              className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {submitLoading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupFormView;
