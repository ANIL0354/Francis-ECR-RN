import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, View, KeyboardAvoidingView, Platform } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import Checkbox from '../../../../../components/atoms/Checkbox';
import { CHECKBOX_ICON } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
const { onSubmitFail } = require(`../../../../../helpers`);

const Form = ({
    handleSubmit,
    onSubmit,
}) => {
    const [subscribed, setSubscribed] = useState(false)
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
                    name={STRINGS.PASSWORD_INPUT_NAME}
                    component={CustomFormInput}
                    secureTextEntry={true}
                    returnKeyType={'go'}
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
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const SignupForm = connect(mapStateToProps, null)(reduxFormFunction);