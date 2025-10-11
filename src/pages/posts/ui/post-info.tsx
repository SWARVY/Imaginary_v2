import getPostInfoOptions from '../model/get-post-info-options';
import { generateSupabaseImageUrl } from '@/shared/lib';
import { SuspenseQuery } from '@suspensive/react-query';
import { format } from 'date-fns';
import { Suspense } from 'react';
import Markdown from 'react-markdown';
import { Image, Text, View } from 'reshaped';

interface PostInfoProps {
  postId: number;
}

export default function PostInfo({ postId }: PostInfoProps) {
  return (
    <Suspense>
      <SuspenseQuery {...getPostInfoOptions({ id: postId })}>
        {({ data }) => (
          <View direction="column" height="100%" width="100%" gap={12}>
            <View direction="column" width="100%" align="center" gap={4}>
              <Text className="text-2xl font-semibold">{data.title}</Text>
              <Text variant="caption-1" color="neutral-faded">
                {format(data.created_at, 'yyyy. MM. dd. HH:mm')}
              </Text>
            </View>
            {data.thumbnail && (
              <View aspectRatio={16 / 10}>
                <Image
                  src={generateSupabaseImageUrl({
                    path: data.thumbnail,
                  })}
                  alt={data.title}
                  width="100%"
                  borderRadius="large"
                />
              </View>
            )}
            <PostInfoContent initialContent={data.content} />
          </View>
        )}
      </SuspenseQuery>
    </Suspense>
  );
}

interface PostInfoContentProps {
  initialContent: string;
}

function PostInfoContent({ initialContent }: PostInfoContentProps) {
  return (
    <article className="prose text-neutral text-sm">
      <Markdown>{initialContent}</Markdown>
    </article>
  );
}
