import { mutationKey, uploadFileFn } from '../api';
import { useMutation } from '@tanstack/react-query';

export default function useUploadFile({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationKey: mutationKey.file['upload-file'],
    mutationFn: uploadFileFn,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}
