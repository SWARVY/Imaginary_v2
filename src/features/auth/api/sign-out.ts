import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';

export const signOutFn = createServerFn({ method: 'POST' }).handler(
  async () => {
    const supabase = getSupabaseServerClient();

    const result = await supabase.auth.signOut();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return { success: true };
  },
);
