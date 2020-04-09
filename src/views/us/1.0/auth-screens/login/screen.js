import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'; import {
    GoogleSignin,
    GoogleSigninButton,
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
    stopLoader
}) => {

    const [signUpTab, setSignUpTab] = useState(false);
    return (
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
            <View style={{ padding: 10 }}>
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
                        }}>{"I'm New"}</Text></TouchableOpacity>
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
                        onSubmit={(formData) => {
                            console.warn('formData', formData);
                            var dobStamp = new Date(formData.dob);
                            dobStamp = new Date(formData.dob).getTime();
                            // console.log('dobStamp', new Date(dobStamp).getTime())
                            registerUser({
                                email: formData.email,
                                password: formData.password,
                                name: formData.name,
                                surname: formData.surname,
                                dob: dobStamp,
                                city: formData.city,
                                country: formData.country
                            }, (response) => {
                                stopLoader();
                                console.warn('res', response.msg)
                                console.log('res', response.msg)
                                alert('response', response.msg)
                            }, (response) => {
                                stopLoader();
                                console.warn('res', response.msg)
                                console.log('res', response.msg)
                                alert('response', response.msg)
                            })
                        }}
                    />}
                    {!signUpTab && <LoginForm
                        onSubmit={(formData) => {
                            checkLogin({
                                deviceToken: "string",
                                email: formData.email,
                                password: formData.password,
                                role: 1
                            }, (response) => {
                                stopLoader();
                                console.warn('login res', response.msg)
                                console.log('login res', response)
                                alert('login success', response.msg)
                            }, (response) => {
                                stopLoader();
                                console.warn('login res', response.msg)
                                console.log('login res', response.msg)
                                alert('login response', response.msg)
                            })
                            console.warn('formData', formData)
                        }}
                    />}

                </View>
            </View>
        </AuthHoc >
    );
}
