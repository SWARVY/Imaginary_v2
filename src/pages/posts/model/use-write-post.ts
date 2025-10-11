import { writePostFn } from '../api/write-post';
import { mutationKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useWritePost({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKey.posts['write-post'],
    mutationFn: writePostFn,
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
