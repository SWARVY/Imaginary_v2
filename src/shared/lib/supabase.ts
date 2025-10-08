import { createServerClient } from '@supabase/ssr';

// issue: https://github.com/TanStack/router/issues/5196#issuecomment-3348322327
interface GetSupabaseServerClient {
  getCookies: () => Record<string, string>;
  setCookie: (name: string, value: string) => void;
}

export default function getSupabaseServerClient({
  getCookies,
  setCookie,
}: GetSupabaseServerClient) {
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
