import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO, NAV_ARROW_ICON, MAIL_ICON } from '../../../../../shared/constants';
import { ForgotForm } from './form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";


export const Screen = ({
    sendRecoveryEmail,
    navigation,
    stopLoader
}) => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const largeScaledFont = scaleText(18);
    const mediumScaledFont = scaleText(16)
    return (
        <AuthHoc
            leftIcon={APP_LOGO}
        >
            <View style={styles.childContainer}>
                <TouchableOpacity style={{ height: 20, width: 20, justifyContent: 'center' }} onPress={() => navigation.navigate('LOGIN_SCREEN')}>
                    <Image source={NAV_ARROW_ICON} height={20} width={20} />
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        fontSize: largeScaledFont.fontSize,
                    }}>
                    {'Forgot Password'}
                </Text>
            </View>
            {emailSent
                ? <View style={{ padding: 5, justifyContent: 'space-evenly' }}>
                    <Image source={MAIL_ICON} height={100} width={100} style={{ alignSelf: 'center', marginVertical: 30 }} />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: 'black',
                            marginVertical: 5,
                            fontSize: largeScaledFont.fontSize,
                            lineHeight: largeScaledFont.lineHeight
                        }}>
                        {'Check your email!'}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 10,
                            marginBottom: 50,
                            color: 'black',
                            fontSize: mediumScaledFont.fontSize,
                            lineHeight: mediumScaledFont.lineHeight
                        }}>
                        {'Reset password link has been sent to your email address.'}
                    </Text>

                    <Button title={'LOGIN'}
                        titleStyle={{ textTransform: 'uppercase' }}
                        buttonStyle={{ backgroundColor: '#009000', maxWidth: 200, minWidth: 200, alignSelf: 'center', }}
                        onPress={() => navigation.navigate('LOGIN_SCREEN')} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 40 }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'black',
                                marginVertical: 5,
                                fontSize: mediumScaledFont.fontSize,
                                lineHeight: mediumScaledFont.lineHeight
                            }}>
                            {"Didn't receive the link?"}
                        </Text>
                        <Text style={{ marginLeft: 5, color: '#0091ff' }} onPress={() =>
                            sendRecoveryEmail({
                                email: email,
                            }, (response) => {
                                setEmailSent(true);
                                stopLoader();
                            }, (response) => {
                                stopLoader();
                            })
                        }>{'Resend'}</Text>
                    </View>

                </View>
                : <View style={{ padding: 5, justifyContent: 'center' }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 10,
                            color: 'black',
                            fontSize: largeScaledFont.fontSize,
                            lineHeight: largeScaledFont.lineHeight
                        }}>
                        {'We will email you a link to reset your password.'}
                    </Text>
                    <View style={styles.formContainer}>
                        <ForgotForm
                            onSubmit={(formData) => {
                                Keyboard.dismiss();
                                setEmail(formData.email)
                                sendRecoveryEmail({
                                    email: formData.email,
                                }, (response) => {
                                    setEmailSent(true);
                                    stopLoader();
                                }, (response) => {
                                    stopLoader();
                                })
                            }}
                        />

                    </View>
                </View>}
        </AuthHoc >
    );
}
