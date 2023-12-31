// Base URL for the API
const BASE_URL = "http://localhost:3001/api/v1";

const fetchAPI = {
  // Function for user login
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  },

  // Function for user signup
  signup: async (email, password, firstName, lastName) => {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    return response.json();
  },

  // Function to get user profile information
  getProfile: async (token) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  // Function to update user profile information
  updateProfile: async (token, { firstName, lastName }) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    return response.json();
  },
};

export default fetchAPI;
