import React from 'react';

const GroupCard = ({ 
  group, 
  contacts, 
  onView, 
  onDelete,
  theme = 'light'
}) => {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div 
          className="cursor-pointer group-hover:text-emerald-600 transition-colors flex-1"
          onClick={() => onView(group)}
        >
          <h3 className={`text-xl font-bold group-hover:text-emerald-600 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{group.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{group.contacts.length} Members</p>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onView(group)}
            className="p-2 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
            title="View members"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </button>
          <button 
            onClick={() => onDelete(group._id)}
            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            title="Delete group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className="flex -space-x-2 overflow-hidden mt-4">
        {group.contacts.slice(0, 5).map((cId, i) => {
          const contact = contacts?.find(c => c._id === cId);
          return (
            <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-50 flex items-center justify-center text-[10px] font-bold text-emerald-600 uppercase">
              {contact?.name?.charAt(0) || '?'}
            </div>
          );
        })}
        {group.contacts.length > 5 && (
          <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-500">
            +{group.contacts.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
