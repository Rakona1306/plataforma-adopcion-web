export interface IBaseService<T> {
  getAll(): Promise<T[]>;
}