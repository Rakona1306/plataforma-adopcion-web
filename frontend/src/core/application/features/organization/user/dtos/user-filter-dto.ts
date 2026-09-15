export type UserFilterDto = {
  search?: string;
  isBlocked?: string;
  district?: string[];
  page: number;
  pageSize: number;
  roleId?: string[];
  sort?: string;
  toDashboard?: string;
};
