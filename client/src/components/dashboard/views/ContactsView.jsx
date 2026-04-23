import React from 'react';
import ContactCard from '../ContactCard';
import EmptyState from '../EmptyState';

const ContactsView = ({ 
  contacts, 
  searchQuery, 
  loading, 
  error, 
  theme, 
  dispatch, 
  setActiveView,
  onToggleFavorite,
  onEdit,
  onDelete,
  getContactGroups
}) => {
  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery)
  );

  return (
    <div className="h-full relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">My Contacts</h2>
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className={`pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64 transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-emerald-100'}`}
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
        <EmptyState 
          theme={theme}
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          title="No Contacts Yet"
          description="It looks like your address book is completely empty. Add your first contact to get started."
          buttonText="Create Contact"
          onButtonClick={() => setActiveView('CreateContact')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContacts.map((contact) => (
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
          {filteredContacts.length === 0 && contacts.length > 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No contacts match your search "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsView;
