export interface RoleFilterDto {
  search?: string;
  toDashboard?: string;
  page: number;
  pageSize: number;
  permissionId?: string;
  sort?: string;
}
