import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import DockLayout, { LayoutData } from 'rc-dock';

import '@pixi/unsafe-eval';

import 'rc-dock/dist/rc-dock-dark.css';
import './App.css';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion';
import { GameCanvas } from './components/game/game-canvas';
import { Inspector } from './components/editor/inspector';

const GameTab = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={parentRef} className="w-full h-full overflow-hidden">
      <GameCanvas parentElement={parentRef.current} />
    </div>
  );
};

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 0.7,
        children: [
          {
            tabs: [
              {
                cached: true,
                closable: false,
                id: 'game',
                title: 'Game',
                content: <GameTab />,
              },
              {
                id: 'tab2',
                title: 'tab2',
                content: (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ),
              },
            ],
          },
        ],
      },
      {
        size: 0.3,
        tabs: [
          {
            id: 'inspector',
            title: 'Inspector',
            content: <Inspector />,
          },
        ],
      },
    ],
  },
};

function Game() {
  return (
    <DockLayout
      defaultLayout={defaultLayout}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
}
