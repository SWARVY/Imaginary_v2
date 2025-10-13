import { AuthSchema } from '../model';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';

export const signInFn = createServerFn({ method: 'POST' })
  .inputValidator(AuthSchema)
  .handler(async ({ data: { email, password } }) => {
    const supabase = getSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  });
