import { Loader } from "@mantine/core";
import { DropzoneProps } from "./file-upload.types";

export function FileUploadDropzone({
  isDragging,
  isFull,
  hasError,
  isProcessing,
  remaining,
  maxSizeMb,
  onClickAdd,
  onDrop,
  onDragOver,
  onDragLeave,
}: DropzoneProps) {
  const borderColor = isDragging
    ? "border-blue-400"
    : hasError
    ? "border-red-300"
    : "border-slate-300";

  const bgColor = isDragging
    ? "bg-blue-50"
    : hasError
    ? "bg-red-50"
    : "bg-slate-50 hover:bg-blue-50 hover:border-blue-300";

  const iconBg = isDragging
    ? "bg-blue-100 text-blue-500"
    : hasError
    ? "bg-red-100 text-red-400"
    : "bg-slate-200 text-slate-400";

  return (
    <div
      onClick={() => !isFull && onClickAdd()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={[
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 transition-all",
        isFull
          ? "cursor-not-allowed opacity-60 border-slate-200 bg-slate-50"
          : `cursor-pointer ${borderColor} ${bgColor}`,
      ].join(" ")}
    >
      {isProcessing ? (
        <Loader size="sm" />
      ) : (
        <>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-colors ${iconBg}`}
          >
            <i className="ti ti-cloud-upload" aria-hidden="true" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium text-slate-700">
              {isDragging
                ? "Suelta las imágenes aquí"
                : isFull
                ? "Límite de imágenes alcanzado"
                : "Arrastra imágenes o haz clic para seleccionar"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              PNG, JPG, WEBP · Máx {maxSizeMb} MB por archivo ·{" "}
              {remaining > 0
                ? `Puedes agregar ${remaining} más`
                : "Sin espacio disponible"}
            </p>
          </div>

          {!isFull && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClickAdd();
              }}
              className="mt-1 flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
            >
              <i className="ti ti-plus text-sm" aria-hidden="true" />
              Agregar imágenes
            </button>
          )}
        </>
      )}
    </div>
  );
}