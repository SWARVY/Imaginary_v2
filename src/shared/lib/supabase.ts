import { createServerClient } from '@supabase/ssr';

// issue: https://github.com/TanStack/router/issues/5196#issuecomment-3348322327
export async function getSupabaseServerClient() {
  const { getCookies, setCookie } = await import(
    '@tanstack/react-start/server'
  );

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value);
          });
        },
      },
    },
  );
}
