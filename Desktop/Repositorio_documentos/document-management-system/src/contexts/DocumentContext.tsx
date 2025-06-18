import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DocumentState, DocumentAction } from './types';
import { documentService, categoryService } from '../utils/dataService';
import { useAuth } from './AuthContext';

const initialState: DocumentState = {
  documents: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,
};

const DocumentContext = createContext<{
  state: DocumentState;
  loadDocuments: () => Promise<void>;
  loadCategories: () => Promise<void>;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  createDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDocument: (id: string, document: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  createCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
} | null>(null);

const documentReducer = (state: DocumentState, action: DocumentAction): DocumentState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [...state.documents, action.payload] };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
      };
    default:
      return state;
  }
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(documentReducer, initialState);
  const { state: authState } = useAuth();

  const loadDocuments = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const documents = await documentService.getDocuments();
      dispatch({ type: 'SET_DOCUMENTS', payload: documents });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al cargar documentos',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCategories = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const categories = await categoryService.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al cargar categorías',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setSelectedCategory = (categoryId: string | null) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const createDocument = async (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newDocument = await documentService.createDocument(document);
      dispatch({ type: 'ADD_DOCUMENT', payload: newDocument });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al crear documento',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateDocument = async (id: string, document: Partial<Document>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedDocument = await documentService.updateDocument(id, document);
      dispatch({ type: 'UPDATE_DOCUMENT', payload: updatedDocument });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al actualizar documento',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await documentService.deleteDocument(id);
      dispatch({ type: 'DELETE_DOCUMENT', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al eliminar documento',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createCategory = async (category: Omit<Category, 'id'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newCategory = await categoryService.createCategory(category);
      dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al crear categoría',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedCategory = await categoryService.updateCategory(id, category);
      dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al actualizar categoría',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await categoryService.deleteCategory(id);
      dispatch({ type: 'DELETE_CATEGORY', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error al eliminar categoría',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (authState.isAuthenticated) {
      loadDocuments();
      loadCategories();
    }
  }, [authState.isAuthenticated]);

  return (
    <DocumentContext.Provider
      value={{
        state,
        loadDocuments,
        loadCategories,
        setSelectedCategory,
        setSearchQuery,
        createDocument,
        updateDocument,
        deleteDocument,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments debe ser usado dentro de un DocumentProvider');
  }
  return context;
}; 