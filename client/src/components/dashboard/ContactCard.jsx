import React from 'react';

const ContactCard = ({ 
  contact, 
  onToggleFavorite, 
  onEdit, 
  onDelete, 
  contactGroups,
  theme = 'light' 
}) => {
  return (
    <div className={`p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] border border-slate-100 hover:border-emerald-200 transform transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl shadow-inner uppercase">
          {contact.name?.charAt(0) || '?'}
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onToggleFavorite(contact)}
            className={`p-1.5 rounded-lg transition-all duration-300 ${contact.isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
            title={contact.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <svg className={`w-4 h-4 transition-transform duration-300 ${contact.isFavorite ? 'fill-current scale-110' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <button 
            onClick={() => onEdit(contact)}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
            title="Edit Contact"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button 
            onClick={() => onDelete(contact._id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
            title="Delete Contact"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      
      <h3 className={`font-bold text-[17px] break-words group-hover:text-emerald-700 transition-colors ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>{contact.name}</h3>
      
      <div className="flex flex-wrap gap-1 mt-2 mb-3">
        {contactGroups?.map(group => (
          <span key={group._id} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider">
            {group.name}
          </span>
        ))}
      </div>

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
  );
};

export default ContactCard;
