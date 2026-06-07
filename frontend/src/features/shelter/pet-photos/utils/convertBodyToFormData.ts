import { SyncPetPhotosDto } from "../dto/create-pet-photo.dto";

export const convertBodyToFormData = (values: SyncPetPhotosDto): FormData => {
  const formData = new FormData();

  // 1. Archivos (files)
  // .append para cada archivo. .NET espera el nombre del parámetro (ej: 'files')
  values.files.forEach((file) => {
    formData.append("files", file as File);
  });

  // 2. isMainList
  // Si envías un array vacío, .NET puede ignorarlo. 
  // Asegúrate que el backend tenga el DTO listo.
  values.isMainList.forEach((id) => formData.append("MainPhotoId", id));

  // 3. photoIdsToRemove
  values.photoIdsToRemove.forEach((id) => {
    formData.append("photoIdsToRemove", id);
  });

  return formData;
};