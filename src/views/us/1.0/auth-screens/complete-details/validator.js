const { STRINGS } = require(`../../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, PHONE_REGX } = require(`../../../../../shared/constants`)

const validator = values => {
    const errors = {};
    if (!values[STRINGS.EMAIL_INPUT_NAME]) {
        errors[STRINGS.EMAIL_INPUT_NAME] =
            VALIDATION_MESSAGES.EMAIL_REQUIRED;
    } else if (
        !EMAIL_REGX.test(
            values[STRINGS.EMAIL_INPUT_NAME].toLowerCase()
        )
    ) {
        errors[STRINGS.EMAIL_INPUT_NAME] =
            VALIDATION_MESSAGES.EMAIL_INVALID;
    }
    if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }
    if (values[STRINGS.PASSWORD_INPUT_NAME] && (values[STRINGS.PASSWORD_INPUT_NAME].length < 6 || values[STRINGS.PASSWORD_INPUT_NAME].length > 8)) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_LENGTH_ERROR;
    }
    if (values[STRINGS.PASSWORD_INPUT_NAME] && !(values[STRINGS.PASSWORD_INPUT_NAME].trim())) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (!values[STRINGS.NAME_INPUT]) {
        errors[STRINGS.NAME_INPUT] =
            VALIDATION_MESSAGES.NAME_REQUIRED;
    }
    if (values[STRINGS.NAME_INPUT] && !(values[STRINGS.NAME_INPUT].trim())) {
        errors[STRINGS.NAME_INPUT] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (!values[STRINGS.SURNAME_INPUT]) {
        errors[STRINGS.SURNAME_INPUT] =
            VALIDATION_MESSAGES.SURNAME_REQUIRED;
    }
    if (values[STRINGS.SURNAME_INPUT] && !(values[STRINGS.SURNAME_INPUT].trim())) {
        errors[STRINGS.SURNAME_INPUT] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (!values[STRINGS.DOB_INPUT]) {
        errors[STRINGS.DOB_INPUT] =
            VALIDATION_MESSAGES.DOB_REQUIRED;
    }
    if (!values[STRINGS.CITY_INPUT]) {
        errors[STRINGS.CITY_INPUT] =
            VALIDATION_MESSAGES.CITY_REQUIRED;
    }
    if (values[STRINGS.CITY_INPUT] && !(values[STRINGS.CITY_INPUT].trim())) {
        errors[STRINGS.CITY_INPUT] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (!values[STRINGS.COUNTRY_INPUT]) {
        errors[STRINGS.COUNTRY_INPUT] =
            VALIDATION_MESSAGES.COUNTRY_REQUIRED;
    }
    if (values[STRINGS.COUNTRY_INPUT] && !(values[STRINGS.COUNTRY_INPUT].trim())) {
        errors[STRINGS.COUNTRY_INPUT] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    } if (!values[STRINGS.COUNTRY_CODE_INPUT]) {
        errors[STRINGS.COUNTRY_CODE_INPUT] =
            VALIDATION_MESSAGES.COUNTRY_CODE_REQUIRED;
    }
    if (!values[STRINGS.PHONE_NUMBER]) {
        errors[STRINGS.PHONE_NUMBER] =
            VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED;
    } else if (
        !PHONE_REGX.test(
            values[STRINGS.PHONE_NUMBER].toLowerCase()
        )
    ) {
        errors[STRINGS.PHONE_NUMBER] =
            VALIDATION_MESSAGES.PHONE_INVALID;
    }
    if (values[STRINGS.PHONE_NUMBER] && (values[STRINGS.PHONE_NUMBER].length < 7 || values[STRINGS.PHONE_NUMBER].length > 15)) {
        errors[STRINGS.PHONE_NUMBER] = 'Phone no. must be 7-15 characters long.'
    }
    if (!values[STRINGS.RE_PASSWORD_INPUT_NAME]) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.RE_ENTER_PASSWORD;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && !(values[STRINGS.RE_PASSWORD_INPUT_NAME].trim())) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && (values[STRINGS.RE_PASSWORD_INPUT_NAME].length < 6 || values[STRINGS.RE_PASSWORD_INPUT_NAME].length > 8)) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_LENGTH_ERROR;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && values[STRINGS.PASSWORD_INPUT_NAME] && (values[STRINGS.PASSWORD_INPUT_NAME] !== values[STRINGS.RE_PASSWORD_INPUT_NAME])) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_DOESNOT_MATCH;
    }

    return errors;
};

export default validator;
