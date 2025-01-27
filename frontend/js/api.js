const API_URL = 'http://localhost:5000/api';

async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

async function createReview(token, reviewData) {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  return response.json();
}

async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  return response.json();
}
