import getPostInfoOptions from '../model/get-post-info-options';
import useEditPost from '../model/use-edit-post';
import PostEditor from './post-editor';
import { SuspenseQuery } from '@suspensive/react-query';
import { Suspense } from 'react';
import { useToast } from 'reshaped';

interface PostEditProps {
  postId: number;
}

export default function PostEdit({ postId }: PostEditProps) {
  const toast = useToast();

  const { mutateAsync: editPost } = useEditPost({
    onSuccess: () => {
      toast.show({
        text: '글 수정에 성공했어요!',
        color: 'positive',
      });
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '글 수정에 실패했어요. 다시 시도해주세요',
        color: 'critical',
      });
    },
  });

  return (
    <Suspense>
      <SuspenseQuery {...getPostInfoOptions({ id: postId })}>
        {({ data }) => (
          <PostEditor
            initialFormValue={{
              title: data.title,
              thumbnail: data.thumbnail,
              content: data.content,
            }}
            onSubmit={async ({ title, thumbnail, content }) =>
              await editPost({
                data: {
                  id: postId,
                  title,
                  thumbnail,
                  content,
                },
              })
            }
          />
        )}
      </SuspenseQuery>
    </Suspense>
  );
}
