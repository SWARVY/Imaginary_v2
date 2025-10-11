import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw new Error('NOT_AUTHENTICATED');
    }

    if (context.user.user_metadata?.role !== 'owner') {
      throw new Error('NOT_OWNER');
    }
  },
  errorComponent: ({ error }) => {
    if (
      error.message === 'NOT_AUTHENTICATED' ||
      error.message === 'NOT_OWNER'
    ) {
      throw redirect({ to: '/' });
    }
  },
});
