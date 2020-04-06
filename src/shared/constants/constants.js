const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const { STRINGS } = require(`./us/strings`);


export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z ]+$/;

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
  VALUE_CANNOT_BE_EMPTY_SPACES: STRINGS.VALUE_CANNOT_BE_ONLY_SPACES
}