import React, { useState } from 'react';

const PlayerList = ({ players }) => {
  const [filters, setFilters] = useState({
    role: '',
    isCaptain: '',
    isViceCaptain: '',
    team: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredPlayers = players.filter(player => {
    return (
      (filters.role ? player.role === filters.role : true) &&
      (filters.isCaptain ? player.isCaptain === (filters.isCaptain === 'true') : true) &&
      (filters.isViceCaptain ? player.isViceCaptain === (filters.isViceCaptain === 'true') : true) &&
      (filters.team ? player.team === filters.team : true)
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Player List</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <select name="role" value={filters.role} onChange={handleFilterChange} className="p-2 border rounded-md">
          <option value="">Filter by Role</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All Rounder">All Rounder</option>
          <option value="WK">WK</option>
        </select>
        <select name="isCaptain" value={filters.isCaptain} onChange={handleFilterChange} className="p-2 border rounded-md">
          <option value="">Filter by Captain</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isViceCaptain" value={filters.isViceCaptain} onChange={handleFilterChange} className="p-2 border rounded-md">
          <option value="">Filter by Vice-Captain</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <input
          type="text"
          name="team"
          placeholder="Filter by Team"
          value={filters.team}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        />
      </div>
      <ul className="space-y-4">
        {filteredPlayers.map((player) => (
          <li key={player.id} className="p-4 border rounded-lg bg-gray-50 shadow-lg flex items-center space-x-4">
            {player.photo && <img src={player.photo} alt={player.name} className="w-12 h-12 rounded-full" />}
            <div>
              <p className="text-lg font-semibold text-gray-800">{player.name} - {player.role}</p>
              <p className="text-sm text-gray-500">Team: {player.team} {player.isCaptain && ' (Captain)'} {player.isViceCaptain && ' (Vice-Captain)'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;

