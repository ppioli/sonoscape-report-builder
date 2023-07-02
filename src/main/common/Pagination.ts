import { clamp } from 'lodash';
import { Repository } from 'typeorm';
import { PaginatedQuery } from './PaginatedQuery';

export interface Page<T> {
  pageSize: number;
  page: number;
  content: T[];
  totalPages: number;
}

const DefaultPageSize: number = 10;
export interface FetchPaginatedOpts<T extends {}> extends PaginatedQuery<T> {
  repository: Repository<T>;
}
export async function fetchPaginated<T extends {}>({
  repository,
  options,
  page = 1,
  pageSize = DefaultPageSize,
}: FetchPaginatedOpts<T>): Promise<Page<T>> {
  const totalEntites = await repository.count(options);
  const totalPages = Math.ceil(totalEntites / pageSize);
  const pageToFetch = clamp(page, 1, totalPages);

  const content = await repository.find({
    where: options,
    skip: (pageToFetch - 1) * pageSize,
    take: pageSize,
  });

  return {
    content,
    page: pageToFetch,
    totalPages,
    pageSize,
  };
}
