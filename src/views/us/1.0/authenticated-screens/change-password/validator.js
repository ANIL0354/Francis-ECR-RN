/* eslint-disable prettier/prettier */
const { STRINGS } = require('../../../../../shared/constants/us/strings');
const { VALIDATION_MESSAGES, EMAIL_REGX, PHONE_REGX, NAME_REGX } = require('../../../../../shared/constants')

const validator = values => {
    const errors = {};
    if (!values[STRINGS.CURRENT_INPUT_NAME]) {
        errors[STRINGS.CURRENT_INPUT_NAME] =
            VALIDATION_MESSAGES.CURRENT_PASSWORD_REQUIRED;
    }
    if (values[STRINGS.CURRENT_INPUT_NAME] && !(values[STRINGS.CURRENT_INPUT_NAME].trim())) {
        errors[STRINGS.CURRENT_INPUT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (values[STRINGS.CURRENT_INPUT_NAME] && (values[STRINGS.CURRENT_INPUT_NAME].length < 6)) {
        errors[STRINGS.CURRENT_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_LENGTH_ERROR;
    }
    if (!values[STRINGS.NEW_PASSWORD_INPUT_NAME]) {
        errors[STRINGS.NEW_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.NEW_PASSWORD_REQUIRED;
    }
    if (values[STRINGS.NEW_PASSWORD_INPUT_NAME] && !(values[STRINGS.NEW_PASSWORD_INPUT_NAME].trim())) {
        errors[STRINGS.NEW_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (values[STRINGS.NEW_PASSWORD_INPUT_NAME] && (values[STRINGS.NEW_PASSWORD_INPUT_NAME].length < 6)) {
        errors[STRINGS.NEW_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_LENGTH_ERROR;
    }
    if (!values[STRINGS.RE_PASSWORD_INPUT_NAME]) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.RE_ENTER_PASSWORD;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && !(values[STRINGS.RE_PASSWORD_INPUT_NAME].trim())) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && (values[STRINGS.RE_PASSWORD_INPUT_NAME].length < 6)) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_LENGTH_ERROR;
    }
    if (values[STRINGS.RE_PASSWORD_INPUT_NAME] && values[STRINGS.NEW_PASSWORD_INPUT_NAME] && (values[STRINGS.NEW_PASSWORD_INPUT_NAME] !== values[STRINGS.RE_PASSWORD_INPUT_NAME])) {
        errors[STRINGS.RE_PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_DOESNOT_MATCH;
    }

    return errors;
};

export default validator;
