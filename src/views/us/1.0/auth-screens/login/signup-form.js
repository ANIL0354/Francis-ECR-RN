import React, { useState } from "react";
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
        <React.Fragment>
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
                        changeField('signup', STRINGS.COUNTRY_CODE_INPUT, value)
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
                checkedIcon={CHECKBOX_ACTIVE}
                uncheckedIcon={CHECKBOX_ICON}
            />
            <Text style={{ textAlign: 'center', marginTop: -10 }}>{'Or Connect With'}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10
            }}>
                <Button
                    icon={<Image source={GOOGLE_ICON} style={{ marginLeft: 10 }} height={50} width={50} />}
                    titleStyle={{
                        textAlign: 'center',
                        flexWrap: 'wrap',
                        margin: 0,
                        padding: 10,
                    }}
                    iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                    buttonStyle={{
                        backgroundColor: '#4c8bf5',
                        justifyContent: 'space-evenly',
                        height: 30,
                        maxWidth: 150,
                        minWidth: 150,
                        minHeight: 50,
                        marginVertical: 5
                    }}
                    title={'Log In with Google'} onPress={googleAuth} />
                <Button
                    icon={<Image source={FACEBOOK_ICON} style={{ marginLeft: 10 }} height={50} width={50} />}
                    titleStyle={{
                        textAlign: 'center',
                        flexWrap: 'wrap',
                    }}
                    iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                    buttonStyle={{
                        backgroundColor: '#3b5998',
                        justifyContent: 'space-evenly',
                        height: 30,
                        maxWidth: 150,
                        minWidth: 150,
                        minHeight: 50,
                        marginVertical: 5
                    }}
                    title={'Log In with Facebook'} onPress={facebookAuth} />

            </View>
            <Image source={DIVIDING_LINE} style={{ width: '100%', height: 2, marginVertical: 15 }} />
            <Button
                titleStyle={{
                    textAlign: 'center',
                    flexWrap: 'wrap',
                }}
                buttonStyle={{ backgroundColor: '#009000', maxWidth: 200, minWidth: 200, alignSelf: 'flex-end' }}
                title={STRINGS.SIGNUP} onPress={handleSubmit(onSubmit)} />

        </React.Fragment>
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