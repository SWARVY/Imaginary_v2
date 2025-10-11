import { fetchUserFn } from '@/routes/__root';
import { queryKey } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';

export default function useAuthState() {
  const fetchUser = useServerFn(fetchUserFn);

  const result = useQuery({
    queryKey: queryKey.auth['fetch-user'],
    queryFn: fetchUser,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const userRole = result.data?.user_metadata?.role as string | undefined;
  const isOwner = userRole === 'owner';

  return { isSignedIn: !!result.data?.email, isOwner, ...result };
}
