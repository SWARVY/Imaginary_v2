import { PostWrite } from '@/pages/posts';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/_authenticated/posts/write')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container width="640px" className="h-full">
      <ClientOnly fallback={<div>Loading...</div>}>
        <PostWrite />
      </ClientOnly>
    </Container>
  );
}
