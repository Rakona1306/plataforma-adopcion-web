import { BiTrash } from "react-icons/bi";
import { PreviewItemProps } from "./file-upload.types";

export function FileUploadPreviewItem({
  item,
  hasMainField,
  onRemove,
  onToggleMain,
}: PreviewItemProps) {
  const src = item.kind === "existing" ? item.url : item.previewUrl;
  const name = item.kind === "existing" ? `Foto ${item.id.slice(0, 6)}` : item.file.name;
  const sizeLabel =
    item.kind === "new"
      ? `${(item.file.size / 1024 / 1024).toFixed(1)} MB`
      : null;

  return (
    <div className="group relative aspect-square">
      <img
        src={src}
        alt={name}
        className={[
          "h-full w-full rounded-xl object-cover transition-all",
          item.isMain
            ? "ring-2 ring-blue-500 ring-offset-1 border-transparent"
            : "border border-slate-200",
        ].join(" ")}
      />

      {/* Badge main */}
      {item.isMain && (
        <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-md bg-blue-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
          <i className="ti ti-star-filled text-[9px]" aria-hidden="true" />
          Principal
        </span>
      )}

      {/* Badge existing */}
      {item.kind === "existing" && !item.isMain && (
        <span className="absolute left-1.5 top-1.5 rounded-md bg-slate-700/60 px-1.5 py-0.5 text-[10px] text-white">
          Guardada
        </span>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        <p className="truncate px-2 pb-1 text-[10px] text-white">{name}</p>
      </div>

      {/* Botón eliminar */}
      <button
        type="button"
        onClick={() => onRemove(item)}
        aria-label={`Eliminar ${name}`}
        className="absolute right-1.5 top-1.5 flex h-10 w-10 md:h-6 md:w-6 items-center justify-center rounded-full bg-white/90 text-slate-500 opacity-0 shadow-sm transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
      >
        <BiTrash />
      </button>

      {/* Botón marcar principal */}
      {hasMainField && !item.isMain && (
        <button
          type="button"
          onClick={() => onToggleMain(item)}
          aria-label={`Marcar ${name} como principal`}
          className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 opacity-0 shadow-sm transition-all hover:bg-blue-500 hover:text-white group-hover:opacity-100"
        >
          <i className="ti ti-star text-[10px]" aria-hidden="true" />
          Principal
        </button>
      )}

      {/* Badge tamaño (solo nuevas) */}
      {sizeLabel && !hasMainField && (
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
          {sizeLabel}
        </span>
      )}
    </div>
  );
}