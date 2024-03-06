import { IComponentConstructor, IApp, IQuery, IEntity } from './types';

class QueryCache {
  private cache = new Map<string, Set<IEntity>>();

  getQueryResult(queryKey: string): Set<IEntity> | undefined {
    return this.cache.get(queryKey);
  }

  setQueryResult(queryKey: string, entities: Set<IEntity>): void {
    this.cache.set(queryKey, entities);
  }

  invalidateQuery(queryKey: string): void {
    this.cache.delete(queryKey);
  }

  addEntityToQuery(queryKey: string, entity: IEntity): void {
    const queryResult = this.cache.get(queryKey);

    if (queryResult) {
      queryResult.add(entity);
    }
  }

  removeEntityFromQuery(queryKey: string, entity: IEntity): void {
    const queryResult = this.cache.get(queryKey);

    if (queryResult) {
      queryResult.delete(entity);
    }
  }

  findAllKeysWithEntity(entity: IEntity): string[] {
    const result: string[] = [];

    this.cache.forEach((entities, queryKey) => {
      if (entities.has(entity)) {
        result.push(queryKey);
      }
    });

    return result;
  }

  invalidateAll(): void {
    this.cache.clear();
  }
}

export class Query implements IQuery {
  public cache: QueryCache;

  constructor(private app: IApp) {
    this.cache = new QueryCache();

    app.command.onSpawn((entity, ...components) => {
      const queryKey = this.createQueryKey(
        'with',
        components.map((c) => c.constructor as IComponentConstructor),
      );

      this.cache.addEntityToQuery(queryKey, entity);
    });

    app.command.onDestroy((entity, ...components) => {
      const queryKey = this.createQueryKey(
        'with',
        components.map((c) => c.constructor as IComponentConstructor),
      );

      this.cache.removeEntityFromQuery(queryKey, entity);

      const entityKeys = this.cache.findAllKeysWithEntity(entity);

      entityKeys.forEach((key) => {
        this.cache.invalidateQuery(key);
      });
    });
  }

  private createQueryKey(
    type: string,
    components: IComponentConstructor[],
  ): string {
    const componentNames = components
      .map((c) => c.name)
      .sort()
      .join(',');

    return `${type}:${componentNames}`;
  }

  public with = <T>(
    ...withComponents: IComponentConstructor[]
  ): Array<IEntity & T> => {
    if (withComponents.length === 0) {
      return [];
    }

    const queryKey = this.createQueryKey('with', withComponents);

    const result = this.cache.getQueryResult(queryKey);
    if (result) {
      return Array.from(result) as Array<IEntity & T>;
    }

    let commonEntities = new Set(
      this.app.componentsIndex.get(withComponents[0]) || [],
    );

    for (let i = 1; i < withComponents.length; i++) {
      const componentEntities =
        this.app.componentsIndex.get(withComponents[i]) || new Set();
      commonEntities = new Set(
        [...commonEntities].filter((entityId) =>
          componentEntities.has(entityId),
        ),
      );
    }

    const res = Array.from(commonEntities).map(
      (entityId) => this.app.entities.get(entityId) as IEntity & T,
    );

    this.cache.setQueryResult(queryKey, new Set(res));

    return res;
  };

  public without = <T>(
    ...withoutComponents: IComponentConstructor[]
  ): Array<IEntity & T> => {
    let allEntities = new Set(this.app.entities.keys());

    withoutComponents.forEach((component) => {
      const componentEntities =
        this.app.componentsIndex.get(component) || new Set();
      allEntities = new Set(
        [...allEntities].filter((entityId) => !componentEntities.has(entityId)),
      );
    });

    return Array.from(allEntities).map(
      (entityId) => this.app.entities.get(entityId) as IEntity & T,
    );
  };
}
