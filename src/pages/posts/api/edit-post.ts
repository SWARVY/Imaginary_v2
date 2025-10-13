import { EditPostRequestSchema } from '../model/schemas';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';

export const editPostFn = createServerFn({ method: 'POST' })
  .inputValidator(EditPostRequestSchema)
  .handler(async ({ data: { id, title, content, thumbnail } }) => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        thumbnail,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
