/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useNavigationState } from "react";
import { View, Text, Image, Button, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk';
import { StackActions } from '@react-navigation/native';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, GOOGLE_SIGNIN_WEB_CLIENT_ID, LABELS, SCREENS, NAV_ARROW_ICON } from '../../../../../shared/constants'
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";

export const Screen = ({
    registerUser,
    checkLogin,
    socialLogin,
    stopLoader,
    navigation,
    route,
    state
}) => {
    const [signUpTab, setSignUpTab] = useState(false);
    const [subscribed, setSubscribed] = useState(false)
    const [dateString, setDateString] = useState(null);
    const [deviceToken, setDeviceToken] = useState('');
    let { fromDetails = false, vehicleDetails = {} } = route.params;

    GoogleSignin.configure({
        scopes: [],
        webClientId: GOOGLE_SIGNIN_WEB_CLIENT_ID,
        offlineAccess: true,
        loginHint: '',
        forceCodeForRefreshToken: false,
    });

    useEffect(() => {
        messaging().getToken().then(token => {
            setDeviceToken(token);
        })
    }, []);

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
                                    console.log('error', error)
                                } else {
                                    socialLogin({
                                        loginType: 2,
                                        socialId: result.id,
                                        deviceToken: deviceToken,
                                        email: result.email,
                                        role: 1,
                                        name: result.first_name,
                                        surname: result.last_name
                                    }, (response) => {
                                        if (fromDetails) {
                                            navigation.replace(
                                                { name: SCREENS.BOOKING_SUMMARY, params: { vehicleDetails: vehicleDetails } }
                                            )
                                        }
                                        else {
                                            navigation.goBack();
                                        }
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
                            console.log('err', error)
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
                deviceToken: deviceToken,
                email: userInfo.user.email,
                role: 1,
                name: userInfo.user.givenName,
                surname: userInfo.user.familyName
            }, (response) => {
                stopLoader();
                if (fromDetails) {
                    navigation.replace(
                        { name: SCREENS.BOOKING_SUMMARY, params: { vehicleDetails: vehicleDetails } }
                    )
                }
                else {
                    navigation.goBack();
                }
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

    useEffect(() => {
        stopLoader();
    })

    return (
        <AuthHoc
            leftIcon={APP_LOGO}
            toastVisibility={toastVisibility}
            toastMessage={toastMessage}
        >
            <View style={styles.childContainer}>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', marginLeft: -1 * scaleText(40).fontSize, marginRight: scaleText(40).fontSize }}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                >
                    <Image source={NAV_ARROW_ICON} height={20} width={20} />
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                        fontSize: scaleText(18).fontSize,
                        lineHeight: scaleText(18).lineHeight
                    }}>
                    {LABELS.loginOrRegister}
                </Text>
            </View>
            <View style={styles.formWrapper}>
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
                        }}>{LABELS.iAmNew}</Text>
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
                        }}>{LABELS.login}</Text>
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
                                    Keyboard.dismiss();
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
                                        navigation.goBack();
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
                                Keyboard.dismiss();
                                checkLogin({
                                    deviceToken: deviceToken,
                                    email: formData.email,
                                    password: formData.password,
                                    role: 1
                                }, (response) => {
                                    stopLoader();
                                    if (fromDetails) {
                                        navigation.replace(SCREENS.BOOKING_SUMMARY, { vehicleDetails: vehicleDetails })
                                    }
                                    else {
                                        navigation.goBack();
                                    }
                                }, (response) => {
                                    stopLoader();
                                })
                            }}
                        />}

                        {!signUpTab && <Text style={styles.forgotPasswordLabel} onPress={() =>
                            navigation.navigate(SCREENS.FORGOT_PASSWORD)
                        }>{LABELS.forgotPassword}</Text>}
                    </View>
                </ScrollView>
            </View>
        </AuthHoc >
    );
}
