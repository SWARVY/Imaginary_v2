import useWritePost from '../model/use-write-post';
import PostEditor from './post-editor';
import { useRouter } from '@tanstack/react-router';
import { useToast } from 'reshaped';

export default function PostWrite() {
  const toast = useToast();

  const router = useRouter();

  const { mutateAsync: writePost } = useWritePost({
    onSuccess: () => {
      toast.show({
        text: '글 작성에 성공했어요!',
        color: 'positive',
      });
      router.navigate({ to: '/posts' });
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '글 작성에 실패했어요. 다시 시도해주세요',
        color: 'critical',
      });
    },
  });

  return (
    <PostEditor
      onSubmit={async ({ title, thumbnail, content }) => {
        await writePost({
          data: {
            title,
            content,
            thumbnail,
          },
        });
      }}
    />
  );
}
