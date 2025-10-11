import { PostInfo } from '@/pages/posts';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();

  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <PostInfo postId={Number(postId)} />
    </ClientOnly>
  );
}
