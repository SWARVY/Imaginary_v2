import { createServerClient } from '@supabase/ssr';

// issue: https://github.com/TanStack/router/issues/5196#issuecomment-3348322327
interface GetSupabaseServerClient {
  getCookies: () => Record<string, string>;
  setCookie: (
    name: string,
    value: string,
    options?: {
      domain?: string | undefined;
      encode?(value: string): string;
      expires?: Date | undefined;
      httpOnly?: boolean | undefined;
      maxAge?: number | undefined;
      path?: string | undefined;
      priority?: 'low' | 'medium' | 'high' | undefined;
      sameSite?: true | false | 'lax' | 'strict' | 'none' | undefined;
      secure?: boolean | undefined;
      partitioned?: boolean;
    },
  ) => void;
}

export default function getSupabaseServerClient({
  getCookies,
  setCookie,
}: GetSupabaseServerClient) {
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
}
