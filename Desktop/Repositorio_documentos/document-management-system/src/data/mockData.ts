export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  userId: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Usuario Demo',
    email: 'usuario@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

export const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Contratos',
    description: 'Documentos legales y contratos',
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Facturas',
    description: 'Facturas y recibos',
    color: '#10B981',
  },
  {
    id: '3',
    name: 'Recursos Humanos',
    description: 'Documentos de RRHH',
    color: '#8B5CF6',
  },
];

export const initialDocuments: Document[] = [
  {
    id: '1',
    title: 'Contrato de Servicios',
    description: 'Contrato de servicios profesionales',
    categoryId: '1',
    userId: '1',
    fileUrl: '/documents/contrato.pdf',
    fileType: 'application/pdf',
    fileSize: 1024 * 1024, // 1MB
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Factura Enero 2024',
    description: 'Factura de servicios del mes de enero',
    categoryId: '2',
    userId: '1',
    fileUrl: '/documents/factura.pdf',
    fileType: 'application/pdf',
    fileSize: 512 * 1024, // 512KB
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]; 