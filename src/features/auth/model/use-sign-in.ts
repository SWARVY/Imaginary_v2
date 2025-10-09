import { signInFn } from '../api/sign-in';
import { mutationKey, queryKey } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useSignIn({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKey.auth['sign-in'],
    mutationFn: signInFn,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: queryKey.auth['fetch-user'] });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
