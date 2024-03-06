import React from 'react';

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuShortcut,
} from './context-menu';

type MenuItem = {
  id: string;
  title: string | React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  children?: MenuItem[];
};

interface DataContextMenuProps {
  menuItems: MenuItem[]; // menuJson is now an array named menuItems
  children: React.ReactNode; // Children to act as the trigger
}

const DataContextMenu: React.FC<DataContextMenuProps> = ({
  menuItems,
  children,
}) => {
  const renderMenuItem = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      return (
        <ContextMenuSub key={item.id}>
          <ContextMenuSubTrigger>{item.title}</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {item.children.map((subItem) => renderMenuItem(subItem))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    }
    return (
      <ContextMenuItem key={item.id} onClick={item.onClick}>
        {item.title}
        {item.shortcut && (
          <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
        )}
      </ContextMenuItem>
    );
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {menuItems.map((menuItem) => renderMenuItem(menuItem))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export { DataContextMenu };
