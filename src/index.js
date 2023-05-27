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

// Create a new game
const createGame = async (name) => {
  const url = baseURL + 'games/';
  const data = { name };

  const result = await sendRequest(url, 'POST', data);
  return result;
};

// Get scores for a specific game
const getScores = async (gameId) => {
  const url = baseURL + `games/${gameId}/scores/`;
  const result = await sendRequest(url);
  return result;
};

// Submit a new score for a specific game
const submitScore = async (gameId, user, score) => {
  const url = baseURL + `games/${gameId}/scores/`;
  const data = { user, score };

  const result = await sendRequest(url, 'POST', data);
  return result;
};

// Event listener for refresh button
const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click', async () => {
  const gameId = 'FortuneuzodinmA';
  const scores = await getScores(gameId);
  const scoreCard = document.querySelector('.scorecard');
  scoreCard.innerHTML = '';
  scores.result.forEach((entry) => {
    const div = document.createElement('div');
    div.innerHTML = `<span>Name: </span><span>${entry.score}</span>`;
    scoreCard.appendChild(div);
  });
});

// Event listener for submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', async () => {
  const gameId = 'FortuneuzodinmA';
  const nameInput = document.querySelector('input[type="text"][placeholder="Your name"]');
  const scoreInput = document.querySelector('input[type="text"][placeholder="Your score"]');
  const user = nameInput.value;
  const score = Number(scoreInput.value);
  const result = await submitScore(gameId, user, score);
  console.log(result); 
  nameInput.value = '';
  scoreInput.value = '';
});


