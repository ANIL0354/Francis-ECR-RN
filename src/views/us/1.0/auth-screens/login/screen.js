import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO } from '../../../../../shared/constants'
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";

export const Screen = ({
    registerUser,
    checkLogin,
    socialLogin,
    stopLoader,
    navigation
}) => {
    const [signUpTab, setSignUpTab] = useState(false);
    const [subscribed, setSubscribed] = useState(false)
    const [dateString, setDateString] = useState(null);

    GoogleSignin.configure({
        scopes: [],
        webClientId: '628352863690-rktt99inolnqkp55rvojn8gi1fl7r1v7.apps.googleusercontent.com',
        offlineAccess: true,
        loginHint: '',
        forceCodeForRefreshToken: false,
    });

    const facebookAuth = () => {
        LoginManager.logInWithPermissions(["public_profile", 'email']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            // console.warn('data', data.accessToken)
                            const accessToken = data.accessToken;
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log('Error fetching data=', JSON.stringify(error));
                                } else {
                                    console.log('Success fetching data=', JSON.stringify(result));
                                    socialLogin({
                                        loginType: 2,
                                        socialId: result.id,
                                        "deviceToken": "string",
                                        email: result.email,
                                        role: 1,
                                        name: result.first_name,
                                        surname: result.last_name
                                    }, (response) => {
                                        console.warn(response);
                                        navigation.navigate('COMPLETE_DETAILS_SCREEN');
                                    }, (response) => {
                                        console.warn(response)
                                    })
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

    const googleAuth = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo)
            socialLogin({
                loginType: 3,
                socialId: userInfo.user.id,
                "deviceToken": "string",
                email: userInfo.user.email,
                role: 1,
                name: userInfo.user.givenName,
                surname: userInfo.user.familyName
            }, (response) => {
                // console.warn('here s', response);
                navigation.navigate('COMPLETE_DETAILS_SCREEN');
                stopLoader();
            }, (response) => {
                console.warn('here err', response);
                stopLoader();
            })

            stopLoader();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('error', error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('error', error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('error', error)
            } else {
                console.log('error', error)
            }
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <AuthHoc
                rightIcon={MENU_LOGO}
                leftIcon={APP_LOGO}
                centerIcon={null}
            >
                <View style={styles.childContainer}>
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            fontSize: scaleText(18).fontSize,
                            lineHeight: scaleText(18).lineHeight
                        }}>
                        {'Login Or Register'}
                    </Text>
                </View>
                <View style={{ padding: 5 }}>
                    <View style={styles.authTabContainer}>
                        <TouchableOpacity
                            onPress={() => setSignUpTab(true)}
                            style={{
                                ...styles.authTabButton,
                                fontSize: scaleText(16).fontSize,
                                lineHeight: scaleText(16).lineHeight,
                                backgroundColor: signUpTab ? '#0091ff' : '#7fc8ff',
                            }}>
                            <Text style={{
                                ...styles.authTabButtonText,
                                fontSize: scaleText(16).fontSize,
                                lineHeight: scaleText(16).lineHeight
                            }}>{"I'm New"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSignUpTab(false)}
                            style={{
                                ...styles.authTabButton,
                                fontSize: scaleText(16).fontSize,
                                lineHeight: scaleText(16).lineHeight,
                                backgroundColor: signUpTab ? '#7fc8ff' : '#0091ff',
                            }}>
                            <Text style={{
                                ...styles.authTabButtonText,
                                fontSize: scaleText(16).fontSize,
                                lineHeight: scaleText(16).lineHeight
                            }}>{"Login"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        {signUpTab && <SignupForm
                            socialLogin={socialLogin}
                            googleAuth={googleAuth}
                            facebookAuth={facebookAuth}
                            saveDateString={(dateString) => setDateString(dateString)}
                            setSubscribed={setSubscribed}
                            subscribed={subscribed}
                            onSubmit={(formData) => {
                                console.warn('formData', formData);
                                var dobStamp = new Date(formData.dob);
                                dobStamp = new Date(formData.dob).getTime();
                                registerUser({
                                    email: formData.email,
                                    password: formData.password,
                                    name: formData.name,
                                    surname: formData.surname,
                                    dob: dobStamp,
                                    phoneNumber: {
                                        code: formData['country-code'],
                                        phone: formData.phone,
                                    },
                                    city: formData.city,
                                    country: formData.country,
                                    subscribe: subscribed
                                }, (response) => {
                                    stopLoader();
                                    console.log('res', response.msg);
                                }, (response) => {
                                    stopLoader();
                                    console.log('res', response.msg)
                                })
                            }}
                        />}
                        {!signUpTab && <LoginForm
                            socialLogin={socialLogin}
                            googleAuth={() => googleAuth()}
                            facebookAuth={() => facebookAuth()}
                            onSubmit={(formData) => {
                                checkLogin({
                                    deviceToken: "string",
                                    email: formData.email,
                                    password: formData.password,
                                    role: 1
                                }, (response) => {
                                    stopLoader();
                                    console.log('login res', response);
                                    navigation.navigate('AUTHENTICATED_SCREEN')
                                }, (response) => {
                                    stopLoader();
                                    console.log('login res', response.msg)
                                })
                            }}
                        />}

                        {!signUpTab && <Text style={{ marginLeft: 5, color: '#0091ff', textAlign: 'center' }} onPress={() =>
                            navigation.navigate('FORGOT_PASSWORD_SCREEN')
                        }>{'Forgot Password?'}</Text>}
                    </View>
                </View>
            </AuthHoc >
        </KeyboardAvoidingView>
    );
}
