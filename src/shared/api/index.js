const SERVER_URL = process.env.REACT_APP_API_URL || 'https://f1624932.ngrok.io'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    REGISTER_USER: SERVER_URL + API_VERSION + '/user/register',
    SOCIAL_LOGIN: SERVER_URL + API_VERSION + '/user/social-login',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/user/forgot-password'
  }
};