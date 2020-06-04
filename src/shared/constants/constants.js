/* eslint-disable prettier/prettier */
import {
  CAR,
  FUEL_ACTIVE,
  FUEL_INACTIVE,
  SEAT_ACTIVE,
  SEAT_INACTIVE,
  VEHICLE_ACTIVE,
  VEHICLE_INACTIVE,
  TRANSMISSION_ACTIVE,
  TRANSMISSION_INACTIVE,
  FREE_ACTIVE,
  FREE_INACTIVE
} from './icons';
import {
  NORMAL_CAR,
  PASSENGER_CAR,
  RECREATIONAL_CAR,
  TRUCKS,
  BIG_NORMAL_CAR
} from './images';
const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const { STRINGS } = require(`./us/strings`);

export const GOOGLE_API_KEY = 'AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k';

export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z ]+$/;
export const PHONE_REGX = /^[0-9]+$/;

export const GOOGLE_SIGNIN_WEB_CLIENT_ID = '18046953276-ueflo8kmoukhc0cdbqvv1b34f4gr69s4.apps.googleusercontent.com';

export const KEY_CODES = {
  enterKey: 13,
  nine: 57,
  zero: 48,
  backSpace: 8,
};

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: STRINGS.EMAIL_IS_REQUIRED,
  PASSWORD_REQUIRED: STRINGS.PASSWORD_IS_REQUIRED,
  EMAIL_INVALID: STRINGS.EMAIL_IS_INVALID,
  NAME_REQUIRED: STRINGS.NAME_IS_REQUIRED,
  SURNAME_REQUIRED: STRINGS.SURNAME_IS_REQUIRED,
  DOB_REQUIRED: STRINGS.DOB_IS_REQUIRED,
  CITY_REQUIRED: STRINGS.CITY_IS_REQUIRED,
  COUNTRY_REQUIRED: STRINGS.COUNTRY_IS_REQUIRED,
  RE_ENTER_PASSWORD: STRINGS.RE_ENTER_PASSWORD,
  PASSWORD_LENGTH_ERROR: STRINGS.PASSWORD_LENGTH_ERROR,
  PASSWORD_DOESNOT_MATCH: STRINGS.PASSWORD_DOESNOT_MATCH,
  COUNTRY_CODE_REQUIRED: STRINGS.COUNTRY_CODE_REQUIRED,
  PHONE_NUMBER_REQUIRED: STRINGS.PHONE_NUMBER_REQUIRED,
  PHONE_INVALID: STRINGS.PHONE_INVALID,
  VALUE_CANNOT_BE_EMPTY_SPACES: STRINGS.VALUE_CANNOT_BE_ONLY_SPACES,
  CURRENT_PASSWORD_REQUIRED: STRINGS.CURRENT_PASSWORD_REQUIRED,
  NEW_PASSWORD_REQUIRED: STRINGS.NEW_PASSWORD_REQUIRED,
  SUBJECT_REQUIRED: STRINGS.SUBJECT_REQUIRED,
  BODY_REQUIRED: STRINGS.BODY_REQUIRED,
};

export const APP_MESSAGES = {
  INTERNET_IS_TURNED_OFF: STRINGS.INTERNET_IS_TURNED_OFF,
  LOCATION_PERMISSION_REQUIRED: STRINGS.LOCATION_PERMISSION_REQUIRED,
  DEVICE_GPS_TURNED_OFF: STRINGS.DEVICE_GPS_TURNED_OFF,
  YOU_APPEARS_TO_BE_OFFLINE: STRINGS.YOU_APPEARS_TO_BE_OFFLINE,
  REQUEST_LOCATION_DETECTION_PERMISSION: `${STRINGS.ALLOW} ${STRINGS.APP_NAME} ${STRINGS.TO_DETECT_CURRENT_LOCATION}`,
  REQUEST_TO_TURN_GPS_ON: `${STRINGS.ALLOW} ${STRINGS.APP_NAME} ${STRINGS.TO_TURN_ON_GPS}`,
  TO_ENABLE_GO_TO_SETTINGS: STRINGS.TO_ENABLE_GO_TO_SETTINGS,
  OPEN_SETTINGS: STRINGS.OPEN_SETTINGS,
  ALLOW_PERMISSION: STRINGS.ALLOW_PERMISSION,
  TURN_ON_GPS: STRINGS.TURN_ON_GPS,
};

export const LABELS = {
  loginOrRegister: STRINGS.LOGIN_OR_REGISTER,
  iAmNew: STRINGS.I_AM_NEW,
  login: STRINGS.LOGIN,
  forgotPassword: STRINGS.FORGOT_PASSWORD,
  orConnectWith: STRINGS.OR_CONNECT_WITH,
  loginWith: STRINGS.LOGIN_WITH,
  google: STRINGS.GOOGLE,
  loginWithFacebook: `${STRINGS.LOGIN_WITH} ${STRINGS.FACEBOOK}`,
  subscriptionText: STRINGS.SUBSCRIPTION_TEXT,
  forgotPasswordHeader: STRINGS.FORGOT_PASSWORD_LABEL,
  checkYourMail: STRINGS.CHECK_YOUR_MAIL,
  resetPasswordLinkSent: STRINGS.RESET_PASSWORD_LINK_SENT,
  didNotReceiveLink: STRINGS.DID_NOT_RECEIVE_LINK,
  resend: STRINGS.RESEND,
  weWillSendEmail: STRINGS.WE_WILL_SEND_EMAIL,
  yourRequest: STRINGS.YOUR_REQUEST,
  profile: STRINGS.PROFILE,
  changePassword: STRINGS.CHANGE_PASSWORD,
  ratings: STRINGS.RATINGS,
  trips: STRINGS.TRIPS,
  ratingsDetails: STRINGS.RATING_DETAILS,
  tripDetails: STRINGS.TRIP_DETAILS,
  cancelReservation: STRINGS.CANCEL_RESERVATION,
  emailAgency: STRINGS.EMAIL_AGENCY,
  sendEmail: STRINGS.SEND_EMAIL,
  rateTrip: STRINGS.RATE_TRIP,
  howWasYourTrip: STRINGS.HOW_WAS_YOUR_TRIP,
};

export const STATUS_CODE = {
  successful: 200,
  unAuthorized: 401,
};

export const FILTER_OPTIONS = [
  {
    title: 'Fuel Options',
    activeIcon: FUEL_ACTIVE,
    inactiveIcon: FUEL_INACTIVE,
  },
  {
    title: 'Number of Seats',
    activeIcon: SEAT_ACTIVE,
    inactiveIcon: SEAT_INACTIVE,
  },
  {
    title: 'Vehicle Type',
    activeIcon: VEHICLE_ACTIVE,
    inactiveIcon: VEHICLE_INACTIVE,
  },
  {
    title: 'Transmission Options',
    activeIcon: TRANSMISSION_ACTIVE,
    inactiveIcon: TRANSMISSION_INACTIVE,
  },
  {
    title: 'Free Days',
    activeIcon: FREE_ACTIVE,
    inactiveIcon: FREE_INACTIVE,
  },
];

export const FUEL_OPTIONS = [
  { title: 'Petrol' },
  { title: 'Diesel' },
  { title: 'Electric' },
];

export const TRANSMISSION_OPTIONS = [
  { title: 'Automatic' },
  { title: 'Manual' },
];

export const VEHICLE_TYPE_OPTIONS = [
  { title: 'Cars' },
  { title: 'Passenger Vans' },
  { title: 'Recreational Vehicles' },
  { title: 'Trucks & Vans' },
];

export const POPULAR_PLACES_DATA = [
  {
    id: '1',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  }, {
    id: '2',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  }, {
    id: '3',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  }, {
    id: '4',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  },
  {
    id: '5',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  },
  {
    id: '6',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All',
  },
];

export const VEHICLE_TYPE_LISTING = [
  {
    id: '1',
    title: 'Cars',
    icon: NORMAL_CAR,
  },
  {
    id: '2',
    title: 'Passenger Vans',
    icon: PASSENGER_CAR,
  },
  {
    id: '3',
    title: 'Recreational Vehicles',
    icon: RECREATIONAL_CAR,
  },
  {
    id: '4',
    title: 'Trucks & Vans',
    icon: TRUCKS,
  },
];

export const VEHICLE_DETAILS_LISTING = [
  {
    id: '1',
    title: 'Hatch Back - Medium Size',
    carImage: BIG_NORMAL_CAR,
    freeDays: 2,
    pickupLocation: 'Auckland Airport',
    dropoffLocation: 'Wellington Airport',
    seats: 5,
    luggageCapacity: 4,
    doors: 5,
    conditioning: 'Air Conditioning',
    transmission: 'Automatic',
    includes: 'Unlimited kms, free tank of fuel and standard insurance',
  },
  {
    id: '2',
    title: 'Passenger Vans',
    carImage: BIG_NORMAL_CAR,
    freeDays: 1,
    pickupLocation: 'Auckland Airport',
    dropoffLocation: 'Wellington Airport',
    seats: 5,
    luggageCapacity: 3,
    doors: 10,
    conditioning: 'Non-Air Conditioning',
    transmission: 'Manual',
    includes: 'Unlimited kms, free tank of fuel and standard insurance',
  },
  {
    id: '3',
    title: 'Recreational Vehicles',
    carImage: BIG_NORMAL_CAR,
    freeDays: 5,
    pickupLocation: 'Auckland Airport',
    dropoffLocation: 'Wellington Airport',
    seats: 5,
    luggageCapacity: 2,
    doors: 5,
    conditioning: 'Air Conditioning',
    transmission: 'Automatic',
    includes: 'Unlimited kms, free tank of fuel and standard insurance',
  },
  {
    id: '4',
    title: 'Trucks & Vans',
    carImage: BIG_NORMAL_CAR,
    freeDays: 2,
    pickupLocation: 'Auckland Airport',
    dropoffLocation: 'Wellington Airport',
    seats: 5,
    luggageCapacity: 5,
    doors: 2,
    conditioning: 'Air Conditioning',
    transmission: 'Automatic',
    includes: 'Unlimited kms, free tank of fuel and standard insurance',
  },
];

export const LIMITS = {
  vehicleList: 10,
};

export const FREQUENCY = [
  { label: 'per day' },
  { label: 'per hire' },
];

export const USER_TYPES = {
  driver: 1,
};
