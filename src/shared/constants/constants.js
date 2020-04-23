import { CAR } from './icons';
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
  { title: 'Electric' },
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
];

export const VEHICLE_TYPE_LISTING = [
  {
    id: '1',
    title: 'Cars',
    icon: NORMAL_CAR
  },
  {
    id: '2',
    title: 'Passenger Vans',
    icon: PASSENGER_CAR
  },
  {
    id: '3',
    title: 'Recreational Vehicles',
    icon: RECREATIONAL_CAR
  },
  {
    id: '4',
    title: 'Trucks & Vans',
    icon: TRUCKS
  }
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
    includes: 'Unlimited kms, free tank of fuel and standard insuarance'
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
    includes: 'Unlimited kms, free tank of fuel and standard insuarance'
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
    includes: 'Unlimited kms, free tank of fuel and standard insuarance'
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
    includes: 'Unlimited kms, free tank of fuel and standard insuarance'
  }
];

export const LIMITS = {
  vehicleList: 6,
};
