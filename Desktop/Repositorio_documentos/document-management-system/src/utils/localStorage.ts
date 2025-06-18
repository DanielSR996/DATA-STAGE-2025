import { User, Category, Document, initialUsers, initialCategories, initialDocuments } from '../data/mockData';

const STORAGE_KEYS = {
  USERS: 'document-management-users',
  CATEGORIES: 'document-management-categories',
  DOCUMENTS: 'document-management-documents',
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(initialDocuments));
  }
};

export const getItem = <T>(key: string): T[] => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

export const setItem = <T>(key: string, value: T[]): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = (): User[] => {
  return getItem<User>(STORAGE_KEYS.USERS);
};

export const getCategories = (): Category[] => {
  return getItem<Category>(STORAGE_KEYS.CATEGORIES);
};

export const getDocuments = (): Document[] => {
  return getItem<Document>(STORAGE_KEYS.DOCUMENTS);
};

export const setUsers = (users: User[]): void => {
  setItem(STORAGE_KEYS.USERS, users);
};

export const setCategories = (categories: Category[]): void => {
  setItem(STORAGE_KEYS.CATEGORIES, categories);
};

export const setDocuments = (documents: Document[]): void => {
  setItem(STORAGE_KEYS.DOCUMENTS, documents);
}; 