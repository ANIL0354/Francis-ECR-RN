const SERVER_URL = process.env.REACT_APP_API_URL || 'https://8ec4aeb2.ngrok.io'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    REGISTER_USER: SERVER_URL + API_VERSION + '/user/register'
  }
};