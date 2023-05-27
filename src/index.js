import './style.css';

// Base URL for Leaderboard API
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

// Function to handle API requests
const sendRequest = async (url, method = 'GET', data = {}) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Request failed.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Create a new game using the API
const createGame = async (name) => {
  const url = baseURL + 'games/';
  const data = { name };

  const result = await sendRequest(url, 'POST', data);
  return result;
};

// Get scores for a specific game from the API
const getScores = async (gameId) => {
  const url = baseURL + `games/${gameId}/scores/`;
  const result = await sendRequest(url);
  return result;
};

// Submit a new score for a specific game using the API
const submitScore = async (gameId, user, score) => {
  const url = baseURL + `games/${gameId}/scores/`;
  const data = { user, score };

  const result = await sendRequest(url, 'POST', data);
  return result;
};
