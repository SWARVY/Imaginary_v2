import { createServerClient } from '@supabase/ssr';
import { createIsomorphicFn } from '@tanstack/react-start';
import { setCookie, getCookies } from '@tanstack/react-start/server';

const getSupabaseServerClientFn = createIsomorphicFn().server(() => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'SUPABASE_URL or SUPABASE_ANON_KEY is not set in environment variables.',
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return Object.entries(getCookies())
          .filter(([, value]) => value !== undefined)
          .map(([name, value]) => ({ name, value: value! }));
      },
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) => {
          setCookie(name, value, options);
        });
      },
    },
  });
});

export default function getSupabaseServerClient() {
  const supabase = getSupabaseServerClientFn();

  if (!supabase) {
    throw new Error('SUPABASE_CLIENT_NOT_FOUND');
  }

  return supabase;
}
