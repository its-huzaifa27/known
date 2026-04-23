import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { API_URL } from '../constants';

// Modular View Imports
import ContactsView from './dashboard/views/ContactsView';
import FavoritesView from './dashboard/views/FavoritesView';
import GroupsView from './dashboard/views/GroupsView';
import GroupDetailsView from './dashboard/views/GroupDetailsView';
import ContactFormView from './dashboard/views/ContactFormView';
import GroupFormView from './dashboard/views/GroupFormView';
import AddContactFileView from './dashboard/views/AddContactFileView';
import ImportPreviewView from './dashboard/views/ImportPreviewView';
import SettingsView from './dashboard/views/SettingsView';

function MainArea() {
  const { token, logout } = useAuth();
  const { 
    activeView, setActiveView, dispatch,
    contacts, groups, loading, error, searchQuery,
    formData, submitLoading, submitError,
    editingContactId, editFormData,
    groupFormData, groupSearchQuery, selectedGroup,
    importPreviewData, selectedImportIndices, isImporting,
    passwords, pwdLoading, pwdMessage
  } = useDashboard();

  // Settings View State
  const { theme, toggleTheme } = useTheme();
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      dispatch({ type: 'SET_PWD_STATE', message: { text: "New passwords do not match!", type: 'error' } });
      return;
    }
    dispatch({ type: 'SET_PWD_STATE', loading: true, message: { text: '', type: '' } });
    try {
      await axios.put(`${API_URL}/api/users/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'SET_PWD_STATE', message: { text: "Password updated successfully!", type: 'success' } });
      dispatch({ type: 'RESET_FORM', form: 'passwords' });
    } catch (err) {
      dispatch({ type: 'SET_PWD_STATE', message: { text: err.response?.data?.message || "Failed to change password", type: 'error' } });
    } finally {
      dispatch({ type: 'SET_PWD_STATE', loading: false });
    }
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMIT_STATE', loading: true, error: null });

    try {
      await axios.post(`${API_URL}/api/contacts/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'RESET_FORM', form: 'formData' });
      setActiveView('MyContacts');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
      dispatch({ type: 'SET_SUBMIT_STATE', error: err.response?.data?.message || "Failed to create contact" });
    } finally {
        dispatch({ type: 'SET_SUBMIT_STATE', loading: false });
    }
  };

  const startEdit = (contact) => {
    dispatch({ type: 'START_EDIT', contact });
    setActiveView('EditContact');
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMIT_STATE', loading: true, error: null });

    try {
      await axios.put(`${API_URL}/api/contacts/${editingContactId}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'RESET_FORM', form: 'editFormData' });
      setActiveView('MyContacts');
    } catch (err) {
      console.error(err);
      dispatch({ type: 'SET_SUBMIT_STATE', error: err.response?.data?.message || "Failed to update contact" });
    } finally {
      dispatch({ type: 'SET_SUBMIT_STATE', loading: false });
    }
  };

  const handleToggleFavorite = async (contact) => {
    try {
      const updatedContact = { ...contact, isFavorite: !contact.isFavorite };
      await axios.put(`${API_URL}/api/contacts/${contact._id}`, updatedContact, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ 
        type: 'UPDATE_COLLECTION', 
        collection: 'contacts', 
        payload: contacts.map(c => c._id === contact._id ? { ...c, isFavorite: !c.isFavorite } : c) 
      });
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`${API_URL}/api/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ 
          type: 'UPDATE_COLLECTION', 
          collection: 'contacts', 
          payload: contacts.filter(contact => contact._id !== id) 
        });
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
    dispatch({ type: 'SET_SUBMIT_STATE', loading: true, error: null });

    try {
      await axios.post(`${API_URL}/api/groups/`, groupFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'RESET_FORM', form: 'groupFormData' });
      setActiveView('MyGroups');
    } catch (err) {
      console.error(err);
      dispatch({ type: 'SET_SUBMIT_STATE', error: err.response?.data?.message || "Failed to create group" });
    } finally {
      dispatch({ type: 'SET_SUBMIT_STATE', loading: false });
    }
  };

  const handleDeleteGroup = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`${API_URL}/api/groups/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ 
          type: 'UPDATE_COLLECTION', 
          collection: 'groups', 
          payload: groups.filter(g => g._id !== id) 
        });
      } catch (err) {
        console.error("Failed to delete group:", err);
      }
    }
  };


  const getContactGroups = (contactId) => {
    return groups.filter(g => g.contacts.includes(contactId));
  };

  const parseVCF = (content) => {
    const contacts = [];
    const vcardBlocks = content.split(/BEGIN:VCARD/i).slice(1);
    
    vcardBlocks.forEach(block => {
      const nameMatch = block.match(/FN:(.*)/i);
      const emailMatch = block.match(/EMAIL(?:;.*)?:(.*)/i);
      const telMatch = block.match(/TEL(?:;.*)?:(.*)/i);
      
      if (nameMatch || telMatch) {
        contacts.push({
          name: nameMatch ? nameMatch[1].trim() : 'Unknown Name',
          email: emailMatch ? emailMatch[1].trim() : '',
          phone: telMatch ? telMatch[1].trim().replace(/[^\d+]/g, '') : '',
          isDuplicate: false
        });
      }
    });
    return contacts;
  };

  const parseCSV = (content) => {
    const lines = content.split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Find column indices
    const nameIdx = headers.findIndex(h => h.includes('name'));
    const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('tel') || h.includes('mobile'));
    const emailIdx = headers.findIndex(h => h.includes('email') || h.includes('mail'));

    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      if (values.length < 2) return null;
      return {
        name: nameIdx !== -1 ? values[nameIdx] : 'Unknown',
        phone: phoneIdx !== -1 ? values[phoneIdx].replace(/[^\d+]/g, '') : '',
        email: emailIdx !== -1 ? values[emailIdx] : '',
        isDuplicate: false
      };
    }).filter(Boolean);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      let parsedData = [];
      if (file.name.endsWith('.vcf')) {
        parsedData = parseVCF(content);
      } else if (file.name.endsWith('.csv')) {
        parsedData = parseCSV(content);
      } else {
        alert("Unsupported file format. Please use .vcf or .csv");
        return;
      }

      // Check for duplicates against existing contacts
      const updatedData = parsedData.map(newContact => ({
        ...newContact,
        isDuplicate: contacts.some(c => c.phone === newContact.phone || (c.email && c.email === newContact.email))
      }));

      dispatch({ 
        type: 'SET_IMPORT_STATE', 
        payload: {
          importPreviewData: updatedData,
          selectedImportIndices: updatedData.map((_, i) => i) // Select all by default
        }
      });
      setActiveView('ImportPreview');
    };
    reader.readAsText(file);
  };

  const handleBulkImport = async () => {
    const toImport = importPreviewData.filter((_, idx) => selectedImportIndices.includes(idx));
    if (toImport.length === 0) {
      alert("Please select at least one contact to import.");
      return;
    }

    dispatch({ type: 'SET_IMPORT_STATE', payload: { isImporting: true } });
    try {
      await axios.post(`${API_URL}/api/contacts/bulk`, toImport, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh contacts and switch to MyContacts
      setActiveView('MyContacts');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) logout();
      alert("Failed to import contacts. Please try again.");
    } finally {
      dispatch({ 
        type: 'SET_IMPORT_STATE', 
        payload: {
          isImporting: false,
          importPreviewData: [],
          selectedImportIndices: []
        }
      });
    }
  };

  const renderView = () => {
    const commonProps = {
      theme,
      dispatch,
      setActiveView,
      contacts,
      loading,
      error,
      onToggleFavorite: handleToggleFavorite,
      onEdit: startEdit,
      onDelete: handleDeleteContact,
      getContactGroups
    };

    switch (activeView) {
      case 'MyContacts':
        return <ContactsView {...commonProps} searchQuery={searchQuery} />;
      case 'Favorites':
        return <FavoritesView {...commonProps} />;
      case 'MyGroups':
        return (
          <GroupsView 
            {...commonProps} 
            groups={groups} 
            groupSearchQuery={groupSearchQuery} 
            onDeleteGroup={handleDeleteGroup} 
          />
        );
      case 'GroupDetails':
        return <GroupDetailsView {...commonProps} selectedGroup={selectedGroup} />;
      case 'CreateContact':
        return (
          <ContactFormView 
            {...commonProps}
            title="Create New Contact"
            subtitle="Add a new connection to your address book securely."
            formType="formData"
            formData={formData}
            onSubmit={handleCreateContact}
            onCancel={() => setActiveView('MyContacts')}
            submitLoading={submitLoading}
            submitError={submitError}
          />
        );
      case 'EditContact':
        return (
          <ContactFormView 
            {...commonProps}
            title="Edit Contact"
            subtitle="Update existing information for your connection."
            formType="editFormData"
            formData={editFormData}
            onSubmit={handleUpdateContact}
            onCancel={() => setActiveView('MyContacts')}
            submitLoading={submitLoading}
            submitError={submitError}
          />
        );
      case 'CreateGroup':
        return (
          <GroupFormView 
            {...commonProps}
            groupFormData={groupFormData}
            onSubmit={handleCreateGroup}
            onCancel={() => setActiveView('MyGroups')}
            submitLoading={submitLoading}
          />
        );
      case 'AddContact':
        return <AddContactFileView theme={theme} onFileUpload={handleFileUpload} />;
      case 'ImportPreview':
        return (
          <ImportPreviewView 
            theme={theme}
            importPreviewData={importPreviewData}
            selectedImportIndices={selectedImportIndices}
            isImporting={isImporting}
            dispatch={dispatch}
            onCancel={() => {
              dispatch({ type: 'SET_IMPORT_STATE', payload: { importPreviewData: [] } });
              setActiveView('AddContact');
            }}
            onSubmit={handleBulkImport}
          />
        );
      case 'Settings':
        return (
          <SettingsView 
            theme={theme}
            toggleTheme={toggleTheme}
            logout={logout}
            pwdMessage={pwdMessage}
            pwdLoading={pwdLoading}
            passwords={passwords}
            dispatch={dispatch}
            onPasswordChange={handlePasswordChange}
          />
        );
      default:
        return (
          <div className={`rounded-2xl border p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col items-center justify-center text-slate-400 relative z-10 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className={`absolute inset-0 rounded-2xl pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-b from-slate-800/50 to-slate-900' : 'bg-gradient-to-b from-slate-50/50 to-white'}`}></div>
            <svg className="w-20 h-20 mb-6 text-slate-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-slate-500 font-medium relative z-10">Dashboard feature <span className="text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-lg">{activeView}</span> coming soon!</p>
          </div>
        );
    }
  };

  return (
    <main className={`flex-1 p-8 overflow-y-auto w-full h-full relative transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <div className={`absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none ${theme === 'dark' ? 'from-emerald-950/20' : 'from-emerald-50'}`}></div>
      {renderView()}
    </main>
  );
}

export default MainArea;
