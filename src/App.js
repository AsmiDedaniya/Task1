import React, { useState, useEffect } from 'react';
import PlayerForm from './PlayerForm';
import PlayerList from './PlayerList';
import { getPlayers, savePlayers } from './localStorageUtil';

const App = () => {
  const [players, setPlayers] = useState(getPlayers());

  useEffect(() => {
    savePlayers(players);
  }, [players]);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const editPlayer = (updatedPlayer) => {
    setPlayers(players.map(player => player.id === updatedPlayer.id ? updatedPlayer : player));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Player Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PlayerForm players={players} addPlayer={addPlayer} editPlayer={editPlayer} />
        <PlayerList players={players} />
      </div>
    </div>
  );
};

export default App;

