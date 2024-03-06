import { Command } from './command';
import { Query } from './query';
import { ResourceFinder, Resource } from './resource';
import {
  IClassConstructor,
  IEntities,
  IApp,
  IPlugins,
  IResources,
  ISystem,
  SystemTypeEnum,
  IComponentIndex,
} from './types';

import { Plugin } from './plugin';

export class App implements IApp {
  public name: string;

  public readonly command: Command = new Command(this);

  private query = new Query(this);

  private resource = new ResourceFinder(this);

  private inittedResources: Array<Resource> = [];

  private systems: Record<SystemTypeEnum, ISystem[]> = {
    [SystemTypeEnum.StartUp]: [],
    [SystemTypeEnum.PostStartUp]: [],
    [SystemTypeEnum.Update]: [],
    [SystemTypeEnum.PostUpdate]: [],
    [SystemTypeEnum.PreUpdate]: [],
  };

  public componentsIndex: IComponentIndex = new Map();

  public resources: IResources = [];

  public entities: IEntities = new Map();

  public plugins: IPlugins = [];

  constructor(name?: string) {
    this.name = name || 'Arkan App';
  }

  addPlugin(...plugins: IClassConstructor<Plugin>[]): App {
    this.plugins.push(...plugins);

    return this;
  }

  addSystem(systemType: SystemTypeEnum, ...systems: ISystem[]): App {
    this.systems[systemType].push(...systems);

    return this;
  }

  addSystemFromClass(
    systemType: SystemTypeEnum,
    ...systems: Record<string | number | symbol, any>[]
  ): App {
    systems.forEach((system) => {
      // get every property from the system that is a function and is not the constructor and add it to the systems array
      this.addSystem(
        systemType,
        ...Object.values(system).filter((value) => {
          return typeof value === 'function' && value !== system.constructor;
        }),
      );
    });

    return this;
  }

  insertResource(resource: Resource): App {
    if (this.resources.includes(resource)) {
      throw new Error(`Resource ${resource.constructor.name} already exists`);
    }

    this.resources.push(resource);

    return this;
  }

  start(): void {
    document.title = this.name;

    this.plugins.forEach((TargetPlugin) => {
      const pluginInstance = new TargetPlugin();
      pluginInstance.build(this);
    });

    this.resources.forEach((resource) => {
      resource.OnStart();

      this.inittedResources.push(resource);
    });

    this.systems[SystemTypeEnum.StartUp].forEach((system) => {
      this.callSystem(system);
    });

    this.systems[SystemTypeEnum.PostStartUp].forEach((system) => {
      this.callSystem(system);
    });

    this.update();
  }

  private callSystem = (system: ISystem) => {
    system({
      query: this.query,
      resource: this.resource,
      command: this.command,
    });
  };

  private update = () => {
    requestAnimationFrame(this.update);

    this.resources.forEach((resource) => {
      if (!this.inittedResources.includes(resource)) {
        resource.OnStart();
        this.inittedResources.push(resource);
      }

      resource.OnUpdate();
    });

    this.systems[SystemTypeEnum.PreUpdate].forEach((system) => {
      this.callSystem(system);
    });

    this.systems[SystemTypeEnum.Update].forEach((system) => {
      this.callSystem(system);
    });

    this.systems[SystemTypeEnum.PostUpdate].forEach((system) => {
      this.callSystem(system);
    });
  };
}
