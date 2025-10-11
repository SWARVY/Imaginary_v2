import { PostEdit } from '@/pages/posts';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/_authenticated/posts/$postId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return (
    <Container width="640px" className="h-full">
      <ClientOnly fallback={<div>Loading...</div>}>
        <PostEdit postId={Number(postId)} />
      </ClientOnly>
    </Container>
  );
}
