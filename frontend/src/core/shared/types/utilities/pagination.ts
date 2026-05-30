
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Interfaz que tu componente de tabla consumirá
export interface TableMapper<T> {
  id: string;
  [key: string]: any; // Permite renderizar cualquier columna
  original: T;
}