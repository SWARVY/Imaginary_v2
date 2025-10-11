interface GenerateSupabaseImageUrlProps {
  path: string;
}

export default function generateSupabaseImageUrl({
  path,
}: GenerateSupabaseImageUrlProps) {
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${path}`;
}
