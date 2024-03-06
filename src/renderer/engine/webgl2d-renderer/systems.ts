import * as PIXI from 'pixi.js';

import { ISystemOptions } from '../ECS';
import { Webgl2DSprite, Webgl2DTexture } from './components';
import { Webgl2DRenderer } from './resources';
import { Transform2D } from '../components';

export function addWebgl2DCanvasToDocument({ resource }: ISystemOptions) {
  const webglRenderer = resource.find(Webgl2DRenderer);

  document.body.appendChild(webglRenderer.renderer.view as HTMLCanvasElement);
}

export function resizeWebgl2DToScreenSize({ resource }: ISystemOptions) {
  const webglRenderer = resource.find(Webgl2DRenderer);

  webglRenderer.renderer.resize(window.innerWidth, window.innerHeight);
}

export function clearWebgl2DScreen({ resource }: ISystemOptions) {
  const webglRenderer = resource.find(Webgl2DRenderer);

  webglRenderer.renderer.clear();
}

export function addSpritesToStage({ resource, query }: ISystemOptions) {
  const webglRenderer = resource.find(Webgl2DRenderer);
  const sprites = query.with<{
    webglSprite: Webgl2DSprite;
    webglTexture: Webgl2DTexture;
  }>(Webgl2DSprite, Webgl2DTexture);

  sprites.forEach((entity) => {
    const { webglSprite, webglTexture } = entity;

    if (webglSprite.spriteInstance === null) {
      webglTexture.textureInstance = PIXI.Texture.from(webglTexture.src);
      webglSprite.spriteInstance = new PIXI.Sprite(
        webglTexture.textureInstance,
      );
      webglRenderer.stage.addChild(webglSprite.spriteInstance);
    }
  });
}

export function matchSpritePositionToTransform({ query }: ISystemOptions) {
  const sprites = query.with<{
    webglSprite: Webgl2DSprite;
    webglTexture: Webgl2DTexture;
    transform: Transform2D;
  }>(Webgl2DSprite, Webgl2DTexture, Transform2D);

  sprites.forEach((entity) => {
    const { webglSprite, transform } = entity;

    if (webglSprite.spriteInstance !== null) {
      webglSprite.spriteInstance.position.set(
        transform.position.x,
        transform.position.y,
      );

      webglSprite.spriteInstance.rotation =
        transform.rotation * (Math.PI / 180);

      webglSprite.spriteInstance.scale.set(
        transform.scale.x,
        transform.scale.y,
      );
    }
  });
}

export function renderWebgl2D({ resource }: ISystemOptions) {
  const webglRenderer = resource.find(Webgl2DRenderer);

  webglRenderer.renderer.render(webglRenderer.stage);
}
