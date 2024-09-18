import React, { useState } from 'react';

const PlayerForm = ({ players, addPlayer, editPlayer }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    isCaptain: false,
    isViceCaptain: false,
    team: '',
    photo: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          photo: reader.result
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check captain and vice-captain constraints
    const teamPlayers = players.filter(player => player.team === formData.team);
    const captainExists = teamPlayers.some(player => player.isCaptain && player.id !== formData.id);
    const viceCaptainExists = teamPlayers.some(player => player.isViceCaptain && player.id !== formData.id);

    if (formData.isCaptain && captainExists) {
      alert('This team already has a captain.');
      return;
    }

    if (formData.isViceCaptain && viceCaptainExists) {
      alert('This team already has a vice-captain.');
      return;
    }

    if (formData.id) {
      editPlayer(formData);
    } else {
      addPlayer({ ...formData, id: Date.now().toString() });
    }

    setFormData({ id: '', name: '', role: '', isCaptain: false, isViceCaptain: false, team: '', photo: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md space-y-4 bg-white">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-2 border rounded-md w-full"
      />
      <select name="role" value={formData.role} onChange={handleChange} required className="p-2 border rounded-md w-full">
        <option value="">Select Role</option>
        <option value="Batsman">Batsman</option>
        <option value="Bowler">Bowler</option>
        <option value="All Rounder">All Rounder</option>
        <option value="WK">WK</option>
      </select>
      <input
        type="text"
        name="team"
        placeholder="Team"
        value={formData.team}
        onChange={handleChange}
        required
        className="p-2 border rounded-md w-full"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isCaptain"
          checked={formData.isCaptain}
          onChange={handleChange}
        />
        <span>Captain</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isViceCaptain"
          checked={formData.isViceCaptain}
          onChange={handleChange}
        />
        <span>Vice-Captain</span>
      </label>
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="p-2 border rounded-md w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
        {formData.id ? 'Edit Player' : 'Add Player'}
      </button>
    </form>
  );
};

export default PlayerForm;

