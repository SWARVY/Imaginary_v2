import { deletePostFn } from '../api/delete-post';
import { mutationKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeletePost({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKey.posts['delete-post'],
    mutationFn: deletePostFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[1] === 'get-posts',
      });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
