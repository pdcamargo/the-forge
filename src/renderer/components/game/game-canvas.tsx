import {
  Container,
  Stage,
  PixiComponent,
  applyDefaultProps,
} from '@pixi/react';
import * as React from 'react';
import { Graphics } from 'pixi.js';

interface GridProps {
  size: number; // Size of the grid (width and height)
  spacing: number; // Space between grid lines
  color: number; // Color of the grid lines
  alpha: number; // Transparency of the grid lines
}

const Grid = PixiComponent<GridProps, Graphics>('Grid', {
  create: () => {
    // Create the Graphics object to draw the grid
    return new Graphics();
  },
  applyProps: (instance, oldProps, newProps) => {
    // Apply newProps to instance
    applyDefaultProps(instance, oldProps, newProps);

    const { size, spacing, color, alpha } = newProps;

    // Clear any previous graphics to redraw the grid
    instance.clear();

    // Set line style using newProps
    instance.lineStyle(1, color, alpha);

    // Draw vertical lines
    for (let i = 0; i <= size; i += spacing) {
      instance.moveTo(i, 0);
      instance.lineTo(i, size);
    }

    // Draw horizontal lines
    for (let i = 0; i <= size; i += spacing) {
      instance.moveTo(0, i);
      instance.lineTo(size, i);
    }
  },
  config: {
    destroy: true,
    destroyChildren: true,
  },
});

type GridAvatarProps = {
  src: string;
  x: number;
  y: number;
  size: number;
};

const GridAvatar = PixiComponent<GridAvatarProps, Graphics>('GridAvatar', {
  create: () => {
    return new Graphics();
  },
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps);

    const {
      // src,
      x,
      y,
      size,
    } = newProps;

    instance.clear();
    instance.beginFill(0x00ff00);
    instance.drawCircle(x, y, size);
    instance.endFill();
  },
  config: {
    destroy: true,
    destroyChildren: true,
  },
});

const CanvasInternal = ({ children }: { children?: React.ReactNode }) => {
  const toGrid = (s: number, n: number) => Math.floor(n / s) * s;
  return (
    <Container>
      <Grid size={2500} spacing={50} color={0x000000} alpha={0.5} />

      {Array.from({ length: 10 }, (_, i) => (
        <GridAvatar
          key={i}
          src="avatar.png"
          x={toGrid(25, Math.random() * 500) - 38}
          y={toGrid(25, Math.random() * 500) - 38}
          size={25}
        />
      ))}

      {children}
    </Container>
  );
};

const GameCanvas = React.forwardRef<
  Stage,
  {
    parentElement: HTMLDivElement | null;
    children?: React.ReactNode;
  }
>(({ parentElement, children }, ref) => {
  return (
    <Stage
      ref={ref}
      width={parentElement?.clientWidth ?? window.innerWidth}
      height={parentElement?.clientHeight ?? window.innerHeight}
      options={{
        backgroundColor: 0x333550,
      }}
    >
      <CanvasInternal>{children}</CanvasInternal>
    </Stage>
  );
});

GameCanvas.displayName = 'GameCanvas';

export { GameCanvas };
