import { PostSchema } from '../model/schemas';
import { PaginationSchema } from '@/shared/api';
import { getSupabaseServerClient } from '@/shared/lib';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';
import { safeParse } from 'valibot';

export const getPostsFn = createServerFn({ method: 'GET' })
  .inputValidator(PaginationSchema)
  .handler(async ({ data: { page, limit } }) => {
    const supabase = getSupabaseServerClient({ getCookies, setCookie });

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const posts = data.map((post) => safeParse(PostSchema, post));

    if (!posts.every((post) => post.success)) {
      throw new Error('INVALID_SCHEMA');
    }

    return {
      data: posts.map((post) => post.output),
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: page < Math.ceil((count || 0) / limit),
        hasPrev: page > 1,
      },
    };
  });
