export interface ExistingPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

// Item que representa una foto ya cargada desde la API
export interface ExistingPreviewItem {
  kind: "existing";
  id: string;
  url: string;
  isMain: boolean;
}

// Item que representa un archivo nuevo seleccionado por el usuario
export interface NewPreviewItem {
  kind: "new";
  id: string;        // id local temporal
  file: File;
  previewUrl: string;
  isMain: boolean;
}

export type PreviewItem = ExistingPreviewItem | NewPreviewItem;

export interface FileUploadProps {
  // Formik field para los nuevos archivos
  name: string;
  // Formik field para ids a eliminar (de las existentes), ej: "photoIdsToRemove"
  removeFieldName?: string;
  // Formik field para ids/indices marcados como main, ej: "isMainList"
  mainFieldName?: string;
  // Fotos ya cargadas que vienen de la API
  defaultPhotos?: ExistingPhoto[];
  label?: string;
  required?: boolean;
  maxFiles?: number;
  maxSizeMb?: number;
  accept?: string;
}

export interface DropzoneProps {
  isDragging: boolean;
  isFull: boolean;
  hasError: boolean;
  isProcessing: boolean;
  remaining: number;
  maxSizeMb: number;
  onClickAdd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
}

export interface PreviewGridProps {
  items: PreviewItem[];
  hasMainField: boolean;
  onRemove: (item: PreviewItem) => void;
  onToggleMain: (item: PreviewItem) => void;
}

export interface PreviewItemProps {
  item: PreviewItem;
  hasMainField: boolean;
  onRemove: (item: PreviewItem) => void;
  onToggleMain: (item: PreviewItem) => void;
}