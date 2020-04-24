import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
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
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const accessToken = data.accessToken;
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                } else {
                                    socialLogin({
                                        loginType: 2,
                                        socialId: result.id,
                                        "deviceToken": "string",
                                        email: result.email,
                                        role: 1,
                                        name: result.first_name,
                                        surname: result.last_name
                                    }, (response) => {
                                        // navigation.navigate('HOME_SCREEN');
                                    }, (response) => {
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
                        }
                    )
                }
            },
            function (error) {
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
            socialLogin({
                loginType: 3,
                socialId: userInfo.user.id,
                "deviceToken": "string",
                email: userInfo.user.email,
                role: 1,
                name: userInfo.user.givenName,
                surname: userInfo.user.familyName
            }, (response) => {
                stopLoader();
            }, (response) => {
                stopLoader();
            })

            stopLoader();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
            }
        }
    };
    const [toastVisibility, setToastVisibility] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        setSubscribed(false);
    }, [signUpTab])

    return (
        <AuthHoc
            leftIcon={APP_LOGO}
            toastVisibility={toastVisibility}
            toastMessage={toastMessage}
        >
            <View style={styles.childContainer}>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                        fontSize: scaleText(18).fontSize,
                        lineHeight: scaleText(18).lineHeight
                    }}>
                    {'Login Or Register'}
                </Text>
            </View>
            <View style={{ padding: 5, flex: 1, }}>
                <View style={styles.authTabContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSignUpTab(true)}
                        style={{
                            ...styles.authTabButton,
                            fontSize: scaleText(16).fontSize,
                            lineHeight: scaleText(16).lineHeight,
                            backgroundColor: signUpTab ? '#0091ff' : '#7fc8ff',
                        }}>
                        <Text style={{
                            ...styles.authTabButtonText,
                            height: Platform.OS == 'ios' ? scaleText(16).lineHeight + 2 : 'auto',
                            fontSize: scaleText(16).fontSize,
                            lineHeight: scaleText(16).lineHeight
                        }}>{"I'm New"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSignUpTab(false)}
                        style={{
                            ...styles.authTabButton,
                            fontSize: scaleText(16).fontSize,
                            lineHeight: scaleText(16).lineHeight,
                            backgroundColor: signUpTab ? '#7fc8ff' : '#0091ff',
                        }}>
                        <Text style={{
                            ...styles.authTabButtonText,
                            height: Platform.OS == 'ios' ? scaleText(16).lineHeight + 2 : 'auto',
                            fontSize: scaleText(16).fontSize,
                            lineHeight: scaleText(16).lineHeight
                        }}>{"Login"}</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={styles.formContainer}>
                        {signUpTab &&
                            <SignupForm
                                socialLogin={socialLogin}
                                googleAuth={googleAuth}
                                facebookAuth={facebookAuth}
                                saveDateString={(dateString) => setDateString(dateString)}
                                setSubscribed={setSubscribed}
                                subscribed={subscribed}
                                onSubmit={(formData) => {
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
                                        setSignUpTab(false);
                                    }, (response) => {
                                        stopLoader();
                                    })
                                }}
                            />
                        }
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
                                    // navigation.navigate('HOME_SCREEN')
                                }, (response) => {
                                    stopLoader();
                                })
                            }}
                        />}

                        {!signUpTab && <Text style={{
                            marginLeft: 5,
                            marginTop: 30,
                            color: '#0091ff',
                            textAlign: 'center'
                        }} onPress={() =>
                            navigation.navigate('FORGOT_PASSWORD_SCREEN')
                        }>{'Forgot Password?'}</Text>}
                    </View>
                </ScrollView>
            </View>
        </AuthHoc >
    );
}
