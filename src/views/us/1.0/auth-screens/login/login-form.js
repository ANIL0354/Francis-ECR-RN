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
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import { Button, View, Text, TouchableOpacity } from "react-native";
import Captcha from '../../../../../components/atoms/Captcha';
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
            console.log('userInfo', error)
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('userInfo', error)
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('userInfo', error)
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
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '628352863690-rktt99inolnqkp55rvojn8gi1fl7r1v7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
        // accountName: '', // [Android] specifies an account name on the device that should be used
        // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
            <View style={{ flex: 1, flexDirection: 'row', margin: 0, padding: 0, position: 'relative' }}>
                <GoogleSigninButton
                    style={{ width: 150, position: 'relative' }}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => signIn()}
                    disabled={false} />
                <LoginButton
                    style={{ width: 150, height: 42, marginTop: 4, paddingVertical: 0, position: 'relative', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.warn("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.warn("login is cancelled.");
                            } else {
                                console.warn('error')
                                getUserData()
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} />

            </View>
            {/* <View> */}
            {/* <Button style={{ marginTop: 100, position: 'relative' }} title={STRINGS.LOGIN} onPress={handleSubmit(onSubmit)} /> */}
            {/* </View> */}

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