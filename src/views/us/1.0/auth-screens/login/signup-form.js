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
import { CHECKBOX_ICON, CHECKBOX_ACTIVE, GOOGLE_ICON, FACEBOOK_ICON, DIVIDING_LINE } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import { scaleText } from "../../../../../helpers";

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
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
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

            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
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

            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
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
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
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
            <View style={{ flexDirection: 'row', minWidth: '100%', justifyContent: 'space-between', }}>
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
                title={'Subscribe for news and promotions.'}
                toggleCheck={() => setSubscribed(!subscribed)}
                checked={subscribed}
                checkedIcon={CHECKBOX_ACTIVE}
                uncheckedIcon={CHECKBOX_ICON}
            />
            <Text style={{ textAlign: 'center', marginBottom: 20, marginTop: 15, color: 'black' }}>{'Or Connect with'}</Text>
            <View style={{ flexDirection: 'row', padding: scaleText(10).fontSize }}>
                <TouchableOpacity onPress={googleAuth} style={{ backgroundColor: '#4c8bf5', marginRight: scaleText(20).fontSize, flexDirection: 'row', flex: 1, alignItems: 'center', padding: scaleText(10).fontSize, borderRadius: 5 }}>
                    <Image source={GOOGLE_ICON} style={{ marginRight: scaleText(5).fontSize }} height={scaleText(30).fontSize} width={scaleText(30).fontSize} />
                    <Text style={{ flex: 1, maxWidth: scaleText(120).fontSize, paddingHorizontal: scaleText(20).fontSize, alignSelf: 'center', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: scaleText(13).fontSize }}>Log In with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={facebookAuth} style={{ backgroundColor: '#3b5998', flexDirection: 'row', flex: 1, alignItems: 'center', padding: scaleText(10).fontSize, borderRadius: 5 }}>
                    <Image source={FACEBOOK_ICON} style={{ marginRight: scaleText(5).fontSize }} height={scaleText(30).fontSize} width={scaleText(30).fontSize} />
                    <Text style={{ flex: 1, textAlign: 'center', alignSelf: 'center', color: 'white', fontWeight: '700', fontSize: scaleText(13).fontSize }}>Log In with Facebook</Text>
                </TouchableOpacity>
            </View>

            <Image source={DIVIDING_LINE} style={{ width: '100%', height: 1.5, marginVertical: 20 }} />
            <Button
                titleStyle={{
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    textTransform: 'uppercase'
                }}
                buttonStyle={{ backgroundColor: '#009000', maxWidth: 200, minWidth: 200, marginBottom: 30, alignSelf: 'flex-end' }}
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