import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDashboard } from '../context/DashboardContext';

function MainArea() {
  const { activeView, setActiveView } = useDashboard();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Create Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Edit Contact Form State
  const [editingContactId, setEditingContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '' });

  // Groups State
  const [groups, setGroups] = useState([]);
  const [groupFormData, setGroupFormData] = useState({ name: '', contacts: [] });
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCreateContact = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      await axios.post('http://localhost:5000/api/contacts/', formData, {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });
      // Clear form on success
      setFormData({ name: '', email: '', phone: '' });
      // Redirect back to My Contacts to implicitly trigger GET
      setActiveView('MyContacts');
    } catch (err) {
      console.error(err);
      setSubmitError(err.response?.data?.message || "Failed to create contact");
    } finally {
        setSubmitLoading(false);
    }
  };

  const startEdit = (contact) => {
    setEditingContactId(contact._id);
    setEditFormData({ 
      name: contact.name, 
      email: contact.email, 
      phone: contact.phone 
    });
    setActiveView('EditContact');
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      await axios.put(`http://localhost:5000/api/contacts/${editingContactId}`, editFormData, {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });
      setEditingContactId(null);
      setEditFormData({ name: '', email: '', phone: '' });
      setActiveView('MyContacts');
    } catch (err) {
      console.error(err);
      setSubmitError(err.response?.data?.message || "Failed to update contact");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleToggleFavorite = async (contact) => {
    try {
      const updatedContact = { ...contact, isFavorite: !contact.isFavorite };
      await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, updatedContact, {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });
      // Update local state to reflect the change immediately
      setContacts(contacts.map(c => c._id === contact._id ? { ...c, isFavorite: !c.isFavorite } : c));
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
          headers: { Authorization: "Bearer bypass_test_token_123" }
        });
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (err) {
        console.error("Failed to delete contact:", err);
        alert("Failed to delete contact. Please try again.");
      }
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (groupFormData.contacts.length < 2) {
      alert("A group must have at least 2 contacts!");
      return;
    }
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      await axios.post('http://localhost:5000/api/groups/', groupFormData, {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });
      setGroupFormData({ name: '', contacts: [] });
      setActiveView('MyGroups');
    } catch (err) {
      console.error(err);
      setSubmitError(err.response?.data?.message || "Failed to create group");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`http://localhost:5000/api/groups/${id}`, {
          headers: { Authorization: "Bearer bypass_test_token_123" }
        });
        setGroups(groups.filter(g => g._id !== id));
      } catch (err) {
        console.error("Failed to delete group:", err);
      }
    }
  };

  const getContactGroups = (contactId) => {
    return groups.filter(g => g.contacts.includes(contactId));
  };

  useEffect(() => {
    if (activeView === 'MyContacts' || activeView === 'Favorites' || activeView === 'MyGroups') {
      setLoading(true);
      
      const fetchContacts = axios.get('http://localhost:5000/api/contacts/', {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });

      const fetchGroups = axios.get('http://localhost:5000/api/groups/', {
        headers: { Authorization: "Bearer bypass_test_token_123" }
      });

      Promise.all([fetchContacts, fetchGroups])
      .then(([contactsRes, groupsRes]) => {
        setContacts(contactsRes.data);
        setGroups(groupsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch data from backend. Ensure your server is running.");
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
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleToggleFavorite(contact)}
                        className={`p-1.5 rounded-lg transition-all duration-300 ${contact.isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                        title={contact.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <svg className={`w-4 h-4 transition-transform duration-300 ${contact.isFavorite ? 'fill-current scale-110' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                      <button 
                        onClick={() => startEdit(contact)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Edit Contact"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                        title="Delete Contact"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-[17px] text-slate-800 break-words group-hover:text-emerald-700 transition-colors">{contact.name}</h3>
                  
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {getContactGroups(contact._id).map(group => (
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
              ))}
              {filteredContacts.length === 0 && contacts.length > 0 && (
                <div className="col-span-full py-12 text-center text-slate-500">
                  No contacts match your search "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      ) : activeView === 'Favorites' ? (
        <div className="h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Favorite Contacts</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : contacts.filter(c => c.isFavorite).length === 0 ? (
            <div className="bg-white rounded-2xl border border-emerald-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 text-center">
               <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
               </div>
               <p className="text-xl font-semibold text-slate-700 mb-2">No Favorites Yet</p>
               <p className="text-sm text-slate-500 mb-8 max-w-sm">Tap the heart icon on any contact to add them here for quick access.</p>
               <button 
                 onClick={() => setActiveView('MyContacts')} 
                 className="px-8 py-3 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
               >
                 Go to My Contacts
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contacts.filter(c => c.isFavorite).map((contact) => (
                <div key={contact._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(244,63,94,0.15)] border border-slate-100 hover:border-rose-200 transform transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold text-xl shadow-inner uppercase">
                      {contact.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleToggleFavorite(contact)}
                        className="p-1.5 text-rose-500 bg-rose-50 rounded-lg transition-colors scale-110"
                        title="Remove from Favorites"
                      >
                        <svg className="w-4 h-4 fill-current" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                      <button 
                        onClick={() => startEdit(contact)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Edit Contact"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(contact._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                        title="Delete Contact"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-[17px] text-slate-800 break-words group-hover:text-rose-700 transition-colors">{contact.name}</h3>
                  
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {getContactGroups(contact._id).map(group => (
                      <span key={group._id} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase tracking-wider">
                        {group.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-3 text-slate-500">
                      <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      <span className="text-sm break-all">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <span className="text-sm font-medium">{contact.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeView === 'EditContact' ? (
        <div className="h-full relative z-10 flex items-start justify-center pt-10">
            <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-xl relative overflow-hidden border border-emerald-50">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Edit Contact</h2>
                <p className="text-slate-500 mb-8">Update existing information for your connection.</p>
                
                {submitError && (
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 mb-6 text-sm font-medium flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleUpdateContact} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Full Name</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="e.g. Jane Doe"
                            value={editFormData.name}
                            onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            placeholder="jane@example.com"
                            value={editFormData.email}
                            onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Phone Number</label>
                        <input 
                            type="tel" 
                            required 
                            placeholder="+1 (555) 000-0000"
                            value={editFormData.phone}
                            onChange={e => setEditFormData({...editFormData, phone: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    
                    <div className="pt-6 flex gap-4">
                        <button 
                            type="button" 
                            onClick={() => setActiveView('MyContacts')}
                            disabled={submitLoading}
                            className="flex-1 py-3.5 px-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-200 hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitLoading}
                            className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-600 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.4)] transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {submitLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Update Contact"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      ) : activeView === 'CreateContact' ? (
        <div className="h-full relative z-10 flex items-start justify-center pt-10">
            <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-xl relative overflow-hidden border border-emerald-50">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Create New Contact</h2>
                <p className="text-slate-500 mb-8">Add a new connection to your address book securely.</p>
                
                {submitError && (
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 mb-6 text-sm font-medium flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleCreateContact} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Full Name</label>
                        <input 
                            type="text" 
                            required 
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Email Address</label>
                        <input 
                            type="email" 
                            required 
                            placeholder="jane@example.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Phone Number</label>
                        <input 
                            type="tel" 
                            required 
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm text-slate-700 font-medium placeholder:font-normal"
                        />
                    </div>
                    
                    <div className="pt-6 flex gap-4">
                        <button 
                            type="button" 
                            onClick={() => setActiveView('MyContacts')}
                            disabled={submitLoading}
                            className="flex-1 py-3.5 px-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-200 hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitLoading}
                            className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-600 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.4)] transform transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {submitLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Save Contact"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      ) : activeView === 'MyGroups' ? (
        <div className="h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Groups</h2>
            <div className="flex gap-4">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input 
                  type="text" 
                  placeholder="Search groups..." 
                  value={groupSearchQuery}
                  onChange={(e) => setGroupSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-emerald-100 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-64 transition-shadow"
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
          ) : groups.filter(g => g.name.toLowerCase().includes(groupSearchQuery.toLowerCase())).length === 0 ? (
            <div className="bg-white rounded-2xl border border-emerald-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 text-center">
               <p className="text-xl font-semibold text-slate-700 mb-2">No Groups Found</p>
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
              {groups.filter(g => g.name.toLowerCase().includes(groupSearchQuery.toLowerCase())).map((group) => (
                <div key={group._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div 
                      className="cursor-pointer group-hover:text-emerald-600 transition-colors flex-1"
                      onClick={() => {
                        setSelectedGroup(group);
                        setActiveView('GroupDetails');
                      }}
                    >
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600">{group.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{group.contacts.length} Members</p>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => {
                          setSelectedGroup(group);
                          setActiveView('GroupDetails');
                        }}
                        className="p-2 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                        title="View members"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteGroup(group._id)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex -space-x-2 overflow-hidden mt-4">
                    {group.contacts.slice(0, 5).map((cId, i) => {
                      const contact = contacts.find(c => c._id === cId);
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
              ))}
            </div>
          )}
        </div>
      ) : activeView === 'GroupDetails' && selectedGroup ? (
        <div className="h-full relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setActiveView('MyGroups')}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
              title="Back to Groups"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{selectedGroup.name}</h2>
              <p className="text-sm text-slate-500 font-medium">Group Members ({selectedGroup.contacts.length})</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contacts.filter(c => selectedGroup.contacts.includes(c._id)).map((contact) => (
              <div key={contact._id} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] border border-slate-100 hover:border-emerald-200 transform transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl shadow-inner uppercase">
                    {contact.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => handleToggleFavorite(contact)}
                      className={`p-1.5 rounded-lg transition-all duration-300 ${contact.isFavorite ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                      title={contact.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <svg className={`w-4 h-4 transition-transform duration-300 ${contact.isFavorite ? 'fill-current scale-110' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                    <button 
                      onClick={() => startEdit(contact)}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                      title="Edit Contact"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteContact(contact._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" 
                      title="Delete Contact"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                
                <h3 className="font-bold text-[17px] text-slate-800 break-words group-hover:text-emerald-700 transition-colors">{contact.name}</h3>
                
                <div className="flex flex-wrap gap-1 mt-2 mb-3">
                  {getContactGroups(contact._id).map(g => (
                    <span key={g._id} className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${g._id === selectedGroup._id ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-100 text-emerald-700'}`}>
                      {g.name}
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
            ))}
          </div>
        </div>
      ) : activeView === 'CreateGroup' ? (
        <div className="h-full relative z-10 flex items-start justify-center pt-10">
          <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-2xl relative overflow-hidden border border-emerald-50">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Create New Group</h2>
            <p className="text-slate-500 mb-8">Organize items together for better management. Min 2 members.</p>

            <form onSubmit={handleCreateGroup} className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Group Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Work Partners"
                  value={groupFormData.name}
                  onChange={e => setGroupFormData({...groupFormData, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase">Select Contacts ({groupFormData.contacts.length} selected)</label>
                <div className="grid grid-cols-2 gap-3 mt-3 max-h-60 overflow-y-auto p-2 border border-slate-100 rounded-xl bg-slate-50/50">
                  {contacts.map(contact => (
                    <label key={contact._id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${groupFormData.contacts.includes(contact._id) ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-transparent hover:border-slate-200'}`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                        checked={groupFormData.contacts.includes(contact._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGroupFormData({...groupFormData, contacts: [...groupFormData.contacts, contact._id]});
                          } else {
                            setGroupFormData({...groupFormData, contacts: groupFormData.contacts.filter(id => id !== contact._id)});
                          }
                        }}
                      />
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                        {contact.name?.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700 truncate">{contact.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setActiveView('MyGroups')} className="flex-1 py-3.5 px-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={submitLoading} className="flex-[2] py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50">
                  {submitLoading ? "Creating..." : "Create Group"}
                </button>
              </div>
            </form>
          </div>
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
