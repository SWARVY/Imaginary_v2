import { getSupabaseServerClient } from '../lib';
import { createServerFn } from '@tanstack/react-start';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('INVALID_FORM_DATA');
    }

    return {
      file: data.get('file') as File,
    };
  })
  .handler(async ({ data: { file } }) => {
    const supabase = getSupabaseServerClient();
    const fileName = uuidv4();

    const { data, error } = await supabase.storage
      .from('image')
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });
