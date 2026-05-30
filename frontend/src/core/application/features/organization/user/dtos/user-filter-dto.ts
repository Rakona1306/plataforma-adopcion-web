export type UserFilterDto = {
  search?: string;
  isBlocked?: string;
  page: number;
  pageSize: number;
  roleId?: string;
}