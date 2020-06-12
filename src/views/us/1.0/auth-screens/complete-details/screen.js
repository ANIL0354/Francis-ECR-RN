/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Image, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import AuthHoc from '../../../../../components/hoc/AuthHoc';
import { APP_LOGO, MENU_LOGO, NAV_ARROW_ICON } from '../../../../../shared/constants';
import { DetailsForm } from './form';
import { scaleText } from '../../../../../helpers'
import styles from "./style.js";
import { startLoader } from "../../../../../redux/actions";


export const Screen = ({
    completeProfile,
    checkLogin,
    navigation,
    profileData,
    stopLoader,
    fetchProfile,
}) => {
    const [subscribed, setSubscribed] = useState(false);
    const [dateString, setDateString] = useState(null);

    useEffect(() => {
        return () => {
            fetchProfile(() => { }, () => { });
        }
    }, []);

    useEffect(() => {
        startLoader();
        fetchProfile(() => { stopLoader(); }, () => { stopLoader(); });
    }, []);

    return (
        <AuthHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={null}
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
                        lineHeight: scaleText(18).lineHeight,
                    }}>
                    {'Complete Other Details'}
                </Text>
            </View>
            <View style={styles.formWrapper}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    <View style={styles.formContainer}>
                        <DetailsForm
                            profileData={profileData}
                            saveDateString={(dateString) => setDateString(dateString)}
                            onSubmit={(formData) => {
                                var dobStamp = new Date(formData.dob);
                                dobStamp = new Date(formData.dob).getTime();
                                completeProfile({
                                    email: formData.email,
                                    name: formData.name,
                                    surname: formData.surname,
                                    dob: dobStamp,
                                    phoneNumber: {
                                        code: formData['country-code'],
                                        phone: formData.phone,
                                    },
                                    city: formData.city,
                                    country: formData.country,
                                }, (response) => {
                                    stopLoader();
                                    navigation.goBack();
                                }, (response) => {
                                    stopLoader();
                                });
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </AuthHoc >
    );
}
