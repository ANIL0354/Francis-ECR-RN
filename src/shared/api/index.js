const SERVER_URL = 'http://3.230.70.17:4000'; //Live URL
const API_VERSION = '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/user/login',
    REGISTER_USER: SERVER_URL + API_VERSION + '/user/register',
    SOCIAL_LOGIN: SERVER_URL + API_VERSION + '/user/social-login',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/user/forgot-password'
  }
};