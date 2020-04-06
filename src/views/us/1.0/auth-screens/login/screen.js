import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO } from '../../../../../shared/constants'
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";

export const Screen = () => {
    const [signUpTab, setSignUpTab] = useState(false);
    return (
        <AuthHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={null}
        >
            <View style={{
                flex: 1,
                backgroundColor: '#0091ff',
                paddingHorizontal: 30,
                paddingVertical: 25,
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Text
                    style={{
                        fontSize: scaleText(18).fontSize,
                        color: 'white',
                        textTransform: 'uppercase'
                    }}>
                    {'Login Or Register'}
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 50, paddingVertical: 20, justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setSignUpTab(true)}
                        style={{
                            minWidth: 150,
                            maxWidth: 150,
                            fontSize: scaleText(16).fontSize,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: signUpTab ? '#0091ff' : '#7fc8ff',
                            paddingHorizontal: 40,
                            paddingVertical: 20,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            marginHorizontal: 2
                        }}>
                        <Text style={{ color: 'white', opacity: 1, fontSize: scaleText(16).fontSize, textTransform: 'uppercase' }}>{"I'm New"}</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSignUpTab(false)}
                        style={{
                            minWidth: 150,
                            maxWidth: 150,
                            fontSize: scaleText(16).fontSize,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: signUpTab ? '#7fc8ff' : '#0091ff',
                            paddingHorizontal: 40,
                            paddingVertical: 20,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                            marginHorizontal: 2
                        }}>
                        <Text style={{ color: 'white', opacity: 1, fontSize: scaleText(16).fontSize, textTransform: 'uppercase' }}>{"Login"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ border: 'black', borderWidth: 1, borderRadius: 10, marginVertical: 20, padding: 15 }}>
                    {signUpTab && <SignupForm
                        onSubmit={(formData) => { console.warn('formData', formData) }}
                    />}
                    {!signUpTab && <LoginForm
                        onSubmit={(formData) => { console.warn('formData', formData) }}
                    />}
                </View>
            </View>
        </AuthHoc >
    );
}