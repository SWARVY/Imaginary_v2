import appCss from '../styles.css?url';
import { ClerkProvider } from '@/shared/lib';
import { Navigator } from '@/widgets/common';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Container, Reshaped } from 'reshaped';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
        <ClerkProvider>
          <Reshaped theme="slate" defaultColorMode="dark" colorMode="dark">
            <main className="relative flex h-screen flex-col items-center">
              <Container
                className="flex flex-col items-center justify-center space-y-16 py-4"
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
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                {
                  name: 'Tanstack Query',
                  render: <ReactQueryDevtoolsPanel />,
                },
              ]}
            />
          </Reshaped>
          <Scripts />
        </ClerkProvider>
      </body>
    </html>
  );
}
