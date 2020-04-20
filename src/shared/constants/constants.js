import { CAR } from './icons';
const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const { STRINGS } = require(`./us/strings`);



export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z ]+$/;
export const PHONE_REGX = /^[0-9]+$/;

export const KEY_CODES = {
  enterKey: 13,
  nine: 57,
  zero: 48,
  backSpace: 8
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
  VALUE_CANNOT_BE_EMPTY_SPACES: STRINGS.VALUE_CANNOT_BE_ONLY_SPACES
};

export const STATUS_CODE = {
  successful: 200,
  unAuthorized: 401
};

export const FILTER_OPTIONS = [
  {
    title: 'Fuel Options'
  },
  {
    title: 'Number of Seats'
  },
  {
    title: 'Vehicle Type'
  },
  {
    title: 'Transmission Options'
  },
  {
    title: 'Free Days'
  }
];

export const FUEL_OPTIONS = [
  { title: 'Petrol' },
  { title: 'Diesel' },
  { title: 'CNG' },
  { title: 'Bio Diesel' }
];

export const VEHICLE_TYPE_OPTIONS = [
  { title: 'Cars' },
  { title: 'Passenger Vans' },
  { title: 'Recreational Vehicles' },
  { title: 'Trucks & Vans' }
];

export const TRANSMISSION_OPTIONS = [
  { title: 'Automatic' },
  { title: 'Manual' },
];

export const POPULAR_PLACES_DATA = [
  {
    id: '1',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  }, {
    id: '2',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  }, {
    id: '3',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  }, {
    id: '4',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  },
  {
    id: '5',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  },
  {
    id: '6',
    icon: CAR,
    availableCount: 29,
    placeRange: 'Wellington to Auckland',
    buttonText: 'See All'
  }
]