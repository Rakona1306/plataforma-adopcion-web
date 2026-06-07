export interface PetPhotoFilter {
  pageSize: number;
  page: number;
  petId?: string;
  isMain?: boolean;
}