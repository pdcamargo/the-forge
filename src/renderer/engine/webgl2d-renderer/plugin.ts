import { IApp, Plugin, SystemTypeEnum } from '../ECS';
import { Webgl2DRenderer } from './resources';
import {
  addWebgl2DCanvasToDocument,
  addSpritesToStage,
  matchSpritePositionToTransform,
  renderWebgl2D,
  resizeWebgl2DToScreenSize,
} from './systems';

export class Webgl2DRendererPlugin extends Plugin {
  public override build(app: IApp): void {
    app
      .insertResource(new Webgl2DRenderer())
      .addSystem(
        SystemTypeEnum.StartUp,
        addWebgl2DCanvasToDocument,
        resizeWebgl2DToScreenSize
      )
      .addSystem(SystemTypeEnum.PreUpdate, resizeWebgl2DToScreenSize)
      .addSystem(SystemTypeEnum.Update, addSpritesToStage)
      .addSystem(
        SystemTypeEnum.PostUpdate,
        matchSpritePositionToTransform,
        renderWebgl2D
      );
  }
}
