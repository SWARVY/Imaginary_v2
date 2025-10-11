import { PostInfo } from '@/pages/posts';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return (
    <Container width="640px" height="100%">
      <ClientOnly fallback={<div>Loading...</div>}>
        <PostInfo postId={Number(postId)} />
      </ClientOnly>
    </Container>
  );
}
