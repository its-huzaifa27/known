import React from 'react';
import ContactCard from '../ContactCard';

const GroupDetailsView = ({ 
  selectedGroup, 
  contacts, 
  theme, 
  setActiveView,
  onToggleFavorite,
  onEdit,
  onDelete,
  getContactGroups
}) => {
  if (!selectedGroup) return null;

  const groupMembers = contacts.filter(c => selectedGroup.contacts.includes(c._id));

  return (
    <div className="h-full relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setActiveView('MyGroups')}
          className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
          title="Back to Groups"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h2 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>{selectedGroup.name}</h2>
          <p className="text-sm text-slate-500 font-medium">Group Members ({selectedGroup.contacts.length})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groupMembers.map((contact) => (
          <ContactCard 
            key={contact._id}
            contact={contact}
            theme={theme}
            onToggleFavorite={onToggleFavorite}
            onEdit={onEdit}
            onDelete={onDelete}
            contactGroups={getContactGroups(contact._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupDetailsView;
