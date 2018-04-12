import axios from 'axios';

const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {

  const token = window.localStorage.getItem('token');

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {},
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  /* todo framkvæma get */
}

/* todo aðrar aðgerðir */

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseurl}login`, { 
      username, 
      password, 
    })
    .then((response) => {
      const user = username;
      const token = response.data.token;

      return setTimeout(() => resolve({ loggedIn: true, user, token }), 1000);
    })
    .catch((err) => {
      if (err.response) {
        const {
          error,
        } = err.response.data;
        return setTimeout(() => resolve({ loggedIn: false, error }), 500);
      }
    });
  });
}

export default {
  get,
  login,
};
