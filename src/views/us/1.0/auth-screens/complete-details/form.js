/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { reduxForm, Field, change as changeField } from "redux-form";
import { Button } from 'react-native-elements';
import { View, Dimensions, Text, Image } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CountryCodePicker from '../../../../../components/atoms/CountryCodePicker';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import {
    DIVIDING_LINE,
} from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import { scaleText } from "../../../../../helpers";
import styles from './style';

const Form = ({
    handleSubmit,
    onSubmit,
    changeField,
    initialValues,
    saveDateString,
}) => {
    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 16);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [portrait, setPortraitOrientation] = useState(true);

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            Dimensions.get('window').width > Dimensions.get('window').height
                ? setPortraitOrientation(false)
                : setPortraitOrientation(true);
        });
    }, []);

    useEffect(() => {
        let codeValue = initialValues['country-code'];
        if (codeValue) {
            codeValue = codeValue.replace(/^[+]/g, '');
            changeField('details', STRINGS.COUNTRY_CODE_INPUT, codeValue);
            setSelectedCountryCode(codeValue);
        }
        if (initialValues.country) {
            changeField('details', STRINGS.COUNTRY_INPUT, initialValues.country);
            setSelectedCountry(initialValues.country);
        }
    }, []);


    return (
        <React.Fragment>
            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.NAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.NAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ flex: 1, marginRight: scaleText(5).fontSize }}
                />
                <Field
                    name={STRINGS.SURNAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ flex: 1, marginLeft: scaleText(5).fontSize }}
                />
            </View>

            <View style={styles.fieldsRow}>
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
                    style={{ flex: 1, marginRight: scaleText(5).fontSize }}
                />
                <Field
                    name={STRINGS.CITY_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.CITY_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ flex: 1, marginLeft: scaleText(5).fontSize }}
                />
            </View>

            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.COUNTRY_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    codeValue={selectedCountryCode}
                    setSelectedCountry={(value) => {
                        changeField('details', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value)
                    }}
                    setCallingCode={(value) => {
                        changeField('details', STRINGS.COUNTRY_CODE_INPUT, value);
                        setSelectedCountryCode(value);
                    }}
                    returnKeyType={'go'}
                    countryDrop={true}
                    placeholder={'Country'}
                    style={{ flex: 1, marginRight: scaleText(5).fontSize }}
                />
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={CustomFormInput}
                    keyboardType={'email-address'}
                    placeholder={STRINGS.EMAIL_PLACEHOLDER}
                    returnKeyType={'next'}
                    editable={false}
                    style={{ flex: 1, marginLeft: scaleText(5).fontSize }}
                />
            </View>
            <View style={styles.fieldsRow}>
                <Field
                    name={STRINGS.COUNTRY_CODE_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    codeValue={selectedCountryCode}
                    setCallingCode={(value) => {
                        changeField('details', STRINGS.COUNTRY_CODE_INPUT, value)
                        setSelectedCountryCode(value);
                    }}
                    setSelectedCountry={(value) => {
                        changeField('details', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value);
                    }}
                    returnKeyType={'go'}
                    placeholder={'Country Code'}
                    style={{ flex: 1, marginRight: scaleText(5).fontSize }}
                />
                <Field
                    name={STRINGS.PHONE_NUMBER}
                    component={CustomFormInput}
                    returnKeyType={'next'}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    style={{ flex: 1, marginLeft: scaleText(5).fontSize }}
                    placeholder={STRINGS.PHONE_PLACEHOLDER}
                />
            </View>

            <Image source={DIVIDING_LINE} style={styles.dividingLine} />
            <Button
                titleStyle={styles.loginSubmitTitle}
                buttonStyle={styles.registerButtonStyle}
                title={STRINGS.SAVE} onPress={handleSubmit(onSubmit)} />

        </React.Fragment >
    );
};

const mapStateToProps = (state, props) => {
    let profileValues = {
        ...props.profileData,
    };
    if (props.profileData.phoneNumber && props.profileData.phoneNumber.code && props.profileData.phoneNumber.phone) {
        profileValues = {
            ...profileValues,
            'country-code': props.profileData.phoneNumber.code,
            phone: props.profileData.phoneNumber.phone,
        };
    }
    return {
        initialValues: profileValues,
    };
};
const reduxFormFunction = reduxForm({
    form: "details",
    // fields: ['email', 'password'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true,
})(Form);

export const DetailsForm = connect(mapStateToProps, { changeField })(reduxFormFunction);