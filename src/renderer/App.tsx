import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import DockLayout, { LayoutData } from 'rc-dock';

import 'rc-dock/dist/rc-dock-dark.css';
import './App.css';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion';
import {
  GameChat,
  GameChatInput,
  GameChatItem,
  GameChatItemsContainer,
} from './components/game/game-chat';

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
            id: 'chat',
            title: 'Chat',
            content: (
              <GameChat>
                <GameChatItemsContainer>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                  <GameChatItem>Chat message 1</GameChatItem>
                </GameChatItemsContainer>
                <GameChatInput />
              </GameChat>
            ),
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
