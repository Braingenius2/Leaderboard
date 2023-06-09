import './style.css';

// Base URL for Leaderboard API
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

// Function to handle API requests
const sendRequest = async (url, method = 'GET', data = {}) => {
  try {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add the body only for non-GET requests
    if (method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Request failed.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    // Display error message in feedback element
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `${error.message}`;
  }

  // To adhere to consistent-return
  return null;
};

// Get scores for a specific game
const getScores = async (gameId) => {
  const url = `${baseURL}games/${gameId}/scores/`;
  const result = await sendRequest(url);
  return result;
};

// Submit a new score for a specific game
const submitScore = async (gameId, user, score) => {
  const url = `${baseURL}games/${gameId}/scores/`;
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
    div.innerHTML = `<span>${entry.user}: </span><span>${entry.score}</span>`;
    scoreCard.appendChild(div);
  });
});

// Event listener for submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', async () => {
  const gameId = 'FortuneuzodinmA';
  const nameInput = document.getElementById('name-input');
  const scoreInput = document.getElementById('score-input');
  const user = nameInput.value;
  const score = Number(scoreInput.value);
  const result = await submitScore(gameId, user, score);
  nameInput.value = '';
  scoreInput.value = '';

  // Display success status in feedback element
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `${result.result}`;
});
