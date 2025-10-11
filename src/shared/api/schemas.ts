import * as v from 'valibot';

export const PaginationSchema = v.object({
  page: v.number(),
  limit: v.number(),
});

export type Pagination = v.InferOutput<typeof PaginationSchema>;

export const UploadFileResponseSchema = v.object({
  name: v.string(),
  path: v.string(),
  fullPath: v.string(),
});

export type UploadFileResponse = v.InferOutput<typeof UploadFileResponseSchema>;
