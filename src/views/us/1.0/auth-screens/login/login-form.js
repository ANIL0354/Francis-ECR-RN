import React from "react";
import { reduxForm, Field } from "redux-form";
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { connect } from 'react-redux';
import validator from "./validator";
import { Button } from 'react-native-elements';
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { View, Text, Image } from "react-native";
import Captcha from '../../../../../components/atoms/Captcha';
import { CHECKBOX_ICON, GOOGLE_ICON, FACEBOOK_ICON } from '../../../../../shared/constants'
import { STRINGS } from "../../../../../shared/constants/us/strings";
const { onSubmitFail } = require(`../../../../../helpers`);
import styles from './style';


const Form = ({
    handleSubmit,
    socialLogin,
    googleAuth,
    facebookAuth,
    onSubmit,
}) => {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '628352863690-rktt99inolnqkp55rvojn8gi1fl7r1v7.apps.googleusercontent.com',
        offlineAccess: true,
        loginHint: '',
        forceCodeForRefreshToken: false,
    });



    return (
        <View>
            <Field
                name={STRINGS.EMAIL_INPUT_NAME}
                component={CustomFormInput}
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
            <Text style={{ textAlign: 'center' }}>{'Or Connect With'}</Text>
            <Button
                icon={<Image source={GOOGLE_ICON} height={50} width={50} />}
                titleStyle={{ textAlign: 'center' }}
                iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                buttonStyle={{ backgroundColor: 'darkblue', color: 'white', padding: 0, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }}
                title={'Log In with Google'} onPress={googleAuth} />
            <Button
                icon={<Image source={FACEBOOK_ICON} height={50} width={50} />}
                titleStyle={{ textAlign: 'center' }}
                iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                buttonStyle={{ backgroundColor: 'darkblue', color: 'white', padding: 0, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }}
                title={'Log In with Facebook'} onPress={facebookAuth} />

            <Button style={{ marginTop: 100, position: 'relative' }} title={STRINGS.LOGIN} onPress={handleSubmit(onSubmit)} />

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