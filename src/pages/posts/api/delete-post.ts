import { PostIdRequestSchema } from '../model/schemas';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';

export const deletePostFn = createServerFn({ method: 'POST' })
  .inputValidator(PostIdRequestSchema)
  .handler(async ({ data: { id } }) => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
