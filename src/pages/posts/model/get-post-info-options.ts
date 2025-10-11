import { getPostInfoFn } from '../api/get-post-info';
import type { PostIdRequest } from './schemas';
import { queryKey } from '@/shared/api';
import { queryOptions } from '@tanstack/react-query';

export default function getPostInfoOptions({ id }: PostIdRequest) {
  return queryOptions({
    queryKey: queryKey.posts['get-post-info'](id),
    queryFn: () => getPostInfoFn({ data: { id } }),
  });
}
