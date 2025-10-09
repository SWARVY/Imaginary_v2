import { AuthSchema } from '../model';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';

export const signUpFn = createServerFn({ method: 'POST' })
  .inputValidator(AuthSchema)
  .handler(async ({ data: { email, password } }) => {
    const supabase = getSupabaseServerClient({ getCookies, setCookie });

    const result = await supabase.auth.signUp({
      email,
      password,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  });
