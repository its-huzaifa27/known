import React, { createContext, useState, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_URL } from '../constants';


const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

const initialState = {
  contacts: [],
  groups: [],
  loading: false,
  error: null,
  searchQuery: '',
  groupSearchQuery: '',
  formData: { name: '', email: '', phone: '' },
  submitLoading: false,
  submitError: null,
  editingContactId: null,
  editFormData: { name: '', email: '', phone: '' },
  groupFormData: { name: '', contacts: [] },
  selectedGroup: null,
  importPreviewData: [],
  selectedImportIndices: [],
  isImporting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, contacts: action.contacts, groups: action.groups };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_GROUP_SEARCH_QUERY':
      return { ...state, groupSearchQuery: action.payload };
    case 'UPDATE_FORM':
      return { ...state, [action.form]: { ...state[action.form], ...action.payload } };
    case 'SET_SUBMIT_STATE':
      return { ...state, submitLoading: action.loading ?? state.submitLoading, submitError: action.error ?? state.submitError };
    case 'START_EDIT':
      return {
        ...state,
        editingContactId: action.contact._id,
        editFormData: { 
          name: action.contact.name, 
          email: action.contact.email, 
          phone: action.contact.phone 
        }
      };
    case 'SET_SELECTED_GROUP':
      return { ...state, selectedGroup: action.payload };
    case 'SET_IMPORT_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_COLLECTION':
      return { ...state, [action.collection]: action.payload };
    case 'RESET_FORM':
      if (action.form === 'formData') return { ...state, formData: { name: '', email: '', phone: '' } };
      if (action.form === 'editFormData') return { ...state, editingContactId: null, editFormData: { name: '', email: '', phone: '' } };
      if (action.form === 'groupFormData') return { ...state, groupFormData: { name: '', contacts: [] } };
      return state;
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }) => {
  const { token, logout } = useAuth();
  const [activeView, setActiveView] = useState('MyContacts');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (activeView === 'MyContacts' || activeView === 'Favorites' || activeView === 'MyGroups') {
      dispatch({ type: 'FETCH_START' });
      
      const fetchContacts = axios.get(`${API_URL}/api/contacts/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const fetchGroups = axios.get(`${API_URL}/api/groups/`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Promise.all([fetchContacts, fetchGroups])
      .then(([contactsRes, groupsRes]) => {
        dispatch({ type: 'FETCH_SUCCESS', contacts: contactsRes.data, groups: groupsRes.data });
      })
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) logout();
        dispatch({ type: 'FETCH_ERROR', payload: "Failed to fetch data from backend. Ensure your server is running." });
      });
    }
  }, [activeView, token]);

  return (
    <DashboardContext.Provider value={{ activeView, setActiveView, state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
