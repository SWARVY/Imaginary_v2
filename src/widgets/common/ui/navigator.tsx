import { DOCK_ITEMS } from '../model/dock';
import { AuthModal, useAuthState } from '@/features/auth';
import { Dock, DockItem } from '@/shared/ui/dock';
import { useMatches, useRouter } from '@tanstack/react-router';
import { Lock, Unlock } from 'lucide-react';
import { Icon } from 'reshaped';

export default function Navigator() {
  const router = useRouter();
  const matches = useMatches();

  const { isSignedIn } = useAuthState();

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
      <AuthModal asChild>
        <DockItem
          label={isSignedIn ? 'Sign Out' : 'Sign In'}
          icon={<Icon svg={isSignedIn ? Lock : Unlock} />}
        />
      </AuthModal>
    </Dock>
  );
}
