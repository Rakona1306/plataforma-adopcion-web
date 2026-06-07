import { FileUploadPreviewItem } from "./file-upload-preview-item";
import { PreviewGridProps } from "./file-upload.types";

export function FileUploadPreviewGrid({
  items,
  hasMainField,
  onRemove,
  onToggleMain,
}: PreviewGridProps) {
  if (items.length === 0) return null;

  const existing = items.filter((i) => i.kind === "existing");
  const newItems = items.filter((i) => i.kind === "new");

  return (
    <div className="flex flex-col gap-4">
      {existing.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Fotos guardadas ({existing.length})
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {existing.map((item) => (
              <FileUploadPreviewItem
                key={item.id}
                item={item}
                hasMainField={hasMainField}
                onRemove={onRemove}
                onToggleMain={onToggleMain}
              />
            ))}
          </div>
        </div>
      )}

      {newItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Nuevas imágenes ({newItems.length})
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {newItems.map((item) => (
              <FileUploadPreviewItem
                key={item.id}
                item={item}
                hasMainField={hasMainField}
                onRemove={onRemove}
                onToggleMain={onToggleMain}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}