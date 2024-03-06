import { IApp, ICommand, IComponent, IEntity } from './types';

export class Command implements ICommand {
  private events: {
    onSpawn: Array<(entity: IEntity, ...components: IComponent[]) => void>;
    onDestroy: Array<(entity: IEntity, ...components: IComponent[]) => void>;
  } = {
    onDestroy: [],
    onSpawn: [],
  };

  constructor(private app: IApp) {}

  public onSpawn(
    callback: (entity: IEntity, ...components: IComponent[]) => void,
  ) {
    this.events.onSpawn.push(callback);

    return () => {
      const index = this.events.onSpawn.indexOf(callback);

      if (index > -1) {
        this.events.onSpawn.splice(index, 1);
      }
    };
  }

  public onDestroy(
    callback: (entity: IEntity, ...components: IComponent[]) => void,
  ) {
    this.events.onDestroy.push(callback);

    return () => {
      const index = this.events.onDestroy.indexOf(callback);

      if (index > -1) {
        this.events.onDestroy.splice(index, 1);
      }
    };
  }

  private triggerOnDestroy(entity: IEntity, ...components: IComponent[]) {
    this.events.onDestroy.forEach((callback) =>
      callback(entity, ...components),
    );
  }

  private triggerOnSpawn(entity: IEntity, ...components: IComponent[]) {
    this.events.onSpawn.forEach((callback) => callback(entity, ...components));
  }

  private generateEntityId() {
    const min = 1;
    const max = Number.MAX_SAFE_INTEGER - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private updateComponentEntityMap(
    // eslint-disable-next-line @typescript-eslint/ban-types
    componentConstructor: Function,
    entityId: number,
  ) {
    if (!this.app.componentsIndex.has(componentConstructor)) {
      this.app.componentsIndex.set(componentConstructor, new Set());
    }

    this.app.componentsIndex.get(componentConstructor)!.add(entityId);
  }

  public spawn(...components: IComponent[]) {
    const id = this.generateEntityId();

    const entityComponents = components.reduce((acc, component) => {
      if (
        typeof component === 'object' &&
        component.constructor.name === 'Object'
      ) {
        throw new Error(
          `Component ${component.constructor.name} is a primitive`,
        );
      }

      const componentName = component.constructor.name;
      const key = componentName[0].toLowerCase() + componentName.slice(1);
      this.updateComponentEntityMap(component.constructor, id);

      return { ...acc, [key]: component };
    }, {});

    this.app.entities.set(id, { id, ...entityComponents });

    this.triggerOnSpawn(this.app.entities.get(id) as IEntity, ...components);

    return this.app.entities.get(id) as IEntity;
  }
}
