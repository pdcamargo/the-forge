import * as PIXI from 'pixi.js';

import { Resource } from '../ECS';

export class Webgl2DRenderer extends Resource {
  public stage!: PIXI.Container;

  public renderer!: PIXI.Renderer;

  public override OnStart(): void {
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.Renderer({
      width: 800,
      height: 600,
      antialias: false,
      resolution: 1,
    });
  }

  public override OnUpdate(): void {}

  public override OnDestroy(): void {}
}
