import { PostInfo } from '@/pages/posts';
import { createFileRoute } from '@tanstack/react-router';
import { Container } from 'reshaped';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return (
    <Container width="620px" height="100%">
      <PostInfo postId={Number(postId)} />
    </Container>
  );
}
