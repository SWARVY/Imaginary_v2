import { DOCK_ITEMS } from '../model/dock';
import { AuthModal, useAuthState } from '@/features/auth';
import { Dock, DockItem } from '@/shared/ui/dock';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import { Lock, Unlock } from 'lucide-react';
import { Icon } from 'reshaped';

export default function Navigator() {
  const router = useRouter();
  const matchRoute = useMatchRoute();

  const { isSignedIn, isOwner } = useAuthState();

  return (
    <Dock className="sticky top-0">
      {DOCK_ITEMS.map(
        ({ label, path, icon, ownerOnly }) =>
          (!ownerOnly || (ownerOnly && isOwner)) && (
            <DockItem
              key={label}
              label={label}
              icon={icon}
              onClick={() => router.navigate({ to: path })}
              isActive={!!matchRoute({ to: path })}
            />
          ),
      )}
      <AuthModal asChild>
        <DockItem
          label={isSignedIn ? 'Sign Out' : 'Sign In'}
          icon={<Icon svg={isSignedIn ? Lock : Unlock} />}
        />
      </AuthModal>
    </Dock>
  );
}
