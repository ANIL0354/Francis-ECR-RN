import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
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
    return (
        <AuthHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={null}
        >
            <View style={styles.childContainer}>
                <TouchableOpacity style={{ height: 20, width: 20 }} onPress={() => navigation.navigate('LOGIN_SCREEN')}>
                    <Image source={NAV_ARROW_ICON} height={20} width={20} />
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        fontSize: scaleText(18).fontSize,
                        lineHeight: scaleText(18).lineHeight
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
                            marginVertical: 5,
                            fontSize: scaleText(18).fontSize,
                            lineHeight: scaleText(18).lineHeight
                        }}>
                        {'Check your email!'}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 10,
                            marginBottom: 50,
                            fontSize: scaleText(16).fontSize,
                            lineHeight: scaleText(16).lineHeight
                        }}>
                        {'We just sent you a reset password link on your registered email address.'}
                    </Text>

                    <Button title={'LOGIN'} style={{ display: 'flex' }} onPress={() => navigation.navigate('LOGIN_SCREEN')} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 40 }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                marginVertical: 5,
                                fontSize: scaleText(16).fontSize,
                                lineHeight: scaleText(16).lineHeight
                            }}>
                            {"Didn't receive the link?"}
                        </Text>
                        <Text style={{ marginLeft: 5, color: '#0091ff' }} onPress={() =>
                            sendRecoveryEmail({
                                email: email,
                            }, (response) => {
                                setEmailSent(true);
                                stopLoader();
                                console.log('res', response.msg)
                            }, (response) => {
                                stopLoader();
                                console.log('res', response.msg)
                            })
                        }>{'Resend'}</Text>
                    </View>

                </View>
                : <View style={{ padding: 5 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: scaleText(18).fontSize,
                            lineHeight: scaleText(18).lineHeight
                        }}>
                        {'We will email you a link to reset your password.'}
                    </Text>
                    <View style={styles.formContainer}>
                        <ForgotForm
                            onSubmit={(formData) => {
                                setEmail(formData.email)
                                sendRecoveryEmail({
                                    email: formData.email,
                                }, (response) => {
                                    setEmailSent(true);
                                    stopLoader();
                                    console.log('res', response.msg)
                                }, (response) => {
                                    stopLoader();
                                    console.log('res', response.msg)
                                })
                            }}
                        />

                    </View>
                </View>}
        </AuthHoc >
    );
}
