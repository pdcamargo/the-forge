import { Vector2 } from '../common';

type Transform2DOptions = {
  position?: Vector2;
  rotation?: number;
  scale?: Vector2;
};

export class Transform2D {
  public position = new Vector2(0, 0);

  public rotation = 0;

  public scale = new Vector2(1, 1);

  constructor(options: Transform2DOptions = {}) {
    const { position, rotation, scale } = options ?? {};

    if (position) this.position = position;
    if (rotation) this.rotation = rotation;
    if (scale) this.scale = scale;
  }
}
