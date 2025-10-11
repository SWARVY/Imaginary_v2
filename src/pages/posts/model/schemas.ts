import * as v from 'valibot';

export const ThumbnailSchema = v.nullable(v.union([v.string(), v.file()]));

export type Thumbnail = v.InferOutput<typeof ThumbnailSchema>;

export const PostFormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, '제목을 입력해주세요'),
    v.maxLength(50, '제목은 50자 이하로 입력해주세요'),
  ),
  thumbnail: ThumbnailSchema,
});

export type PostForm = v.InferOutput<typeof PostFormSchema>;

export const CreatePostRequestSchema = v.object({
  title: v.string(),
  content: v.string(),
  thumbnail: v.nullable(v.string()),
});

export type CreatePostRequest = v.InferOutput<typeof CreatePostRequestSchema>;

export const EditPostRequestSchema = v.object({
  id: v.number(),
  title: v.string(),
  content: v.string(),
  thumbnail: v.nullable(v.string()),
});

export type EditPostRequest = v.InferOutput<typeof EditPostRequestSchema>;

export const PostIdRequestSchema = v.object({
  id: v.number(),
});

export type PostIdRequest = v.InferOutput<typeof PostIdRequestSchema>;

export const PostSchema = v.object({
  id: v.number(),
  created_at: v.string(),
  title: v.string(),
  content: v.string(),
  author_id: v.string(),
  thumbnail: v.nullable(v.string()),
});

export type Post = v.InferOutput<typeof PostSchema>;
