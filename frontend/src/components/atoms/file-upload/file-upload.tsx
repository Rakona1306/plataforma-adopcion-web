"use client";
import { useField } from "formik";
import { useRef, useState, useEffect, useCallback } from "react";
import { FileUploadDropzone } from "./file-upload-dropzone";
import { FileUploadPreviewGrid } from "./file-upload-preview-grid";
import {
  ExistingPreviewItem,
  FileUploadProps,
  NewPreviewItem,
  PreviewItem,
} from "./file-upload.types";

export function FileUpload({
  name,
  removeFieldName,
  mainFieldName,
  defaultPhotos = [],
  label,
  required,
  maxFiles = 10,
  maxSizeMb = 5,
  accept = "image/png, image/jpeg, image/webp",
}: FileUploadProps) {
  const [, fileMeta, fileHelpers] = useField<File[]>(name);
  const [, removeMeta, removeHelpers] = useField<string[]>(removeFieldName ?? name);
  const [, mainMeta, mainHelpers] = useField<string[]>(mainFieldName ?? name);

  const [items, setItems] = useState<PreviewItem[]>(() =>
    defaultPhotos.map(
      (p): ExistingPreviewItem => ({
        kind: "existing",
        id: p.id,
        url: p.url,
        isMain: p.isMain,
      })
    )
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = fileMeta.touched && Boolean(fileMeta.error) || removeMeta.touched && Boolean(removeMeta.error) || mainMeta.touched && Boolean(mainMeta.error);
  const remaining = maxFiles - items.length;
  const isFull = remaining <= 0;
  const hasMainField = Boolean(mainFieldName);

  // Sincroniza los campos de formik cuando cambia items
  useEffect(() => {
    // Siempre sincroniza los nuevos archivos
    const newFiles = items
      .filter((i): i is NewPreviewItem => i.kind === "new")
      .map((i) => i.file);
    fileHelpers.setValue(newFiles);

    // Solo sincroniza ids a eliminar si se pasó el field
    if (removeFieldName) {
      const removedIds = defaultPhotos
        .map((p) => p.id)
        .filter((id) => !items.some((i) => i.id === id));
      removeHelpers.setValue(removedIds);
    }

    // Solo sincroniza main si se pasó el field
    if (mainFieldName) {
      const mainIds = items.filter((i) => i.isMain).map((i) => i.id);
      mainHelpers.setValue(mainIds);
    }
    // fileHelpers, removeHelpers, mainHelpers son estables — no causan re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setIsProcessing(true);

      const candidates = Array.from(incoming).slice(0, remaining);

      const existingNewFiles = items
        .filter((i): i is NewPreviewItem => i.kind === "new")
        .map((i) => i.file);

      const validItems: NewPreviewItem[] = [];

      for (const file of candidates) {
        const tooBig = file.size > maxSizeMb * 1024 * 1024;
        const duplicate = existingNewFiles.some(
          (f) => f.name === file.name && f.size === file.size
        );
        if (tooBig || duplicate) continue;

        validItems.push({
          kind: "new",
          id: `new-${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
          file,
          previewUrl: URL.createObjectURL(file),
          isMain: false,
        });
      }

      setItems((prev) => [...prev, ...validItems]);
      fileHelpers.setTouched(true);
      setIsProcessing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, remaining, maxSizeMb]
  );

  const handleRemove = useCallback((item: PreviewItem) => {
    if (item.kind === "new") {
      URL.revokeObjectURL(item.previewUrl);
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    fileHelpers.setTouched(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleMain = useCallback((target: PreviewItem) => {
    setItems((prev) =>
      prev.map((i) => ({
        ...i,
        isMain: i.id === target.id ? !i.isMain : false,
      }))
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <FileUploadDropzone
        isDragging={isDragging}
        isFull={isFull}
        hasError={hasError}
        isProcessing={isProcessing}
        remaining={remaining}
        maxSizeMb={maxSizeMb}
        onClickAdd={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
      />

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {hasError && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <i className="ti ti-alert-circle text-sm" aria-hidden="true" />
          {fileMeta.error as string}
          {removeMeta.error as string}
          {mainMeta.error as string}
        </p>
      )}

      <FileUploadPreviewGrid
        items={items}
        hasMainField={hasMainField}
        onRemove={handleRemove}
        onToggleMain={handleToggleMain}
      />
    </div>
  );
}