import * as PIXI from 'pixi.js';

export class Webgl2DTexture {
  public textureInstance: PIXI.Texture | null = null;

  constructor(public readonly src: string) {}
}

export class Webgl2DSprite {
  public spriteInstance: PIXI.Sprite | null = null;

  constructor() {}
}
