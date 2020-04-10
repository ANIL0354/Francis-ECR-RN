import React, { useState } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { Button } from 'react-native-elements';
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, Platform } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CountryCodePicker from '../../../../../components/atoms/CountryCodePicker';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import Checkbox from '../../../../../components/atoms/Checkbox';
import { CHECKBOX_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import styles from './style';

const Form = ({
    handleSubmit,
    onSubmit,
    changeField,
    googleAuth,
    facebookAuth,
    subscribed,
    saveDateString,
    setSubscribed
}) => {
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
                        console.warn('date', date);
                        changeField('signup', STRINGS.DOB_INPUT, date)
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
                        console.warn('country code', value);
                        changeField('signup', STRINGS.COUNTRY_CODE_INPUT, value)
                    }}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                />
                <Field
                    name={STRINGS.PHONE_NUMBER}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'next'}
                    keyboardType={'phone-pad'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.PHONE_PLACEHOLDER}
                />
            </View>
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
                <Field
                    name={STRINGS.PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'next'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                />
                <Field
                    name={STRINGS.RE_PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    style={{ minWidth: 150, maxWidth: 150 }}
                    placeholder={STRINGS.RE_PASSWORD_PLACEHOLDER}
                />
            </View>

            <Checkbox
                title={'Subscribe for news and promotions.'}
                toggleCheck={() => setSubscribed(!subscribed)}
                checked={subscribed}
                checkedIcon={CHECKBOX_ICON}
                uncheckedIcon={CHECKBOX_ICON}
            />
            <Text style={{ textAlign: 'center', marginTop: -10 }}>{'Or Connect With'}</Text>
            {/* <View style={{ flexDirect: 'row', justifyContent: 'space-between', padding: 5 }}> */}
            <Button
                icon={<Image source={GOOGLE_ICON} height={50} width={50} />}
                titleStyle={{ textAlign: 'center' }}
                iconContainerStyle={styles.iconContainerStyle}
                buttonStyle={styles.socialButton}
                title={'Sign Up with Google'} onPress={googleAuth} />
            <Button
                icon={<Image source={FACEBOOK_ICON} height={50} width={50} />}
                titleStyle={{ textAlign: 'center' }}
                iconContainerStyle={styles.iconContainerStyle}
                buttonStyle={styles.socialButton}
                title={'Sign Up with Facebook'} onPress={facebookAuth} />
            {/* </View> */}
            <Button title={STRINGS.SIGNUP} onPress={handleSubmit(onSubmit)} />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state, props) => {
    return {
    };
}

const reduxFormFunction = reduxForm({
    form: "signup",
    fields: ['email', 'password'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const SignupForm = connect(mapStateToProps, { changeField })(reduxFormFunction);