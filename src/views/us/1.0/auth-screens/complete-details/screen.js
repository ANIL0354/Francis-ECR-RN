import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from 'react-native';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO } from '../../../../../shared/constants';
import { DetailsForm } from './form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";


export const Screen = ({
    completeProfile,
    checkLogin,
    navigation,
    userInfo,
    stopLoader
}) => {
    const [subscribed, setSubscribed] = useState(false)
    const [dateString, setDateString] = useState(null);
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
                    {'Complete Other Details'}
                </Text>
            </View>
            <View style={{ padding: 5 }}>
                <View style={styles.formContainer}>
                    <DetailsForm
                        email={userInfo && userInfo.email ? userInfo.email : ''}
                        name={userInfo && userInfo.name ? userInfo.name : ''}
                        surname={userInfo && userInfo.surname ? userInfo.surname : ''}
                        saveDateString={(dateString) => setDateString(dateString)}
                        setSubscribed={setSubscribed}
                        subscribed={userInfo && userInfo.subscribe ? userInfo.subscribe : subscribed}
                        onSubmit={(formData) => {
                            var dobStamp = new Date(formData.dob);
                            dobStamp = new Date(formData.dob).getTime();
                            completeProfile({
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
                                // navigation.navigate('HOME_SCREEN');
                            }, (response) => {
                                stopLoader();
                            })
                        }}
                    />

                </View>
            </View>
        </AuthHoc >
    );
}
