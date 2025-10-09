import { signUpFn } from '../api/sign-up';
import { mutationKey } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

export default function useSignUp({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: mutationKey.auth['sign-up'],
    mutationFn: signUpFn,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
