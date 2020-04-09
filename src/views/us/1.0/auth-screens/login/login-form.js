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

const getUserData = () => {
    LoginManager.logInWithPermissions(["public_profile", 'email']).then(
        function (result) {
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        console.warn('data', data.accessToken)
                        const accessToken = data.accessToken;
                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error);
                                console.log('Error fetching data=', JSON.stringify(error));
                            } else {
                                console.log('Success fetching data=', JSON.stringify(result));
                                console.warn('Success fetching data=', JSON.stringify(result));
                                return;
                            }
                        };
                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name',
                                    },
                                },
                            },
                            responseInfoCallback,
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                        return;
                    }, (error) => {
                        console.log('error', error)
                    }
                )
                console.log(
                    "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
            }
        },
        function (error) {
            console.log("Login fail with error: " + error);
        }
    ).catch((error) => {
        console.log('error', error)
    }).finally((error) => {
        console.log('finally', error)
    })

};

const signIn = async () => {
    console.log('red')
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('userInfo', userInfo)
        this.setState({ userInfo });
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('login cancelled', error)
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play service not available', error)
            // play services not available or outdated
        } else {
            console.log('userInfo', error)
            // some other error happened
        }
    }
};
const Form = ({
    handleSubmit,
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
                title={'Sign Up with Google'} onPress={() => signIn()} />
            <Button
                icon={<Image source={FACEBOOK_ICON} height={50} width={50} />}
                titleStyle={{ textAlign: 'center' }}
                iconContainerStyle={{ alignContent: 'flex-start', alignSelf: 'flex-start' }}
                buttonStyle={{ backgroundColor: 'darkblue', color: 'white', padding: 0, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }}
                title={'Sign Up with Facebook'} onPress={() => getUserData()} />

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
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const LoginForm = connect(mapStateToProps, null)(reduxFormFunction);