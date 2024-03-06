import { DataContextMenu } from '@/components/ui/data-context-menu';
import { cn } from '@/utils';

type InspectorProps = {
  className?: string;
};

const Inspector = ({ className }: InspectorProps) => {
  return (
    <div className={cn('', className)}>
      <DataContextMenu
        menuItems={[
          {
            id: 'inspector',
            title: 'Inspector',
            children: [
              {
                id: 'inspect',
                title: 'Inspect',
                onClick: () => {},
                shortcut: 'cmd+shift+c',
                children: [
                  {
                    id: 'inspect',
                    title: 'Inspect',
                    onClick: () => {},
                    shortcut: 'cmd+shift+c',
                  },
                  {
                    id: 'inspect-element',
                    title: 'Inspect Element',
                    onClick: () => {},
                    shortcut: 'cmd+shift+i',
                  },
                ],
              },
              {
                id: 'inspect-element',
                title: 'Inspect Element',
                onClick: () => {},
                shortcut: 'cmd+shift+i',
              },
            ],
            onClick: () => {},
            shortcut: 'cmd+shift+i',
          },
        ]}
      >
        <div>Inspector</div>
      </DataContextMenu>
    </div>
  );
};

Inspector.displayName = 'Inspector';

export { Inspector };
