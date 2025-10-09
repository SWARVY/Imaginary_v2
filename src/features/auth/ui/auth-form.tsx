import { AuthSchema, SignUpSchema } from '../model';
import { AuthMode } from '../model/types';
import useSignIn from '../model/use-sign-in';
import useSignUp from '../model/use-sign-up';
import { LineShadow } from '@/shared/ui/text-animation';
import { useForm } from '@tanstack/react-form';
import gsap from 'gsap';
import { Mail, Key } from 'lucide-react';
import { useRef, useState, useEffect, ComponentProps } from 'react';
import {
  useToast,
  FormControl,
  TextField,
  Button,
  Divider,
  Actionable,
  View,
  Icon,
  Loader,
  Text,
} from 'reshaped';

interface AuthFormProps {
  close: () => void;
}

export default function AuthForm({ close }: AuthFormProps) {
  const animatedDivRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<AuthMode>('sign-in');

  useEffect(() => {
    const tl = gsap.timeline();

    if (animatedDivRef.current) {
      tl.set(animatedDivRef.current, {
        opacity: 0,
      }).to(animatedDivRef.current, {
        duration: 0.5,
        ease: 'power2.inOut',
        opacity: 1,
      });
    }
  }, [mode]);

  return (
    <View width="100%" gap={8} align="center" justify="center">
      <LineShadow
        className="font-family-montserrat text-4xl font-extrabold italic"
        shadowColor="white"
      >
        IMAGINARY
      </LineShadow>
      <div ref={animatedDivRef} className="w-full">
        {mode === 'sign-in' ? (
          <SignInForm onSignInSuccess={close} />
        ) : (
          <SignUpForm onSignUpSuccess={() => setMode('sign-in')} />
        )}
      </div>
      <View width="100%" justify="center" align="center" gap={8}>
        <Divider />
        <AuthModeSwitch
          mode={mode}
          caption={
            mode === 'sign-in' ? '처음이신가요?' : '이미 계정이 있으신가요?'
          }
          onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
        />
      </View>
    </View>
  );
}

interface SignInFormProps {
  onSignInSuccess: () => void;
}

function SignInForm({ onSignInSuccess }: SignInFormProps) {
  const toast = useToast();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: AuthSchema,
    },
    onSubmit: async (data) => {
      await signIn({
        data: {
          email: data.value.email,
          password: data.value.password,
        },
      });
    },
  });

  const { mutateAsync: signIn } = useSignIn({
    onSuccess: () => {
      toast.show({
        text: '로그인에 성공했어요!',
        color: 'positive',
      });
      onSignInSuccess();
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '로그인에 실패했어요. 다시 시도해주세요.',
        color: 'critical',
      });
    },
  });

  return (
    <form
      className="w-full space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <View gap={4}>
        <form.Field
          name="email"
          children={(field) => (
            <FormControl
              hasError={field.state.meta.isDirty && !field.state.meta.isValid}
            >
              <FormControl.Label>Email</FormControl.Label>
              <TextField
                id={field.name}
                name={field.name}
                endIcon={<Icon svg={Mail} />}
                placeholder="이메일을 입력해주세요"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
              <FormControl.Error>
                {field.state.meta.errors[0]?.message}
              </FormControl.Error>
            </FormControl>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <FormControl
              hasError={field.state.meta.isDirty && !field.state.meta.isValid}
            >
              <FormControl.Label>Password</FormControl.Label>
              <TextField
                id={field.name}
                name={field.name}
                endIcon={<Icon svg={Key} />}
                placeholder="비밀번호를 입력해주세요"
                inputAttributes={{
                  type: 'password',
                }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
              <FormControl.Error>
                {field.state.meta.errors[0]?.message}
              </FormControl.Error>
            </FormControl>
          )}
        />
      </View>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            variant="solid"
            type="submit"
            disabled={!canSubmit || isSubmitting}
            size="large"
            fullWidth
            elevated
          >
            <Text variant="body-3" weight="bold">
              {isSubmitting ? <Loader size="small" /> : '로그인'}
            </Text>
          </Button>
        )}
      />
    </form>
  );
}

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
  const toast = useToast();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onChange: SignUpSchema,
    },
    onSubmit: async (data) => {
      await signUp({
        data: {
          email: data.value.email,
          password: data.value.password,
        },
      });
    },
  });

  const { mutateAsync: signUp } = useSignUp({
    onSuccess: () => {
      toast.show({
        text: '회원가입에 성공했어요!',
        color: 'positive',
      });
      form.reset();
      onSignUpSuccess();
    },
    onError: (error) => {
      toast.show({
        text: error.message ?? '회원가입에 실패했어요. 다시 시도해주세요.',
        color: 'critical',
      });
    },
  });

  return (
    <form
      className="w-full space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <View gap={4}>
        <form.Field
          name="email"
          children={(field) => (
            <FormControl
              hasError={field.state.meta.isDirty && !field.state.meta.isValid}
            >
              <FormControl.Label>Email</FormControl.Label>
              <TextField
                id={field.name}
                name={field.name}
                endIcon={<Icon svg={Mail} />}
                placeholder="이메일을 입력해주세요"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
              <FormControl.Error>
                {field.state.meta.errors[0]?.message}
              </FormControl.Error>
            </FormControl>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <FormControl
              hasError={field.state.meta.isDirty && !field.state.meta.isValid}
            >
              <FormControl.Label>Password</FormControl.Label>
              <TextField
                id={field.name}
                name={field.name}
                endIcon={<Icon svg={Key} />}
                placeholder="비밀번호를 입력해주세요"
                inputAttributes={{
                  type: 'password',
                }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
              <FormControl.Error>
                {field.state.meta.errors[0]?.message}
              </FormControl.Error>
            </FormControl>
          )}
        />
        <form.Field
          name="passwordConfirm"
          children={(field) => (
            <FormControl
              hasError={field.state.meta.isDirty && !field.state.meta.isValid}
            >
              <FormControl.Label>Password Confirm</FormControl.Label>
              <TextField
                id={field.name}
                name={field.name}
                endIcon={<Icon svg={Key} />}
                placeholder="비밀번호를 입력해주세요"
                inputAttributes={{
                  type: 'password',
                }}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
              <FormControl.Error>
                {field.state.meta.errors[0]?.message}
              </FormControl.Error>
            </FormControl>
          )}
        />
      </View>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            variant="solid"
            type="submit"
            disabled={!canSubmit || isSubmitting}
            size="large"
            fullWidth
            elevated
          >
            <Text variant="body-3" weight="bold">
              {isSubmitting ? <Loader size="small" /> : '로그인'}
            </Text>
          </Button>
        )}
      />
    </form>
  );
}

interface AuthModeSwitchProps extends ComponentProps<'button'> {
  mode: AuthMode;
  caption: string;
  onClick: () => void;
}

function AuthModeSwitch({ mode, caption, onClick }: AuthModeSwitchProps) {
  return (
    <Text className="flex gap-x-1">
      {caption}
      <Actionable onClick={onClick}>
        <Text variant="body-3" weight="bold">
          {mode === 'sign-in' ? '회원가입' : '로그인'}
        </Text>
      </Actionable>
    </Text>
  );
}
