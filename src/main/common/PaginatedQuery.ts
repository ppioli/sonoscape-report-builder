import { FindOptionsWhere } from 'typeorm';

export interface PaginatedQuery<T extends {}> {
  options?: FindOptionsWhere<T>;
  page?: number;
  pageSize?: number;
}
