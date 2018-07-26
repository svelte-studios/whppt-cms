
// URL and endpoint constants
const LOGIN_URL = `/sessions/create/`;
const TEST_URL = `/sessions/test/`;
const SIGNUP_URL = `/users/`;

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    return axios.post(LOGIN_URL, creds).then((resp) => {
      localStorage.setItem('id_token', resp.data.id_token);
      localStorage.setItem('access_token', resp.data.access_token);
      return axios.get(TEST_URL).then(() => {
        this.user.authenticated = true;
      });
    });
  },

  signup(context, creds) {
    axios.post(SIGNUP_URL, creds, (resp) => {
      const headers = {
        authorization: `Bearer ${resp.data.access_token}`,
      };
      return axios.get(TEST_URL, { headers }).then(() => {
        localStorage.setItem('id_token', resp.data.id_token);
        localStorage.setItem('access_token', resp.data.access_token);
        this.user.authenticated = true;
      });
    });
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    this.user.authenticated = false;
  },

  // TODO: Check if expired and get a new token.
  checkAuth() {
    const jwt = localStorage.getItem('id_token');
    if (jwt)
      this.user.authenticated = true;
    else
      this.user.authenticated = false;
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
  },

};
