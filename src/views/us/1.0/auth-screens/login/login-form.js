import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import validator from "./validator";
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { DIVIDING_LINE, GOOGLE_ICON, FACEBOOK_ICON } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
import styles from './style';
import { scaleText } from "../../../../../helpers";


const Form = ({
    handleSubmit,
    socialLogin,
    googleAuth,
    facebookAuth,
    onSubmit,
}) => {
    return (
        <View>
            <Field
                name={STRINGS.EMAIL_INPUT_NAME}
                component={CustomFormInput}
                keyboardType={'email-address'}
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
            <Text style={{ textAlign: 'center', marginBottom: 20, marginTop: 5, color: 'black' }}>{'Or Connect with'}</Text>

            <View style={{ flexDirection: 'row', padding: scaleText(10).fontSize }}>
                <TouchableOpacity onPress={googleAuth} style={{ backgroundColor: '#4c8bf5', marginRight: scaleText(20).fontSize, flexDirection: 'row', flex: 1, alignItems: 'center', padding: scaleText(10).fontSize, borderRadius: 5 }}>
                    <Image source={GOOGLE_ICON} style={{ marginRight: scaleText(5).fontSize }} height={scaleText(30).fontSize} width={scaleText(30).fontSize} />
                    <View style={{ flex: 1, alignItems: 'center', }}>
                        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: scaleText(13).fontSize }}>Log In with</Text>
                        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: 'white', fontWeight: '700', fontSize: scaleText(13).fontSize }}> Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={facebookAuth} style={{ backgroundColor: '#3b5998', flexDirection: 'row', flex: 1, alignItems: 'center', padding: scaleText(10).fontSize, borderRadius: 5 }}>
                    <Image source={FACEBOOK_ICON} style={{ marginRight: scaleText(5).fontSize }} height={scaleText(30).fontSize} width={scaleText(30).fontSize} />
                    <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontWeight: '700', fontSize: scaleText(13).fontSize }}>Log In with Facebook</Text>
                </TouchableOpacity>
            </View>

            <Image source={DIVIDING_LINE} style={{ width: '100%', height: 1.5, marginVertical: 20 }} />
            <Button
                titleStyle={styles.loginSubmitTitle}
                buttonStyle={styles.loginSubmit}
                title={STRINGS.LOGIN} onPress={handleSubmit(onSubmit)} />

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
    validate: validator,
    enableReinitialize: true
})(Form);

export const LoginForm = connect(mapStateToProps, null)(reduxFormFunction);