import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_URL } from '../constants';

const DashboardStateContext = createContext();
const DashboardDispatchContext = createContext();

export const useDashboard = () => {
  const state = useContext(DashboardStateContext);
  const dispatch = useContext(DashboardDispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return { ...state, dispatch };
};

// Also export separate hooks for finer control
export const useDashboardState = () => useContext(DashboardStateContext);
export const useDashboardDispatch = () => useContext(DashboardDispatchContext);

const initialState = {
  activeView: 'MyContacts',
  contacts: [],
  groups: [],
  loading: false,
  error: null,
  searchQuery: '',
  groupSearchQuery: '',
  formData: { name: '', email: '', phone: '', birthday: '', notes: '' },
  submitLoading: false,
  submitError: null,
  editingContactId: null,
  editFormData: { name: '', email: '', phone: '', birthday: '', notes: '' },
  groupFormData: { name: '', contacts: [] },
  selectedGroup: null,
  importPreviewData: [],
  selectedImportIndices: [],
  isImporting: false,
  // Settings state
  passwords: { currentPassword: '', newPassword: '', confirmPassword: '' },
  pwdLoading: false,
  pwdMessage: { text: '', type: '' }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
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
    case 'SET_PWD_STATE':
      return { 
        ...state, 
        pwdLoading: action.loading !== undefined ? action.loading : state.pwdLoading, 
        pwdMessage: action.message !== undefined ? action.message : state.pwdMessage 
      };
    case 'START_EDIT':
      return {
        ...state,
        editingContactId: action.contact._id,
        editFormData: { 
          name: action.contact.name, 
          email: action.contact.email, 
          phone: action.contact.phone,
          birthday: action.contact.birthday ? new Date(action.contact.birthday).toISOString().split('T')[0] : '',
          notes: action.contact.notes || ''
        },
        activeView: 'EditContact'
      };
    case 'SET_SELECTED_GROUP':
      return { ...state, selectedGroup: action.payload };
    case 'SET_IMPORT_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_COLLECTION':
      return { ...state, [action.collection]: action.payload };
    case 'RESET_FORM':
      if (action.form === 'formData') return { ...state, formData: { name: '', email: '', phone: '', birthday: '', notes: '' } };
      if (action.form === 'editFormData') return { ...state, editingContactId: null, editFormData: { name: '', email: '', phone: '', birthday: '', notes: '' } };
      if (action.form === 'groupFormData') return { ...state, groupFormData: { name: '', contacts: [] } };
      if (action.form === 'passwords') return { ...state, passwords: { currentPassword: '', newPassword: '', confirmPassword: '' } };
      return state;
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }) => {
  const { token, logout } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeView } = state;

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

  const setActiveView = useCallback((view) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  }, []);

  const stateValue = useMemo(() => ({
    ...state,
    setActiveView
  }), [state, setActiveView]);

  return (
    <DashboardStateContext.Provider value={stateValue}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardStateContext.Provider>
  );
};

