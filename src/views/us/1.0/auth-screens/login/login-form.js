import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { Button, View } from "react-native";
import Captcha from '../../../../../components/atoms/Captcha';
import { STRINGS } from "../../../../../shared/constants/us/strings";
const { onSubmitFail } = require(`../../../../../helpers`);

const Form = ({
    handleSubmit,
    onSubmit,
}) => {
    return (
        <View>
            <Field
                name={STRINGS.EMAIL_INPUT_NAME}
                component={CustomFormInput}
                placeholder={STRINGS.LOGIN_EMAIL_PLACEHOLDER}
                returnKeyType={'next'}
            />
            <Field
                name={STRINGS.PASSWORD_INPUT_NAME}
                component={CustomFormInput}
                secureTextEntry={true}
                returnKeyType={'go'}
                placeholder={STRINGS.LOGIN_PASSWORD_PLACEHOLDER}
            />
            {/* <Captcha /> */}
            <Button title={STRINGS.LOGIN} onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
}

const reduxFormFunction = reduxForm({
    form: "login",
    fields: ['email', 'password'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const LoginForm = connect(mapStateToProps, null)(reduxFormFunction);