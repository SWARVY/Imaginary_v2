import { PostList } from '@/pages/posts';
import { createFileRoute } from '@tanstack/react-router';
import { Container, View } from 'reshaped';
import * as v from 'valibot';

const postsSearchSchema = v.object({
  page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
  limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 10),
});

export const Route = createFileRoute('/posts/')({
  validateSearch: postsSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { page, limit } = Route.useSearch();

  return (
    <Container width="640px" height="100%">
      <View className="relative" width="100%" height="100%">
        <PostList page={page} limit={limit} />
      </View>
    </Container>
  );
}
