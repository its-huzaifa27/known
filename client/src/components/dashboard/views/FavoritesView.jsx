import React from 'react';
import ContactCard from '../ContactCard';
import EmptyState from '../EmptyState';

const FavoritesView = ({ 
  contacts, 
  loading, 
  theme, 
  setActiveView,
  onToggleFavorite,
  onEdit,
  onDelete,
  getContactGroups
}) => {
  const favoriteContacts = contacts.filter(c => c.isFavorite);

  return (
    <div className="h-full relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Favorite Contacts</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : favoriteContacts.length === 0 ? (
        <EmptyState 
          theme={theme}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-500"
          icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          title="No Favorites Yet"
          description="Tap the heart icon on any contact to add them here for quick access."
          buttonText="Go to My Contacts"
          onButtonClick={() => setActiveView('MyContacts')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteContacts.map((contact) => (
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
      )}
    </div>
  );
};

export default FavoritesView;
