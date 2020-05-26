import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Keyboard, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO, NAV_ARROW_ICON, MAIL_ICON, SCREENS, LABELS } from '../../../../../shared/constants';
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
                <TouchableOpacity
                    style={styles.navArrowContainer}
                    onPress={() => navigation.navigate(SCREENS.LOGIN, { fromDetails: false })}>
                    <Image
                        source={NAV_ARROW_ICON}
                        height={20}
                        width={20}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        fontSize: largeScaledFont.fontSize,
                    }}>
                    {LABELS.forgotPasswordHeader}
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                {emailSent
                    ? <View style={styles.emailSentViewWrapper}>
                        <Image
                            source={MAIL_ICON}
                            height={100}
                            width={100}
                            style={styles.emailSentIcon}
                        />
                        <Text
                            style={{
                                ...styles.checkMailText,
                                fontSize: largeScaledFont.fontSize,
                                lineHeight: largeScaledFont.lineHeight
                            }}>
                            {LABELS.checkYourMail}
                        </Text>
                        <Text
                            style={{
                                ...styles.resetPasswordLinkText,
                                fontSize: mediumScaledFont.fontSize,
                                lineHeight: mediumScaledFont.lineHeight
                            }}>
                            {LABELS.resetPasswordLinkSent}
                        </Text>

                        <Button title={LABELS.login}
                            titleStyle={styles.loginTitleStyle}
                            buttonStyle={styles.loginButtonStyle}
                            onPress={() => navigation.navigate(SCREENS.LOGIN, { fromDetails: false })} />
                        <View style={styles.resendWrapper}>
                            <Text
                                style={{
                                    ...styles.didnotReceiveText,
                                    fontSize: mediumScaledFont.fontSize,
                                    lineHeight: mediumScaledFont.lineHeight
                                }}>
                                {LABELS.didNotReceiveLink}
                            </Text>
                            <Text style={styles.resendText} onPress={() =>
                                sendRecoveryEmail({
                                    email: email,
                                }, (response) => {
                                    setEmailSent(true);
                                    stopLoader();
                                }, (response) => {
                                    stopLoader();
                                })
                            }>{LABELS.resend}</Text>
                        </View>

                    </View>
                    : <View style={styles.formWrapper}>
                        <Text
                            style={{
                                ...styles.formDescription,
                                fontSize: largeScaledFont.fontSize,
                                lineHeight: largeScaledFont.lineHeight
                            }}>
                            {LABELS.weWillSendEmail}
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
            </ScrollView>
        </AuthHoc >
    );
}
