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
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
                <Field
                    name={STRINGS.NAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.NAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
                <Field
                    name={STRINGS.SURNAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
            </View>

            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
                <Field
                    name={STRINGS.DOB_INPUT}
                    component={CustomDatePicker}
                    placeholder={STRINGS.DOB_PLACEHOLDER}
                    returnKeyType={'next'}
                    onDateChange={(date) => {
                        changeField('details', STRINGS.DOB_INPUT, date)
                    }}
                    saveDateString={(date) => {
                        saveDateString(date)
                    }}
                    maxDate={new Date(maxDate)}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
                <Field
                    name={STRINGS.CITY_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.CITY_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
            </View>

            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
                <Field
                    name={STRINGS.COUNTRY_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.COUNTRY_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={CustomFormInput}
                    editable={email ? false : true}
                    placeholder={STRINGS.EMAIL_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                />
            </View>
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
                <Field
                    name={STRINGS.COUNTRY_CODE_INPUT}
                    component={CountryCodePicker}
                    setCallingCode={(value) => {
                        // console.warn('country code', value);
                        changeField('details', STRINGS.COUNTRY_CODE_INPUT, value)
                    }}
                    returnKeyType={'go'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                />
                <Field
                    name={STRINGS.PHONE_NUMBER}
                    component={CustomFormInput}
                    returnKeyType={'next'}
                    keyboardType={'phone-pad'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.PHONE_PLACEHOLDER}
                />
            </View>

            <Checkbox
                title={'Subscribe for news and promotions.'}
                toggleCheck={() => setSubscribed(!subscribed)}
                checked={subscribed}
                checkedIcon={CHECKBOX_ICON}
                uncheckedIcon={CHECKBOX_ICON}
            />

            <Button title={STRINGS.SAVE} onPress={handleSubmit(onSubmit)} />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
}

const reduxFormFunction = reduxForm({
    form: "details",
    // fields: ['email', 'password'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const DetailsForm = connect(mapStateToProps, { changeField })(reduxFormFunction);