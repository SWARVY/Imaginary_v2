import { DOCK_ITEMS } from '../model/dock';
import { Dock, DockItem } from '@/shared/ui/dock';
import { useMatches, useRouter } from '@tanstack/react-router';

export default function Navigator() {
  const router = useRouter();
  const matches = useMatches();

  return (
    <Dock>
      {DOCK_ITEMS.map(({ label, path, icon }) => (
        <DockItem
          key={label}
          label={label}
          icon={icon}
          onClick={() => router.navigate({ to: path })}
          isActive={matches.some((match) => match.id === path)}
        />
      ))}
    </Dock>
  );
}
