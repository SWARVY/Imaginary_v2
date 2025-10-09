import { useAuthState } from '../model';
import useSignOut from '../model/use-sign-out';
import AuthForm from './auth-form';
import { LineShadow } from '@/shared/ui/text-animation';
import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';
import { Button, Modal, Text, useToggle, View } from 'reshaped';

interface AuthProps extends Omit<ComponentProps<'button'>, 'ref'> {
  asChild?: boolean;
}

export default function Auth({ asChild, ...props }: AuthProps) {
  const { active, activate, deactivate } = useToggle(false);

  const { isSignedIn } = useAuthState();

  const Comp = asChild ? Slot : 'button';

  return (
    <>
      <Comp onClick={activate} {...props} />
      <Modal active={active} onClose={deactivate} size="360px">
        <View justify="center" align="center" paddingBlock={4}>
          <View justify="center" align="center" width="90%" gap={8}>
            <LineShadow
              className="font-family-montserrat text-4xl font-extrabold italic"
              shadowColor="white"
            >
              IMAGINARY
            </LineShadow>
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
  const { mutateAsync: signOut } = useSignOut({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <View>
      <Text>로그아웃 하시겠어요?</Text>
      <View
        direction="row"
        gap={4}
        justify="center"
        align="center"
        width="100%"
      >
        <Button type="button" variant="outline" onClick={close}>
          취소
        </Button>
        <Button type="button" variant="solid" onClick={() => signOut({})}>
          확인
        </Button>
      </View>
    </View>
  );
}
