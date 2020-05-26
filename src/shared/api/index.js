const SERVER_URL = 'http://13.238.207.250:5000'; //Live URL
const API_VERSION = '/v1';

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/user/login',
    REGISTER_USER: SERVER_URL + API_VERSION + '/user/register',
    SOCIAL_LOGIN: SERVER_URL + API_VERSION + '/user/social-login',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/user/forgot-password',
    POPULAR_PLACES: SERVER_URL + API_VERSION + '/listing/popular_places',
    VEHICLE_LISTING: SERVER_URL + API_VERSION + '/listing',
    FUEL_LISTING: SERVER_URL + API_VERSION + '/fuel',
    TRANSMISSION_LISTING: SERVER_URL + API_VERSION + '/vehicle/transmissions',
    VEHICLE_TYPE_LISTING: SERVER_URL + API_VERSION + '/vehicleType',
    VEHICLE_DETAILS: SERVER_URL + API_VERSION + '/listingByID​',
    FAQ_LIST: SERVER_URL + API_VERSION + '/faq',
  },
};
