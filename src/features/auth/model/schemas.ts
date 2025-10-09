import * as v from 'valibot';

export const AuthSchema = v.object({
  email: v.pipe(
    v.string(),
    v.minLength(1, '이메일을 입력해주세요'),
    v.email('이메일 형식이 올바르지 않습니다'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, '비밀번호는 8자 이상 16자 이하여야 합니다'),
    v.maxLength(16, '비밀번호는 8자 이상 16자 이하여야 합니다'),
  ),
});

export type Auth = v.InferOutput<typeof AuthSchema>;

export const SignUpSchema = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.minLength(1, '이메일을 입력해주세요'),
      v.email('이메일 형식이 올바르지 않습니다'),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(8, '비밀번호를 입력해주세요'),
      v.maxLength(16, '비밀번호는 16자 이하여야 합니다'),
    ),
    passwordConfirm: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['passwordConfirm']],
      (input) => input.password === input.passwordConfirm,
      '입력하신 비밀번호와 일치하지 않습니다.',
    ),
    ['passwordConfirm'],
  ),
);

export type SignUp = v.InferOutput<typeof SignUpSchema>;
