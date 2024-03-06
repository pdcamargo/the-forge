import {
  IClassConstructor,
  IApp,
  IResource,
  IResourceFinder,
  IAsset,
} from './types';

export abstract class Resource implements IResource {
  public abstract OnStart(): void;

  public abstract OnUpdate(): void;

  public abstract OnDestroy(): void;
}

const assetCache: Map<string, any> = new Map();

export class Asset<T> extends Resource implements IAsset<T> {
  public data: T | null = null;

  constructor(public readonly src: string) {
    super();
  }

  public override OnStart(): void {
    this.load(this.src)
      .then((data) => {
        this.data = data;
        return data;
      })
      .catch((error) => {
        console.error('Error loading asset:', error);
      });
  }

  public override OnUpdate() {}

  public override OnDestroy(): void {
    assetCache.delete(this.src);
  }

  private getAssetType(src: string): string {
    const parts = src.split('.');
    return parts[parts.length - 1];
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  }

  private async loadJson(src: string): Promise<any> {
    const response = await fetch(src);

    return await response.json();
  }

  private loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = src;
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = reject;
    });
  }

  private async load(src: string): Promise<T> {
    if (assetCache.has(src)) {
      return assetCache.get(src);
    }

    const type = this.getAssetType(src);

    let data: any;

    switch (type) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        data = await this.loadImage(src);
        break;
      case 'json':
        data = await this.loadJson(src);
        break;
      case 'mp3':
      case 'wav':
      case 'ogg':
        data = await this.loadAudio(src);
        break;
      default:
        data = await this.loadImage(src);
        break;
    }

    assetCache.set(src, data);

    return data;
  }
}

export class ResourceFinder implements IResourceFinder {
  constructor(private app: IApp) {}

  public findAsset = <T extends IAsset<any>>(src: string) => {
    const found = this.app.resources.find(
      (r) => r instanceof Asset && r.src === src,
    );

    if (!found) {
      throw new Error(`Asset ${src} not found`);
    }

    return found as T;
  };

  public find<T extends Resource>(resource: IClassConstructor<T>) {
    const found = this.tryFind(resource);

    if (!found) {
      throw new Error(`Resource ${resource.name} not found`);
    }

    return found;
  }

  public tryFind<T extends Resource>(resource: IClassConstructor<T>) {
    return this.app.resources.find((r) => r instanceof resource) as T;
  }

  public findOrInsertWith = <T extends IResource>(
    resource: IClassConstructor<T>,
    factory: () => T,
  ) => {
    const found = this.tryFind(resource);

    if (found) {
      return found;
    }

    const newResource = factory();

    this.app.insertResource(newResource);

    return newResource;
  };
}
