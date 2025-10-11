import useDeletePost from '../model/use-delete-post';
import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { Button, Modal, Text, useToast, useToggle, View } from 'reshaped';

interface PostDeleteModalProps extends Omit<ComponentProps<'button'>, 'ref'> {
  asChild?: boolean;
  postId: number;
}

export default function PostDeleteModal({
  asChild,
  postId,
  ...props
}: PostDeleteModalProps) {
  const { active, activate, deactivate } = useToggle(false);

  const toast = useToast();

  const Comp = asChild ? Slot : 'button';

  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      deactivate();
      toast.show({
        text: '포스트가 삭제되었어요',
        color: 'neutral',
      });
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '포스트 삭제에 실패했어요. 다시 시도해주세요',
        color: 'critical',
      });
    },
  });

  return (
    <>
      <Comp onClick={activate} {...props} />
      <Modal active={active} onClose={deactivate}>
        <View gap={6} width="100%" paddingBlock={2}>
          <View gap={2}>
            <Text variant="body-1" align="center" weight="bold">
              정말 삭제하시겠어요?
            </Text>
            <Text
              variant="body-2"
              align="center"
              color="neutral-faded"
              weight="regular"
            >
              삭제된 포스트는 복구할 수 없어요 🥺
            </Text>
          </View>
          <View
            direction="row"
            gap={4}
            justify="center"
            align="center"
            width="100%"
          >
            <Button
              type="button"
              variant="outline"
              onClick={deactivate}
              className="flex-1"
              size="large"
            >
              취소
            </Button>
            <Button
              type="button"
              color="critical"
              variant="solid"
              onClick={() => {
                deletePost({ data: { id: postId } });
              }}
              className="flex-1"
              size="large"
            >
              확인
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}
