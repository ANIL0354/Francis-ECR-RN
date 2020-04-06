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
            <View style={styles.childContainer}>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        fontSize: scaleText(18).fontSize,
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
                            backgroundColor: signUpTab ? '#0091ff' : '#7fc8ff',
                        }}>
                        <Text style={{
                            ...styles.authTabButtonText,
                            fontSize: scaleText(16).fontSize
                        }}>{"I'm New"}</Text></TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSignUpTab(false)}
                        style={{
                            ...styles.authTabButton,
                            fontSize: scaleText(16).fontSize,
                            backgroundColor: signUpTab ? '#7fc8ff' : '#0091ff',
                        }}>
                        <Text style={{
                            ...styles.authTabButtonText,
                            fontSize: scaleText(16).fontSize
                        }}>{"Login"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
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