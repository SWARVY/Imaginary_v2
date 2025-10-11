import { FileRouteTypes } from '@/routeTree.gen';
import { AtSign, Compass, Contact, PencilLine, Signature } from 'lucide-react';
import { Icon } from 'reshaped';

interface DockAttributes {
  icon: React.ReactNode;
  label: string;
  path: FileRouteTypes['fullPaths'];
  ownerOnly?: boolean;
}

export const DOCK_ITEMS: DockAttributes[] = [
  {
    icon: <Icon svg={Compass} />,
    label: 'Explore',
    path: '/',
    ownerOnly: false,
  },
  {
    icon: <Icon svg={Signature} />,
    label: 'Posts',
    path: '/posts',
    ownerOnly: false,
  },
  {
    icon: <Icon svg={Contact} />,
    label: 'About',
    path: '/about',
    ownerOnly: false,
  },
  {
    icon: <Icon svg={AtSign} />,
    label: 'Contact',
    path: '/contact',
    ownerOnly: false,
  },
  {
    icon: <Icon svg={PencilLine} />,
    label: 'Write',
    path: '/posts/write',
    ownerOnly: true,
  },
];
