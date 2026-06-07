// src/types/filters.ts
export interface SearchFilterConfig {
  type: 'search';
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (val: string) => void;
}

export interface SelectFilterConfig {
  type: 'select';
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value: string | null;
  onChange: (val: string | null) => void;
}

export interface DateFilterConfig {
  type: 'date';
  label: string;
  placeholder?: string;
  value: string | null;
  onChange: (val: string | null) => void;
}

export interface SelectSearchFilterConfig<T> {
  type: 'select-search';
  label: string;
  placeholder?: string;
  options: T[];
  displayField: keyof T;
  valueField: keyof T;
  onChange: (val: string | null) => void;
  value: string | null;
}

// Unión de todos los tipos posibles de filtros
export type FilterItemConfig = SearchFilterConfig | SelectFilterConfig | DateFilterConfig | SelectSearchFilterConfig<any>;