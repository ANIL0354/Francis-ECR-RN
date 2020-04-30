import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { Button } from 'react-native-elements';
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CountryCodePicker from '../../../../../components/atoms/CountryCodePicker';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import Checkbox from '../../../../../components/atoms/Checkbox';
import {
    CHECKBOX_ICON,
    CHECKBOX_ACTIVE,
    GOOGLE_ICON,
    FACEBOOK_ICON,
    DIVIDING_LINE,
    LABELS
} from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import { scaleText } from "../../../../../helpers";
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
    const maxDate = today.setFullYear(today.getFullYear() - 16);
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedCountryCode, setSelectedCountryCode] = useState('')

    return (
        <React.Fragment>
            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.NAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.NAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ width: scaleText(160).fontSize }}
                />
                <Field
                    name={STRINGS.SURNAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ width: scaleText(160).fontSize }}
                />
            </View>

            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.DOB_INPUT}
                    component={CustomDatePicker}
                    placeholder={STRINGS.DOB_PLACEHOLDER}
                    returnKeyType={'next'}
                    onDateChange={(date) => {
                        changeField('signup', STRINGS.DOB_INPUT, date)
                    }}
                    saveDateString={(date) => {
                        saveDateString(date)
                    }}
                    maxDate={new Date(maxDate)}
                    style={{ width: scaleText(160).fontSize }}
                />
                <Field
                    name={STRINGS.CITY_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.CITY_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ width: scaleText(160).fontSize }}
                />
            </View>

            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.COUNTRY_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    codeValue={selectedCountryCode}
                    setSelectedCountry={(value) => {
                        changeField('signup', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value)
                    }}
                    setCallingCode={(value) => {
                        changeField('signup', STRINGS.COUNTRY_CODE_INPUT, value);
                        setSelectedCountryCode(value);
                    }}
                    returnKeyType={'go'}
                    countryDrop={true}
                    placeholder={'Country'}
                    style={{ width: scaleText(160).fontSize }}
                />
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={CustomFormInput}
                    keyboardType={'email-address'}
                    placeholder={STRINGS.EMAIL_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ width: scaleText(160).fontSize }}
                />
            </View>
            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.COUNTRY_CODE_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    codeValue={selectedCountryCode}
                    setCallingCode={(value) => {
                        changeField('signup', STRINGS.COUNTRY_CODE_INPUT, value)
                        setSelectedCountryCode(value);
                    }}
                    setSelectedCountry={(value) => {
                        changeField('signup', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value);
                    }}
                    returnKeyType={'go'}
                    placeholder={'Country Code'}
                    style={{ width: scaleText(160).fontSize }}
                />
                <Field
                    name={STRINGS.PHONE_NUMBER}
                    component={CustomFormInput}
                    returnKeyType={'next'}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    style={{ width: scaleText(160).fontSize }}
                    placeholder={STRINGS.PHONE_PLACEHOLDER}
                />
            </View>
            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'next'}
                    maxLength={15}
                    style={{ width: scaleText(160).fontSize }}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                />
                <Field
                    name={STRINGS.RE_PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    maxLength={15}
                    style={{ width: scaleText(160).fontSize }}
                    placeholder={STRINGS.RE_PASSWORD_PLACEHOLDER}
                />
            </View>

            <Checkbox
                title={LABELS.subscriptionText}
                toggleCheck={() => setSubscribed(!subscribed)}
                checked={subscribed}
                checkedIcon={CHECKBOX_ACTIVE}
                uncheckedIcon={CHECKBOX_ICON}
            />
            <Text style={styles.connectWithText}>{LABELS.orConnectWith}</Text>

            <View style={{
                flexDirection: 'row',
                padding: scaleText(10).fontSize
            }}>
                <TouchableOpacity
                    onPress={googleAuth}
                    style={{
                        ...styles.googleButton,
                        padding: scaleText(10).fontSize,
                        marginRight: scaleText(20).fontSize,
                    }}>
                    <Image
                        source={GOOGLE_ICON}
                        style={{ marginRight: scaleText(5).fontSize }}
                        height={scaleText(30).fontSize}
                        width={scaleText(30).fontSize}
                    />
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{
                            ...styles.socialButtonTitle,
                            fontSize: scaleText(13).fontSize
                        }}>{LABELS.loginWith}</Text>
                        <Text style={{
                            ...styles.socialButtonTitle,
                            fontSize: scaleText(13).fontSize
                        }}>{LABELS.google}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={facebookAuth}
                    style={{
                        ...styles.facebookButton,
                        padding: scaleText(10).fontSize,
                    }}>
                    <Image
                        source={FACEBOOK_ICON}
                        style={{ marginRight: scaleText(5).fontSize }}
                        height={scaleText(30).fontSize}
                        width={scaleText(30).fontSize}
                    />
                    <Text style={{
                        ...styles.socialButtonTitle,
                        fontSize: scaleText(13).fontSize
                    }}>{LABELS.loginWithFacebook}</Text>
                </TouchableOpacity>
            </View>

            <Image source={DIVIDING_LINE} style={styles.dividingLine} />
            <Button
                titleStyle={styles.loginSubmitTitle}
                buttonStyle={styles.registerButtonStyle}
                title={STRINGS.SIGNUP} onPress={handleSubmit(onSubmit)} />

        </React.Fragment >
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