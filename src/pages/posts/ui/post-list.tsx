import getPostsOptions from '../model/get-posts-options';
import { Post } from '../model/schemas';
import PostDeleteModal from './post-delete-modal';
import { useAuthState } from '@/features/auth';
import { generateSupabaseImageUrl } from '@/shared/lib';
import { ProgressiveBlur } from '@/shared/ui/progress-blur';
import { SuspenseQuery } from '@suspensive/react-query';
import { Link, useRouter } from '@tanstack/react-router';
import { format } from 'date-fns';
import gsap from 'gsap';
import { ArrowRight, PenSquare, Trash2 } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Image, Pagination, Text, View } from 'reshaped';

const DEFAULT_IMAGE_URL =
  'https://supabase.forimaginary.dev/storage/v1/object/public/image//default-image.png';

interface PostListProps {
  page: number;
  limit: number;
}

export default function PostList({ page, limit }: PostListProps) {
  const router = useRouter();

  return (
    <View direction="column" width="100%" height="100%" gap={8}>
      <Text
        className="font-family-montserrat! italic text-shadow-md"
        variant="title-4"
        weight="bold"
        align="center"
      >
        POSTS
      </Text>
      <Suspense>
        <SuspenseQuery {...getPostsOptions({ page, limit })}>
          {({ data: { data, pagination } }) => (
            <View
              direction="column"
              width="100%"
              height="100%"
              justify="space-between"
              align="center"
            >
              <div className="relative size-full">
                <Grid columns={2} gap={4}>
                  {data.map((post) => (
                    <PostGridItem post={post} />
                  ))}
                </Grid>
                <ProgressiveBlur height="50%" position="bottom" />
              </div>
              <Pagination
                total={pagination.totalPages}
                previousAriaLabel="Previous Page"
                nextAriaLabel="Next Page"
                onChange={({ page }) => {
                  router.navigate({
                    to: '/posts',
                    search: { page },
                  });
                }}
              />
            </View>
          )}
        </SuspenseQuery>
      </Suspense>
    </View>
  );
}

interface PostItemProps {
  post: Post;
}

function PostGridItem({ post }: PostItemProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [mode, setMode] = useState<'base' | 'action'>('base');

  const { isOwner } = useAuthState();

  useEffect(() => {
    gsap.set(baseRef.current, {
      opacity: 1,
      transform: 'translateY(0)',
    });
    gsap.set(actionRef.current, {
      opacity: 0,
      transform: 'translateY(0)',
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    if (mode === 'base') {
      tl.to(baseRef.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(0)',
        opacity: 1,
      });
    } else {
      tl.to(baseRef.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(100%)',
        opacity: 0,
      });
    }
  }, [mode]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (mode === 'action') {
      tl.to(actionRef.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(0)',
        opacity: 1,
      });
    } else {
      tl.to(actionRef.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(100%)',
        opacity: 0,
      });
    }
  }, [mode]);

  return (
    <Link
      to={`/posts/$postId`}
      params={{ postId: post.id.toString() }}
      className="rounded-medium relative w-full overflow-hidden"
      onMouseEnter={() => setMode('action')}
      onMouseLeave={() => setMode('base')}
    >
      <Card className="group hover:border-neutral transition-all" padding={0}>
        <View direction="column" height="100%" justify="space-between">
          <View aspectRatio={4 / 3} className="relative!">
            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src={
                post.thumbnail
                  ? generateSupabaseImageUrl({
                      path: post.thumbnail,
                    })
                  : DEFAULT_IMAGE_URL
              }
              alt={post.title}
              width="100%"
              height="100%"
            />
          </View>
        </View>
        <div
          ref={baseRef}
          className="bg-neutral-faded absolute bottom-0 w-full space-y-1 p-2.5"
        >
          <Text
            className="line-clamp-2 max-w-xs"
            variant="body-3"
            weight="bold"
          >
            {post.title}
          </Text>
          <Text variant="caption-2" color="neutral-faded">
            {format(post.created_at, 'yy년 MM월 dd일 HH:mm')}
          </Text>
        </div>
        <div
          ref={actionRef}
          className="absolute right-2 bottom-2 flex items-center justify-center gap-x-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {isOwner ? (
            <>
              <Button
                color="media"
                icon={PenSquare}
                rounded
                onClick={() => {
                  router.navigate({
                    to: '/posts/$postId/edit',
                    params: { postId: post.id.toString() },
                  });
                }}
              />
              <PostDeleteModal asChild postId={post.id}>
                <Button color="critical" icon={Trash2} rounded />
              </PostDeleteModal>
            </>
          ) : (
            <Button color="media" icon={ArrowRight} rounded />
          )}
        </div>
      </Card>
    </Link>
  );
}
