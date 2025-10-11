import { CreatePostRequestSchema } from '../model/schemas';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';

export const writePostFn = createServerFn({ method: 'POST' })
  .inputValidator(CreatePostRequestSchema)
  .handler(async ({ data: { title, content, thumbnail } }) => {
    const supabase = getSupabaseServerClient({ getCookies, setCookie });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const result = await supabase
      .from('posts')
      .insert({
        title,
        content,
        author_id: user.id,
        thumbnail,
      })
      .select()
      .single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.data;
  });
