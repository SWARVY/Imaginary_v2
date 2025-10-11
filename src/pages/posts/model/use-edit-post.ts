import { editPostFn } from '../api/edit-post';
import { mutationKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useEditPost({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKey.posts['edit-post'],
    mutationFn: editPostFn,
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
