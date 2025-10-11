import { getPostsFn } from '../api/get-posts';
import { queryKey } from '@/shared/api';
import type { Pagination } from '@/shared/api';
import { queryOptions } from '@tanstack/react-query';

export default function getPostsOptions({ page, limit }: Pagination) {
  return queryOptions({
    queryKey: queryKey.posts['get-posts'](page, limit),
    queryFn: () => getPostsFn({ data: { page, limit } }),
  });
}
