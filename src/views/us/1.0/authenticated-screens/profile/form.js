/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { reduxForm, Field, change as changeField } from 'redux-form';
import { Button } from 'react-native-elements';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import validator from './validator';
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
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { scaleText } from '../../../../../helpers';
import styles from './style';


const Form = ({
    handleSubmit,
    onSubmit,
    profileData,
    initialValues,
    changeField,
    onCancel,
    saveDateString,
}) => {
    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 16);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryCode, setSelectedCountryCode] = useState('');

    useEffect(() => {
        changeField('edit_profile', STRINGS.COUNTRY_INPUT, initialValues.country);
        setSelectedCountry(initialValues.country);
        changeField('edit_profile', STRINGS.COUNTRY_CODE_INPUT, initialValues['country-code']);
        setSelectedCountryCode(initialValues['country-code']);
    }, []);

    return (
        <React.Fragment>
            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Name:'}</Text>
                <Field
                    name={STRINGS.NAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.NAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    takeErrorSpace={false}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Surname:'}</Text>
                <Field
                    name={STRINGS.SURNAME_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    returnKeyType={'next'}
                    takeErrorSpace={false}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'DOB:'}</Text>
                <Field
                    name={STRINGS.DOB_INPUT}
                    component={CustomDatePicker}
                    placeholder={STRINGS.DOB_PLACEHOLDER}
                    returnKeyType={'next'}
                    takeErrorSpace={false}
                    onDateChange={(date) => {
                        changeField('edit_profile', STRINGS.DOB_INPUT, date);
                    }}
                    saveDateString={(date) => {
                        saveDateString(date);
                    }}
                    maxDate={new Date(maxDate)}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'City:'}</Text>
                <Field
                    name={STRINGS.CITY_INPUT}
                    component={CustomFormInput}
                    placeholder={STRINGS.CITY_PLACEHOLDER}
                    returnKeyType={'next'}
                    takeErrorSpace={false}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Country:'}</Text>
                <Field
                    name={STRINGS.COUNTRY_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    takeErrorSpace={false}
                    codeValue={selectedCountryCode}
                    setSelectedCountry={(value) => {
                        changeField('edit_profile', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value);
                    }}
                    setCallingCode={(value) => {
                        changeField('edit_profile', STRINGS.COUNTRY_CODE_INPUT, value);
                        setSelectedCountryCode(value);
                    }}
                    returnKeyType={'go'}
                    countryDrop={true}
                    placeholder={'Country'}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Email:'}</Text>
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={CustomFormInput}
                    keyboardType={'email-address'}
                    takeErrorSpace={false}
                    placeholder={STRINGS.EMAIL_PLACEHOLDER}
                    returnKeyType={'next'}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Country Code:'}</Text>
                <Field
                    name={STRINGS.COUNTRY_CODE_INPUT}
                    component={CountryCodePicker}
                    countryValue={selectedCountry}
                    takeErrorSpace={false}
                    codeValue={selectedCountryCode}
                    setCallingCode={(value) => {
                        changeField('edit_profile', STRINGS.COUNTRY_CODE_INPUT, value);
                        setSelectedCountryCode(value);
                    }}
                    setSelectedCountry={(value) => {
                        changeField('edit_profile', STRINGS.COUNTRY_INPUT, value);
                        setSelectedCountry(value);
                    }}
                    returnKeyType={'go'}
                    placeholder={'Country Code'}
                    style={{ flex: 1 }}
                />
            </View>

            <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                <Text style={styles.label}>{'Phone:'}</Text>
                <Field
                    name={STRINGS.PHONE_NUMBER}
                    component={CustomFormInput}
                    returnKeyType={'next'}
                    keyboardType={'phone-pad'}
                    maxLength={15}
                    takeErrorSpace={false}
                    style={{ flex: 1 }}
                    placeholder={STRINGS.PHONE_PLACEHOLDER}
                />
            </View>

            <View style={styles.rowFlex}>
                <View style={[styles.changePasswordWrapper, styles.rowFlex, styles.justifySpaceBetween]}>
                    <Button
                        titleStyle={styles.basicBlueText}
                        buttonStyle={styles.changePasswordButton}
                        title={STRINGS.CANCEL} onPress={onCancel} />
                    <Button
                        titleStyle={styles.basicWhiteText}
                        buttonStyle={styles.submitEditButton}
                        title={STRINGS.SAVE} onPress={handleSubmit(onSubmit)} />
                </View>
            </View>

        </React.Fragment >
    );
};

const mapStateToProps = (state, props) => {
    let profileValues = {
        ...props.profileData,
        'country-code': props.profileData.phoneNumber.code,
        phone: props.profileData.phoneNumber.phone,
    };
    return {
        initialValues: profileValues,
    };
};

const reduxFormFunction = reduxForm({
    form: 'edit_profile',
    fields: ['name', 'surname', 'dob'],
    validate: validator,
    enableReinitialize: true,
})(Form);

export const EditProfileForm = connect(mapStateToProps, { changeField })(reduxFormFunction);
