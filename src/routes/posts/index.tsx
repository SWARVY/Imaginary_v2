import { PostList } from '@/pages/posts';
import { createFileRoute } from '@tanstack/react-router';
import { Container, View } from 'reshaped';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container width="640px" height="100%">
      <View className="relative" width="100%" height="100%">
        <PostList />
      </View>
    </Container>
  );
}
