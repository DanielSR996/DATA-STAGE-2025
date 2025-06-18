import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuditState, AuditAction, AuditLog } from './types';
import { useAuth } from './AuthContext';

const initialState: AuditState = {
  logs: [],
  loading: false,
  error: null,
};

const AuditContext = createContext<{
  state: AuditState;
  addLog: (action: string, entityType: 'document' | 'category' | 'user', entityId: string, details: string) => void;
  getLogs: () => AuditLog[];
  clearLogs: () => void;
} | null>(null);

const auditReducer = (state: AuditState, action: AuditAction): AuditState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    case 'SET_LOGS':
      return { ...state, logs: action.payload };
    default:
      return state;
  }
};

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(auditReducer, initialState);
  const { state: authState } = useAuth();

  // Cargar logs del localStorage al iniciar
  useEffect(() => {
    const storedLogs = localStorage.getItem('auditLogs');
    if (storedLogs) {
      dispatch({ type: 'SET_LOGS', payload: JSON.parse(storedLogs) });
    }
  }, []);

  // Persistir logs en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('auditLogs', JSON.stringify(state.logs));
  }, [state.logs]);

  const addLog = (
    action: string,
    entityType: 'document' | 'category' | 'user',
    entityId: string,
    details: string
  ) => {
    if (!authState.currentUser) return;

    const newLog: AuditLog = {
      id: crypto.randomUUID(),
      userId: authState.currentUser.id,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_LOG', payload: newLog });
  };

  const getLogs = () => {
    return state.logs;
  };

  const clearLogs = () => {
    dispatch({ type: 'SET_LOGS', payload: [] });
  };

  return (
    <AuditContext.Provider value={{ state, addLog, getLogs, clearLogs }}>
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit debe ser usado dentro de un AuditProvider');
  }
  return context;
}; 7


hola