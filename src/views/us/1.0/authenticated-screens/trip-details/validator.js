/* eslint-disable prettier/prettier */
const { STRINGS } = require(`../../../../../shared/constants/us/strings`);

const { VALIDATION_MESSAGES } = require(`../../../../../shared/constants`);

const validator = values => {
    const errors = {};
    if (!values[STRINGS.EMAIL_SUBJECT_NAME]) {
        errors[STRINGS.EMAIL_SUBJECT_NAME] =
            VALIDATION_MESSAGES.SUBJECT_REQUIRED;
    }
    if (values[STRINGS.EMAIL_SUBJECT_NAME] && !(values[STRINGS.EMAIL_SUBJECT_NAME].trim())) {
        errors[STRINGS.EMAIL_SUBJECT_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (!values[STRINGS.EMAIL_BODY_NAME]) {
        errors[STRINGS.EMAIL_BODY_NAME] =
            VALIDATION_MESSAGES.BODY_REQUIRED;
    }
    if (values[STRINGS.EMAIL_BODY_NAME] && !(values[STRINGS.EMAIL_BODY_NAME].trim())) {
        errors[STRINGS.EMAIL_BODY_NAME] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    return errors;
};

export default validator;
