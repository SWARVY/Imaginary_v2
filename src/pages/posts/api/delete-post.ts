import { PostIdRequestSchema } from '../model/schemas';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';

export const deletePostFn = createServerFn({ method: 'POST' })
  .inputValidator(PostIdRequestSchema)
  .handler(async ({ data: { id } }) => {
    const supabase = getSupabaseServerClient({ getCookies, setCookie });
    const { data, error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
