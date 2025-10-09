import { signOutFn } from '../api/sign-out';
import { mutationKey, queryKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSignOut({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKey.auth['sign-out'],
    mutationFn: signOutFn,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: queryKey.auth['fetch-user'] });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
