export const getPlayers = () => {
    return JSON.parse(localStorage.getItem('players')) || [];
  };
  
  export const savePlayers = (players) => {
    localStorage.setItem('players', JSON.stringify(players));
  };
  