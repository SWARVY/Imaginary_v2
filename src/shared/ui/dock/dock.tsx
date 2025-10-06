import { cn } from '@/shared/lib';
import { ReactNode, useState } from 'react';
import { Tooltip } from 'reshaped';

export interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export interface DockProps {
  items: DockItemData[];
}

export function Dock({ items }: DockProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(-1);

  return (
    <div className="rounded-medium border-neutral-faded flex w-fit items-center gap-x-2 border p-2">
      {items.map(({ onClick, ...item }, index) => (
        <DockItem
          key={item.label}
          onClick={() => {
            setActiveItemIndex(index);
            onClick();
          }}
          isActive={activeItemIndex === index}
          {...item}
        />
      ))}
    </div>
  );
}

interface DockItemProps extends DockItemData {
  isActive?: boolean;
}

function DockItem({ icon, label, onClick, isActive }: DockItemProps) {
  return (
    <div className="relative">
      <Tooltip text={label} color="dark">
        {(attributes) => (
          <button
            className={cn(
              'rounded-medium border-neutral-faded text-neutral-faded cursor-pointer border p-3',
              'hover:border-neutral hover:bg-neutral-faded transition-all duration-500 hover:scale-110',
              'data-[active=true]:text-neutral hover:text-neutral',
            )}
            onClick={onClick}
            {...attributes}
          >
            {icon}
          </button>
        )}
      </Tooltip>
      <div
        className={cn(
          'bg-neutral-faded rounded-t-small absolute right-0.5 -bottom-2 left-0.5 h-1 transition-opacity',
          isActive ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '4px solid var(--rs-color-neutral)',
        }}
      />
    </div>
  );
}
