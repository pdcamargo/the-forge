import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import fs, { type FileHandle } from 'fs/promises';

export type Channels = 'ipc-example';

fs.stat();

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  fileSystem: {
    async readFile(
      path: string | FileHandle,
      options?: { encoding?: null; flag?: string } | null,
    ) {
      return ipcRenderer.invoke('fs:readFile', {
        path,
        options,
      });
    },
    async readDir(
      path: string,
      options?: {
        encoding?: null;
        withFileTypes?: false;
        recursive?: boolean;
      } | null,
    ) {
      return ipcRenderer.invoke('fs:readdir', {
        path,
        options,
      });
    },
    async stat(path: string, options?: { bigint?: boolean } | null) {
      return ipcRenderer.invoke('fs:stat', {
        path,
        options,
      });
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
