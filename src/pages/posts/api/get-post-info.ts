import { PostIdRequestSchema, PostSchema } from '../model/schemas';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { safeParse } from 'valibot';

export const getPostInfoFn = createServerFn({ method: 'GET' })
  .inputValidator(PostIdRequestSchema)
  .handler(async ({ data: { id } }) => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const post = safeParse(PostSchema, data);

    if (!post.success) {
      throw new Error('INVALID_SCHEMA');
    }

    return post.output;
  });
