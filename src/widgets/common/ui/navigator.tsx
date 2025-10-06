import { DOCK_ITEMS } from '../model/dock';
import { Dock } from '@/shared/ui/dock';
import { useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export default function Navigator() {
  const router = useRouter();

  const dockItems = useMemo(
    () =>
      DOCK_ITEMS.map((item) => ({
        ...item,
        onClick: () => router.navigate({ to: item.path }),
      })),
    [router],
  );

  return <Dock items={dockItems} />;
}
