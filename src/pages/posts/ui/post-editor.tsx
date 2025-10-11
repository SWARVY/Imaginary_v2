import { DEFAULT_CONTENT } from '../config/editor';
import { PostFormSchema, Thumbnail } from '../model/schemas';
import { useUploadFile } from '@/shared/hooks';
import { cn, generateSupabaseImageUrl } from '@/shared/lib';
import '@blocknote/core/fonts/inter.css';
import { ko } from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import gsap from 'gsap';
import { List, PenBox, Save, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Container,
  FileUpload,
  Image,
  Loader,
  useToast,
  View,
} from 'reshaped';

interface PostEditorProps {
  initialFormValue?: {
    title: string;
    thumbnail: string | null;
    content: string;
  };
  onSubmit: (data: {
    title: string;
    thumbnail: string | null;
    content: string;
  }) => Promise<void>;
}

function getThumbnailSrc(thumbnail: File | string) {
  if (thumbnail instanceof File) {
    return URL.createObjectURL(thumbnail);
  }

  return generateSupabaseImageUrl({ path: thumbnail });
}

export default function PostEditor({
  initialFormValue,
  onSubmit,
}: PostEditorProps) {
  const [focus, setFocus] = useState(false);

  const toast = useToast();

  const editor = useCreateBlockNote({
    dictionary: ko,
    initialContent: DEFAULT_CONTENT,
  });

  const { mutateAsync: uploadFile } = useUploadFile({
    onSuccess: () => {},
    onError: () => {
      toast.show({
        text: '파일 업로드에 실패했어요. 다시 시도해주세요',
        color: 'critical',
      });
    },
  });

  const form = useForm({
    defaultValues: {
      title: initialFormValue?.title ?? '',
      thumbnail: initialFormValue?.thumbnail ?? (null as Thumbnail),
    },
    validators: {
      onChange: PostFormSchema,
    },
    onSubmit: async (data) => {
      const content = await editor.blocksToMarkdownLossy(editor.document);

      let thumbnail;

      if (data.value.thumbnail instanceof File) {
        const formData = new FormData();

        formData.append('file', data.value.thumbnail);

        thumbnail = (await uploadFile({ data: formData })).fullPath;
      } else {
        thumbnail = data.value.thumbnail;
      }

      await onSubmit({
        title: data.value.title,
        thumbnail,
        content,
      });
    },
    onSubmitInvalid: (errors) => {
      console.error(errors);
    },
  });

  useEffect(() => {
    async function loadInitialHTML() {
      if (!initialFormValue) return;

      const blocks = await editor.tryParseMarkdownToBlocks(
        initialFormValue.content,
      );

      editor.replaceBlocks(editor.document, blocks);
    }

    loadInitialHTML();
  }, [editor, initialFormValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="relative h-full"
    >
      <View width="100%" height="100%" gap={8}>
        <form.Field
          name="title"
          children={(field) => (
            <View>
              <input
                type="text"
                className={cn(
                  'w-full text-center text-2xl font-semibold',
                  'outline-none',
                )}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="제목을 입력해주세요"
                maxLength={50}
              />
            </View>
          )}
        />
        <form.Field
          name="thumbnail"
          children={(field) =>
            field.state.value ? (
              <ThumbnailImage
                src={getThumbnailSrc(field.state.value)}
                onDelete={() => field.handleChange(null)}
              />
            ) : (
              <FileUpload
                name="file"
                onChange={(e) => field.handleChange(e.value[0])}
                inputAttributes={{
                  accept: 'image/*',
                  multiple: false,
                }}
              >
                썸네일 이미지를 추가해주세요 🪄
              </FileUpload>
            )
          }
        />
        <BlockNoteView
          editor={editor}
          className={cn('max-h-[calc(80dvh-5rem)]')}
          theme="dark"
          linkToolbar
          sideMenu
          formattingToolbar
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </View>
      <PostWriterFooter
        mode={initialFormValue ? 'edit' : 'write'}
        focus={focus}
        isValid={form.state.isValid}
        isSubmitting={form.state.isSubmitting}
        onSubmit={() => form.handleSubmit()}
      />
    </form>
  );
}

interface ThumbnailImageProps {
  src: string;
  onDelete: () => void;
}

function ThumbnailImage({ src, onDelete }: ThumbnailImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    gsap.set(ref.current, {
      opacity: 0,
      transform: 'translateY(-100%)',
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    if (visible) {
      tl.to(ref.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(0)',
        opacity: 1,
      });
    } else {
      tl.to(ref.current, {
        duration: 0.7,
        ease: 'expo.out',
        transform: 'translateY(-100%)',
        opacity: 0,
      });
    }
  }, [src, visible]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <View aspectRatio={16 / 10}>
        <Image src={src} alt="thumbnail" borderRadius="large" width="100%" />
      </View>
      <div ref={ref} className="absolute top-2 right-2">
        <Button color="critical" icon={Trash2} rounded onClick={onDelete} />
      </div>
    </div>
  );
}

interface PostWriterFooterProps {
  mode: 'write' | 'edit';
  focus: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

function PostWriterFooter({
  mode,
  focus,
  isValid,
  isSubmitting,
  onSubmit,
}: PostWriterFooterProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.set(navRef.current, {
      transform: 'translateY(0)',
    }).to(navRef.current, {
      duration: 1,
      ease: 'expo.out',
      transform: 'translateY(100%)',
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    if (focus) {
      tl.to(navRef.current, {
        duration: 1,
        ease: 'expo.out',
        transform: 'translateY(100%)',
        opacity: 0.4,
      });
    } else {
      tl.to(navRef.current, {
        duration: 1,
        ease: 'expo.out',
        transform: 'translateY(0)',
        opacity: 1,
      });
    }
  }, [focus]);

  return (
    <nav
      ref={navRef}
      className="fixed bottom-4 left-0 flex w-full justify-center"
    >
      <Container width="640px">
        <View direction="row" gap={4} justify="space-between">
          <Button
            className="flex-1"
            variant="outline"
            size="large"
            icon={mode === 'write' ? Save : List}
            color="neutral"
            onClick={() => {
              if (mode === 'edit') {
                router.navigate({ to: '/posts' });
              }
            }}
          >
            {mode === 'write' ? '임시저장' : '목록'}
          </Button>
          <Button
            type="submit"
            className="flex-1"
            variant="solid"
            size="large"
            icon={PenBox}
            color="media"
            disabled={!isValid || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? (
              <Loader size="small" />
            ) : mode === 'write' ? (
              '작성'
            ) : (
              '수정'
            )}
          </Button>
        </View>
      </Container>
    </nav>
  );
}
