const SERVER_URL = 'https://api.easycarrelo.co.nz'; //Live URL
// test server: http://13.238.207.250:5000
// live server: https://api.easycarrelo.co.nz
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
    PROFILE: SERVER_URL + API_VERSION + '/driver/profile',
    CHANGE_PASSWORD: SERVER_URL + API_VERSION + '/user/change-password',
    COMPLETE_USER_PROFILE: SERVER_URL + API_VERSION + '/user/complete-profile',
    FETCH_UPCOMING_TRIPS: SERVER_URL + API_VERSION + '/driver/upcoming-trips',
    FETCH_PAST_TRIPS: SERVER_URL + API_VERSION + '/driver/past-trips',
    FETCH_RATINGS_LIST: SERVER_URL + API_VERSION + '/driver/ratings',
    EMAIL_AGENCY: SERVER_URL + API_VERSION + '/driver/email-to-agency',
    CANCELLED_TRIPS: SERVER_URL + API_VERSION + '/listing/cancelled-trips',
  },
};
