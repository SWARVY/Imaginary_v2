import { FileRouteTypes } from '@/routeTree.gen';
import { AtSign, Compass, Contact, Signature } from 'lucide-react';
import { Icon } from 'reshaped';

interface DockAttributes {
  icon: React.ReactNode;
  label: string;
  path: FileRouteTypes['fullPaths'];
}

export const DOCK_ITEMS: DockAttributes[] = [
  {
    icon: <Icon svg={Compass} />,
    label: 'Explore',
    path: '/',
  },
  {
    icon: <Icon svg={Signature} />,
    label: 'Posts',
    path: '/posts',
  },
  {
    icon: <Icon svg={Contact} />,
    label: 'About',
    path: '/about',
  },
  {
    icon: <Icon svg={AtSign} />,
    label: 'Contact',
    path: '/contact',
  },
];
