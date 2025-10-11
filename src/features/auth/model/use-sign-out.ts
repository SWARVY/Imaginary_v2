import { signOutFn } from '../api/sign-out';
import { mutationKey, queryKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export default function useSignOut({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationKey: mutationKey.auth['sign-out'],
    mutationFn: signOutFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKey.auth['fetch-user'],
      });
      onSuccess?.();
      router.navigate({ to: '/posts' });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
