import { useAuthState } from '../model';
import useSignOut from '../model/use-sign-out';
import AuthForm from './auth-form';
import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';
import { Button, Modal, Text, useToast, useToggle, View } from 'reshaped';

interface AuthProps extends Omit<ComponentProps<'button'>, 'ref'> {
  asChild?: boolean;
}

export default function AuthModal({ asChild, ...props }: AuthProps) {
  const { active, activate, deactivate } = useToggle(false);

  const { isSignedIn } = useAuthState();

  const Comp = asChild ? Slot : 'button';

  return (
    <>
      <Comp onClick={activate} {...props} />
      <Modal active={active} onClose={deactivate} size="360px">
        <View justify="center" align="center" paddingBlock={4}>
          <View justify="center" align="center" width="90%" gap={8}>
            {isSignedIn ? (
              <SignOut close={deactivate} />
            ) : (
              <AuthForm close={deactivate} />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

interface SignOutProps {
  close: () => void;
}

function SignOut({ close }: SignOutProps) {
  const toast = useToast();

  const { mutateAsync: signOut } = useSignOut({
    onSuccess: () => {
      close();
      toast.show({
        text: '정상적으로 로그아웃되었어요!',
        color: 'neutral',
      });
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '로그아웃에 실패했어요. 다시 시도해주세요',
        color: 'critical',
      });
    },
  });

  return (
    <View gap={6} width="100%">
      <View gap={2}>
        <Text variant="body-1" align="center" weight="bold">
          정말 로그아웃 하시겠어요?
        </Text>
        <Text
          variant="body-2"
          align="center"
          color="neutral-faded"
          weight="regular"
        >
          언제든 다시 돌아오세요! 👋
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
          onClick={close}
          className="flex-1"
          size="large"
        >
          취소
        </Button>
        <Button
          type="button"
          variant="solid"
          onClick={() => signOut({})}
          className="flex-1"
          size="large"
        >
          확인
        </Button>
      </View>
    </View>
  );
}
