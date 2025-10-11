import { DEFAULT_CONTENT } from '../config/editor';
import getPostInfoOptions from '../model/get-post-info-options';
import { cn, generateSupabaseImageUrl } from '@/shared/lib';
import { ko } from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { format } from 'date-fns';
import { Suspense, useEffect } from 'react';
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
                  alt="thumbnail"
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
  const editor = useCreateBlockNote({
    dictionary: ko,
    initialContent: DEFAULT_CONTENT,
  });

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(initialContent!);

      editor.replaceBlocks(editor.document, blocks);
    }

    if (initialContent) {
      loadInitialHTML();
    }
  }, [editor, initialContent]);

  return (
    <BlockNoteView
      editor={editor}
      className={cn('max-h-[calc(80dvh-5rem)]')}
      theme="dark"
      linkToolbar
      sideMenu
      formattingToolbar
      editable={false}
    />
  );
}
