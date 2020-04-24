const SERVER_URL = 'https://13.238.207.250:5001'; //Live URL
const API_VERSION = '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/user/login',
    REGISTER_USER: SERVER_URL + API_VERSION + '/user/register',
    SOCIAL_LOGIN: SERVER_URL + API_VERSION + '/user/social-login',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/user/forgot-password',
    POPULAR_PLACES: SERVER_URL + API_VERSION + '/listing/popular_places',
    VEHICLE_LISTING: SERVER_URL + API_VERSION + '/listing'
  }
};