import * as v from 'valibot';

export const AuthSchema = v.object({
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
});

export type AuthSchemaType = v.InferOutput<typeof AuthSchema>;
