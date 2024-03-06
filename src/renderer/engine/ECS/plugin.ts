import { IApp, IPlugin } from './types';

export abstract class Plugin implements IPlugin {
  public abstract build(app: IApp): void;
}
