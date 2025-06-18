import { User, Category, Document } from '../data/mockData';
import * as storage from './localStorage';

// Simulación de delay para operaciones asíncronas
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Operaciones de Usuario
export const userService = {
  async getUsers(): Promise<User[]> {
    await delay(500);
    return storage.getUsers();
  },

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await delay(500);
    const users = storage.getUsers();
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    storage.setUsers([...users, newUser]);
    return newUser;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await delay(500);
    const users = storage.getUsers();
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new Error('Usuario no encontrado');
    
    const updatedUser = { ...users[userIndex], ...userData };
    users[userIndex] = updatedUser;
    storage.setUsers(users);
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    await delay(500);
    const users = storage.getUsers();
    storage.setUsers(users.filter(u => u.id !== id));
  },
};

// Operaciones de Categoría
export const categoryService = {
  async getCategories(): Promise<Category[]> {
    await delay(500);
    return storage.getCategories();
  },

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    await delay(500);
    const categories = storage.getCategories();
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    storage.setCategories([...categories, newCategory]);
    return newCategory;
  },

  async updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
    await delay(500);
    const categories = storage.getCategories();
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex === -1) throw new Error('Categoría no encontrada');
    
    const updatedCategory = { ...categories[categoryIndex], ...categoryData };
    categories[categoryIndex] = updatedCategory;
    storage.setCategories(categories);
    return updatedCategory;
  },

  async deleteCategory(id: string): Promise<void> {
    await delay(500);
    const categories = storage.getCategories();
    storage.setCategories(categories.filter(c => c.id !== id));
  },
};

// Operaciones de Documento
export const documentService = {
  async getDocuments(): Promise<Document[]> {
    await delay(500);
    return storage.getDocuments();
  },

  async getDocumentsByCategory(categoryId: string): Promise<Document[]> {
    await delay(500);
    const documents = storage.getDocuments();
    return documents.filter(d => d.categoryId === categoryId);
  },

  async getDocumentsByUser(userId: string): Promise<Document[]> {
    await delay(500);
    const documents = storage.getDocuments();
    return documents.filter(d => d.userId === userId);
  },

  async createDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Promise<Document> {
    await delay(500);
    const documents = storage.getDocuments();
    const newDocument: Document = {
      ...document,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.setDocuments([...documents, newDocument]);
    return newDocument;
  },

  async updateDocument(id: string, documentData: Partial<Document>): Promise<Document> {
    await delay(500);
    const documents = storage.getDocuments();
    const documentIndex = documents.findIndex(d => d.id === id);
    if (documentIndex === -1) throw new Error('Documento no encontrado');
    
    const updatedDocument = {
      ...documents[documentIndex],
      ...documentData,
      updatedAt: new Date().toISOString(),
    };
    documents[documentIndex] = updatedDocument;
    storage.setDocuments(documents);
    return updatedDocument;
  },

  async deleteDocument(id: string): Promise<void> {
    await delay(500);
    const documents = storage.getDocuments();
    storage.setDocuments(documents.filter(d => d.id !== id));
  },
}; 