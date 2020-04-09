import React, { useState } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { Button } from 'react-native-elements'
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { View, KeyboardAvoidingView, Text, Image, TouchableOpacity, Platform } from "react-native";
import { connect } from 'react-redux';
import validator from "./validator";
import CustomFormInput from '../../../../../components/atoms/CustomFormInput';
import CustomDatePicker from '../../../../../components/atoms/FormDatePicker';
import Checkbox from '../../../../../components/atoms/Checkbox';
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
        // this.setState({ userInfo });
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
    changeField
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
    const today = new Date();
    const maxDate = today.setFullYear(today.getFullYear() - 16)
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
                    onDateChange={(date) => {
                        console.warn('date', date);
                        changeField('signup', STRINGS.DOB_INPUT, date)
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
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Form);

export const SignupForm = connect(mapStateToProps, { changeField })(reduxFormFunction);