import React from 'react';
import GroupCard from '../GroupCard';

const GroupsView = ({ 
  groups, 
  contacts,
  groupSearchQuery, 
  loading, 
  theme, 
  dispatch, 
  setActiveView,
  onDeleteGroup
}) => {
  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <div className="h-full relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">My Groups</h2>
        <div className="flex gap-4">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search groups..." 
              value={groupSearchQuery}
              onChange={(e) => dispatch({ type: 'SET_GROUP_SEARCH_QUERY', payload: e.target.value })}
              className={`pl-10 pr-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64 transition-all ${theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-emerald-100'}`}
            />
          </div>
          <button 
            onClick={() => setActiveView('CreateGroup')} 
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            + New Group
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className={`rounded-2xl border border-emerald-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 text-center ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
           <p className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>No Groups Found</p>
           <p className="text-sm text-slate-500 mb-8 max-w-sm">Create groups to organize your contacts better.</p>
           <button 
             onClick={() => setActiveView('CreateGroup')} 
             className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all"
           >
             Create First Group
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard 
              key={group._id}
              group={group}
              contacts={contacts}
              theme={theme}
              onView={(g) => {
                dispatch({ type: 'SET_SELECTED_GROUP', payload: g });
                setActiveView('GroupDetails');
              }}
              onDelete={onDeleteGroup}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupsView;
