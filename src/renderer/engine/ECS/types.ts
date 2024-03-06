export type IEntity = {
  id: number;
};

export type IEntities = Map<number, IEntity>;

export type IComponent = {
  [key: string | number | symbol]: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor: Function;
};

export type IComponentConstructor<T = any> = new (...args: any[]) => T;

export type IClassConstructor<T = any> = new (...args: any[]) => T;

export type IResource = {
  OnStart: () => void;
  OnUpdate: () => void;
  OnDestroy: () => void;
};

export type IResources = Array<IResource>;

export type IAsset<T> = IResource & {
  data: T | null;
};

export type IResourceFinder = {
  find: <T extends IResource>(resource: IClassConstructor<T>) => T;
  tryFind: <T extends IResource>(
    resource: IClassConstructor<T>,
  ) => T | undefined;
  findOrInsertWith: <T extends IResource>(
    resource: IClassConstructor<T>,
    factory: () => T,
  ) => T;
};

export type IPluginConstructor = IClassConstructor<IPlugin>;

export type IPlugins = Array<IPluginConstructor>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type IComponentIndex = Map<Function, Set<number>>;

export type ICommand = {
  spawn: (...components: Array<IComponent>) => IEntity;
  onSpawn(
    callback: (entity: IEntity, ...components: IComponent[]) => void,
  ): () => void;
  onDestroy(
    callback: (entity: IEntity, ...components: IComponent[]) => void,
  ): () => void;
};

export enum SystemTypeEnum {
  StartUp,
  PostStartUp,
  Update,
  PostUpdate,
  PreUpdate,
}

export type IQuery = {
  with: {
    <T>(...components: IClassConstructor[]): Array<T & IEntity>;
  };
  without: {
    <T>(...components: IClassConstructor[]): Array<T & IEntity>;
  };
};

export type ISystemOptions = {
  query: IQuery;
  resource: IResourceFinder;
  command: ICommand;
};

export type ISystem = (options: ISystemOptions) => void;

export type IPlugin = {
  // eslint-disable-next-line no-use-before-define
  build: (app: IApp) => void;
};

export type IApp = {
  command: ICommand;
  resources: IResources;
  componentsIndex: IComponentIndex;
  entities: IEntities;
  plugins: IPlugins;
  addSystem(systemType: SystemTypeEnum, ...systems: ISystem[]): IApp;
  addPlugin(...plugins: IClassConstructor<IPlugin>[]): IApp;
  insertResource(resource: IResource): IApp;
};
