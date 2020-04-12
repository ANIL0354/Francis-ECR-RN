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
import { View, Text, Image, ScrollView } from "react-native";
import Captcha from '../../../../../components/atoms/Captcha';
import { DIVIDING_LINE, GOOGLE_ICON, FACEBOOK_ICON } from '../../../../../shared/constants'
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
                    title={'Log In with Facebook'}
                    onPress={facebookAuth} />

            </View>
            <Image source={DIVIDING_LINE} style={{ width: '100%', height: 2, marginVertical: 15 }} />
            <Button
                titleStyle={{
                    textAlign: 'center',
                    flexWrap: 'wrap',
                }}
                buttonStyle={{ backgroundColor: '#009000', maxWidth: 200, minWidth: 200, marginBottom: 10, alignSelf: 'flex-end' }}
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