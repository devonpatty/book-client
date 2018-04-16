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

      return resolve({ loggedIn: true, user, token });
    })
    .catch((err) => {
      if (err.response) {
        const {
          error,
        } = err.response.data;
        return resolve({ loggedIn: false, error });
      }
    });
  });
}

function register(username, password, name) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseurl}register`, {
      username,
      password,
      name,
    })
    .then((response) => {
      return resolve({ success: true, data: response });
    })
    .catch((err) => {
      if ( err.response) {
        const {
          error,
        } = err.response.data;
        return resolve({ success: false, error });
      }
    });
  });
}

function updateName(name, password) {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    console.log(typeof token, typeof parsedToken);
    axios({
      method: 'patch',
      url: `${baseurl}users/me`,
      data: {
        name,
        password,
      },
      headers: { Authorization: `Bearer ${parsedToken}` },
    })
    .then((response) => {
      return resolve({ response });
    })
    .catch((err) => {
      if (err.response) {
        const {
          error,
        } = err.response.data;
        return resolve({ error });
      }
    });
  });
}

function updatePicture(pic) {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    axios.post(
      `${baseurl}users/me/profile`,
      pic,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      },
    )
    .then((response) => {
      const { secure_url } = response.data;
      return resolve({ secure_url });
    })
    .catch((err) => {
      if (err.response) {
        const {
          error,
        } = err.response.data;
        return resolve({ error });
      }
    });
  });
}

function getMe() {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);

    axios.get(
      `${baseurl}users/me`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      },
    )
    .then((response) => {
      const { url } = response.data;
      return resolve({ url });
    })
    .catch((error) => {
      return resolve({ error });
    });
  });
}

export default {
  get,
  login,
  register,
  updateName,
  updatePicture,
  getMe,
};
