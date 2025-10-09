import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';

export const signOutFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const supabase = getSupabaseServerClient({ getCookies, setCookie });

    const result = await supabase.auth.signOut();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true };
  },
);
