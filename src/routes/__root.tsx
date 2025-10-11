import appCss from '../styles.css?url';
import { getSupabaseServerClient } from '@/shared/lib';
import { Navigator } from '@/widgets/common';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';
import { Container, Reshaped } from 'reshaped';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const fetchUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const supabase = getSupabaseServerClient({
      getCookies,
      setCookie,
    });
    const { data, error: _error } = await supabase.auth.getUser();

    if (!data.user?.email) {
      return null;
    }

    return { ...data.user };
  },
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const user = await fetchUserFn();

    return {
      user,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'imaginary',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" dir="ltr" data-rs-theme="slate" data-rs-color-mode="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <Reshaped theme="slate" defaultColorMode="dark" colorMode="dark">
          <main className="flex h-dvh flex-col items-center">
            <Container
              className="relative flex size-full flex-col items-center space-y-16 overflow-y-auto py-4"
              width="1024px"
            >
              <Navigator />
              {children}
            </Container>
          </main>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Query',
                render: <ReactQueryDevtoolsPanel />,
              },
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              FormDevtoolsPlugin(),
            ]}
          />
        </Reshaped>
        <Scripts />
      </body>
    </html>
  );
}
