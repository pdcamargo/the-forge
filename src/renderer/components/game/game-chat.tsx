import * as React from 'react';
import { ScrollArea } from '../ui/scroll-area';

import { cn } from '@/utils';

const GameChatItem: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn('flex items-center', className)}>{children}</div>;
};

GameChatItem.displayName = 'GameChatItem';

const GameChatItemsContainer: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      <ScrollArea className="h-[inherit]">{children}</ScrollArea>
    </div>
  );
};

const GameChatInput: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className="mt-auto border-t border-t-black">
      <input
        type="text"
        className={cn(
          'w-full h-10 px-3 rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400',
          className,
        )}
        placeholder="Type a message..."
      />
    </div>
  );
};

const GameChat: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 h-full flex-1', className)}>
      {children}
    </div>
  );
};

GameChat.displayName = 'GameChat';

export { GameChat, GameChatItem, GameChatItemsContainer, GameChatInput };
