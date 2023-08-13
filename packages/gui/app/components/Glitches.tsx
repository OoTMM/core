import React from 'react';
import { GLITCHES } from '@ootmm/core';

import { useSettings } from '../contexts/GeneratorContext';
import { ArrayList } from './ArrayList';
import Group from './Group';

const NAMES = {
  OOT: 'Ocarina of Time',
  MM: 'Majora\'s Mask',
};

export function GameGlitches({ game }: { game: keyof typeof NAMES }) {
  const [settings, setSettings] = useSettings();
  const glitches = Object.keys(GLITCHES).filter(x => x.startsWith(game));
  const options = glitches.map(glitch => ({ value: glitch, label: GLITCHES[glitch as keyof typeof GLITCHES] }));

  const add = (glitch: string) => {
    setSettings({ glitches: { add: [glitch as keyof typeof GLITCHES] } });
  };

  const remove = (glitch: string) => {
    setSettings({ glitches: { remove: [glitch as keyof typeof GLITCHES] } });
  }

  return (
    <Group direction='vertical' spacing='xs'>
      <h1>{NAMES[game]}</h1>
      <ArrayList options={options} selected={settings.glitches.filter(x => glitches.includes(x))} add={add} remove={remove}/>
    </Group>
    
  );
}

export function Glitches() {
  const [_, setSettings] = useSettings();
  const clear = () => {
    setSettings({ glitches: { set: [] } });
  }

  return (
    <Group direction='vertical' spacing='xl'>
      <h1>Glitches</h1>
      <Group direction='vertical'>
        <button className="btn-danger" onClick={clear} style={{width: '120px'}}>Remove All</button>
        <div className="two-column-grid">
          <GameGlitches game="OOT"/>
          <GameGlitches game="MM"/>
        </div>
      </Group>
    </Group>
  )
}
