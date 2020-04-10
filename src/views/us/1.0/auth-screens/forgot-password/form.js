import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { Button } from 'react-native-elements'
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, Platform } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CountryCodePicker from '../../../../../components/atoms/CountryCodePicker';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import Checkbox from '../../../../../components/atoms/Checkbox';
import { CHECKBOX_ICON, } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
const { onSubmitFail } = require(`../../../../../helpers`);

const Form = ({
    handleSubmit,
    onSubmit,
    changeField,
    email,
    name,
    surname,
    subscribed,
    saveDateString,
    setSubscribed
}) => {
    useEffect(() => {
        changeField('details', 'email', email);
        changeField('details', 'name', name);
        changeField('details', 'surname', surname);
    }, [name, email, surname])
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '628352863690-rktt99inolnqkp55rvojn8gi1fl7r1v7.apps.googleusercontent.com',
        offlineAccess: true,
        loginHint: '',
        forceCodeForRefreshToken: false,
    });
    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 16)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >

            <Field
                name={STRINGS.EMAIL_INPUT_NAME}
                component={CustomFormInput}
                placeholder={STRINGS.EMAIL_PLACEHOLDER}
                returnKeyType={'next'}
            />


            <Button title={STRINGS.SUBMIT} onPress={handleSubmit(onSubmit)} />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
}

const reduxFormFunction = reduxForm({
    form: "forgot",
    // fields: ['email', 'password'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const ForgotForm = connect(mapStateToProps, { changeField })(reduxFormFunction);