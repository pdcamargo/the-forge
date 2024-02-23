import * as React from 'react';

const GameCanvas = React.forwardRef<
  HTMLCanvasElement,
  React.ComponentPropsWithoutRef<'canvas'>
>((props, ref) => {
  return <canvas ref={ref} {...props} />;
});

GameCanvas.displayName = 'GameCanvas';

export { GameCanvas };
